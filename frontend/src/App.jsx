/* eslint-disable no-unused-vars */
 
import { Toaster } from 'react-hot-toast'
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useThemeStore } from './store/useThemeStore';


const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
  const {theme} = useThemeStore()
  const imgLoading = '../public/giphy.gif'

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
<div className="flex items-center justify-center h-screen flex-col space-y-4">
  <img src={imgLoading} className="w-36 h-36" alt="Loading" />
  <Loader className="text-blue-500 w-10 h-10 animate-spin" />
  <h1 className="text-lg font-semibold text-white-700">
    Đang tải, đợi xíu nha...
  </h1>
</div>

    )
  }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/dang-nhap" />} />
        <Route path="/dang-ky" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/dang-nhap" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/tuy-chinh" element={<SettingsPage />} />
        <Route path="/trang-ca-nhan" element={authUser ? <ProfilePage /> : <Navigate to="/dang-nhap" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
