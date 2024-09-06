import React , { createContext, useState }from 'react'

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [cUser,setCUser] = useState({})  
   /*  const [isLoggedIn,setIsLoggedIn] = useState(false) */
  

  return (
   <UserContext.Provider value={{cUser,setCUser}}>
    {children}
   </UserContext.Provider>
  )
}

