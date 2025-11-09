import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastProvider } from "@/components/ui/toast"
import { TopNav } from "@/components/layout/TopNav"
import { BottomNav } from "@/components/layout/BottomNav"
import { RightSidebar } from "@/components/layout/RightSidebar"
import { Home } from "@/pages/Home"
import { Search } from "@/pages/Search"
import { Create } from "@/pages/Create"
import { Profile } from "@/pages/Profile"

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20">
          <TopNav />
          <RightSidebar />
          <main className="min-h-screen md:ml-64 xl:mr-80">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App