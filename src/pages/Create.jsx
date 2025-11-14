import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Camera, MapPin, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGeo } from "@/hooks/useGeo"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/hooks/useAuth"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://our-area-backend.onrender.com'
const TOKEN_KEY = 'ourarea_access_token'

const categories = [
  "event",
  "business",
  "sports",
  "social",
  "help",
  "announcement",
  "lost_found"
]

export function Create() {
  const navigate = useNavigate()
  const { area } = useGeo()
  const { addToast } = useToast()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    text: "",
    category: "event",
    images: []
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const getToken = () => localStorage.getItem(TOKEN_KEY)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setFormData(prev => ({
        ...prev,
        images: [imageUrl]
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.text.trim()) {
      addToast({
        title: "Error",
        description: "Please enter some text for your post",
        variant: "destructive"
      })
      return
    }

    if (!area) {
      addToast({
        title: "Error",
        description: "Unable to determine your location",
        variant: "destructive"
      })
      return
    }

    const token = getToken()
    if (!token) {
      addToast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          area_id: area.id,
          text: formData.text,
          category: formData.category
        })
      })

      if (response.ok) {
        const data = await response.json()
        addToast({
          title: "Success!",
          description: "Your post has been shared with the community"
        })

        // Reset form
        setFormData({ text: "", category: "event", images: [] })
        setImagePreview(null)

        // Navigate to home
        navigate("/")
      } else {
        const error = await response.json()
        addToast({
          title: "Error",
          description: error.detail || "Failed to create post",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Create post error:', error)
      addToast({
        title: "Error",
        description: "Network error occurred",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20 md:pb-4 lg:mt-20">
      <Card className="bg-white border border-gray-200 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Create Post</span>
          </CardTitle>
          {area && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Posting to {area.name}</span>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium">What's happening in your area?</label>
              <Textarea
                placeholder="Share something with your neighbors..."
                value={formData.text}
                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                className="min-h-[120px] resize-none bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                maxLength={500}
              />
              <div className="text-xs text-muted-foreground text-right">
                {formData.text.length}/500
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={formData.category === cat ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Add Photo (Optional)</label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData(prev => ({ ...prev, images: [] }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to add a photo
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image-upload").click()}
                  >
                    Choose Photo
                  </Button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !formData.text.trim()}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Share Post
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}