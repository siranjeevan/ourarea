import { useState } from "react"
import { Copy, Gift, Calendar, ExternalLink, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"

export function OffersSheet({ service, open, onOpenChange, onToast }) {
  const [copiedCoupon, setCopiedCoupon] = useState(null)

  const copyToClipboard = async (text, offerId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCoupon(offerId)
      onToast?.(`Coupon code "${text}" copied!`, 'success')
      setTimeout(() => setCopiedCoupon(null), 2000)
    } catch (err) {
      onToast?.('Failed to copy coupon code', 'error')
    }
  }

  const handleOpenApp = () => {
    window.open(service?.app_url, '_blank')
    onToast?.('Opening app — demo', 'info')
  }

  if (!service) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogClose />
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-12 w-12 rounded-xl">
              <img 
                src={service.logoUrl} 
                alt={service.name}
                className="h-full w-full object-cover rounded-xl"
              />
            </Avatar>
            <div>
              <DialogTitle className="text-left">{service.name} Offers</DialogTitle>
              <p className="text-sm text-gray-600">{service.tagline}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {service.offers?.map((offer) => (
            <div key={offer.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{offer.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                </div>
                <Gift className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
              </div>

              {/* Coupon Code */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Coupon Code</p>
                    <p className="font-mono font-semibold text-gray-900">{offer.coupon_code}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(offer.coupon_code, offer.id)}
                    className="flex items-center space-x-1"
                  >
                    {copiedCoupon === offer.id ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Expiry and Terms */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Valid until {new Date(offer.expiry).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-500">{offer.terms}</p>
              </div>
            </div>
          ))}

          {/* Action Button */}
          <Button
            onClick={handleOpenApp}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open {service.name} App
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}