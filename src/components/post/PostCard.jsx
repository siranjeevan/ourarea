import { useState } from "react"
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockApi } from "@/api/mockApi"
import { useToast } from "@/components/ui/toast"

export function PostCard({ post, onLikeUpdate, onWishlistUpdate }) {
  const [isLiking, setIsLiking] = useState(false)
  const [isWishlisting, setIsWishlisting] = useState(false)
  const [showFullText, setShowFullText] = useState(false)
  const { addToast } = useToast()

  const handleLike = () => {
    if (isLiking) return
    
    setIsLiking(true)
    
    // Optimistic update - immediately update UI
    const newLiked = !post.isLiked
    const newLikes = newLiked ? post.likes + 1 : post.likes - 1
    onLikeUpdate(post.id, newLiked, newLikes)
    
    setTimeout(() => setIsLiking(false), 300)
  }

  const handleWishlist = () => {
    if (isWishlisting) return
    
    setIsWishlisting(true)
    
    // Optimistic update
    onWishlistUpdate(post.id, !post.isWishlisted)
    
    setTimeout(() => setIsWishlisting(false), 300)
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = now - time
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const shouldTruncate = post.text.length > 150
  const displayText = shouldTruncate && !showFullText 
    ? post.text.slice(0, 150) + "..." 
    : post.text

  return (
    <Card className="w-full bg-slate-800/95 backdrop-blur-md border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:border-emerald-400/50 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
              <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.user?.name}</p>
              <p className="text-xs text-muted-foreground">
                {post.area} • {formatTime(post.timestamp)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
              {post.category}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-sm leading-relaxed">{displayText}</p>
            {shouldTruncate && (
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-primary"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Show less" : "See more"}
              </Button>
            )}
          </div>
          
          {post.images && post.images.length > 0 && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.images[0]}
                alt="Post image"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${post.isLiked ? "text-red-500" : ""}`}
                onClick={handleLike}
                disabled={isLiking}
              >
                <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                <span className="text-xs">{post.likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">{post.comments}</span>
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${post.isWishlisted ? "text-blue-500" : ""}`}
              onClick={handleWishlist}
              disabled={isWishlisting}
            >
              <Bookmark className={`h-4 w-4 ${post.isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}