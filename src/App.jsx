import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastProvider } from "@/components/ui/toast"
import { TopNav } from "@/components/layout/TopNav"
import { BottomNav } from "@/components/layout/BottomNav"
import { MobileHeader } from "@/components/layout/MobileHeader"
import { RightSidebar } from "@/components/layout/RightSidebar"
import { Home } from "@/pages/Home"
import { Services } from "@/pages/Services"
import { Search } from "@/pages/Search"
import { Create } from "@/pages/Create"
import { Profile } from "@/pages/Profile"
import { Login } from "@/pages/Login"
import { Signup } from "@/pages/Signup"
import { ProfileSetup } from "@/pages/ProfileSetup"
import { useAuth } from "@/hooks/useAuth"

function App() {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile-setup" element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (
              <ProfileSetup />
            )
          } />
          
          {/* Main App Routes */}
          <Route path="/" element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (!user?.display_name || user.display_name === user?.email?.split('@')[0] || user.display_name === 'User') ? (
              <Navigate to="/profile-setup" replace />
            ) : (
              <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
                <TopNav />
                <MobileHeader />
                <RightSidebar />
                <main className="min-h-screen lg:ml-60 xl:mr-80 pt-16 lg:pt-0">
                  <Home />
                </main>
                <BottomNav />
              </div>
            )
          } />
          
          <Route path="/home" element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (!user?.display_name || user.display_name === user?.email?.split('@')[0] || user.display_name === 'User') ? (
              <Navigate to="/profile-setup" replace />
            ) : (
              <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
                <TopNav />
                <MobileHeader />
                <RightSidebar />
                <main className="min-h-screen lg:ml-60 xl:mr-80 pt-16 lg:pt-0">
                  <Home />
                </main>
                <BottomNav />
              </div>
            )
          } />
          
          <Route path="/services" element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (!user?.display_name || user.display_name === user?.email?.split('@')[0] || user.display_name === 'User') ? (
              <Navigate to="/profile-setup" replace />
            ) : (
              <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
                <TopNav />
                <MobileHeader />
                <RightSidebar />
                <main className="min-h-screen lg:ml-60 xl:mr-80 pt-16 lg:pt-0">
                  <Services />
                </main>
                <BottomNav />
              </div>
            )
          } />
          
          <Route path="/search" element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (!user?.display_name || user.display_name === user?.email?.split('@')[0] || user.display_name === 'User') ? (
              <Navigate to="/profile-setup" replace />
            ) : (
              <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
                <TopNav />
                <MobileHeader />
                <RightSidebar />
                <main className="min-h-screen lg:ml-60 xl:mr-80 pt-16 lg:pt-0">
                  <Search />
                </main>
                <BottomNav />
              </div>
            )
          } />
          
          <Route path="/create" element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (!user?.display_name || user.display_name === user?.email?.split('@')[0] || user.display_name === 'User') ? (
              <Navigate to="/profile-setup" replace />
            ) : (
              <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
                <TopNav />
                <MobileHeader />
                <RightSidebar />
                <main className="min-h-screen lg:ml-60 xl:mr-80 pt-16 lg:pt-0">
                  <Create />
                </main>
                <BottomNav />
              </div>
            )
          } />
          
          <Route path="/profile" element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (!user?.display_name || user.display_name === user?.email?.split('@')[0] || user.display_name === 'User') ? (
              <Navigate to="/profile-setup" replace />
            ) : (
              <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
                <TopNav />
                <MobileHeader />
                <RightSidebar />
                <main className="min-h-screen lg:ml-60 xl:mr-80 pt-16 lg:pt-0">
                  <Profile />
                </main>
                <BottomNav />
              </div>
            )
          } />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App