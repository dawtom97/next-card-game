import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import { chatApi } from '../services/chat'

export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, chatApi.middleware),
  })

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
