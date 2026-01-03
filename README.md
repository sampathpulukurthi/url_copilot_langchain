# URL Copilot with LangChain

A web application that extracts content from URLs, summarizes it using AI, and allows users to ask questions about the content. Built with FastAPI backend and React frontend, powered by LangChain and OpenAI.

## Features

- **URL Content Extraction**: Extract readable text from web pages using readability-lxml
- **AI-Powered Summarization**: Generate summaries with bullet points and tags using LangChain
- **Interactive Q&A**: Ask questions about extracted content with contextual awareness
- **Session Management**: Maintain context across multiple interactions
- **Modern UI**: Clean React frontend with Vite

## Tech Stack

### Backend
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

## Environment Variables

Create a `.env` file in the backend directory:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Development

### Backend Development
- The backend uses FastAPI with automatic API documentation
- Visit `http://localhost:8000/docs` for interactive API docs
- Code is organized in modular files for easy maintenance

### Frontend Development
- React with TypeScript for type safety
- Vite for fast development and building
- ESLint for code quality

## License

This project is open source and available under the MIT License.


