import { useState, useEffect, useCallback } from "react"
import { getAuth } from "firebase/auth"
import { mockApi } from "../api/mockApi"

export function useFeed({ areaId, category } = {}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [areas, setAreas] = useState([])

  const getToken = async () => {
    const auth = getAuth()
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken()
    }
    return null
  }

  const fetchAreas = async () => {
    try {
      // Use mock API for areas
      const mockAreas = [
        { id: 1, name: "Koramangala", center_lat: 12.9352, center_lng: 77.6245 },
        { id: 2, name: "Indiranagar", center_lat: 12.9719, center_lng: 77.6412 },
        { id: 3, name: "Whitefield", center_lat: 12.9698, center_lng: 77.7500 },
        { id: 4, name: "Jayanagar", center_lat: 12.9279, center_lng: 77.5937 }
      ]
      setAreas(mockAreas)
      return mockAreas
    } catch (error) {
      console.error('Error fetching areas:', error)
      return []
    }
  }

  const fetchPosts = useCallback(async (page = 1, limit = 10) => {
    const auth = getAuth()
    if (!auth.currentUser) {
      setError('Not authenticated')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Use mock API for posts
      const result = await mockApi.getFeed({ areaId, page, limit })
      const transformedPosts = result.posts.map(post => ({
        id: post.id,
        user: {
          id: post.user.id,
          name: post.user.name,
          avatar: post.user.avatar
        },
        text: post.text,
        images: post.images,
        category: post.category,
        area: post.area,
        timestamp: post.timestamp,
        likes: post.likes,
        comments: post.comments,
        isLiked: post.isLiked,
        isWishlisted: post.isWishlisted
      }))

      if (page === 1) {
        setPosts(transformedPosts)
      } else {
        setPosts(prev => [...prev, ...transformedPosts])
      }
      setHasMore(result.hasMore)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }, [areaId])

  const refresh = useCallback(() => {
    fetchPosts(1)
  }, [fetchPosts])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = Math.floor(posts.length / 10) + 1
      fetchPosts(nextPage)
    }
  }, [loading, hasMore, posts.length, fetchPosts])

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
    fetchAreas()
  }, [])

  useEffect(() => {
    if (areas.length > 0) {
      fetchPosts(1)
    }
  }, [areaId, category, areas, fetchPosts])

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