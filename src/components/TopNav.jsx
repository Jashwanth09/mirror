import { Link } from 'react-router-dom'
import logo from '../../logo.svg'

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[52px] bg-white border-b border-[#E5E5E5] flex items-center justify-between px-6 z-100">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Claude" className="w-5 h-5" />
        <span className="text-[18px] font-medium text-[#1A1A1A]">Claude Mirror</span>
      </Link>
      <Link to="/calibration" className="text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A]">
        My Calibration
      </Link>
    </nav>
  )
}
