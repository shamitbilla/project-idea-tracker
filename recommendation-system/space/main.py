from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
from keybert import KeyBERT
from contextlib import asynccontextmanager
from typing import List
import gc

embedding_model = None
kw_model = None

@asynccontextmanager
async def lifespan(app: FastAPI):

    global embedding_model, kw_model
    print("Hello ji")

    embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
    kw_model = KeyBERT('all-MiniLM-L6-v2')

    yield
    # Clean up the ML models and release the resources
    del embedding_model
    del kw_model
    gc.collect()  


app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Hey bro"}

@app.get("/embed")
def embed(text : str):
    global embedding_model
    if embedding_model is not None:
        embeddings = embedding_model.encode(text)
        return {"response" : embeddings.tolist()}
    else:
        raise RuntimeError("Model not loaded yet")
    
@app.get("/keywords")
def keyword(text : str):
    global kw_model
    if kw_model is not None:
                
        keywords_with_scores = kw_model.extract_keywords(
            text,
            top_n=4,
            stop_words='english',
            keyphrase_ngram_range=(1, 3)
        )
        # Extract only the keywords (ignore scores)
        keywords = [kw for kw, _ in keywords_with_scores]
        return {"response": keywords}
    else:
        raise RuntimeError("Model not loaded yet")