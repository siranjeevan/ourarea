// Mock API with in-memory data and simulated network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const shouldFail = () => false // Disable failures for stable demo

// Mock data
const areas = [
  { id: 1, name: "Koramangala", lat: 12.9352, lng: 77.6245 },
  { id: 2, name: "Indiranagar", lat: 12.9719, lng: 77.6412 },
  { id: 3, name: "Whitefield", lat: 12.9698, lng: 77.7500 },
  { id: 4, name: "Jayanagar", lat: 12.9279, lng: 77.5937 }
]

const users = [
  { id: 1, name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150", area: "Koramangala" },
  { id: 2, name: "Rajesh Kumar", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", area: "Indiranagar" },
  { id: 3, name: "Anita Reddy", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", area: "Whitefield" },
  { id: 4, name: "Vikram Singh", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", area: "Jayanagar" }
]

let posts = [
  {
    id: 1,
    userId: 1,
    text: "Amazing street food festival happening at Forum Mall this weekend! Don't miss the authentic South Indian delicacies 🍛",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"],
    category: "Food",
    areaId: 1,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 8,
    likedBy: [],
    wishlistedBy: []
  },
  {
    id: 2,
    userId: 2,
    text: "Lost my wallet near 100 Feet Road. It's a brown leather wallet with my ID. Please contact if found! 🙏",
    images: [],
    category: "Lost & Found",
    areaId: 2,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    comments: 3,
    likedBy: [],
    wishlistedBy: []
  },
  {
    id: 3,
    userId: 3,
    text: "Free yoga classes every morning at 6 AM in Whitefield Park. Join our community for a healthy start to the day! 🧘‍♀️",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"],
    category: "Health",
    areaId: 3,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes: 45,
    comments: 12,
    likedBy: [],
    wishlistedBy: []
  },
  {
    id: 4,
    userId: 4,
    text: "Selling my barely used bicycle. Perfect for weekend rides around the city. DM for details! 🚴‍♂️",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
    category: "Marketplace",
    areaId: 4,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 18,
    comments: 6,
    likedBy: [],
    wishlistedBy: []
  },
  {
    id: 5,
    userId: 1,
    text: "Beautiful sunset view from my terrace today. Bangalore weather is just perfect! 🌅",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"],
    category: "General",
    areaId: 1,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes: 67,
    comments: 15,
    likedBy: [],
    wishlistedBy: []
  }
]

let comments = [
  { id: 1, postId: 1, userId: 2, text: "Looks delicious! What time does it start?", timestamp: new Date().toISOString() },
  { id: 2, postId: 1, userId: 3, text: "I'll be there for sure!", timestamp: new Date().toISOString() }
]

// Current user (mock authentication)
const currentUser = users[0]

export const mockApi = {
  // Get areas based on location
  async getAreas({ lat, lng }) {
    await delay(300 + Math.random() * 500)
    if (shouldFail()) throw new Error("Failed to fetch areas")
    
    // Return closest area based on coordinates
    const closest = areas.reduce((prev, curr) => {
      const prevDist = Math.abs(prev.lat - lat) + Math.abs(prev.lng - lng)
      const currDist = Math.abs(curr.lat - lat) + Math.abs(curr.lng - lng)
      return currDist < prevDist ? curr : prev
    })
    
    return { areas, closest }
  },

  // Get feed posts with pagination
  async getFeed({ areaId, page = 1, limit = 10, category }) {
    await delay(400 + Math.random() * 400)
    if (shouldFail()) throw new Error("Failed to fetch feed")
    
    let filteredPosts = posts
    if (areaId) filteredPosts = posts.filter(p => p.areaId === areaId)
    if (category) filteredPosts = filteredPosts.filter(p => p.category === category)
    
    // Add user data to posts
    const enrichedPosts = filteredPosts
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice((page - 1) * limit, page * limit)
      .map(post => ({
        ...post,
        user: users.find(u => u.id === post.userId),
        area: areas.find(a => a.id === post.areaId)?.name,
        isLiked: post.likedBy.includes(currentUser.id),
        isWishlisted: post.wishlistedBy.includes(currentUser.id)
      }))
    
    return { posts: enrichedPosts, hasMore: page * limit < filteredPosts.length }
  },

  // Search posts
  async searchPosts({ query, category, timeFilter }) {
    await delay(300 + Math.random() * 300)
    if (shouldFail()) throw new Error("Search failed")
    
    let results = posts.filter(post => 
      post.text.toLowerCase().includes(query.toLowerCase())
    )
    
    if (category) results = results.filter(p => p.category === category)
    
    if (timeFilter === "today") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      results = results.filter(p => new Date(p.timestamp) >= today)
    }
    
    return results.map(post => ({
      ...post,
      user: users.find(u => u.id === post.userId),
      area: areas.find(a => a.id === post.areaId)?.name,
      isLiked: post.likedBy.includes(currentUser.id),
      isWishlisted: post.wishlistedBy.includes(currentUser.id)
    }))
  },

  // Create new post
  async createPost({ text, images, category, areaId }) {
    await delay(500 + Math.random() * 500)
    if (shouldFail()) throw new Error("Failed to create post")
    
    const newPost = {
      id: Date.now(),
      userId: currentUser.id,
      text,
      images: images || [],
      category,
      areaId,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      likedBy: [],
      wishlistedBy: []
    }
    
    posts.unshift(newPost)
    
    return {
      ...newPost,
      user: currentUser,
      area: areas.find(a => a.id === areaId)?.name,
      isLiked: false,
      isWishlisted: false
    }
  },

  // Toggle like with optimistic update support
  async toggleLike({ postId }) {
    await delay(200 + Math.random() * 300)
    if (shouldFail()) throw new Error("Failed to update like")
    
    const post = posts.find(p => p.id === postId)
    if (!post) throw new Error("Post not found")
    
    const isLiked = post.likedBy.includes(currentUser.id)
    
    if (isLiked) {
      post.likedBy = post.likedBy.filter(id => id !== currentUser.id)
      post.likes--
    } else {
      post.likedBy.push(currentUser.id)
      post.likes++
    }
    
    return { isLiked: !isLiked, likes: post.likes }
  },

  // Toggle wishlist with optimistic update support
  async toggleWishlist({ postId }) {
    await delay(200 + Math.random() * 300)
    if (shouldFail()) throw new Error("Failed to update wishlist")
    
    const post = posts.find(p => p.id === postId)
    if (!post) throw new Error("Post not found")
    
    const isWishlisted = post.wishlistedBy.includes(currentUser.id)
    
    if (isWishlisted) {
      post.wishlistedBy = post.wishlistedBy.filter(id => id !== currentUser.id)
    } else {
      post.wishlistedBy.push(currentUser.id)
    }
    
    return { isWishlisted: !isWishlisted }
  },

  // Get user's posts
  async getUserPosts(userId = currentUser.id) {
    await delay(300 + Math.random() * 300)
    if (shouldFail()) throw new Error("Failed to fetch user posts")
    
    return posts
      .filter(p => p.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map(post => ({
        ...post,
        user: users.find(u => u.id === post.userId),
        area: areas.find(a => a.id === post.areaId)?.name,
        isLiked: post.likedBy.includes(currentUser.id),
        isWishlisted: post.wishlistedBy.includes(currentUser.id)
      }))
  },

  // Get wishlisted posts
  async getWishlistedPosts() {
    await delay(300 + Math.random() * 300)
    if (shouldFail()) throw new Error("Failed to fetch wishlist")
    
    return posts
      .filter(p => p.wishlistedBy.includes(currentUser.id))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map(post => ({
        ...post,
        user: users.find(u => u.id === post.userId),
        area: areas.find(a => a.id === post.areaId)?.name,
        isLiked: post.likedBy.includes(currentUser.id),
        isWishlisted: true
      }))
  },

  // Get current user
  getCurrentUser() {
    return currentUser
  },

  // Get categories
  getCategories() {
    return ["General", "Food", "Lost & Found", "Health", "Marketplace", "Events", "Services"]
  }
}