import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/fonts/montserrat/montserrat.css'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.oncontextmenu = function () {
      return false
    }
    return () => {}
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
