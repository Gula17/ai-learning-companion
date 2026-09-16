import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA

load_dotenv()

class RAGEngine:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
        self.vector_db = None

    def process_pdf(self, file_path):
        loader = PyPDFLoader(file_path)
        docs = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(docs)
        
        if self.vector_db is None:
            self.vector_db = FAISS.from_documents(chunks, self.embeddings)
        else:
            self.vector_db.add_documents(chunks)
        
        return len(chunks)

    def get_response(self, query, task_type="qa"):
        if not self.vector_db:
            return "Please upload documents first."
        
        retriever = self.vector_db.as_retriever(search_kwargs={"k": 5})
        qa_chain = RetrievalQA.from_chain_type(llm=self.llm, chain_type="stuff", retriever=retriever)
        
        # Agentic Instruction based on task_type
        prompts = {
            "qa": f"Answer the student's question based on the context: {query}",
            "summarize": f"Provide a concise, bulleted revision summary of the following: {query}",
            "quiz": f"Generate 5 MCQs with answers based on: {query}. Format as JSON.",
            "viva": f"Generate 5 likely viva questions with model answers for: {query}"
        }
        
        prompt = prompts.get(task_type, prompts["qa"])
        response = qa_chain.invoke(prompt)
        return response["result"]

rag_engine = RAGEngine()