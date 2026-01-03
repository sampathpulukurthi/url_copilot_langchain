import { useMemo, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function App() {
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  const [url, setUrl] = useState(
    "https://lovable.dev/blog/2025-01-13-2025-the-evolution-of-artificial-intelligence-in-startups"
  );

  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const [summary, setSummary] = useState(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingSummarize, setLoadingSummarize] = useState(false);
  const [loadingAsk, setLoadingAsk] = useState(false);

  const [error, setError] = useState("");

  async function apiJson(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `Request failed: ${res.status}`);
    }
    return res.json();
  }

  async function onExtract() {
    setError("");
    setLoadingExtract(true);
    try {
      // 1) extract
      const data = await apiJson("/api/extract", { url });
      setText(data.text);
      setCharCount(data.char_count);

      // 2) store context for QA
      await apiJson("/api/set_context", { 
        session_id: sessionId, 
        text: data.text 
      });
      
      // Clear previous QA state
      setQuestion("");
      setAnswer("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingExtract(false);
    }
  }

  async function onSummarize() {
    setError("");
    setLoadingSummarize(true);
    try {
      const out = await apiJson("/api/summarize", { url, text });
      setSummary(out);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingSummarize(false);
    }
  }

  async function onAsk() {
    setError("");
    setLoadingAsk(true);
    try {
      const out = await apiJson("/api/qa", {
        session_id: sessionId,
        question,
      });
      setAnswer(out.answer);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingAsk(false);
    }
  }

  return (
    <div style={{ maxWidth: 980, margin: "20px auto", padding: 16, fontFamily: "system-ui" }}>
      <h2 style={{ marginBottom: 6 }}>URL Copilot (LangChain + FastAPI + React)</h2>
      <div style={{ color: "#555", marginBottom: 16 }}>
        Session: <code>{sessionId}</code>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          style={{ flex: 1, padding: 10 }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste an article URL..."
        />
        <button onClick={onExtract} disabled={loadingExtract || !url.trim()}>
          {loadingExtract ? "Extracting..." : "Extract"}
        </button>
        <button onClick={onSummarize} disabled={loadingSummarize || !text}>
          {loadingSummarize ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {error && (
        <div style={{ marginTop: 12, padding: 10, background: "#ffecec", border: "1px solid #ffb3b3" }}>
          <b>Error:</b> <span style={{ whiteSpace: "pre-wrap" }}>{error}</span>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Extracted Text</h3>
        <div style={{ color: "#666", marginBottom: 8 }}>Characters: {charCount}</div>
        <textarea
          rows={10}
          style={{ width: "100%", padding: 10 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Extracted page text will appear here..."
        />
      </div>

      {summary && (
        <div style={{ marginTop: 16 }}>
          <h3 style={{ marginBottom: 8 }}>Summary Output</h3>
          <pre style={{ padding: 12, background: "#f6f6f6", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(summary, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Ask a question</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            style={{ flex: 1, padding: 10 }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about the article..."
          />
          <button onClick={onAsk} disabled={loadingAsk || !text || !question.trim()}>
            {loadingAsk ? "Asking..." : "Ask"}
          </button>
        </div>

        {answer && (
          <div style={{ marginTop: 10, padding: 12, background: "#eef7ff", border: "1px solid #b6dcff" }}>
            <b>Answer:</b> {answer}
          </div>
        )}
      </div>
    </div>
  );
}
