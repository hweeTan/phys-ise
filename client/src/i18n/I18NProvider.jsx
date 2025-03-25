import { useState } from 'react'

import { I18NContext } from './context'
import i18n from './i18n'

export const I18NProvider = ({ children }) => {
  const [lang, setLang] = useState('en')

  i18n.lang = lang

  return (
    <I18NContext.Provider
      value={{
        lang,
        switchLang: () => {
          setLang((prev) => (prev === 'vi' ? 'en' : 'vi'))
        },
      }}
    >
      {children}
    </I18NContext.Provider>
  )
}
