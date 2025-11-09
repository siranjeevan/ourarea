import { useState } from "react"
import { Star, Clock, ExternalLink, Gift, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { localStorageHelper } from "@/utils/localStorage"

export function ServiceCard({ service, onViewOffers, onSave }) {
  const [isSaved, setIsSaved] = useState(localStorageHelper.isServiceSaved(service.id))

  const handleSave = () => {
    const success = localStorageHelper.toggleService(service.id)
    if (success) {
      setIsSaved(!isSaved)
      onSave?.(service.id, !isSaved)
    }
  }

  const handleOpenApp = () => {
    // Simulate opening external app
    window.open(service.app_url, '_blank')
  }

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-100 text-orange-800',
      Taxi: 'bg-blue-100 text-blue-800',
      Delivery: 'bg-green-100 text-green-800',
      Offers: 'bg-purple-100 text-purple-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className="p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 bg-white border border-gray-100">
      <div className="flex items-start space-x-3">
        {/* Service Logo */}
        <Avatar className="h-12 w-12 rounded-xl">
          <img 
            src={service.logoUrl} 
            alt={service.name}
            className="h-full w-full object-cover rounded-xl"
          />
        </Avatar>

        {/* Service Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{service.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={cn(
                "h-8 w-8 p-0 rounded-full",
                isSaved ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600"
              )}
              aria-label={isSaved ? "Remove from saved" : "Save service"}
            >
              <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
            </Button>
          </div>

          <p className="text-sm text-gray-600 mb-2">{service.tagline}</p>

          {/* Category and Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <Badge className={cn("text-xs px-2 py-1", getCategoryColor(service.category))}>
              {service.category}
            </Badge>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{service.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock className="h-3 w-3" />
              <span>{service.avg_time}</span>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {service.popular_tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={handleOpenApp}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Open App
            </Button>
            {service.offers && service.offers.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewOffers(service)}
                className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <Gift className="h-3 w-3 mr-1" />
                Offers
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}