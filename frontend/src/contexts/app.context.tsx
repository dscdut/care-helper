import { createContext, useState } from 'react'
import { ReactWithChild } from 'src/interface/app'
import { getAccessTokenFromLS } from 'src/utils/auth'

export interface AppContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextType>(initAppContext)

const AppContextProvider = ({ children }: ReactWithChild) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>
}

export default AppContextProvider
