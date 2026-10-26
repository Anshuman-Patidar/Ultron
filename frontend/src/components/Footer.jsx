import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#06070a] border-t border-white/[0.06] py-6 px-4 sm:px-8 text-xs text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-white tracking-wider">
            DJANGO<span className="text-[#ff2a85]">.AI</span>
          </span>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400 text-[11px]">
            Neural Chat Terminal • React 19 + Tailwind CSS v4
          </span>
        </div>

        {/* Center Theme Swatches */}
        <div className="flex items-center gap-2.5 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0c0e14] border border-white/[0.08] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#08090d] border border-slate-600"></span>
            Jet Black
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0c0e14] border border-[#ff2a85]/30 text-[#ff2a85]">
            <span className="w-2 h-2 rounded-full bg-[#ff2a85] shadow-[0_0_6px_#ff2a85]"></span>
            Hot Pink
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0c0e14] border border-[#a6ff00]/30 text-[#a6ff00]">
            <span className="w-2 h-2 rounded-full bg-[#a6ff00] shadow-[0_0_6px_#a6ff00]"></span>
            Chartreuse
          </span>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-4 text-xs">
          <Link to="/" className="hover:text-[#a6ff00] transition-colors">
            Chat
          </Link>
          <Link to="/docu" className="hover:text-[#ff2a85] transition-colors">
            Docs
          </Link>
          <span className="text-slate-600">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer