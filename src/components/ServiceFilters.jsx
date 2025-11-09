import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { categoryOptions } from "@/data/services"
import { cn } from "@/lib/utils"

export function ServiceFilters({ 
  selectedCategory, 
  onCategoryChange, 
  onNearMeClick,
  area 
}) {
  return (
    <div className="space-y-3">
      {/* Category Filter */}
      <div className="flex items-center space-x-2">
        <Select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-40"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        {/* Near Me Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onNearMeClick}
          className="flex items-center space-x-2"
        >
          <MapPin className="h-4 w-4" />
          <span>Near Me</span>
        </Button>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {categoryOptions.slice(1).map((category) => (
          <Badge
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "secondary"}
            className={cn(
              "cursor-pointer transition-colors",
              selectedCategory === category.value
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "hover:bg-gray-200"
            )}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </Badge>
        ))}
      </div>

      {/* Current Area Display */}
      {area && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>Showing services for {area.name}</span>
        </div>
      )}
    </div>
  )
}