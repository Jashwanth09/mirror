export default function PromptInput({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF] border-t border-[#E5E5E5] px-6 py-3">
      <div className="max-w-[720px] mx-auto flex gap-2 items-end">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask something high-stakes..."
          className="flex-1 bg-[#F5F5F0] border border-[#E5E5E5] rounded-xl px-4 py-3 text-[15px] text-[#1A1A1A] resize-none min-h-[48px] max-h-[200px] focus:border-[#D97757] focus:outline-none"
          rows={1}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="w-10 h-10 bg-[#D97757] text-white rounded-xl hover:bg-[#C4663F] disabled:bg-[#E5E5E5] disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </form>
  )
}
