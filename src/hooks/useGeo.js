import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/toast"

const areas = [
  { id: 1, name: "Koramangala", lat: 12.9352, lng: 77.6245 },
  { id: 2, name: "Indiranagar", lat: 12.9719, lng: 77.6412 },
  { id: 3, name: "Whitefield", lat: 12.9698, lng: 77.7500 },
  { id: 4, name: "Jayanagar", lat: 12.9279, lng: 77.5937 },
  { id: 5, name: "HSR Layout", lat: 12.9116, lng: 77.6370 },
  { id: 6, name: "Electronic City", lat: 12.8456, lng: 77.6603 }
]

function getClosestArea(lat, lng) {
  return areas.reduce((closest, area) => {
    const closestDist = Math.abs(closest.lat - lat) + Math.abs(closest.lng - lng)
    const areaDist = Math.abs(area.lat - lat) + Math.abs(area.lng - lng)
    return areaDist < closestDist ? area : closest
  })
}

export function useGeo() {
  const [location, setLocation] = useState(null)
  const [area, setArea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToast } = useToast()

  useEffect(() => {
    const updateLocation = (position) => {
      const { latitude: lat, longitude: lng } = position.coords
      setLocation({ lat, lng })
      
      const closestArea = getClosestArea(lat, lng)
      setArea(closestArea)
      setLoading(false)
      setError(null)
    }

    const handleError = () => {
      setError(null)
      setLoading(false)
      // Fallback to Koramangala
      const fallbackArea = areas[0]
      setArea(fallbackArea)
      setLocation({ lat: fallbackArea.lat, lng: fallbackArea.lng })
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