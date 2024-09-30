import { Provider } from 'react-redux'

import 'sanitize.css/sanitize.css'

import { HomePage } from 'src/containers/HomePage'
import { I18NProvider } from 'src/i18n/I18NProvider'
import store from './store'
import { GlobalStyle } from './global-styles'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <I18NProvider>
        <HomePage />
      </I18NProvider>
    </Provider>
  )
}

export default App
