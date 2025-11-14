import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getRedirectResult
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Convert Firebase user to our app's user format
        const appUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          display_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          username: firebaseUser.email?.split('@')[0] || firebaseUser.uid,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          provider: firebaseUser.providerData[0]?.providerId || 'firebase'
        }
        setUser(appUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Handle redirect result for Google sign-in
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
          // User successfully signed in with Google
          console.log('Google sign-in successful via redirect')
        }
      } catch (error) {
        console.error('Error handling redirect result:', error)
      }
    }

    handleRedirectResult()

    return () => unsubscribe()
  }, [])

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Email login error:', error)
      let errorMessage = 'Login failed'

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed login attempts. Please try again later'
          break
        default:
          errorMessage = error.message
      }

      return { success: false, error: errorMessage }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Google sign-in successful:', result.user)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Google login error:', error)

      // If popup is blocked, try redirect as fallback
      if (error.code === 'auth/popup-blocked') {
        try {
          console.log('Popup blocked, trying redirect...')
          await signInWithRedirect(auth, googleProvider)
          return { success: true, redirecting: true }
        } catch (redirectError) {
          console.error('Redirect also failed:', redirectError)
          return { success: false, error: 'Google sign-in is blocked. Please allow popups or try again.' }
        }
      }

      let errorMessage = 'Google sign-in failed'

      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled'
          break
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in was cancelled'
          break
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with this email using a different sign-in method'
          break
        case 'auth/auth-domain-config-required':
          errorMessage = 'Firebase auth domain not configured properly'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Google sign-in is not enabled in Firebase'
          break
        default:
          errorMessage = error.message
      }

      return { success: false, error: errorMessage }
    }
  }

  const signupWithEmail = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)

      // Update the user profile with display name
      if (displayName && result.user) {
        await updateProfile(result.user, {
          displayName: displayName
        })
      }

      return { success: true, user: result.user }
    } catch (error) {
      console.error('Email signup error:', error)
      let errorMessage = 'Account creation failed'

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/weak-password':
          errorMessage = 'Password is too weak'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled'
          break
        default:
          errorMessage = error.message
      }

      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: 'Logout failed' }
    }
  }

  // Legacy methods for backward compatibility (they now use email instead of username)
  const login = async (email, password) => {
    return await loginWithEmail(email, password)
  }

  const signup = async (displayName, email, password) => {
    return await signupWithEmail(email, password, displayName)
  }

  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    loginWithEmail,
    loginWithGoogle,
    signup,
    signupWithEmail,
    logout
  }
}