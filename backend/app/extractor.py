import requests
from readability import Document

def fetch_and_extract(url: str, timeout: int = 15) -> str:
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 Safari/537.36"
    }
    r = requests.get(url, headers=headers, timeout=timeout)
    r.raise_for_status()

    doc = Document(r.text)
    html = doc.summary()  # readable HTML

    # Very simple HTML -> text (good enough for beginner)
    # If you want better extraction later, we can upgrade to trafilatura.
    from lxml import html as lxml_html
    tree = lxml_html.fromstring(html)
    text = tree.text_content()

    # Clean up whitespace
    text = "\n".join(line.strip() for line in text.splitlines() if line.strip())
    return text
