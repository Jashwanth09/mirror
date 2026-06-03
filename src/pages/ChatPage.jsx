import { useState, useEffect } from 'react'
import PromptInput from '../components/PromptInput'
import AIResponse from '../components/AIResponse'
import { getMirrorResponse } from '../lib/groq'
import { saveInteraction } from '../lib/supabase'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem('mirror_session_id')
    if (existing) return existing
    const newId = crypto.randomUUID()
    localStorage.setItem('mirror_session_id', newId)
    return newId
  })

  const presetPrompts = [
    { emoji: "💼", text: "Should I transition from finance to PM?", prompt: "Should I transition from finance to PM?" },
    { emoji: "🔬", text: "Remote work impact on junior employees?", prompt: "What does research say about remote work?" },
    { emoji: "📋", text: "AI tools strategy for content team?", prompt: "Write a strategy recommendation for AI adoption" }
  ]

  const handlePresetClick = (preset) => {
    setInputValue(preset.prompt)
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
      const savedInteraction = await saveInteraction({
        session_id: sessionId,
        domain: response.domain,
        label_type: response.signal_label,
        dependencies_clicked: 0,
        total_dependencies: response.dependencies?.length || 3,
        output_copied: false
      })

      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        signalLabel: response.signal_label,
        signalReason: response.signal_reason,
        dependencies: response.dependencies,
        weakPoints: response.weak_points,
        domain: response.domain,
        interactionId: savedInteraction?.id || null
      }
      setMessages(prev => [...prev, assistantMessage])
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
    <div className="min-h-screen bg-[#FFFFFF] pt-[52px]">
      <div className="max-w-[720px] mx-auto px-4 py-6 pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
          {presetPrompts.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(preset)}
              className="text-left px-4 py-3 bg-[#F5F5F0] border border-[#E5E5E5] rounded-xl text-[13px] text-[#1A1A1A] hover:bg-[#EBEBEB] transition-colors"
            >
              <span className="mr-2">{preset.emoji}</span>
              {preset.text}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-[#6B6B6B] py-12">
              <h2 className="text-[24px] font-semibold mb-2 text-[#1A1A1A]">Mirror</h2>
              <p className="text-[15px]">Ask something high-stakes.</p>
              <p className="text-[15px]">Mirror will show you what the answer depends on.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'user' ? (
                <div className="max-w-[80%] px-4 py-3 rounded-[18px_18px_4px_18px] bg-[#F5F5F0] text-[#1A1A1A] text-[15px] ml-auto">
                  {message.content}
                </div>
              ) : (
                <AIResponse response={message} />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <p className="text-[13px] text-[#6B6B6B] mb-3">Mirror is thinking...</p>
                <div className="space-y-2">
                  <div className="h-4 rounded-[4px] bg-gradient-to-r from-[#F5F5F0] via-[#EBEBEB] to-[#F5F5F0] animate-pulse" style={{ width: '100%' }}></div>
                  <div className="h-4 rounded-[4px] bg-gradient-to-r from-[#F5F5F0] via-[#EBEBEB] to-[#F5F5F0] animate-pulse" style={{ width: '100%' }}></div>
                  <div className="h-2.5 rounded-[4px] bg-gradient-to-r from-[#F5F5F0] via-[#EBEBEB] to-[#F5F5F0] animate-pulse" style={{ width: '75%' }}></div>
                </div>
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
