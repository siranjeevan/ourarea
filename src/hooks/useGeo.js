import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/toast"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://our-area-backend.onrender.com'

function getClosestArea(areas, lat, lng) {
  return areas.reduce((closest, area) => {
    const closestDist = Math.abs(closest.center_lat - lat) + Math.abs(closest.center_lng - lng)
    const areaDist = Math.abs(area.center_lat - lat) + Math.abs(area.center_lng - lng)
    return areaDist < closestDist ? area : closest
  })
}

export function useGeo() {
  const [location, setLocation] = useState(null)
  const [area, setArea] = useState(null)
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToast } = useToast()

  const fetchAreas = async () => {
    try {
      // Use mock areas data
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

  useEffect(() => {
    const updateLocation = async (position) => {
      const { latitude: lat, longitude: lng } = position.coords
      setLocation({ lat, lng })

      const apiAreas = await fetchAreas()
      if (apiAreas.length > 0) {
        const closestArea = getClosestArea(apiAreas, lat, lng)
        setArea(closestArea)
      }
      setLoading(false)
      setError(null)
    }

    const handleError = async () => {
      setError(null)
      setLoading(false)
      // Fallback to first area
      const apiAreas = await fetchAreas()
      if (apiAreas.length > 0) {
        const fallbackArea = apiAreas[0]
        setArea(fallbackArea)
        setLocation({ lat: fallbackArea.center_lat, lng: fallbackArea.center_lng })
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      })
    } else {
      handleError()
    }
  }, [addToast])

  return { location, area, loading, error }
}

// Calculate distance between two coordinates in meters
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180
  const φ2 = lat2 * Math.PI/180
  const Δφ = (lat2-lat1) * Math.PI/180
  const Δλ = (lng2-lng1) * Math.PI/180

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  return R * c
}