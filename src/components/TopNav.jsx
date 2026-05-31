import { Link } from 'react-router-dom'

export default function TopNav() {
  return (
    <nav className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <Link to="/" className="text-lg font-semibold text-gray-800">
        Mirror
      </Link>
      <Link to="/calibration" className="text-sm text-gray-600 hover:text-gray-900">
        My Calibration
      </Link>
    </nav>
  )
}
