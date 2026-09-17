import React, { useState } from 'react';
import {
  LayoutDashboard, BookOpen, MessageSquare, Calendar,
  Upload, Send, CheckCircle2, MoreHorizontal, ChevronRight,
  Download, Plus, Settings, Home, ListChecks
} from 'lucide-react';

// --- STYLES & THEME ---
const colors = {
  sidebarBg: 'bg-[#f8fafc]',
  activeBlue: 'bg-[#e0e7ff] text-[#4338ca]',
  primaryBlue: 'text-[#3b82f6]',
  greenBtn: 'bg-[#10b981] hover:bg-[#059669]',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-800">
      {/* --- SIDEBAR --- */}
      <aside className={`w-64 ${colors.sidebarBg} border-r border-slate-200 flex flex-col p-4`}>
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">AI</div>
          <h1 className="font-bold text-lg tracking-tight">AI Learning Companion</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<Home size={20} />} text="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<BookOpen size={20} />} text="Subjects" active={activeTab === 'subjects'} onClick={() => setActiveTab('subjects')} />
          <NavItem icon={<MessageSquare size={20} />} text="AI Tutor" active={activeTab === 'tutor'} onClick={() => setActiveTab('tutor')} />
          <NavItem icon={<Calendar size={20} />} text="Study Planner" active={activeTab === 'planner'} onClick={() => setActiveTab('planner')} />
          <NavItem icon={<ListChecks size={20} />} text="Quiz" active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} />
        </nav>

        <div className="pt-4 border-t border-slate-200">
          <NavItem icon={<Settings size={20} />} text="Settings" />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Home size={14} /> <ChevronRight size={14} />
            <span className="capitalize font-medium text-slate-800">{activeTab.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full"><Settings size={20} /></button>
            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">SA</div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'tutor' && <TutorView />}
          {activeTab === 'quiz' && <QuizView />}
          {activeTab === 'planner' && <PlannerView />}
        </div>
      </main>
    </div>
  );
}

// --- VIEW COMPONENTS ---

function DashboardView() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Activity</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Query Log Card */}
        <Card title="AI Tutor Chat - Query Log" action={<button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium">Chat Query</button>}>
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs font-bold text-slate-500 mb-1">StudentA</p>
              <p className="text-sm">Hello AI Tutor, could you please provide a clear explanation and some examples of Supervised Learning?</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 italic text-slate-600 text-sm">
              **Supervised Learning Overview:** (Preview of full detailed response...)
            </div>
          </div>
        </Card>

        {/* Quiz Preview Card */}
        <Card title="Database Management Systems (DBMS) - Generated Quiz">
          <div className="flex items-center gap-3 mb-4 bg-blue-50 p-3 rounded-lg">
            <div className="p-2 bg-white rounded shadow-sm text-blue-600"><ListChecks size={20} /></div>
            <div className="flex-1">
              <p className="font-bold text-sm">10 MCQs generated</p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-blue-500 h-full w-[70%]"></div>
              </div>
            </div>
            <Settings size={16} className="text-slate-400 cursor-pointer" />
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Q1. What does the acronym DBMS stand for?</p>
            <div className="pl-4 space-y-1 text-slate-600">
              <p>A. Database Management System</p>
              <p>B. Digital Base Management Service</p>
              <p>C. Digital Base Management</p>
            </div>
          </div>
        </Card>

        {/* Calendar Card */}
        <div className="lg:col-span-2">
          <Card title="ML Exam Preparation Plan - Calendar View">
            <div className="grid grid-cols-7 border border-slate-100 rounded-lg overflow-hidden text-center text-xs uppercase font-bold text-slate-400 bg-slate-50 py-2">
              <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
            </div>
            <div className="grid grid-cols-7 h-48 border-l border-t border-slate-100">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="border-r border-b border-slate-100 p-2 relative">
                  <span className="text-slate-300">{i + 1}</span>
                  {i === 2 && <div className="absolute inset-x-1 top-6 bg-blue-100 text-blue-700 p-1 rounded text-[10px] font-bold">Day 1: ML Basics</div>}
                  {i === 3 && <div className="absolute inset-x-1 top-6 bg-purple-100 text-purple-700 p-1 rounded text-[10px] font-bold">Day 2: Evaluation</div>}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TutorView() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI Tutor Session</h2>
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
        <div className="p-4 border-b flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-widest">
          <MessageSquare size={16} /> AI Tutor
        </div>

        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* Student Msg */}
          <div className="flex justify-end">
            <div className="bg-[#eef2ff] p-5 rounded-2xl rounded-tr-none shadow-sm max-w-md border border-indigo-100">
              <p className="text-right text-[10px] font-bold text-indigo-400 uppercase mb-1">Student</p>
              <p className="text-slate-800">Explain supervised learning.</p>
            </div>
          </div>

          {/* AI Msg */}
          <div className="flex justify-start">
            <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-md max-w-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 italic">AI Companion</p>
              <h3 className="text-xl font-bold mb-4">Supervised Learning Explained</h3>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p><strong>Overview:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Uses labeled training data to predict outcomes.</li>
                </ul>
                <p><strong>Key Types:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Classification:</strong> for predicting categories (e.g., spam vs. non-spam)</li>
                  <li><strong>Regression:</strong> for predicting continuous numerical values</li>
                </ul>
              </div>
              <div className="mt-6 inline-flex items-center gap-1 bg-slate-100 text-slate-500 px-3 py-1 rounded text-xs">
                Sources: ML_Unit1.pdf
              </div>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <div className="relative flex items-center gap-3">
            <input
              placeholder="Ask your tutor a new question..."
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition p-2">
              <Upload size={20} /> <span className="text-sm font-medium">Upload File</span>
            </button>
            <button className={`${colors.greenBtn} text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2`}>
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizView() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Unit 2: Practice Quiz</h2>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="flex justify-between mb-2 font-bold text-sm">
            <span>70% Complete</span>
            <span className="text-slate-400">7/10 questions answered</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[70%]"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Questions</p>
            <p className="text-xl font-black">10</p>
          </div>
          <button className={`${colors.greenBtn} text-white px-8 py-3 rounded-xl font-bold`}>Submit Quiz</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuizCard number="1" question="What does 'ACID' stand for in DBMS?" options={['Atomicity', 'Consistency', 'Isolation', 'Durability']} />
        <QuizCard number="5" question="What is normalisation in a database?" options={['System', 'Regression', 'Index', 'Data']} />
        <QuizCard number="2" question="Which SQL command is used to retrieve data?" options={['Access', 'Control', 'Index', 'Data']} />
        <QuizCard number="4" question="The hierarchical model represents data as a..." options={['More environation', 'System', 'Coordination', 'Others']} />
      </div>
    </div>
  );
}

