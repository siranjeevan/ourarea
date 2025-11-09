import { ExternalLink, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function FamousActivityCard({ activity }) {
  const handleOpenActivity = () => {
    window.open(activity.link_url, '_blank')
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <img 
                src={activity.logo_url} 
                alt={activity.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${activity.name}&background=3b82f6&color=fff&size=40`
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{activity.name}</h3>
              <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200 mt-1">
                {activity.category}
              </Badge>
            </div>
          </div>
          {activity.trending_score > 8 && (
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
              <Star className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
        
        <p className="text-gray-600 text-xs mb-4 line-clamp-2">{activity.description}</p>
        
        <Button 
          onClick={handleOpenActivity}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-9"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open App
        </Button>
      </CardContent>
    </Card>
  )
}