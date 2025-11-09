// Mock data for popular services
export const mockServices = [
  {
    id: 'zomato',
    name: 'Zomato',
    logoUrl: 'https://picsum.photos/seed/zomato/100/100',
    category: 'Food',
    rating: 4.3,
    avg_time: '25-35 mins',
    tagline: 'Food delivery & dining',
    area_scope: 'city',
    popular_tags: ['Discounts', 'Fast', 'Variety'],
    app_url: 'https://zomato.com',
    offers: [
      {
        id: 'zomato-1',
        title: '50% OFF on first order',
        description: 'Get 50% discount up to ₹100 on your first food order',
        coupon_code: 'FIRST50',
        expiry: '2024-12-31',
        terms: 'Valid for new users only. Minimum order ₹199.'
      },
      {
        id: 'zomato-2',
        title: 'Free delivery',
        description: 'Free delivery on orders above ₹299',
        coupon_code: 'FREEDEL',
        expiry: '2024-12-25',
        terms: 'Valid on all restaurants. No minimum order.'
      }
    ]
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    logoUrl: 'https://picsum.photos/seed/swiggy/100/100',
    category: 'Food',
    rating: 4.2,
    avg_time: '20-30 mins',
    tagline: 'Food & grocery delivery',
    area_scope: 'city',
    popular_tags: ['Fast', 'Trusted', 'Grocery'],
    app_url: 'https://swiggy.com',
    offers: [
      {
        id: 'swiggy-1',
        title: '60% OFF + Free delivery',
        description: 'Get 60% off up to ₹120 + free delivery',
        coupon_code: 'WELCOME60',
        expiry: '2024-12-30',
        terms: 'Valid for new users. Minimum order ₹149.'
      }
    ]
  },
  {
    id: 'rapido',
    name: 'Rapido',
    logoUrl: 'https://picsum.photos/seed/rapido/100/100',
    category: 'Taxi',
    rating: 4.1,
    avg_time: '5-10 mins',
    tagline: 'Bike taxi & delivery',
    area_scope: 'city',
    popular_tags: ['Quick', 'Affordable', 'Bike'],
    app_url: 'https://rapido.bike',
    offers: [
      {
        id: 'rapido-1',
        title: '₹50 OFF on rides',
        description: 'Get ₹50 off on your next 3 rides',
        coupon_code: 'RIDE50',
        expiry: '2024-12-28',
        terms: 'Valid on bike rides only. Maximum discount ₹50 per ride.'
      }
    ]
  },
  {
    id: 'uber',
    name: 'Uber',
    logoUrl: 'https://picsum.photos/seed/uber/100/100',
    category: 'Taxi',
    rating: 4.0,
    avg_time: '8-15 mins',
    tagline: 'Rides & food delivery',
    area_scope: 'country',
    popular_tags: ['Reliable', 'Global', 'Premium'],
    app_url: 'https://uber.com',
    offers: [
      {
        id: 'uber-1',
        title: '25% OFF first ride',
        description: 'Get 25% discount up to ₹75 on your first ride',
        coupon_code: 'FIRST25',
        expiry: '2024-12-31',
        terms: 'Valid for new users only.'
      }
    ]
  },
  {
    id: 'dunzo',
    name: 'Dunzo',
    logoUrl: 'https://picsum.photos/seed/dunzo/100/100',
    category: 'Delivery',
    rating: 3.9,
    avg_time: '45-60 mins',
    tagline: 'Instant delivery service',
    area_scope: 'city',
    popular_tags: ['Instant', 'Groceries', 'Medicine'],
    app_url: 'https://dunzo.com',
    offers: [
      {
        id: 'dunzo-1',
        title: 'Free delivery on groceries',
        description: 'Free delivery on grocery orders above ₹500',
        coupon_code: 'GROCERY',
        expiry: '2024-12-29',
        terms: 'Valid on grocery orders only.'
      }
    ]
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    logoUrl: 'https://picsum.photos/seed/bigbasket/100/100',
    category: 'Delivery',
    rating: 4.2,
    avg_time: '2-4 hours',
    tagline: 'Online grocery store',
    area_scope: 'state',
    popular_tags: ['Groceries', 'Fresh', 'Bulk'],
    app_url: 'https://bigbasket.com',
    offers: [
      {
        id: 'bigbasket-1',
        title: '₹200 OFF on ₹1000',
        description: 'Get ₹200 off on orders above ₹1000',
        coupon_code: 'BB200',
        expiry: '2024-12-27',
        terms: 'Valid on first order. Minimum order ₹1000.'
      }
    ]
  },
  {
    id: 'bookmyshow',
    name: 'BookMyShow',
    logoUrl: 'https://picsum.photos/seed/bookmyshow/100/100',
    category: 'Offers',
    rating: 4.4,
    avg_time: 'Instant',
    tagline: 'Movie & event tickets',
    area_scope: 'country',
    popular_tags: ['Movies', 'Events', 'Entertainment'],
    app_url: 'https://bookmyshow.com',
    offers: [
      {
        id: 'bms-1',
        title: 'Buy 1 Get 1 FREE',
        description: 'Buy 1 movie ticket and get 1 free on weekdays',
        coupon_code: 'BUY1GET1',
        expiry: '2024-12-26',
        terms: 'Valid on weekdays only. Select cinemas.'
      }
    ]
  },
  {
    id: 'paytm',
    name: 'Paytm',
    logoUrl: 'https://picsum.photos/seed/paytm/100/100',
    category: 'Offers',
    rating: 4.1,
    avg_time: 'Instant',
    tagline: 'Digital payments & offers',
    area_scope: 'country',
    popular_tags: ['Cashback', 'Recharge', 'Bills'],
    app_url: 'https://paytm.com',
    offers: [
      {
        id: 'paytm-1',
        title: '₹50 Cashback on recharge',
        description: 'Get ₹50 cashback on mobile recharge above ₹199',
        coupon_code: 'RECHARGE50',
        expiry: '2024-12-31',
        terms: 'Valid once per user. Minimum recharge ₹199.'
      }
    ]
  }
]

export const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Food', label: 'Food' },
  { value: 'Taxi', label: 'Taxi' },
  { value: 'Delivery', label: 'Delivery' },
  { value: 'Offers', label: 'Offers' }
]