import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
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

function AppLayout() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <TopNav />
      <MobileHeader />
      <RightSidebar />
      <main className="min-h-screen lg:ml-60 xl:mr-80 pt-16 lg:pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppLayout />
      </Router>
    </ToastProvider>
  )
}

export default App