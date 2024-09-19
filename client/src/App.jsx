import { Provider } from 'react-redux'

import 'sanitize.css/sanitize.css'

import { HomePage } from 'src/containers/HomePage'
import store from './store'
import { GlobalStyle } from './global-styles'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <HomePage />
    </Provider>
  )
}

export default App
