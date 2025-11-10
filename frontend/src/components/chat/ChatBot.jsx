import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'
import useComplianceStore from '../../store/complianceStore'

export default function ChatBot({ onClose }) {
  const { sendChatMessage } = useComplianceStore()
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your Compliance Assistant powered by Llama 3-8B. I can help explain verdicts, suggest missing evidence, and answer questions about compliance requirements. How can I help you today?",
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
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed bottom-24 right-6 w-96 h-[600px] glass-effect rounded-2xl shadow-2xl flex flex-col z-50 border border-dark-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 eco-gradient rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-dark-text">Compliance Assistant</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-eco-400 rounded-full animate-pulse" />
              <span className="text-xs text-dark-muted">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 hover:bg-dark-elevated rounded-lg flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-dark-muted" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant' ? 'bg-eco-600/20' : 'bg-dark-elevated'
              }`}>
                {message.role === 'assistant' ? (
                  <Sparkles className="w-4 h-4 text-eco-400" />
                ) : (
                  <User className="w-4 h-4 text-dark-muted" />
                )}
              </div>
              
              <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`inline-block max-w-[85%] p-3 rounded-2xl ${
                  message.role === 'assistant'
                    ? 'bg-dark-elevated text-dark-text'
                    : 'eco-gradient text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 bg-eco-600/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-eco-400" />
            </div>
            <div className="bg-dark-elevated p-3 rounded-2xl">
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

      {/* Input */}
      <div className="p-4 border-t border-dark-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about compliance..."
            className="flex-1 px-4 py-2 bg-dark-elevated rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-eco-600"
          />
          <Button
            variant="primary"
            icon={Send}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          />
        </div>
        <p className="text-xs text-dark-muted mt-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Powered by Llama 3.1 8B
        </p>
      </div>
    </motion.div>
  )
}
