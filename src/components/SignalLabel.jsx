export default function SignalLabel({ type }) {
  const labels = {
    widely_agreed: {
      emoji: '✅',
      name: 'Widely Agreed',
      bg: '#EAF3DE',
      text: '#27500A',
      helper: 'Broad agreement exists. Spot-check key claims.'
    },
    logical_guess: {
      emoji: '🔍',
      name: 'Logical Guess',
      bg: '#E6F1FB',
      text: '#0C447C',
      helper: 'Reasonable inference. Verify before acting.'
    },
    debated: {
      emoji: '⚠️',
      name: 'Debated',
      bg: '#FAEEDA',
      text: '#633806',
      helper: 'Experts disagree. Find the other perspective.'
    },
    speculative: {
      emoji: '💡',
      name: 'Speculative',
      bg: '#EEEDFE',
      text: '#3C3489',
      helper: 'Extrapolated. Use as a starting point only.'
    }
  }

  const label = labels[type] || labels.logical_guess

  return (
    <div className="mb-3">
      <div className="inline-flex items-center gap-[6px] px-3 py-1 rounded-full text-[12px] font-medium" style={{ backgroundColor: label.bg, color: label.text }}>
        <span>{label.emoji}</span>
        {label.name}
      </div>
      <p className="text-[11px] text-[#6B6B6B] mt-1 ml-1">{label.helper}</p>
    </div>
  )
}
