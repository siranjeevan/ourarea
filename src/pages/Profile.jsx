import { useState, useEffect } from "react"
import { Settings, Bookmark, Grid3X3, X, Camera, User, MapPin, Mail } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PostCard } from "@/components/post/PostCard"
import { useAuth } from "@/hooks/useAuth"
import { mockApi } from "@/api/mockApi"

export function Profile() {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState(authUser)
  const [activeTab, setActiveTab] = useState("posts")
  const [userPosts, setUserPosts] = useState([])
  const [wishlistedPosts, setWishlistedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    area: '',
    bio: ''
  })

  const staticUserPosts = [
    {
      id: 1,
      user: { id: 1, name: "Jeevith", avatar: "https://picsum.photos/150/150?random=1" },
      text: "Amazing street food festival happening at Forum Mall this weekend!",
      category: "Food",
      area: "Koramangala",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 24,
      comments: 8,
      isLiked: false,
      isWishlisted: false
    }
  ]

  useEffect(() => {
    setUser(authUser)
    setUserPosts(staticUserPosts)
    setWishlistedPosts([])
    setLoading(false)
  }, [])
  
  useEffect(() => {
    if (authUser) {
      setEditForm({
        name: authUser.name || '',
        email: authUser.email || 'jeevith@ourarea.com',
        area: authUser.area || '',
        bio: authUser.bio || ''
      })
    }
  }, [])
  
  const handleSaveProfile = () => {
    // Update user state with form data
    setUser({
      ...user,
      name: editForm.name,
      email: editForm.email,
      area: editForm.area,
      bio: editForm.bio
    })
    setShowEditModal(false)
  }

  const updatePostLike = (postId, isLiked, likes) => {
    setUserPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, isLiked, likes } : post
    ))
    setWishlistedPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, isLiked, likes } : post
    ))
  }

  const updatePostWishlist = (postId, isWishlisted) => {
    setUserPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, isWishlisted } : post
    ))
    
    // Remove from wishlist if unwishlisted
    if (!isWishlisted) {
      setWishlistedPosts(prev => prev.filter(post => post.id !== postId))
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 pb-20 md:pb-4 ">
        <div className="animate-pulse space-y-4">
          <div className="bg-muted rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-muted-foreground/20 rounded-full" />
              <div className="space-y-2">
                <div className="h-6 w-32 bg-muted-foreground/20 rounded" />
                <div className="h-4 w-24 bg-muted-foreground/20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 pb-20 md:pb-4">
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={loadUserData}>Try Again</Button>
        </div>
      </div>
    )
  }

  const currentPosts = activeTab === "posts" ? userPosts : wishlistedPosts

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20 md:pb-4 lg:mt-20">
      {/* Profile Header */}
      <Card className="mb-6 bg-white border border-gray-200 shadow-lg rounded-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-lg">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{user?.name}</h1>
                <p className="text-muted-foreground flex items-center space-x-1">
                  <span>📍</span>
                  <span>{user?.area}</span>
                </p>
                {user?.bio && (
                  <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowEditModal(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{userPosts.length}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {userPosts.reduce((sum, post) => sum + post.likes, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{wishlistedPosts.length}</div>
              <div className="text-sm text-muted-foreground">Saved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === "posts" ? "default" : "ghost"}
          className={`flex-1 ${activeTab === "posts" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
          onClick={() => setActiveTab("posts")}
        >
          <Grid3X3 className="h-4 w-4 mr-2" />
          My Posts
        </Button>
        <Button
          variant={activeTab === "wishlist" ? "default" : "ghost"}
          className={`flex-1 ${activeTab === "wishlist" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
          onClick={() => setActiveTab("wishlist")}
        >
          <Bookmark className="h-4 w-4 mr-2" />
          Saved
        </Button>
      </div>

      {/* Posts Grid */}
      {currentPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="text-6xl">
              {activeTab === "posts" ? "📝" : "🔖"}
            </div>
            <h3 className="text-lg font-semibold">
              {activeTab === "posts" ? "No posts yet" : "No saved posts"}
            </h3>
            <p className="text-muted-foreground">
              {activeTab === "posts" 
                ? "Share something with your community to get started!"
                : "Save posts you want to revisit later"
              }
            </p>
            {activeTab === "posts" && (
              <Button>Create Your First Post</Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {currentPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLikeUpdate={updatePostLike}
              onWishlistUpdate={updatePostWishlist}
            />
          ))}
        </div>
      )}
      
      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Background */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-md" 
            onClick={() => setShowEditModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEditModal(false)}
                  className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-lg">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Change profile photo</p>
              </div>
              
              {/* Form Fields */}
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Full Name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Location"
                    value={editForm.area}
                    onChange={(e) => setEditForm({...editForm, area: e.target.value})}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                
                <div className="relative">
                  <Input
                    placeholder="Bio (optional)"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}