import { useState } from 'react'
import { updateDependencyClick } from '../lib/supabase'

export default function DependencyView({ dependencies, interactionId }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  console.log('DependencyView rendered with interactionId:', interactionId)

  const toggleExpand = (index) => {
    const wasExpanded = expandedIndex === index
    setExpandedIndex(wasExpanded ? null : index)
    
    console.log('toggleExpand called:', { wasExpanded, interactionId, index })
    
    if (!wasExpanded && interactionId) {
      console.log('dependency clicked, updating supabase', { interactionId, index })
      updateDependencyClick(interactionId)
    } else if (!wasExpanded && !interactionId) {
      console.log('dependency clicked but no interactionId available', { interactionId, index })
    }
  }

  return (
    <div className="mt-4 border border-[#E5E5E5] rounded-xl overflow-hidden">
      <div className="bg-[#F5F5F0] px-4 py-[10px] border-b border-[#E5E5E5]">
        <h3 className="text-[11px] font-medium uppercase text-[#6B6B6B] tracking-[0.06em]">This answer depends on</h3>
      </div>
      {dependencies.map((dep, index) => (
        <div key={index} className="border-t border-[#E5E5E5] last:border-t-0">
          <div className="px-4 py-[14px]">
            <div className="flex items-start gap-2">
              <span className={`mt-1 w-[6px] h-[6px] rounded-full ${index < 2 ? 'bg-[#D97757]' : 'bg-[#27500A]'}`} />
              <div className="flex-1">
                <p className="text-[13px] font-medium text-[#1A1A1A]">{dep.assumption}</p>
                <p className="text-[12px] text-[#6B6B6B] mt-1 mb-[10px]">{dep.consequence}</p>
                <button
                  onClick={() => toggleExpand(index)}
                  className="text-[12px] text-[#D97757] bg-none border-none cursor-pointer hover:text-[#C4663F]"
                >
                  {expandedIndex === index ? 'Hide alternate version' : 'See version without this'}
                </button>
              </div>
            </div>
            {expandedIndex === index && (
              <div className="mt-[10px] ml-4 p-3 bg-[#EAF3DE] border border-[#C0DD97] rounded-lg">
                <p className="text-[13px] text-[#27500A] leading-[1.6]">{dep.alternative}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
