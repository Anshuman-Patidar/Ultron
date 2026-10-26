
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'
import NoteState from './context/NoteState.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Clerk Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY=pk_test_... to your .env file.'
  )
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <NoteState>
      <App />
    </NoteState>
  </ClerkProvider>,
)
