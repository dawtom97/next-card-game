// pages/_app.tsx
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
