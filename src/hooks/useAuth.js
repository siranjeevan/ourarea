// Simple auth hook - returns current user
export function useAuth() {
  const user = {
    id: 1,
    name: "Jeevith",
    avatar: "https://picsum.photos/150/150?random=1",
    area: "Koramangala"
  }
  
  return {
    user,
    isAuthenticated: !!user,
    login: () => {}, // Stub for future implementation
    logout: () => {} // Stub for future implementation
  }
}