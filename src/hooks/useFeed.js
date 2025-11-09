import { useState, useEffect, useCallback } from "react"

const staticPosts = [
  {
    id: 1,
    user: { id: 1, name: "Jeevith", avatar: "https://picsum.photos/150/150?random=1" },
    text: "Amazing street food festival happening at Forum Mall this weekend! Don't miss the authentic South Indian delicacies 🍛",
    images: ["https://picsum.photos/400/300?random=10"],
    category: "Food",
    area: "Koramangala",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 8,
    isLiked: false,
    isWishlisted: false
  },
  {
    id: 2,
    user: { id: 2, name: "Rajesh Kumar", avatar: "https://picsum.photos/150/150?random=2" },
    text: "Lost my wallet near 100 Feet Road. It's a brown leather wallet with my ID. Please contact if found! 🙏",
    images: [],
    category: "Lost & Found",
    area: "Indiranagar",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    comments: 3,
    isLiked: false,
    isWishlisted: false
  },
  {
    id: 3,
    user: { id: 3, name: "Anita Reddy", avatar: "https://picsum.photos/150/150?random=3" },
    text: "Free yoga classes every morning at 6 AM in Whitefield Park. Join our community for a healthy start to the day! 🧘♀️",
    images: ["https://picsum.photos/400/300?random=11"],
    category: "Health",
    area: "Whitefield",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes: 45,
    comments: 12,
    isLiked: false,
    isWishlisted: false
  }
]

export function useFeed({ areaId, category } = {}) {
  const [posts, setPosts] = useState(staticPosts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)

  const refresh = useCallback(() => {
    setPosts(staticPosts)
  }, [])

  const loadMore = useCallback(() => {}, [])

  const updatePostLike = useCallback((postId, isLiked, likes) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked, likes }
        : post
    ))
  }, [])

  const updatePostWishlist = useCallback((postId, isWishlisted) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isWishlisted }
        : post
    ))
  }, [])

  const addPost = useCallback((newPost) => {
    setPosts(prev => [newPost, ...prev])
  }, [])

  useEffect(() => {
    setPosts(staticPosts)
  }, [areaId, category])

  return {
    posts,
    loading,
    error,
    hasMore,
    refresh,
    loadMore,
    updatePostLike,
    updatePostWishlist,
    addPost
  }
}