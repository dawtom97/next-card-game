import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import { chatApi } from '../services/chat'
import { user } from '../services/user'

export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [chatApi.reducerPath]: chatApi.reducer,
      [user.reducerPath]: user.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, chatApi.middleware, user.middleware),
  })

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
