import { MapPin, Search, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Link, useLocation } from "react-router-dom"
import { useGeo } from "@/hooks/useGeo"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

export function MobileHeader() {
  const { area } = useGeo()
  const { user } = useAuth()
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-between px-6 lg:px-8 xl:px-12 py-4 lg:ml-72 xl:mr-80">
        {/* Left - Website Name */}
        <div className="flex items-center space-x-4 lg:-ml-70">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">OurArea</h1>
            {area && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{area.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right - Search Bar and Icons */}
        <div className="flex items-center space-x-4 xl:-mr-60 ">
          {/* Desktop/Tablet/Laptop Search Bar */}
          <div className="hidden lg:flex items-center bg-white/80 rounded-2xl px-4 py-2 shadow-sm border border-gray-200/50 min-w-80 xl:min-w-96">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search posts, services, or people..."
              className="bg-transparent border-none outline-none flex-1 text-gray-700 placeholder-gray-500"
            />
          </div>
          
          {/* Mobile/Tablet Search Button */}
          <Link to="/search" className="lg:hidden">
            <Button
              variant="ghost"
              className={cn(
                "h-11 w-11 rounded-2xl transition-all duration-300 shadow-sm",
                location.pathname === "/search"
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-white/80 text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-105"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            className="h-11 w-11 rounded-2xl bg-white/80 text-gray-600 hover:text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-sm relative"
          >
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
          
          <Link to="/profile">
            <div className={cn(
              "relative transition-all duration-300",
              location.pathname === "/profile" && "scale-110"
            )}>
              <Avatar className="h-11 w-11 ring-2 ring-white shadow-lg">
                <img 
                  src={user?.avatar} 
                  alt={user?.name}
                  className="h-full w-full object-cover"
                />
              </Avatar>
              {location.pathname === "/profile" && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}