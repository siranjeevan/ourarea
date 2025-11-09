import { useState } from "react"
import { Sparkles } from "lucide-react"
import { ServiceCard } from "@/components/ServiceCard"
import { ServiceFilters } from "@/components/ServiceFilters"
import { OffersSheet } from "@/components/OffersSheet"
import { Badge } from "@/components/ui/badge"
import { useServices } from "@/hooks/useServices"
import { useGeo } from "@/hooks/useGeo"

export function Services() {
  const { area } = useGeo()
  const {
    services,
    loading: servicesLoading,
    selectedCategory,
    setSelectedCategory,
    getNearbyServices
  } = useServices()
  
  const [selectedService, setSelectedService] = useState(null)
  const [showOffers, setShowOffers] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  
  const handleViewOffers = (service) => {
    setSelectedService(service)
    setShowOffers(true)
  }
  
  const handleSaveService = (serviceId, saved) => {
    const action = saved ? 'saved' : 'removed'
    showToast(`Service ${action}!`, 'success')
  }
  
  const handleNearMeClick = () => {
    const nearbyServices = getNearbyServices(area)
    showToast(`Showing ${nearbyServices.length} services near you`, 'info')
  }
  
  const showToast = (message, type) => {
    setToastMessage({ message, type })
    setTimeout(() => setToastMessage(null), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20 md:pb-4 lg:mt-25">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="h-6 w-6 text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-900">Popular Services</h1>
        <Badge className="bg-orange-100 text-orange-800">Trending</Badge>
      </div>
      
      {/* Service Filters */}
      <div className="mb-8">
        <ServiceFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onNearMeClick={handleNearMeClick}
          area={area}
        />
      </div>
      
      {/* Services Grid */}
      {servicesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-2xl p-4 h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewOffers={handleViewOffers}
              onSave={handleSaveService}
            />
          ))}
        </div>
      )}
      
      {/* Offers Sheet */}
      <OffersSheet
        service={selectedService}
        open={showOffers}
        onOpenChange={setShowOffers}
        onToast={showToast}
      />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50 flex justify-center">
          <div className={`px-4 py-2 rounded-lg shadow-lg text-white text-sm ${
            toastMessage.type === 'success' ? 'bg-green-500' :
            toastMessage.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}>
            {toastMessage.message}
          </div>
        </div>
      )}
    </div>
  )
}