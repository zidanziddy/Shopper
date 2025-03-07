'use client'
import { configureStore } from '@reduxjs/toolkit';  
import shopperReducer from './shopperSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/es/storage';




const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, shopperReducer)

export const store = configureStore({  
  reducer: { productData :persistedReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    
});  
export let persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself  
// export type RootState = ReturnType<typeof store.getState>;  
// export type AppDispatch = typeof store.dispatch;  