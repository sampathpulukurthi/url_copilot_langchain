from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.extractor import fetch_and_extract
from app.schemas import ExtractIn, ExtractOut, SummarizeIn, SummaryOut, QAIn, QAOut
from app.llm import get_llm, summarize_prompt, qa_prompt
from app.store import SESSION_CONTEXT
from pydantic import BaseModel

class SetContextIn(BaseModel):
    session_id: str
    text: str

load_dotenv()

app = FastAPI()

# Allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/api/extract", response_model=ExtractOut)
def extract(payload: ExtractIn):
    try:
        text = fetch_and_extract(payload.url)
        return ExtractOut(url=payload.url, text=text, char_count=len(text))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/summarize", response_model=SummaryOut)
def summarize(payload: SummarizeIn):
    llm = get_llm()
    # For beginner: keep it simple and parse with basic string splitting
    msg = summarize_prompt.format_messages(text=payload.text[:12000])  # limit size
    resp = llm.invoke(msg).content

    # Naive parse (we’ll improve to structured output later)
    lines = [l.strip() for l in resp.splitlines() if l.strip()]
    summary = lines[0] if lines else resp
    bullets = [l.lstrip("-• ").strip() for l in lines if l.startswith(("-", "•"))][:5]
    tags = []
    for l in lines[::-1]:
        if "tag" in l.lower():
            tags = [t.strip() for t in l.split(":")[-1].split(",") if t.strip()][:5]
            break

    return SummaryOut(summary=summary, bullets=bullets, tags=tags)

@app.post("/api/qa", response_model=QAOut)
def qa(payload: QAIn):
    context = SESSION_CONTEXT.get(payload.session_id)
    if not context:
        raise HTTPException(status_code=400, detail="No page context stored for this session_id. Extract first.")

    llm = get_llm()
    msg = qa_prompt.format_messages(context=context[:12000], question=payload.question)
    answer = llm.invoke(msg).content
    return QAOut(answer=answer)

# optional helper endpoint to "set context" after extract
@app.post("/api/set_context")
def set_context(payload: SetContextIn):
    SESSION_CONTEXT[payload.session_id] = payload.text
    return {"ok": True, "session_id": payload.session_id, "char_count": len(payload.text)}