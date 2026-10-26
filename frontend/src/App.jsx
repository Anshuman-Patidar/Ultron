import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Documentation from './pages/Documentation'
import Sign_in from './pages/Sign_in'
import Sign_up from './pages/Sign_up'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100 selection:bg-[#ff2a85] selection:text-white">
        <Header />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docu" element={<Documentation />} />
            <Route path="/documentation" element={<Documentation />} />
            {/* Clerk auth routes */}
            <Route path="/sign-in/*" element={<Sign_in />} />
            <Route path="/sign-up/*" element={<Sign_up />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
