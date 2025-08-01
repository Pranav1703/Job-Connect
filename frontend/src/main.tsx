import React, { useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider }from "@chakra-ui/react"

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  //<React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  //</React.StrictMode>
)
