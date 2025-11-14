import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/components/ui/toast"

export function Signup() {
  const navigate = useNavigate()
  const { signupWithEmail } = useAuth()
  const { addToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      addToast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      addToast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      addToast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      })
      return
    }

    if (formData.password.length < 6) {
      addToast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    const result = await signupWithEmail(formData.email, formData.password)
    setLoading(false)

    if (result.success) {
      addToast({
        title: "Success",
        description: "Account created successfully! You are now logged in."
      })
      navigate('/home');
    } else {
      addToast({
        title: "Signup Failed",
        description: result.error,
        variant: "destructive"
      })
    }
  }

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
              Join your neighborhood community
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
                Join your
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> neighborhood</span>
              </h2>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Create your account and start connecting with neighbors, discovering local services, and sharing community experiences.
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

          {/* Signup Form Container */}
          <div className="flex-1 lg:w-1/2 flex items-start lg:items-center justify-center px-6 pb-8 lg:p-12">
            <Card className="w-full max-w-md bg-white/98 backdrop-blur-2xl shadow-2xl border-0 rounded-3xl overflow-hidden transform lg:translate-y-0 -translate-y-8">
              <div className="p-8 lg:p-10">

              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">Create Account</h2>
                <p className="text-gray-600 text-base">Join your neighborhood community</p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-5">


                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 z-10" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="relative pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-gray-50/80 focus:bg-white transition-all duration-300 shadow-sm focus:shadow-lg text-base font-medium"
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 z-10" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="relative pl-12 pr-12 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-gray-50/80 focus:bg-white transition-all duration-300 shadow-sm focus:shadow-lg text-base font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-blue-500 transition-all duration-300 z-10 p-1 rounded-lg hover:bg-blue-50"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 z-10" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="relative pl-12 pr-12 h-14 border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-gray-50/80 focus:bg-white transition-all duration-300 shadow-sm focus:shadow-lg text-base font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-blue-500 transition-all duration-300 z-10 p-1 rounded-lg hover:bg-blue-50"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <>
                      <span className="mr-2">Create Account</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold transition-colors hover:underline">
                    Sign in
                  </Link>
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