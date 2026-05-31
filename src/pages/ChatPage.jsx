import { useState } from 'react'
import PromptInput from '../components/PromptInput'
import SignalLabel from '../components/SignalLabel'
import { getMirrorResponse } from '../lib/groq'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const presetPrompts = [
    "Should I transition from finance to PM?",
    "What does research say about remote work?",
    "Write a strategy recommendation for AI adoption"
  ]

  const handlePresetClick = (prompt) => {
    setInputValue(prompt)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = { role: 'user', content: inputValue }
    setMessages([...messages, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await getMirrorResponse(userMessage.content)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: response.response,
          signalLabel: response.signal_label,
          signalReason: response.signal_reason,
          dependencies: response.dependencies,
          weakPoints: response.weak_points,
          domain: response.domain
        }
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Mirror could not process this. Try again.',
          signalLabel: 'logical_guess'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-3 mb-8">
          {presetPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(prompt)}
              className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <h2 className="text-2xl font-semibold mb-2">Mirror</h2>
              <p>Ask something high-stakes.</p>
              <p>Mirror will show you what the answer depends on.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                {message.role === 'assistant' && message.signalLabel && (
                  <SignalLabel type={message.signalLabel} />
                )}
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <p className="text-xs text-gray-500 mt-2">Mirror is thinking...</p>
              </div>
            </div>
          )}
        </div>

        <PromptInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
