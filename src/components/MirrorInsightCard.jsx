import { Link } from 'react-router-dom'

export default function MirrorInsightCard({ insight }) {
  return (
    <div className="mt-4 bg-[#F5F5F0] border border-[#E5E5E5] rounded-xl p-[14px_16px]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🪞</span>
        <h3 className="text-[12px] font-medium text-[#6B6B6B]">Claude Mirror Insight</h3>
      </div>
      <p className="text-[13px] text-[#1A1A1A] leading-[1.6] mb-2">{insight.message}</p>
      <Link to="/calibration" className="text-[12px] text-[#D97757] mt-2 block">
        View your calibration →
      </Link>
    </div>
  )
}
