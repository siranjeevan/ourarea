import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "./ServiceCard"
import { cn } from "@/lib/utils"

export function ServiceCarousel({ services, onViewOffers, onSave, className }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280 // Width of one card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (!services || services.length === 0) {
    return null
  }

  return (
    <div className={cn("relative", className)}>
      {/* Desktop Navigation Buttons */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="sm"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full bg-white shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full bg-white shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 md:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          <div key={service.id} className="flex-none w-72">
            <ServiceCard
              service={service}
              onViewOffers={onViewOffers}
              onSave={onSave}
            />
          </div>
        ))}
      </div>


    </div>
  )
}