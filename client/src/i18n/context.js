import { createContext } from 'react'

export const I18NContext = createContext({ lang: 'en', setLang: () => {} })
