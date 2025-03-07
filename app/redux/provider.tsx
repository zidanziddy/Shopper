'use client'
import { Provider } from "react-redux"
import {store ,persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react'


export function Providers ({children}){

  return(
    <Provider store={store}>
      <PersistGate loading={"Loading"} persistor={persistor}>
      {children}

      </PersistGate>
    </Provider>
  )

}