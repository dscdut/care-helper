import { createContext, useState } from 'react'
import { ReactWithChild } from 'src/interface/app'
import { getAccessTokenFromLS } from 'src/utils/auth'

export interface AppContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const initAppContext: AppContextType = {
  // isAuthenticated: Boolean(getAccessTokenFromLS()),
  isAuthenticated: true,
  setIsAuthenticated: () => null,
  showSidebar: true,
  setShowSidebar: () => null
}

export const AppContext = createContext<AppContextType>(initAppContext)

const AppContextProvider = ({ children }: ReactWithChild) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initAppContext.isAuthenticated)
  const [showSidebar, setShowSidebar] = useState<boolean>(initAppContext.showSidebar)
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, showSidebar, setShowSidebar }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
