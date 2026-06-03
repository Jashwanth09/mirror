export default function WeakPointText({ text, weakPoints }) {
  let parts = [{ text, isWeak: false, reason: '' }]

  weakPoints.forEach(wp => {
    parts = parts.flatMap(part => {
      if (part.isWeak || !part.text.includes(wp.phrase)) return [part]
      const idx = part.text.indexOf(wp.phrase)
      return [
        { text: part.text.slice(0, idx), isWeak: false, reason: '' },
        { text: wp.phrase, isWeak: true, reason: wp.reason },
        { text: part.text.slice(idx + wp.phrase.length), isWeak: false, reason: '' }
      ].filter(p => p.text)
    })
  })

  return (
    <p className="text-[15px] leading-[1.7] text-[#1A1A1A]">
      {parts.map((part, i) =>
        part.isWeak ? (
          <span key={i} className="relative group">
            <span className="underline decoration-[#D97757] decoration-2 cursor-help bg-[#FAEEDA] rounded-[2px] px-[2px]">
              {part.text}
            </span>
            <span className="absolute bottom-full left-0 mb-1 hidden group-hover:block w-[240px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-lg p-2 text-[12px] text-[#6B6B6B] shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-50">
              ⚠️ {part.reason}
            </span>
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </p>
  )
}
