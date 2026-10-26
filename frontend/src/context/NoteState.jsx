import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import noteContext from './noteContext'

const API_BASE = 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

const DEFAULT_RECENT = [
  'How does Gemini neural attention work?',
  'Django REST framework best practices',
  'Python async event loop tutorial',
]

function loadRecentChats() {
  try {
    return JSON.parse(localStorage.getItem('gemini_recent_queries')) || DEFAULT_RECENT
  } catch {
    return DEFAULT_RECENT
  }
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function NoteState(props) {
  const [userName, setUserName] = useState(
    () => localStorage.getItem('chat_user_name') || 'Explorer'
  )
  const [messages, setMessages] = useState([])
  const [recentChats, setRecentChats] = useState(loadRecentChats)
  const [isLoading, setIsLoading] = useState(false)
  const [apiOnline, setApiOnline] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const checkApiHealth = useCallback(async () => {
    try {
      await api.get('/api/hi/', { timeout: 2500 })
      setApiOnline(true)
      return true
    } catch {
      setApiOnline(false)
      return false
    }
  }, [])

  useEffect(() => {
    checkApiHealth()
    const interval = setInterval(checkApiHealth, 15000)
    return () => clearInterval(interval)
  }, [checkApiHealth])

  const saveUserName = (name) => {
    const clean = name.trim() || 'Explorer'
    setUserName(clean)
    localStorage.setItem('chat_user_name', clean)
    return clean
  }

  const startNewChat = () => {
    setMessages([])
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const rememberQuery = (textToSend) => {
    setRecentChats((prev) => {
      const updated = [textToSend, ...prev.filter((q) => q !== textToSend)].slice(0, 8)
      try {
        localStorage.setItem('gemini_recent_queries', JSON.stringify(updated))
      } catch (err) {
        console.error('LocalStorage write error:', err)
      }
      return updated
    })
  }

  const askAI = async (question) => {
    const textToSend = question.trim()
    if (!textToSend || isLoading) return

    rememberQuery(textToSend)

    setMessages((prev) => [
      ...prev,
      {
        id: 'user-' + Date.now(),
        sender: 'user',
        text: textToSend,
        time: formatTime(),
      },
    ])
    setIsLoading(true)

    try {
      const response = await api.post(
        '/api/ask/',
        { name: userName, question: textToSend },
        { timeout: 15000 }
      )
      const botReply =
        response.data.ai_response ||
        response.data.message ||
        'No reply payload received from AI service.'

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: botReply,
          time: formatTime(),
        },
      ])
    } catch (error) {
      console.warn('Backend call notice:', error)
      let fallbackText = ''

      if (error.response?.data?.error) {
        fallbackText = `⚠️ Django Error: ${error.response.data.error}`
      } else if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        fallbackText = `💡 [Gemini Local Simulation]: Django backend is currently offline at ${API_BASE}.\n\nTo connect live Google Gemini responses, run in your backend terminal:\n\`python manage.py runserver\`\n\nAI Preview Response for "${textToSend}":\nYour inquiry was received by the Gemini client engine! All neural animations, Jet Black aesthetics, Hot Pink highlights, and Chartreuse signals are fully calibrated.`
      } else {
        fallbackText = `Connection issue: ${error.message || 'Unknown network error'}`
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: fallbackText,
          time: formatTime(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <noteContext.Provider
      value={{
        api,
        apiBase: API_BASE,
        userName,
        saveUserName,
        messages,
        setMessages,
        recentChats,
        isLoading,
        apiOnline,
        isSidebarOpen,
        toggleSidebar,
        startNewChat,
        askAI,
        checkApiHealth,
      }}
    >
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
