// localStorage helper for managing saved services
const SAVED_SERVICES_KEY = 'ourarea_saved_services'

export const localStorageHelper = {
  // Get saved services from localStorage
  getSavedServices() {
    try {
      const saved = localStorage.getItem(SAVED_SERVICES_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error reading saved services:', error)
      return []
    }
  },

  // Save a service to localStorage
  saveService(serviceId) {
    try {
      const saved = this.getSavedServices()
      if (!saved.includes(serviceId)) {
        saved.push(serviceId)
        localStorage.setItem(SAVED_SERVICES_KEY, JSON.stringify(saved))
      }
      return true
    } catch (error) {
      console.error('Error saving service:', error)
      return false
    }
  },

  // Remove a service from localStorage
  removeService(serviceId) {
    try {
      const saved = this.getSavedServices()
      const filtered = saved.filter(id => id !== serviceId)
      localStorage.setItem(SAVED_SERVICES_KEY, JSON.stringify(filtered))
      return true
    } catch (error) {
      console.error('Error removing service:', error)
      return false
    }
  },

  // Check if a service is saved
  isServiceSaved(serviceId) {
    const saved = this.getSavedServices()
    return saved.includes(serviceId)
  },

  // Toggle save status of a service
  toggleService(serviceId) {
    if (this.isServiceSaved(serviceId)) {
      return this.removeService(serviceId)
    } else {
      return this.saveService(serviceId)
    }
  }
}