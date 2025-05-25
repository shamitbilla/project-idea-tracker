from sentence_transformers import SentenceTransformer

_model = SentenceTransformer("all-MiniLM-L6-v2")

def embed(text : str):
    embeded_string = _model.encode(text)
    return embeded_string

from keybert import KeyBERT

text = "Machine learning is fascinating. It allows computers to learn from data."

kw_model = KeyBERT('all-MiniLM-L6-v2')


keywords = kw_model.extract_keywords(
    text,
    top_n=5,
    stop_words='english',
    use_mmr=True,
    diversity=0.7
)

print(keywords)
