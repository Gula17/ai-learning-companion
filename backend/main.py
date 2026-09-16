import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow Frontend to communicate with Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to store the vector database in memory
vector_db = None

@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global vector_db
    # Save file temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        buffer.write(await file.read())
    
    # Process PDF
    loader = PyPDFLoader(temp_path)
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = text_splitter.split_documents(docs)
    
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_db = FAISS.from_documents(chunks, embeddings)
    
    os.remove(temp_path)
    return {"message": f"Successfully processed {file.filename}"}

@app.post("/api/chat")
async def chat(query: str = Form(...)):
    global vector_db
    if vector_db is None:
        return {"response": "Please upload a document first!"}
    
    # NEW STABLE METHOD (Manual Retrieval)
    # 1. Search for the most relevant sections in the PDF
    docs = vector_db.similarity_search(query, k=3)
    context = "\n".join([d.page_content for d in docs])
    
    # 2. Send the context and question to Gemini
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
    
    prompt = f"""
    You are a helpful AI Study Companion for college students.
    Use the following pieces of retrieved context from the uploaded study material to answer the question.
    If the answer is not in the context, use your general knowledge but mention that it wasn't in the notes.
    
    Context:
    {context}
    
    Question: {query}
    
    Answer:
    """
    
    result = llm.invoke(prompt)
    return {"response": result.content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)