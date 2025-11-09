import { Users, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGeo } from "@/hooks/useGeo"

const suggestedPeople = [
  { id: 1, name: "Arjun Patel", avatar: "https://picsum.photos/150/150?random=4", area: "Koramangala", mutualConnections: 3 },
  { id: 2, name: "Sneha Reddy", avatar: "https://picsum.photos/150/150?random=5", area: "Koramangala", mutualConnections: 5 },
  { id: 3, name: "Kiran Kumar", avatar: "https://picsum.photos/150/150?random=6", area: "Indiranagar", mutualConnections: 2 },
  { id: 4, name: "Meera Singh", avatar: "https://picsum.photos/150/150?random=7", area: "Whitefield", mutualConnections: 1 }
]

export function RightSidebar() {
  const { area } = useGeo()

  const areapeople = suggestedPeople.filter(person => person.area === area?.name)
  const otherPeople = suggestedPeople.filter(person => person.area !== area?.name).slice(0, 2)

  return (
    <aside className="hidden xl:flex fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-l border-gray-200 shadow-xl z-40 flex-col p-6 overflow-y-auto lg:mt-20">
      <div className="space-y-6">
        {/* Area People */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center space-x-2 text-gray-900">
              <Users className="h-5 w-5 text-blue-600" />
              <span>People in {area?.name || "Your Area"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {areapeople.length > 0 ? areapeople.map(person => (
              <div key={person.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className="bg-blue-600 text-white">{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.mutualConnections} mutual</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No suggestions yet</p>
            )}
          </CardContent>
        </Card>

        {/* Nearby Areas */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-gray-900">Nearby Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {otherPeople.map(person => (
              <div key={person.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{person.name}</p>
                    <Badge variant="outline" className="text-xs">{person.area}</Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}