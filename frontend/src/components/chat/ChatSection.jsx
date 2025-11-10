import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import useComplianceStore from '../../store/complianceStore'

export default function ChatSection() {
  const { sendChatMessage } = useComplianceStore()
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your Compliance Assistant powered by Llama 3-8B. Ask me questions like 'Why did encryption fail?' or 'How can I improve my compliance score?'",
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = input
    setInput('')
    setIsTyping(true)

    try {
      // Call backend API
      const response = await sendChatMessage(userInput)
      
      const aiMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting to the backend. Please ensure the API is running and try again.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
      className="glass-effect rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-dark-border bg-dark-elevated">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 eco-gradient rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-dark-text">Ask the Compliance Assistant</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-eco-400 rounded-full animate-pulse" />
              <span className="text-sm text-dark-muted">Powered by Llama 3-8B • Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-dark-surface/30">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'assistant' ? 'bg-eco-600/20' : 'bg-dark-elevated'
            }`}>
              {message.role === 'assistant' ? (
                <Sparkles className="w-5 h-5 text-eco-400" />
              ) : (
                <User className="w-5 h-5 text-dark-muted" />
              )}
            </div>
            
            <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
              <div className={`inline-block max-w-[85%] p-4 rounded-2xl ${
                message.role === 'assistant'
                  ? 'bg-dark-elevated text-dark-text'
                  : 'eco-gradient text-white'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-10 h-10 bg-eco-600/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-eco-400" />
            </div>
            <div className="bg-dark-elevated p-4 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-eco-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-eco-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-eco-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-dark-border bg-dark-elevated">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about compliance... (e.g., 'Why did encryption fail?')"
            className="flex-1 px-4 py-3 bg-dark-surface rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-eco-600 border border-dark-border"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 eco-gradient text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-dark-muted">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>AI-powered explanations for compliance verdicts</span>
          </div>
          <span>Press Enter to send</span>
        </div>
      </div>
    </motion.div>
  )
}
