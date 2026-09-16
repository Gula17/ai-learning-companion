import React, { useState } from 'react';
import axios from 'axios';
import { Upload, MessageSquare, BookOpen } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    await axios.post(`${API_URL}/api/upload`, formData);
    setLoading(false);
    alert("File Uploaded Successfully!");
  };

  const handleChat = async () => {
    const formData = new FormData();
    formData.append("query", query);
    setLoading(true);
    const res = await axios.post(`${API_URL}/api/chat`, formData);
    setChat([...chat, { q: query, a: res.data.response }]);
    setQuery("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <header className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">AI Learning Companion</h1>
        <p className="text-gray-600 mt-2">Upload notes and chat with your AI tutor</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4"><Upload size={20} /> Upload Materials</h2>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <button onClick={handleUpload} disabled={loading} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            {loading ? "Processing..." : "Process Document"}
          </button>
        </div>

        {/* Chat Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 min-h-[400px] flex flex-col">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4"><MessageSquare size={20} /> AI Tutor</h2>
          <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
            {chat.map((msg, i) => (
              <div key={i} className="space-y-2">
                <p className="bg-blue-50 p-3 rounded-lg text-blue-800"><b>Student:</b> {msg.q}</p>
                <p className="bg-gray-50 p-3 rounded-lg text-gray-800"><b>AI:</b> {msg.a}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask a question..." className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={handleChat} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Ask</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;