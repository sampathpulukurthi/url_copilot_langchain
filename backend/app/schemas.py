from pydantic import BaseModel, Field
from typing import List, Optional

class ExtractIn(BaseModel):
    url: str

class ExtractOut(BaseModel):
    url: str
    text: str
    char_count: int

class SummarizeIn(BaseModel):
    url: str
    text: str

class SummaryOut(BaseModel):
    title: Optional[str] = None
    summary: str
    bullets: List[str] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)

class QAIn(BaseModel):
    session_id: str
    question: str

class QAOut(BaseModel):
    answer: str
