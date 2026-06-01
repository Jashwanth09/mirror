import { useState } from 'react'

export default function DependencyView({ dependencies }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="mt-4 border border-gray-200 rounded-lg bg-white">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h3 className="text-xs font-semibold uppercase text-gray-600">This answer depends on</h3>
      </div>
      {dependencies.map((dep, index) => (
        <div key={index} className="border-b border-gray-200 last:border-b-0">
          <div className="px-4 py-3">
            <div className="flex items-start gap-2">
              <span className={`mt-1 w-2 h-2 rounded-full ${index < 2 ? 'bg-amber-400' : 'bg-green-400'}`} />
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">{dep.assumption}</p>
                <p className="text-xs text-gray-500 mt-1">{dep.consequence}</p>
                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  {expandedIndex === index ? 'Hide alternate version' : 'See version without this'}
                </button>
              </div>
            </div>
            {expandedIndex === index && (
              <div className="mt-3 ml-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-gray-700">{dep.alternative}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
