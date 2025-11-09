import { Home, Search, Plus, User, MapPin } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useGeo } from "@/hooks/useGeo"

export function TopNav() {
  const location = useLocation()
  const { area } = useGeo()
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Plus, label: "Create", path: "/create" },
    { icon: User, label: "Profile", path: "/profile" }
  ]

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-slate-800/95 backdrop-blur-xl border-r border-emerald-500/30 shadow-2xl z-50 flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-3">NammaOoru</h1>
        {area && (
          <Badge variant="secondary" className="flex items-center space-x-1 w-fit bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
            <MapPin className="h-3 w-3" />
            <span>{area.name}</span>
          </Badge>
        )}
      </div>
      
      {/* Navigation Items */}
      <div className="flex-1 p-4">
        <div className="space-y-3">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path
            return (
              <Link key={path} to={path} className="block">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start space-x-3 h-12 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/25" 
                      : "hover:bg-slate-700/50 hover:scale-105"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-base font-medium">{label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}