function PlannerView() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Unit 2: Study Planner</h2>
        <div className="flex gap-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={18} /> New Plan</button>
          <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Download size={18} /> Export Plan</button>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
        <h3 className="text-xl font-bold mb-10">7-Day Exam Preparation Plan</h3>

        <div className="grid grid-cols-3 gap-12 relative">
          {/* Day Cards with Connecting Lines logic simplified */}
          <PlannerCard day="1" title="Machine Learning Basics" items={['Review notes', 'Complete intro video']} completed />
          <PlannerCard day="2" title="Model Evaluation" items={['Review notes', 'Complete intro video']} />
          <PlannerCard day="3" title="Regression Techniques" items={['Review notes', 'Regression Techniques']} />
          <PlannerCard day="4" title="Neural Networks" items={['Understand activation functions', 'Watch deep learning tutorial']} />
          <PlannerCard day="5" title="Optimization Methods" items={['Review memotics', 'Take NLP Introdutmatrals']} />
          <div className="space-y-6">
            <PlannerCard day="6" title="NLP Introduction" items={[]} />
            <PlannerCard day="7" title="Final Revision & Mock Viva" items={['Review all units', 'Mock Viva simulation']} special />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SHARED UI COMPONENTS ---

function NavItem({ icon, text, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${active ? colors.activeBlue : 'text-slate-500 hover:bg-slate-100'}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

function Card({ title, children, action }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function QuizCard({ number, question, options }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
      <p className="font-bold text-slate-800 mb-4">{number}. {question}</p>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
            {['A', 'B', 'C', 'D'][i]}. {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerCard({ day, title, items, completed = false, special = false }) {
  return (
    <div className={`p-5 rounded-2xl border-2 transition ${special ? 'border-amber-100 bg-amber-50/30' : completed ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-100 bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-black uppercase text-indigo-500">Day {day}</p>
          <h4 className="font-bold text-sm leading-tight">{title}</h4>
        </div>
        <div className={`p-2 rounded-lg ${special ? 'bg-amber-100 text-amber-700' : 'bg-slate-100'}`}>
          {special ? <CheckCircle2 size={16} /> : <BookOpen size={16} />}
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
            <div className={`w-4 h-4 rounded border ${completed ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'} flex items-center justify-center text-white`}>
              {completed && <CheckCircle2 size={10} />}
            </div>
            {item}
          </div>
        ))}
      </div>
      {completed && <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase">
        <CheckCircle2 size={12} /> Completed
      </div>}
    </div>
  );
}