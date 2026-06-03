import { Link } from 'react-router-dom'

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[52px] bg-white border-b border-[#E5E5E5] flex items-center justify-between px-6 z-100">
      <Link to="/" className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="11" height="14" rx="2"
                fill="none" stroke="#D97757" strokeWidth="1.5"/>
          <rect x="7" y="2" width="11" height="14" rx="2"
                fill="#D97757" fillOpacity="0.15"
                stroke="#D97757" strokeWidth="1.5"/>
        </svg>
        <span className="text-[18px] font-medium text-[#1A1A1A]">Mirror</span>
      </Link>
      <Link to="/calibration" className="text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A]">
        My Calibration
      </Link>
    </nav>
  )
}
