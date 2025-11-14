import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Camera, User, Globe, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/hooks/useAuth"
import { updateProfile } from "firebase/auth"
import { auth } from "@/firebase"

export function ProfileSetup() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    username: '',
    profileImage: null,
    country: '',
    state: '',
    district: '',
    city: '',
    addressLine: '',
    latitude: 12.93,
    longitude: 80.13
  })
  
  const [imagePreview, setImagePreview] = useState(null)
  const [locationStatus, setLocationStatus] = useState('detecting')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    detectLocation()
  }, [])

  const detectLocation = async () => {
    try {
      setLocationStatus('detecting')
      
      if (!navigator.geolocation) {
        throw new Error('Geolocation not supported')
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000
        })
      })

      const { latitude, longitude } = position.coords
      
      // Reverse geocoding simulation
      const locationData = await reverseGeocode(latitude, longitude)
      
      setFormData(prev => ({
        ...prev,
        latitude,
        longitude,
        ...locationData
      }))
      
      setLocationStatus('detected')
    } catch (error) {
      setLocationStatus('failed')
      console.error('Location detection failed:', error)
    }
  }

  const reverseGeocode = async (lat, lng) => {
    // Simulate API call with mock data for Chennai area
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Jeevith',
      city: 'Chennai'
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }))
      
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Update Firebase user profile with display name
      if (auth.currentUser && formData.username) {
        await updateProfile(auth.currentUser, {
          displayName: formData.username
        })
      }

      // Simulate additional profile data saving
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Profile data:', formData)
      addToast({
        title: "Success",
        description: "Profile setup completed successfully!"
      })
      
      // Wait for Firebase to update, then navigate
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    } catch (error) {
      console.error('Profile setup error:', error)
      addToast({
        title: "Error",
        description: "Failed to setup profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getLocationStatusColor = () => {
    switch (locationStatus) {
      case 'detecting': return 'bg-blue-100 text-blue-800'
      case 'detected': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us personalize your experience and connect you with nearby posts</p>
        </div>

        <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-orange-400 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  )}
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                />
              </div>
              <p className="text-sm text-gray-500">Click to upload profile picture</p>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Username</label>
              <Input
                placeholder="Enter your username"
                value={formData.username || ''}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="h-12 border-gray-200 focus:border-blue-500"
                required
              />
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location Details</span>
                </label>
                <Badge className={getLocationStatusColor()}>
                  {locationStatus === 'detecting' && 'Detecting...'}
                  {locationStatus === 'detected' && 'Auto-detected'}
                  {locationStatus === 'failed' && 'Manual entry required'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Country</label>
                  <Input
                    placeholder="Country"
                    value={formData.country || ''}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">State</label>
                  <Input
                    placeholder="State"
                    value={formData.state || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">District</label>
                  <Input
                    placeholder="District"
                    value={formData.district || ''}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">City</label>
                  <Input
                    placeholder="City"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Address Line (Optional)</label>
                <Input
                  placeholder="Street address, building name, etc."
                  value={formData.addressLine || ''}
                  onChange={(e) => handleInputChange('addressLine', e.target.value)}
                  className="h-11"
                />
              </div>



              {locationStatus === 'failed' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={detectLocation}
                  className="w-full"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Retry Location Detection
                </Button>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !formData.username}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-medium"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Setting up profile...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Complete Profile Setup</span>
                </div>
              )}
            </Button>
          </form>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Why do we need your location?</p>
              <p>We use your location to show you relevant posts and services in your area, helping you connect with your local community.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}