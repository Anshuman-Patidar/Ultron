import { SignIn } from '@clerk/react'
import { Link } from 'react-router-dom'

function Sign_in() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-jetblack px-4 py-12">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-hotpink/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-chartreuse/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[80px]" />
      </div>

      {/* Cyber grid */}
      <div className="pointer-events-none absolute inset-0 bg-gemini-mesh opacity-60" />

      {/* Card wrapper */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header branding above the Clerk card */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff2a85] via-purple-500 to-[#a6ff00] p-[1.5px] shadow-[0_0_20px_rgba(255,42,133,0.4)] group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#090a0f] rounded-[9px] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#a6ff00] animate-sparkle" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                </svg>
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Ultron <span className="text-[#ff2a85] font-mono text-sm">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white mb-1">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to continue your AI journey
          </p>
        </div>

        {/* Clerk SignIn component wrapped in glass card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#121520]/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(255,42,133,0.1)] p-1">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/"
            appearance={{
              variables: {
                colorPrimary: '#ff2a85',
                colorBackground: 'transparent',
                colorInputBackground: 'rgba(255,255,255,0.04)',
                colorInputText: '#f1f5f9',
                colorText: '#f1f5f9',
                colorTextSecondary: '#94a3b8',
                colorNeutral: '#94a3b8',
                borderRadius: '12px',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              },
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent shadow-none border-none p-4',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton:
                  'border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white transition-all rounded-xl',
                socialButtonsBlockButtonText: 'font-semibold',
                dividerLine: 'bg-white/[0.08]',
                dividerText: 'text-slate-500 text-xs',
                formFieldLabel: 'text-slate-300 text-sm font-medium mb-1',
                formFieldInput:
                  'bg-white/[0.04] border border-white/[0.08] text-slate-100 rounded-xl px-4 py-2.5 transition-all',
                formButtonPrimary:
                  'bg-[#ff2a85] hover:bg-[#ff60a5] text-white font-bold rounded-xl py-2.5 shadow-[0_0_20px_rgba(255,42,133,0.4)] hover:shadow-[0_0_30px_rgba(255,42,133,0.6)] transition-all',
                footerActionText: 'text-slate-400 text-sm',
                footerActionLink: 'text-[#ff2a85] hover:text-[#ff60a5] font-semibold transition-colors',
                identityPreviewText: 'text-slate-300',
                alertText: 'text-red-400',
                otpCodeFieldInput: 'border-white/10 bg-white/[0.04] text-white',
              },
            }}
          />
        </div>

        {/* Back to home */}
        <p className="mt-6 text-center text-slate-500 text-sm">
          <Link to="/" className="hover:text-[#a6ff00] transition-colors">
            ← Back to Ultron AI
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Sign_in
