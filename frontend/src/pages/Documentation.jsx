import { useState, useContext } from 'react'
import Footer from '../components/Footer'
import noteContext from '../context/noteContext'

function Documentation() {
  const { apiBase } = useContext(noteContext)
  const [activeTab, setActiveTab] = useState('how-to-use')
  const [copiedCode, setCopiedCode] = useState(null)

  const handleCopy = (code, key) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(key)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const curlExample = `curl -X POST ${apiBase}/api/ask/ \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Anshuman", "question": "Explain quantum entanglement in 2 sentences."}'`

  const reactAxiosExample = `import { useContext } from 'react';
import noteContext from '../context/noteContext';

const { askAI } = useContext(noteContext);
await askAI('Explain quantum entanglement in 2 sentences.');`

  const tabs = [
    { id: 'how-to-use', label: '📖 How to Use', icon: '✦' },
    { id: 'creator', label: '👨‍💻 Creator & Team', icon: '👤' },
    { id: 'model', label: '🧠 AI Model (Ultron)', icon: '⚡' },
    { id: 'api', label: '🔌 API Reference', icon: '⚙️' },
    { id: 'faq', label: '💬 FAQs & Misc', icon: '💡' },
  ]

  return (
    <>
      <main className="relative flex-1 bg-[#090a0f] bg-gemini-mesh text-slate-100 py-10 px-4 sm:px-8 min-h-[calc(100vh-65px)] overflow-hidden">
        {/* Ambient atmospheric background glows */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#ff2a85]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-[#a6ff00]/8 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-9 animate-message-in">
          {/* Hero Header */}
          <div className="border-b border-white/[0.08] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2a85]/15 text-[#ff2a85] border border-[#ff2a85]/30 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(255,42,133,0.2)]">
              <span>✦ OFFICIAL DEVELOPER & USER MANUAL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3 font-sans">
              Documentation & <span className="gemini-gradient-text">Knowledge Base</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
              Everything you need to know about navigating the Django AI chat terminal, its underlying Google Gemini 3.8 model, creator credits, and REST architecture.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-white/[0.08] gap-1 sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3.5 px-4 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#a6ff00] text-[#a6ff00] shadow-[0_10px_20px_-10px_rgba(166,255,0,0.5)]'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ═════════ TAB 1: HOW TO USE THIS WEBSITE ═════════ */}
          {activeTab === 'how-to-use' && (
            <div className="space-y-6 animate-message-in">
              <div className="gemini-card rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#a6ff00]">✦</span> Getting Started in 4 Easy Steps
                  </h3>
                  <p className="text-sm text-slate-400">
                    The platform is designed to be as responsive, conversational, and intuitive as Google Gemini.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Step 1 */}
                  <div className="p-5 rounded-2xl bg-[#0d0f17] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-[#a6ff00]/15 text-[#a6ff00] font-mono font-bold flex items-center justify-center text-xs border border-[#a6ff00]/30">
                        01
                      </span>
                      <span className="text-xs font-mono text-slate-500">Identity</span>
                    </div>
                    <h4 className="text-base font-bold text-white">Set Your Session Name</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Click the pencil icon next to your name in the sidebar or prompt bar to personalize your identity. The AI uses your name to personalize context!
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-5 rounded-2xl bg-[#0d0f17] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-[#ff2a85]/15 text-[#ff2a85] font-mono font-bold flex items-center justify-center text-xs border border-[#ff2a85]/30">
                        02
                      </span>
                      <span className="text-xs font-mono text-slate-500">Prompting</span>
                    </div>
                    <h4 className="text-base font-bold text-white">Pick a Card or Ask Anything</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Choose one of the 4 quick starter suggestion cards on the welcome screen, or type your own question into the floating bottom pill.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-5 rounded-2xl bg-[#0d0f17] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 font-mono font-bold flex items-center justify-center text-xs border border-purple-500/30">
                        03
                      </span>
                      <span className="text-xs font-mono text-slate-500">Inference</span>
                    </div>
                    <h4 className="text-base font-bold text-white">Receive Ultron AI Answers</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Hit <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">Enter</kbd> or click the glowing Send button. The system streams structured, scientifically rigorous answers in real time.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-5 rounded-2xl bg-[#0d0f17] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-[#a6ff00]/15 text-[#a6ff00] font-mono font-bold flex items-center justify-center text-xs border border-[#a6ff00]/30">
                        04
                      </span>
                      <span className="text-xs font-mono text-slate-500">Actions</span>
                    </div>
                    <h4 className="text-base font-bold text-white">Copy, Rate & Reset</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Use the action bar below each AI reply to copy the response to your clipboard, rate the answer (thumbs up/down), or start a brand new conversation with <strong>New Chat</strong>.
                    </p>
                  </div>
                </div>

                {/* Keyboard Shortcuts Cheat Sheet */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <h4 className="text-sm font-bold text-slate-200 mb-3 font-mono flex items-center gap-2">
                    <span className="text-[#a6ff00]">⚡</span> Keyboard Shortcuts
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c0e14] border border-white/[0.05]">
                      <span className="text-slate-400">Send Query</span>
                      <kbd className="px-2 py-0.5 rounded bg-white/10 text-[#a6ff00] font-bold">Enter</kbd>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c0e14] border border-white/[0.05]">
                      <span className="text-slate-400">New Line</span>
                      <kbd className="px-2 py-0.5 rounded bg-white/10 text-slate-300">Shift+Enter</kbd>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c0e14] border border-white/[0.05]">
                      <span className="text-slate-400">Toggle Sidebar</span>
                      <kbd className="px-2 py-0.5 rounded bg-white/10 text-[#ff2a85]">Menu Icon</kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═════════ TAB 2: CREATOR & CREDITS ═════════ */}
          {activeTab === 'creator' && (
            <div className="space-y-6 animate-message-in">
              <div className="gemini-card rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff2a85] via-purple-600 to-[#a6ff00] p-[2px] shadow-[0_0_25px_rgba(255,42,133,0.35)] shrink-0">
                      <div className="w-full h-full bg-[#090a0f] rounded-[14px] flex items-center justify-center font-black text-2xl text-[#a6ff00]">
                        AP
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold text-white">Anshuman Patidar</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#a6ff00]/15 text-[#a6ff00] border border-[#a6ff00]/30 text-[10px] font-mono font-bold">
                          Lead Architect
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Full-Stack AI Developer • Django & React Specialist
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#131622] border border-white/[0.08] text-xs font-mono text-slate-300">
                      Project: <span className="text-[#ff2a85] font-bold">Django_AI_project</span>
                    </span>
                  </div>
                </div>

                {/* About the Creation */}
                <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-[#ff2a85]">💡</span> Project Genesis & Motivation
                  </h4>
                  <p>
                    This project was conceived and engineered by <strong>Anshuman Patidar</strong> to prove how effortlessly a modern high-performance Python web backend (Django REST Framework) can interface with next-generation generative AI models (Google Gemini 3.8 Flash) and deliver an ultra-responsive, cyber-sleek frontend experience built on React 19 and Tailwind CSS v4.
                  </p>
                  <p>
                    Rather than settling for standard generic dashboard templates, the interface was purposefully stylized with the iconic <strong>Jet Black</strong>, <strong>Hot Pink</strong>, and <strong>Chartreuse</strong> visual triad—bringing the prestige and polish of Google Gemini directly to developers.
                  </p>
                </div>

                {/* Technology Badges */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wider">
                    Core Technologies Mastered
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-lg bg-[#0e111a] border border-white/[0.08] text-white">
                      🐍 Django 5.x / DRF
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0e111a] border border-white/[0.08] text-white">
                      ⚛️ React 19
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0e111a] border border-white/[0.08] text-[#a6ff00]">
                      ⚡ Tailwind CSS v4
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0e111a] border border-white/[0.08] text-[#ff2a85]">
                      🧠 Google GenAI SDK (Interactions API)
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0e111a] border border-white/[0.08] text-purple-400">
                      🚀 Vite 8.x
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═════════ TAB 3: AI MODEL & ULTRON PERSONA ═════════ */}
          {activeTab === 'model' && (
            <div className="space-y-6 animate-message-in">
              <div className="gemini-card rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#a6ff00] tracking-wider font-bold">
                      Engine Specifications
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      Google Gemini 3.8 Flash (Ultron Core)
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#ff2a85]/20 to-[#a6ff00]/20 border border-[#a6ff00]/40 text-[#a6ff00] text-xs font-mono font-bold">
                    Active Backend Model
                  </span>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0c0e14] border border-white/[0.06]">
                    <div className="text-xs text-slate-400 font-mono">Model ID</div>
                    <div className="text-base font-bold text-[#ff2a85] font-mono mt-1">gemini-3.8-flash</div>
                    <div className="text-[11px] text-slate-500 mt-1">Google Generative AI SDK</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0c0e14] border border-white/[0.06]">
                    <div className="text-xs text-slate-400 font-mono">Inference API</div>
                    <div className="text-base font-bold text-[#a6ff00] font-mono mt-1">Interactions API</div>
                    <div className="text-[11px] text-slate-500 mt-1">client.interactions.create()</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0c0e14] border border-white/[0.06]">
                    <div className="text-xs text-slate-400 font-mono">Persona Directive</div>
                    <div className="text-base font-bold text-purple-400 font-mono mt-1">Ultron Protocol</div>
                    <div className="text-[11px] text-slate-500 mt-1">Empirical & Scientific Rigour</div>
                  </div>
                </div>

                {/* Persona Breakdown */}
                <div className="space-y-3 bg-[#0c0e14] p-5 rounded-2xl border border-white/[0.06]">
                  <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <span className="text-[#ff2a85]">🛡️</span> Ultron System Prompt Directives:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                    <li>
                      <strong>Scientific Rigour:</strong> Every output is rooted in established empirical data and scientific principles with analytical precision.
                    </li>
                    <li>
                      <strong>Unproven Theories Protocol:</strong> If a prompt addresses an unverified hypothesis, Ultron explicitly disclaims: <em>"This is not scientifically proven. The following explanation is based on our current understanding, data, and available information."</em>
                    </li>
                    <li>
                      <strong>Clarity & High Scannability:</strong> Eliminates fluff and filler phrases to deliver structured, high-density, actionable intelligence.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ═════════ TAB 4: API REFERENCE ═════════ */}
          {activeTab === 'api' && (
            <div className="space-y-6 animate-message-in">
              {/* Endpoint 1 */}
              <div className="gemini-card rounded-3xl p-6 sm:p-7 border border-white/[0.08] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#ff2a85] text-black font-extrabold rounded-lg text-xs font-mono shadow-[0_0_10px_rgba(255,42,133,0.4)]">
                      POST
                    </span>
                    <span className="text-lg font-mono font-bold text-white">/api/ask/</span>
                  </div>
                  <span className="text-xs text-[#a6ff00] font-mono bg-[#a6ff00]/10 px-3 py-1 rounded-full border border-[#a6ff00]/30 shadow-[0_0_10px_rgba(166,255,0,0.15)]">
                    Core AI Inference
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Sends user query and name to the Django backend. The backend passes the request through Ultron directives to Google Gemini 3.8 and returns the generated answer.
                </p>

                {/* Payload schema */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0c0e14] p-4 rounded-xl border border-white/[0.06]">
                    <h4 className="text-xs font-mono uppercase text-[#ff2a85] font-bold mb-2">Request Body (JSON)</h4>
                    <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`{
  "name": "string (Required)",
  "question": "string (Required)"
}`}
                    </pre>
                  </div>
                  <div className="bg-[#0c0e14] p-4 rounded-xl border border-white/[0.06]">
                    <h4 className="text-xs font-mono uppercase text-[#a6ff00] font-bold mb-2">Response Body (200 OK)</h4>
                    <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`{
  "message": "Got it, [name]! Here is your answer.",
  "name": "...",
  "question": "...",
  "ai_response": "..."
}`}
                    </pre>
                  </div>
                </div>

                {/* cURL Code Snippet */}
                <div className="relative bg-[#07080b] p-4 rounded-xl border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-mono">cURL Command</span>
                    <button
                      onClick={() => handleCopy(curlExample, 'curl')}
                      className="text-xs font-mono text-slate-400 hover:text-[#a6ff00] transition-colors cursor-pointer"
                    >
                      {copiedCode === 'curl' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-[#a6ff00] overflow-x-auto whitespace-pre">
                    {curlExample}
                  </pre>
                </div>
              </div>

              {/* Endpoint 2 */}
              <div className="gemini-card rounded-3xl p-6 sm:p-7 border border-white/[0.08]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#a6ff00] text-black font-extrabold rounded-lg text-xs font-mono shadow-[0_0_10px_rgba(166,255,0,0.4)]">
                      GET
                    </span>
                    <span className="text-lg font-mono font-bold text-white">/api/hi/</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Health Check</span>
                </div>
                <p className="text-sm text-slate-300 font-sans">
                  Returns HTTP 200 with <code className="text-[#a6ff00] font-mono">{"{\"message\": \"Hi! API is live \"}"}</code> to verify server readiness.
                </p>
              </div>
            </div>
          )}

          {/* ═════════ TAB 5: FAQS & BLA BLA BLA ═════════ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-message-in">
              {[
                {
                  q: 'Why the Jet Black, Hot Pink, and Chartreuse aesthetic?',
                  a: 'The triad creates maximum contrast on OLED and modern displays. Jet Black saves power and prevents eye strain, Hot Pink anchors the AI personality with electric warmth, and Chartreuse delivers an unmistakable cyber lime signal for user interactions.'
                },
                {
                  q: 'What happens if the Django backend server is stopped?',
                  a: 'The frontend features an intelligent client-side fallback mode. If port 8000 is unreachable, the UI gracefully simulates responses so developers can test UI layouts, styling, and navigation without crashing.'
                },
                {
                  q: 'How do I add my own Gemini API Key?',
                  a: 'Navigate to your backend directory, locate the .env file, and configure: GEMINI_API_KEY=your_key_here. You can generate a free key from Google AI Studio.'
                },
                {
                  q: 'Is my chat history saved permanently?',
                  a: 'Recent prompt suggestions are stored locally in your browser (LocalStorage). Backend conversations can be linked to a Django SQLite/PostgreSQL database via Django models when desired.'
                },
                {
                  q: 'Can I deploy this to production?',
                  a: 'Yes! The frontend can be built via `npm run build` into a static bundle, and Django can be deployed using Gunicorn or Daphne on any VPS (AWS, GCP, DigitalOcean, or Railway).'
                }
              ].map((item, idx) => (
                <div key={idx} className="gemini-card rounded-2xl p-5 border border-white/[0.06] space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-[#a6ff00]">✦</span> {item.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans pl-5">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer is only rendered here on the documentation page */}
      <Footer />
    </>
  )
}

export default Documentation
