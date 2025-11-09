# OurArea - Hyper-Local Social Feed

A modern, mobile-first social feed application for hyper-local community engagement built with React, Vite, Tailwind CSS, and shadcn/ui components.

## Features

- 📱 **Mobile-First Design** - Responsive UI with bottom navigation for mobile and top navigation for desktop
- 📍 **Location-Based Feed** - Automatic geolocation detection with area-based post filtering
- 🔍 **Smart Search** - Debounced search with category and time filters
- ❤️ **Optimistic Updates** - Instant UI feedback for likes and wishlist actions with rollback on failure
- 📝 **Rich Post Creation** - Text posts with image upload and category selection
- 👤 **User Profiles** - Personal posts and saved items management
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 🔄 **Real-time Updates** - Location change detection with automatic feed refresh
- ⭐ **Popular Services** - Trending local services with offers, filtering, and favorites

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Hooks + Context
- **Mock API**: In-memory data with simulated network latency

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── mockApi.js          # Mock API with simulated data
├── components/
│   ├── layout/
│   │   ├── BottomNav.jsx    # Mobile bottom navigation
│   │   └── TopNav.jsx       # Desktop top navigation
│   ├── post/
│   │   └── PostCard.jsx     # Reusable post component
│   ├── ServiceCard.jsx      # Individual service card
│   ├── ServiceCarousel.jsx  # Horizontal service carousel
│   ├── ServiceFilters.jsx   # Category and location filters
│   ├── OffersSheet.jsx      # Service offers modal
│   └── ui/                  # shadcn/ui components
│       ├── avatar.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── dialog.jsx
│       ├── input.jsx
│       ├── select.jsx
│       ├── textarea.jsx
│       └── toast.jsx
├── hooks/
│   ├── useAuth.js          # Authentication hook
│   ├── useDebounce.js      # Search debouncing
│   ├── useFeed.js          # Feed data management
│   ├── useGeo.js           # Geolocation handling
│   └── useServices.js      # Services data management
├── pages/
│   ├── Create.jsx          # Post creation page
│   ├── Home.jsx            # Main feed page
│   ├── Profile.jsx         # User profile page
│   └── Search.jsx          # Search page
├── lib/
│   └── utils.js            # Utility functions
├── data/
│   └── services.js         # Mock services data
├── utils/
│   └── localStorage.js     # localStorage helper
└── App.jsx                 # Main app component
```

## Key Features Explained

### Optimistic Updates
The app implements optimistic UI updates for like and wishlist actions:
- UI updates immediately when user clicks
- API call happens in background
- On failure, UI rolls back to previous state
- User sees toast notification on errors

### Geolocation Integration
The `useGeo` hook provides:
- Automatic location detection on app load
- Continuous position monitoring
- Area-based feed filtering
- Automatic feed refresh when location changes >200m
- Fallback to default area if location access denied

### Mock API Design
The mock API (`src/api/mockApi.js`) simulates:
- Network latency (300-800ms)
- 5% failure rate for testing error handling
- Realistic data relationships
- Easy swap with real endpoints

### Popular Services Feature
The Popular Services section includes:
- **Service Cards**: Logo, rating, delivery time, category badges
- **Horizontal Carousel**: Mobile-optimized scrolling with desktop navigation
- **Category Filtering**: Food, Taxi, Delivery, Offers with visual chips
- **Location Filtering**: "Near Me" functionality using geolocation
- **Offers Modal**: Detailed offers with coupon codes and copy functionality
- **Favorites**: Save/unsave services with localStorage persistence
- **External Links**: Open app functionality with toast feedback

## Converting to Production

### Replace Mock API with Real Backend

1. **Update API base URL** in `src/api/mockApi.js`:
   ```javascript
   const API_BASE_URL = 'https://your-api.com/api'
   ```

2. **Replace mock functions** with real HTTP calls:
   ```javascript
   // Before (mock)
   async getFeed({ areaId, page, limit }) {
     await delay(400)
     return mockData
   }
   
   // After (real API)
   async getFeed({ areaId, page, limit }) {
     const response = await fetch(`${API_BASE_URL}/feed?areaId=${areaId}&page=${page}&limit=${limit}`)
     return response.json()
   }
   ```

3. **Add authentication** in `src/hooks/useAuth.js`:
   ```javascript
   // Replace mock user with real auth
   const login = async (credentials) => {
     const response = await fetch(`${API_BASE_URL}/auth/login`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(credentials)
     })
     const { token, user } = await response.json()
     localStorage.setItem('token', token)
     setUser(user)
   }
   ```

### Expected API Endpoints

- `GET /api/feed?areaId={id}&page={n}&limit={n}` - Get paginated posts
- `POST /api/posts` - Create new post
- `POST /api/posts/{id}/like` - Toggle like
- `POST /api/posts/{id}/wishlist` - Toggle wishlist
- `GET /api/search?q={query}&category={cat}` - Search posts
- `GET /api/areas?lat={lat}&lng={lng}` - Get nearby areas
- `GET /api/users/{id}/posts` - Get user posts
- `GET /api/users/{id}/wishlist` - Get user wishlist
- `GET /api/services?category={cat}&area={scope}` - Get popular services
- `GET /api/services/{id}/offers` - Get service offers

### Environment Variables
Create `.env` file for production:
```
VITE_API_BASE_URL=https://your-api.com/api
VITE_GOOGLE_MAPS_API_KEY=your_maps_key
VITE_APP_ENV=production
```

## shadcn/ui Component Usage

The app uses shadcn/ui components extensively:

- **Card**: Post containers, service cards, and profile sections
- **Button**: All interactive elements with variants (default, outline, ghost)
- **Avatar**: User profile pictures and service logos with fallbacks
- **Badge**: Categories, status indicators, and filter chips
- **Dialog**: Service offers modal with overlay
- **Select**: Category and location filtering dropdowns
- **Input/Textarea**: Form controls
- **Toast**: Success/error notifications

To customize components, modify files in `src/components/ui/` or update Tailwind theme in `src/index.css`.

## Development Notes

- **Mobile-first**: Design prioritizes mobile experience
- **Accessibility**: All interactive elements have proper ARIA labels
- **Performance**: Debounced search, optimistic updates, lazy loading
- **Error Handling**: Comprehensive error states with retry mechanisms
- **Type Safety**: Ready for TypeScript conversion

## Build for Production

```bash
npm run build
npm run preview
```

## License

MIT License - feel free to use this project as a starting point for your own hyper-local social applications.
