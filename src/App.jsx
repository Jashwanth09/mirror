import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import CalibrationPage from './pages/CalibrationPage'
import TopNav from './components/TopNav'

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/calibration" element={<CalibrationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
