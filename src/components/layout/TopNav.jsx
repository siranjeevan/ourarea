import { Home, Search, Plus, User, MapPin, Star } from "lucide-react"
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
    { icon: Star, label: "Services", path: "/services" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Plus, label: "Create", path: "/create" },
    { icon: User, label: "Profile", path: "/profile" }
  ]

  return (
    <nav className="hidden lg:flex fixed left-0 top-0 h-full w-60 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-xl z-50 flex-col">
      
      {/* Navigation Items */}
      <div className="flex-1 p-6 mt-30">
        <div className="space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path
            return (
              <Link key={path} to={path} className="block">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start space-x-4 h-14 rounded-lg transition-all duration-200 text-left",
                    isActive 
                      ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
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
      
      {/* Footer */}
      <div className="p-6 border-t border-gray-100 space-y-3">
        <Link to="/login">
          <Button variant="outline" className="w-full">
            Login
          </Button>
        </Link>
        <div className="text-xs text-gray-500 text-center">
          © 2024 OurArea Platform
        </div>
      </div>
    </nav>
  )
}