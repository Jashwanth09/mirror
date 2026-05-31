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
    <p className="text-sm leading-relaxed text-gray-800">
      {parts.map((part, i) =>
        part.isWeak ? (
          <span key={i} className="relative group">
            <span className="underline decoration-amber-400 decoration-2 cursor-help bg-amber-50">
              {part.text}
            </span>
            <span className="absolute bottom-full left-0 mb-1 hidden group-hover:block w-56 bg-white border border-gray-200 rounded p-2 text-xs text-gray-600 shadow-sm z-10">
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
