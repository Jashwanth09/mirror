export default function SignalLabel({ type }) {
  const labels = {
    widely_agreed: {
      emoji: '✅',
      name: 'Widely Agreed',
      color: 'bg-green-100 text-green-800 border-green-200',
      helper: 'Broad agreement exists. Spot-check key claims.'
    },
    logical_guess: {
      emoji: '🔍',
      name: 'Logical Guess',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      helper: 'Reasonable inference. Verify before acting.'
    },
    debated: {
      emoji: '⚠️',
      name: 'Debated',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      helper: 'Experts disagree. Find the other perspective.'
    },
    speculative: {
      emoji: '💡',
      name: 'Speculative',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      helper: 'Extrapolated. Use as a starting point only.'
    }
  }

  const label = labels[type] || labels.logical_guess

  return (
    <div className="mb-4">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${label.color}`}>
        <span className="mr-2">{label.emoji}</span>
        {label.name}
      </div>
      <p className="text-xs text-gray-600 mt-1 ml-1">{label.helper}</p>
    </div>
  )
}
