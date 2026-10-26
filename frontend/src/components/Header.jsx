import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser, UserButton } from '@clerk/react'
import noteContext from '../context/noteContext'

function Header() {
  const location = useLocation()
  const { apiOnline, isSidebarOpen, toggleSidebar, startNewChat } = useContext(noteContext)
  const { isSignedIn } = useUser()

  const navLinks = [
    { to: '/', label: 'Chat', activeColor: 'text-[#a6ff00] border-[#a6ff00]/30 shadow-[0_0_12px_rgba(166,255,0,0.15)]' },
    { to: '/docu', label: 'Docs', activeColor: 'text-[#ff2a85] border-[#ff2a85]/30 shadow-[0_0_12px_rgba(255,42,133,0.15)]' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#090a0f]/85 backdrop-blur-xl border-b border-white/[0.06] px-3 sm:px-6 py-2.5 transition-all duration-300">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">

        {/* Left: Sidebar toggle + Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            title={isSidebarOpen ? 'Collapse sidebar' : 'Open sidebar'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group no-underline">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff2a85] via-purple-500 to-[#a6ff00] p-[1.5px] shadow-[0_0_15px_rgba(255,42,133,0.35)] group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#090a0f] rounded-[9px] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#a6ff00] animate-sparkle" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-sans">
                Ultron
              </span>
              <span className="hidden xs:inline-block text-[11px] font-mono text-[#ff2a85] bg-[#ff2a85]/10 px-2 py-0.5 rounded-full border border-[#ff2a85]/25">
                AI
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-1 bg-[#10131c] p-1 rounded-xl border border-white/[0.05]">
          {navLinks.map(({ to, label, activeColor }) => (
            <Link
              key={to}
              to={to}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                location.pathname === to
                  ? `bg-[#181d2c] border ${activeColor}`
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: API indicator + Auth */}
        <div className="flex items-center gap-2.5">
          {/* Live Django Health Monitor */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all ${
              apiOnline
                ? 'bg-[#a6ff00]/10 border-[#a6ff00]/30 text-[#a6ff00]'
                : 'bg-white/[0.03] border-white/[0.08] text-slate-400'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${apiOnline ? 'bg-[#a6ff00]' : 'bg-[#ff2a85]'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${apiOnline ? 'bg-[#a6ff00]' : 'bg-[#ff2a85]'}`} />
            </span>
            <span>{apiOnline ? 'Backend 8000' : 'Offline Mode'}</span>
          </div>

          {/* New Chat pill button */}
          <button
            onClick={startNewChat}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-black bg-[#a6ff00] hover:bg-[#c5ff4d] shadow-[0_0_15px_rgba(166,255,0,0.3)] hover:shadow-[0_0_25px_rgba(166,255,0,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Start new chat"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New chat</span>
          </button>

          {/* ── Clerk Auth ── */}
          {/* Show Sign In + Sign Up when logged out */}
          {!isSignedIn && (
            <div className="flex items-center gap-1.5">
              <Link
                to="/sign-in"
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  location.pathname.startsWith('/sign-in')
                    ? 'bg-[#181d2c] text-[#ff2a85] border-[#ff2a85]/40 shadow-[0_0_12px_rgba(255,42,133,0.2)]'
                    : 'text-slate-300 border-white/10 hover:text-white hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-black bg-[#ff2a85] hover:bg-[#ff60a5] shadow-[0_0_15px_rgba(255,42,133,0.35)] hover:shadow-[0_0_25px_rgba(255,42,133,0.55)] transition-all hover:scale-105 active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Show Clerk's UserButton avatar when logged in */}
          {isSignedIn && (
            <UserButton
              appearance={{
                variables: {
                  colorPrimary: '#ff2a85',
                  borderRadius: '12px',
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                },
                elements: {
                  avatarBox: 'w-8 h-8 ring-2 ring-[#ff2a85]/40 hover:ring-[#ff2a85]/70 transition-all rounded-xl',
                  userButtonPopoverCard: 'bg-[#0d0f17] border border-white/10 shadow-2xl rounded-2xl',
                  userButtonPopoverActionButton: 'hover:bg-white/[0.06] text-slate-300 hover:text-white rounded-xl',
                  userButtonPopoverActionButtonText: 'text-sm font-medium',
                  userButtonPopoverFooter: 'hidden',
                },
              }}
            />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
