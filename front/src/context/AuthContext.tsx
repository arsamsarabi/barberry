import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  FC,
  useEffect,
} from 'react'

import {
  auth,
  createUserProfile,
  fetchUserProfile,
  patchUserProfile,
} from '#lib/firebase'
import type { UserType, UserProfile } from '#types/user'

interface AuthState {
  user: UserType | null
  profile: UserProfile | null
  loading: boolean
}

type AuthContextType = AuthState & {
  signin: (email: string, password: string) => Promise<unknown>
  signup: (email: string, password: string) => Promise<unknown>
  forgotPassword: (email: string) => Promise<unknown>
  updateUserProfile: (user: Partial<UserProfile>) => Promise<unknown>
  signout: () => void
  isAuthenticated: () => boolean
}

const initialState: AuthState = {
  user: null,
  profile: null,
  loading: true,
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signin: (_: string, __: string) => Promise.resolve(null),
  signup: (_: string, __: string) => Promise.resolve(null),
  forgotPassword: (_: string) => Promise.resolve(null),
  updateUserProfile: (_: Partial<UserProfile>) => Promise.resolve(null),
  signout: () => {},
  isAuthenticated: () => false,
})

interface AuthProviderProps {
  children: ReactElement
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState)

  const handleUserChange = (user: UserType | null) => {
    console.log('handleUserChange')
    if (user !== null) getUserProfile(user)
    if (user === null)
      setState({
        ...initialState,
        loading: false,
      })
  }

  const getUserProfile = async (user: UserType | null) => {
    console.log('getUserProfile')
    try {
      const response: any = await fetchUserProfile(user?.uid || '')
      console.log('getUserProfile try')
      console.log('getUserProfile response', response)
      setState({
        ...state,
        user,
        profile: {
          id: response[0]?.id,
          ...response[0]?.value,
        },
        loading: false,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    const newProfile: UserProfile = {
      ...state.profile,
      ...profile,
    } as UserProfile

    try {
      await patchUserProfile(newProfile)
      setState({
        ...state,
        profile: newProfile,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUserChange)
    return unsubscribe
  }, [])

  const value: AuthContextType = {
    ...state,
    signin: async (email: string, password: string) => {
      return auth.signInWithEmailAndPassword(email, password)
    },
    signup: async (email: string, password: string) => {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      if (response.user) {
        createUserProfile(response.user)
      }
      return response
    },
    forgotPassword: async (email: string) => {
      return auth.sendPasswordResetEmail(email)
    },
    signout: () => {
      auth.signOut()
      setState({ ...initialState })
    },
    isAuthenticated: () => Boolean(state.user),
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
export const useAuthContext = (): AuthContextType => useContext(AuthContext)
