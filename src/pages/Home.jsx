import { useEffect, useState } from "react"
import { PostCard } from "@/components/post/PostCard"
import { ServiceCarousel } from "@/components/ServiceCarousel"
import { ServiceFilters } from "@/components/ServiceFilters"
import { OffersSheet } from "@/components/OffersSheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, RefreshCw, Sparkles } from "lucide-react"
import { useFeed } from "@/hooks/useFeed"
import { useGeo } from "@/hooks/useGeo"
import { useServices } from "@/hooks/useServices"


export function Home() {
  const { area, loading: geoLoading } = useGeo()
  const {
    posts,
    loading,
    error,
    hasMore,
    refresh,
    loadMore,
    updatePostLike,
    updatePostWishlist
  } = useFeed({ areaId: area?.id })
  
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

  // Refresh feed when area changes
  useEffect(() => {
    if (area) {
      refresh()
    }
  }, [area, refresh])
  
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

  if (geoLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-2">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">Getting your location...</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" lg:w-210 xl:max-w-3xl mx-auto p-4 pb-20 md:pb-4 lg:mt-20">
      {/* Area Header */} 
      {area && (
        <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-semibold">Your Area</h2>
              <p className="text-sm text-muted-foreground">{area.name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      )}
      
      {/* Popular Services Section - Desktop Only */}
      <div className="mb-8 hidden lg:block">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-900">Popular Services</h2>
          <Badge className="bg-orange-100 text-orange-800">Trending</Badge>
        </div>
        
        {/* Service Filters */}
        <div className="mb-4">
          <ServiceFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onNearMeClick={handleNearMeClick}
            area={area}
          />
        </div>
        
        {/* Services Loading State */}
        {servicesLoading ? (
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-none w-72">
                <div className="animate-pulse bg-muted rounded-2xl p-4 h-48" />
              </div>
            ))}
          </div>
        ) : (
          /* Services Carousel */
          <ServiceCarousel
            services={services}
            onViewOffers={handleViewOffers}
            onSave={handleSaveService}
          />
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={refresh}>Try Again</Button>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLikeUpdate={updatePostLike}
            onWishlistUpdate={updatePostWishlist}
          />
        ))}
      </div>

      {/* Loading State */}
      {loading && posts.length === 0 && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-muted-foreground/20 rounded-full" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-muted-foreground/20 rounded" />
                    <div className="h-3 w-32 bg-muted-foreground/20 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted-foreground/20 rounded" />
                  <div className="h-4 w-3/4 bg-muted-foreground/20 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && posts.length > 0 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="text-6xl">📍</div>
            <h3 className="text-lg font-semibold">No posts in your area yet</h3>
            <p className="text-muted-foreground">
              Be the first to share something with your neighbors!
            </p>
            <Button>Create First Post</Button>
          </div>
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