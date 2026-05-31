import { useState } from 'react'
import PromptInput from '../components/PromptInput'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')

  const presetPrompts = [
    "Should I transition from finance to PM?",
    "What does research say about remote work?",
    "Write a strategy recommendation for AI adoption"
  ]

  const handlePresetClick = (prompt) => {
    setInputValue(prompt)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setMessages([...messages, { role: 'user', content: inputValue }])
    setInputValue('')
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
                {message.content}
              </div>
            </div>
          ))}
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
