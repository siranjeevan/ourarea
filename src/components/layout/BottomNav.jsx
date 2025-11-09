import { Home, Search, Plus, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const location = useLocation()
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Plus, label: "Create", path: "/create" },
    { icon: User, label: "Profile", path: "/profile" }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-xl border-t border-emerald-500/30 shadow-2xl z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path
          return (
            <Link key={path} to={path} className="flex-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-14 flex flex-col items-center justify-center space-y-1 rounded-xl mx-1 transition-all duration-200",
                  isActive 
                    ? "text-emerald-300 bg-emerald-500/20 shadow-lg shadow-emerald-500/25" 
                    : "text-slate-400 hover:text-emerald-300 hover:bg-slate-700/30"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}