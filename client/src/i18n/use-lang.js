import { useContext } from 'react'

import { I18NContext } from './context'

export const useLang = () => useContext(I18NContext)
