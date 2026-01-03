import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

def get_llm():
    return ChatOpenAI(
        model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        temperature=0,
        api_key=os.environ["OPENAI_API_KEY"],
    )

summarize_prompt = ChatPromptTemplate.from_messages([
    ("system", "You summarize web pages clearly for a busy reader."),
    ("human", """Summarize the following content.

Return:
1) A 4-6 sentence summary
2) 5 bullet key takeaways
3) 5 tags (single words or short phrases)

CONTENT:
{text}
""")
])

qa_prompt = ChatPromptTemplate.from_messages([
    ("system", "You answer questions strictly using the provided page content. If missing, say you don't know."),
    ("human", """PAGE CONTENT:
{context}

QUESTION:
{question}
""")
])
