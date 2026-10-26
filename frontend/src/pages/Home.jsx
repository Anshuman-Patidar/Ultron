import { useState, useRef, useEffect, useContext } from 'react'
import noteContext from '../context/noteContext'

function Home() {
  const {
    userName,
    saveUserName,
    messages,
    setMessages,
    recentChats,
    isLoading,
    isSidebarOpen,
    toggleSidebar,
    askAI,
  } = useContext(noteContext)

  const [isEditingName, setIsEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(userName)
  const [inputQuery, setInputQuery] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [likedMap, setLikedMap] = useState({})

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSaveName = (e) => {
    e.preventDefault()
    saveUserName(nameInput)
    setIsEditingName(false)
  }

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleLike = (idx, type) => {
    setLikedMap((prev) => ({
      ...prev,
      [idx]: prev[idx] === type ? null : type
    }))
  }

  const handleSend = async (queryText = inputQuery) => {
    const textToSend = queryText.trim()
    if (!textToSend || isLoading) return
    setInputQuery('')
    await askAI(textToSend)
    setTimeout(() => inputRef.current?.focus(), 80)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const geminiCards = [
    {
      title: 'Brainstorm creative concepts',
      subtitle: 'for a fullstack AI web app',
      icon: (
        <svg className="w-5 h-5 text-[#a6ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      prompt: 'Suggest 5 innovative AI features for a modern Django and React web application.'
    },
    {
      title: 'Write clean code',
      subtitle: 'with async Django REST views',
      icon: (
        <svg className="w-5 h-5 text-[#ff2a85]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      prompt: 'Provide an example of an asynchronous Django REST Framework API view with typing and error handling.'
    },
    {
      title: 'Analyze complex topics',
      subtitle: 'explain neural networks simply',
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      prompt: 'Explain how neural network attention mechanisms function in Gemini in simple, intuitive terms.'
    },
    {
      title: 'Summarize and condense',
      subtitle: 'best practices for web performance',
      icon: (
        <svg className="w-5 h-5 text-[#a6ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      prompt: 'Summarize the top 5 web performance optimizations for modern single-page applications.'
    },
  ]

  return (
    <div className="flex-1 flex bg-[#090a0f] text-slate-100 overflow-hidden relative">
      {/* ─── Gemini Collapsible Left Sidebar ─── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 sm:w-72 bg-[#0d0f17] border-r border-white/[0.06] flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:w-0 md:border-none md:overflow-hidden'
        }`}
      >
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* New Chat Button (Gemini Style) */}
          <button
            onClick={() => {
              setMessages([])
              if (window.innerWidth < 768) toggleSidebar()
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-[#171b28] hover:bg-[#202538] border border-white/[0.06] text-slate-200 hover:text-white font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#a6ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>New chat</span>
          </button>

          {/* Recent Section */}
          <div className="pt-2">
            <h4 className="text-xs font-semibold text-slate-400 px-3 mb-2 font-mono uppercase tracking-wider">
              Recent
            </h4>
            <div className="space-y-1">
              {recentChats.map((chat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleSend(chat)
                    if (window.innerWidth < 768) toggleSidebar()
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors truncate group cursor-pointer"
                  title={chat}
                >
                  <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#a6ff00] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="truncate">{chat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Bottom: User Profile Info */}
        <div className="p-4 border-t border-white/[0.06] bg-[#090a0f]/60">
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff2a85] to-[#a6ff00] p-[1.5px] shrink-0">
                <div className="w-full h-full bg-[#0d0f17] rounded-full flex items-center justify-center font-bold text-[#a6ff00] text-xs">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="truncate">
                <div className="font-semibold text-white truncate">{userName}</div>
                <div className="text-[10px] text-slate-500 font-mono">Gemini Pro User</div>
              </div>
            </div>

            <button
              onClick={() => {
                setNameInput(userName)
                setIsEditingName(true)
              }}
              className="text-slate-400 hover:text-[#ff2a85] p-1 cursor-pointer transition-colors"
              title="Edit User Name"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* ─── Main Chat Content Canvas ─── */}
      <main className="flex-1 flex flex-col min-h-[calc(100vh-65px)] bg-gemini-mesh overflow-hidden relative">
        {/* User Rename Modal or Banner if editing */}
        {isEditingName && (
          <div className="bg-[#10131c] border-b border-[#a6ff00]/30 px-4 py-2 z-20 animate-message-in">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">Set Session User Profile:</span>
              <form onSubmit={handleSaveName} className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-[#090a0f] text-[#a6ff00] px-3 py-1 rounded-lg border border-[#a6ff00]/50 outline-none text-xs font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#ff2a85] text-white font-bold rounded-lg hover:bg-[#ff60a5] cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="px-2.5 py-1 bg-white/[0.06] text-slate-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ─── Center Viewport: Either Welcome Hero or Conversation Stream ─── */}
        <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full flex flex-col">
          {messages.length === 0 ? (
            /* ── Gemini Signature Welcome Screen ── */
            <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full py-8 sm:py-14 animate-message-in">
              {/* Gemini Star Sparkle */}
              <div className="mb-4 flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2a85] to-[#a6ff00] p-[2px] shadow-[0_0_20px_rgba(255,42,133,0.3)]">
                  <div className="w-full h-full bg-[#090a0f] rounded-[14px] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#a6ff00] animate-sparkle" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Shimmering Greeting */}
              <div className="space-y-1 mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight gemini-gradient-text">
                  Hello, {userName}
                </h1>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-500 tracking-tight">
                  How can I help you today?
                </h2>
              </div>

              {/* Gemini 4 Suggestion Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {geminiCards.map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(card.prompt)}
                    className="gemini-card rounded-2xl p-4 text-left flex flex-col justify-between h-32 group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {card.title}
                      </div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors mt-0.5">
                        {card.subtitle}
                      </div>
                    </div>
                    <div className="self-end p-2 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.08] transition-all">
                      {card.icon}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Active Conversation Stream ── */
            <div className="space-y-8 flex-1 py-4">
              {messages.map((msg, index) => {
                const isUser = msg.sender === 'user'
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 sm:gap-4 animate-message-in ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Gemini Sparkle Avatar (only for bot) */}
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff2a85] to-[#a6ff00] p-[1.5px] shadow-[0_0_15px_rgba(255,42,133,0.3)] shrink-0 mt-1">
                        <div className="w-full h-full bg-[#090a0f] rounded-[10px] flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#a6ff00]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Message Bubble Content */}
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed ${
                        isUser
                          ? 'bg-[#181d2a] text-white border border-[#a6ff00]/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] rounded-tr-sm'
                          : 'bg-[#10131e]/90 text-slate-100 border border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.6)] rounded-tl-sm'
                      }`}
                    >
                      {/* Structured or Plain Text Content */}
                      {(() => {
                        if (isUser) {
                          return (
                            <div className="whitespace-pre-wrap break-words font-sans">
                              {msg.text}
                            </div>
                          )
                        }

                        let parsed = null
                        try {
                          if (typeof msg.text === 'string' && msg.text.trim().startsWith('{')) {
                            parsed = JSON.parse(msg.text)
                          } else if (typeof msg.text === 'object' && msg.text !== null) {
                            parsed = msg.text
                          }
                        } catch {
                          parsed = null
                        }

                        if (parsed && (parsed.content || parsed.title || parsed.steps)) {
                          return (
                            <div className="space-y-4 font-sans">
                              {parsed.Greeting && (
                                <div className="text-sm font-medium text-[#a6ff00] flex items-center gap-2">
                                  <span>👋</span>
                                  <span>{parsed.Greeting}</span>
                                </div>
                              )}
                              {parsed.title && (
                                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight border-b border-white/[0.08] pb-2">
                                  {parsed.title}
                                </h3>
                              )}
                              {parsed.content && (
                                <div className="whitespace-pre-wrap text-slate-200 text-sm sm:text-base leading-relaxed">
                                  {parsed.content}
                                </div>
                              )}
                              {Array.isArray(parsed.steps) && parsed.steps.length > 0 && (
                                <div className="space-y-2.5 pt-2">
                                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#ff2a85] font-semibold flex items-center gap-1.5">
                                    <span>✦</span> Learning Roadmap ({parsed.steps.length} Steps)
                                  </h4>
                                  <div className="space-y-2">
                                    {parsed.steps.map((st, sIdx) => (
                                      <div
                                        key={sIdx}
                                        className="p-3.5 rounded-xl bg-[#0d0f17] border border-white/[0.06] hover:border-[#a6ff00]/30 transition-all flex items-start gap-3"
                                      >
                                        <div className="w-6 h-6 rounded-lg bg-[#a6ff00]/15 text-[#a6ff00] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#a6ff00]/30">
                                          {sIdx + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                                            <span className="font-semibold text-sm text-white">{st.Step_title}</span>
                                            {st.duration && (
                                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#ff2a85]/15 text-[#ff2a85] border border-[#ff2a85]/25">
                                                ⏱ {st.duration}
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-xs text-slate-300 leading-relaxed">{st.Step_desc}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {parsed.last_message && (
                                <div className="p-3 rounded-xl bg-[#171b28]/70 border border-[#a6ff00]/20 text-xs text-slate-300 flex items-center gap-2">
                                  <span className="text-[#a6ff00] text-sm">💡</span>
                                  <span>{parsed.last_message}</span>
                                </div>
                              )}
                            </div>
                          )
                        }

                        return (
                          <div className="whitespace-pre-wrap break-words font-sans">
                            {msg.text}
                          </div>
                        )
                      })()}


                      {/* Gemini Bottom Action Bar (Copy, Thumbs up, Thumbs down) */}
                      {!isUser && (
                        <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/[0.06] text-slate-400 text-xs">
                          {/* Copy Action */}
                          <button
                            onClick={() => handleCopy(msg.text, index)}
                            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                            title="Copy response"
                          >
                            {copiedIndex === index ? (
                              <span className="text-[#a6ff00] font-mono font-bold">✓ Copied</span>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>

                          {/* Thumbs Up (Good response) */}
                          <button
                            onClick={() => handleLike(index, 'up')}
                            className={`p-1 rounded hover:bg-white/[0.06] transition-colors cursor-pointer ${
                              likedMap[index] === 'up' ? 'text-[#a6ff00]' : 'hover:text-white'
                            }`}
                            title="Good response"
                          >
                            <svg className="w-4 h-4" fill={likedMap[index] === 'up' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                          </button>

                          {/* Thumbs Down (Bad response) */}
                          <button
                            onClick={() => handleLike(index, 'down')}
                            className={`p-1 rounded hover:bg-white/[0.06] transition-colors cursor-pointer ${
                              likedMap[index] === 'down' ? 'text-[#ff2a85]' : 'hover:text-white'
                            }`}
                            title="Bad response"
                          >
                            <svg className="w-4 h-4" fill={likedMap[index] === 'down' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.765 1.13A2 2 0 0119 6.095V14m-9 0v6a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m7-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Gemini Thinking Animation */}
              {isLoading && (
                <div className="flex items-start gap-3 sm:gap-4 animate-message-in">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff2a85] to-[#a6ff00] p-[1.5px] shadow-[0_0_20px_rgba(255,42,133,0.4)] shrink-0 mt-1">
                    <div className="w-full h-full bg-[#090a0f] rounded-[10px] flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#a6ff00] animate-spin" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-[#10131e] border border-white/[0.06] rounded-2xl rounded-tl-sm p-4 flex items-center gap-3">
                    <span className="text-xs text-[#a6ff00] font-mono tracking-wide">Gemini is thinking</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff2a85] animate-bounce shadow-[0_0_8px_#ff2a85]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#a6ff00] animate-bounce [animation-delay:0.2s] shadow-[0_0_8px_#a6ff00]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#ff2a85] animate-bounce [animation-delay:0.4s] shadow-[0_0_8px_#ff2a85]"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ─── Gemini Iconic Floating Rounded Bottom Input Bar ─── */}
        <section className="sticky bottom-0 z-30 p-3 sm:p-5 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/95 to-transparent">
          <div className="max-w-3xl mx-auto">
            {/* The Floating Pill */}
            <div className="relative flex items-center rounded-3xl bg-[#131622] border border-white/[0.08] focus-within:border-[#ff2a85]/70 gemini-pill-shadow focus-within:gemini-pill-shadow-focus transition-all duration-300 p-2 sm:p-2.5">
              {/* Attachment / Add Icon (+) */}
              <button
                type="button"
                className="p-2 sm:p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="Add attachment"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>

              {/* Main Input Text Box */}
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Hello "${userName}"..., Type Your Query`}
                className="flex-1 bg-transparent text-white placeholder-slate-400 py-2 sm:py-3 px-3 outline-none text-sm sm:text-base font-sans"
                disabled={isLoading}
              />

              {/* Right Mic & Send Icons */}
              <div className="flex items-center gap-1">
                {/* Voice / Mic Icon */}
                <button
                  type="button"
                  className="p-2 sm:p-2.5 rounded-full text-slate-400 hover:text-[#a6ff00] hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title="Voice input (mock)"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>

                {/* Send Button */}
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !inputQuery.trim()}
                  className={`p-2 sm:p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isLoading || !inputQuery.trim()
                      ? 'bg-white/[0.04] text-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#ff2a85] to-[#a6ff00] text-black shadow-[0_0_20px_rgba(255,42,133,0.5)] hover:shadow-[0_0_25px_rgba(166,255,0,0.7)] hover:scale-105 active:scale-95 cursor-pointer font-bold'
                  }`}
                  title="Send message"
                >
                  <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Gemini Disclaimer Note */}
            <p className="text-[11px] text-center text-slate-500 mt-2 font-sans">
              Gemini may display inaccurate info, so double-check its responses. Powered by Django AI.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
