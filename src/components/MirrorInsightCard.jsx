import { Link } from 'react-router-dom'

export default function MirrorInsightCard({ insight }) {
  return (
    <div className="mt-4 border border-gray-200 rounded-lg bg-white p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🪞</span>
        <h3 className="text-sm font-semibold text-gray-800">Mirror Insight</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{insight.message}</p>
      <Link to="/calibration" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
        View examples →
      </Link>
    </div>
  )
}
