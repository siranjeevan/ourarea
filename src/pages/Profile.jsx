import { useState, useEffect } from "react"
import { Settings, Bookmark, Grid3X3 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PostCard } from "@/components/post/PostCard"
import { useAuth } from "@/hooks/useAuth"
import { mockApi } from "@/api/mockApi"

export function Profile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("posts")
  const [userPosts, setUserPosts] = useState([])
  const [wishlistedPosts, setWishlistedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    setUserPosts(staticUserPosts)
    setWishlistedPosts([])
    setLoading(false)
  }, [])

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
      <div className="max-w-2xl mx-auto p-4 pb-20 md:pb-4">
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
    <div className="max-w-2xl mx-auto p-4 pb-20 md:pb-4">
      {/* Profile Header */}
      <Card className="mb-6 bg-slate-800/95 border border-emerald-500/30 shadow-xl">
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
              </div>
            </div>
            <Button variant="outline" size="sm">
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
      <div className="flex space-x-1 mb-6 bg-slate-700/50 p-1 rounded-lg">
        <Button
          variant={activeTab === "posts" ? "default" : "ghost"}
          className={`flex-1 ${activeTab === "posts" ? "bg-emerald-600 text-slate-100" : "text-slate-300 hover:text-slate-100 hover:bg-slate-600/50"}`}
          onClick={() => setActiveTab("posts")}
        >
          <Grid3X3 className="h-4 w-4 mr-2" />
          My Posts
        </Button>
        <Button
          variant={activeTab === "wishlist" ? "default" : "ghost"}
          className={`flex-1 ${activeTab === "wishlist" ? "bg-emerald-600 text-slate-100" : "text-slate-300 hover:text-slate-100 hover:bg-slate-600/50"}`}
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
    </div>
  )
}