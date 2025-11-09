import { Home, Search, Plus, User, Star } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const location = useLocation()
  
  const mainNavItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Star, label: "Services", path: "/services" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: User, label: "Profile", path: "/profile" }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-2xl border-t border-gray-100 shadow-2xl z-50 lg:hidden">
      <div className="relative px-2 sm:px-4 py-2 sm:py-3">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-blue-50/50" />
        
        {/* Mobile Layout */}
        <div className="relative md:hidden">
          <div className="flex items-center justify-between px-6">
            {/* Left Nav Items */}
            <div className="flex space-x-4">
              {mainNavItems.slice(0, 2).map(({ icon: Icon, label, path }) => {
                const isActive = location.pathname === path
                return (
                  <Link key={path} to={path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                        isActive 
                          ? "bg-blue-500 text-white shadow-lg" 
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </Link>
                )
              })}
            </div>
            
            {/* Center Create Button */}
            <Link to="/create">
              <Button
                className={cn(
                  "w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95",
                  location.pathname === "/create" && "scale-110 shadow-2xl"
                )}
              >
                <Plus className="h-7 w-7" />
              </Button>
            </Link>
            
            {/* Right Nav Items */}
            <div className="flex space-x-4">
              {mainNavItems.slice(2).map(({ icon: Icon, label, path }) => {
                const isActive = location.pathname === path
                return (
                  <Link key={path} to={path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                        isActive 
                          ? "bg-blue-500 text-white shadow-lg" 
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Tablet Layout */}
        <div className="relative hidden md:flex items-center justify-center max-w-2xl mx-auto">
          <div className="flex items-center  backdrop-blur-xl rounded-full px-6 py-3 shadow-xl border border-gray-200/50">
            {/* Left Nav Items */}
            {mainNavItems.slice(0, 2).map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path
              return (
                <Link key={path} to={path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 mx-1",
                      isActive 
                        ? "bg-blue-500 text-white shadow-lg" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </Button>
                </Link>
              )
            })}
            
            {/* Center Create Button */}
            <Link to="/create">
              <Button
                className={cn(
                  "flex items-center space-x-3 px-6 py-3 rounded-full mx-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300",
                  location.pathname === "/create" && "shadow-xl scale-105"
                )}
              >
                <Plus className="h-5 w-5" />
                <span className="font-medium">Create</span>
              </Button>
            </Link>
            
            {/* Right Nav Items */}
            {mainNavItems.slice(2).map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path
              return (
                <Link key={path} to={path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 mx-1",
                      isActive 
                        ? "bg-blue-500 text-white shadow-lg" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}