# URL Copilot – LangChain-Powered AI Assistant for Web Content

Overview

URL Copilot is a Generative AI application that transforms any public web URL into an intelligent, conversational knowledge source.
It extracts, cleans, and indexes web content, enabling users to ask natural-language questions, generate summaries, and perform contextual Q&A using a Retrieval-Augmented Generation (RAG) architecture.

This project demonstrates how to design and build an end-to-end GenAI system using modern LLM orchestration patterns and production-ready backend APIs.

## Problem Statement

Web content is often lengthy, unstructured, and difficult to query efficiently.  
Users typically want **specific answers or concise summaries**, not to manually read entire articles.

Traditional search and keyword-based tools:
- Lack contextual understanding
- Do not support conversational follow-ups
- Fail to synthesize insights across long documents

## Solution 
URL Copilot addresses this by:
1. Extracting content from a given URL
2. Cleaning and chunking text for semantic understanding
3. Generating embeddings for efficient similarity search
4. Storing embeddings in a vector database
5. Using an LLM to generate grounded, context-aware responses
6. Supporting multi-turn conversational queries


## Key Features
- 🔗 URL-based content ingestion
- ✂️ Intelligent chunking for long documents
- 🧠 Semantic search using embeddings
- 💬 Multi-turn conversational Q&A
- 📝 Automatic summarization
- ⚡ RESTful API built with FastAPI
- 🔌 Easily extensible to PDFs and enterprise knowledge sources

## Tech Stack

### Backend
- **Python**
- **FastAPI**: Modern Python web framework
- **LangChain**: AI/LLM integration framework
- **OpenAI**: Language model provider
- **readability-lxml**: Web content extraction
- **Pydantic**: Data validation and serialization

### Frontend
- **React 19**: Modern UI framework
- **Vite**: Fast development build tool
- **TypeScript**: Type-safe JavaScript

## Project Structure

```
url_copilot_langchain/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI application and endpoints
│   │   ├── extractor.py     # URL content extraction
│   │   ├── llm.py          # LangChain LLM integration
│   │   ├── schemas.py      # Pydantic models
│   │   └── store.py        # Session context storage
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
└── frontend/
    ├── src/               # React source code
    ├── package.json      # Node.js dependencies
    └── vite.config.js    # Vite configuration
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/extract` - Extract text from URL
- `POST /api/summarize` - Generate summary of extracted text
- `POST /api/qa` - Ask questions about extracted content
- `POST /api/set_context` - Store session context

## Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js 18+
- OpenAI API key

### Backend Setup

### . Clone the repository
```bash
git clone https://github.com/<your-username>/url-copilot-langchain.git
cd url-copilot-langchain

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file with your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Start the FastAPI server:
```bash
python -m uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

1. Start both the backend and frontend servers
2. Open the frontend in your browser
3. Enter a URL to extract content
4. Use the AI features to summarize or ask questions about the content


### Future Enhancements


- Support for PDFs and multiple URLs

- Reranking for improved retrieval accuracy

- Conversation memory persistence

- Authentication and user-specific knowledge bases

- RAG evaluation using RAGAS or similar frameworks

## License

This project is open source and available under the MIT License.


