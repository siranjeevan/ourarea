import { useState, useEffect } from "react"
import { Search as SearchIcon, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PostCard } from "@/components/post/PostCard"
import { useDebounce } from "@/hooks/useDebounce"

const categories = [
  "event",
  "business",
  "sports",
  "social",
  "help",
  "announcement",
  "lost_found"
]

export function Search() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [timeFilter, setTimeFilter] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchPosts()
    } else {
      setResults([])
    }
  }, [debouncedQuery, category, timeFilter])

  const staticSearchResults = [
    {
      id: 1,
      user: { id: 1, name: "Jeevith", avatar: "https://picsum.photos/150/150?random=1" },
      text: "Amazing street food festival happening at Forum Mall this weekend!",
      category: "Food",
      area: "Koramangala",
      timestamp: new Date().toISOString(),
      likes: 24,
      comments: 8,
      isLiked: false,
      isWishlisted: false
    }
  ]

  const searchPosts = () => {
    setLoading(true)
    setTimeout(() => {
      const filtered = staticSearchResults.filter(post => 
        post.text.toLowerCase().includes(debouncedQuery.toLowerCase()) &&
        (!category || post.category === category)
      )
      setResults(filtered)
      setLoading(false)
    }, 500)
  }

  const updatePostLike = (postId, isLiked, likes) => {
    setResults(prev => prev.map(post => 
      post.id === postId ? { ...post, isLiked, likes } : post
    ))
  }

  const updatePostWishlist = (postId, isWishlisted) => {
    setResults(prev => prev.map(post => 
      post.id === postId ? { ...post, isWishlisted } : post
    ))
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20 md:pb-4 lg:mt-25">
      {/* Search Header */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts in your area..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Chips */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={category === "" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategory("")}
            >
              All
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={category === cat ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setCategory(category === cat ? "" : cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Time:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={timeFilter === "" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTimeFilter("")}
            >
              All Time
            </Badge>
            <Badge
              variant={timeFilter === "today" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTimeFilter(timeFilter === "today" ? "" : "today")}
            >
              Today
            </Badge>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Searching...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={searchPosts}>Try Again</Button>
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="text-6xl">🔍</div>
            <h3 className="text-lg font-semibold">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        </div>
      )}

      {!loading && !query && (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="text-6xl">🔍</div>
            <h3 className="text-lg font-semibold">Search your neighborhood</h3>
            <p className="text-muted-foreground">
              Find posts about food, events, lost items, and more
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {results.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLikeUpdate={updatePostLike}
            onWishlistUpdate={updatePostWishlist}
          />
        ))}
      </div>
    </div>
  )
}