import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA  # This is the line you needed
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# FIXED CORS: This allows your Vercel frontend to talk to this Render backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable for the vector database
vector_db = None

@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global vector_db
    try:
        # 1. Save file temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            buffer.write(await file.read())
        
        # 2. Extract and Split Text
        loader = PyPDFLoader(temp_path)
        docs = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(docs)
        
        # 3. Create Embeddings and FAISS Index
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vector_db = FAISS.from_documents(chunks, embeddings)
        
        # 4. Cleanup
        os.remove(temp_path)
        return {"message": f"Successfully processed {file.filename}"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/chat")
async def chat(query: str = Form(...)):
    global vector_db
    if vector_db is None:
        return {"response": "Please upload a document first!"}
    
    try:
        # Use Gemini 1.5 Flash for fast responses
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
        
        # Create the QA chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm, 
            chain_type="stuff", 
            retriever=vector_db.as_retriever()
        )
        
        result = qa_chain.invoke(query)