import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Mobile/Tablet Header */}
        <div className="lg:hidden relative">
          {/* Top gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-purple-900/60 to-transparent" />
          
          <div className="relative px-6 pt-12 pb-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <span className="text-white font-bold text-3xl">O</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">OurArea</h1>
            <p className="text-lg text-gray-200 max-w-sm mx-auto leading-relaxed">
              Connect with your neighborhood community
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Desktop Left Side - Branding */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20">
            <div className="max-w-md">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">O</span>
                </div>
                <h1 className="text-3xl font-bold text-white">OurArea</h1>
              </div>
              
              <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                Connect with your
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> neighborhood</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join thousands of neighbors sharing local experiences, discovering services, and building stronger communities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <span>Connect with local neighbors</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-purple-400" />
                  </div>
                  <span>Discover nearby services & offers</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span>Share local experiences</span>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form Container */}
          <div className="flex-1 lg:w-1/2 flex items-start lg:items-center justify-center px-6 pb-8 lg:p-12">
            <Card className="w-full max-w-md bg-white/98 backdrop-blur-2xl shadow-2xl border-0 rounded-3xl overflow-hidden transform lg:translate-y-0 -translate-y-8">
              <div className="p-8 lg:p-10">

              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">Welcome back</h2>
                <p className="text-gray-600 text-base">Sign in to continue to your neighborhood</p>
              </div>

              {/* Google Login */}
              <Button className="w-full mb-6 h-14 bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 text-gray-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-gray-500 font-medium text-sm">Or continue with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <div className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 z-10" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-gray-50/80 focus:bg-white transition-all duration-300 shadow-sm focus:shadow-lg text-base font-medium"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 z-10" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="relative pl-12 pr-12 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-gray-50/80 focus:bg-white transition-all duration-300 shadow-sm focus:shadow-lg text-base font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-blue-500 transition-all duration-300 z-10 p-1 rounded-lg hover:bg-blue-50"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <label className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <span className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-[1.02] active:scale-[0.98]">
                  <span className="mr-2">Sign In</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-bold transition-colors hover:underline">
                    Create account
                  </a>
                </p>
              </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}