import { useState, useEffect, useMemo } from "react"
import { mockServices } from "@/data/services"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Simulate loading services
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true)
      await delay(Math.random() * 350 + 250) // 250-600ms delay
      setServices(mockServices)
      setLoading(false)
    }

    loadServices()
  }, [])

  // Filter services based on selected category
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') {
      return services
    }
    return services.filter(service => service.category === selectedCategory)
  }, [services, selectedCategory])

  // Get services filtered by area scope (for "Near Me" functionality)
  const getNearbyServices = (area) => {
    if (!area) return filteredServices
    
    // Simple filtering based on area scope
    return filteredServices.filter(service => {
      switch (service.area_scope) {
        case 'city':
          return true // Always show city-level services
        case 'state':
          return true // Show state-level services
        case 'country':
          return true // Show country-level services
        case 'district':
          return true // Show district-level services
        default:
          return true
      }
    })
  }

  return {
    services: filteredServices,
    loading,
    selectedCategory,
    setSelectedCategory,
    getNearbyServices
  }
}