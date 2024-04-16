import React, { useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider }from "@chakra-ui/react"
// import { Context } from "./context/context.ts"


// export const Context = createContext({
//   isAuthorized: false,
//   setIsAuthorized: (value: boolean) => {}, 
//   user: {role:""},
//   setUser: (user: any) => {}
// });


// const AppWrapper = ()=>{
//   const [isAuthorized,setIsAuthorized] = useState(false)
//   const [user,setUser] = useState({role:""})
//   return (
//     // <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser}}>
//       <ChakraProvider>
//         <App/>
//       </ChakraProvider>
//     // </Context.Provider>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
