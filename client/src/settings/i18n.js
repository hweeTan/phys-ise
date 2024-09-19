import createLanguages from 'simple-languages'

const Languages = createLanguages()

Languages.lang = 'vi'

Languages.data = {
  en: {
    hello: 'Hello',
  },
  vi: {
    hello: 'Xin chào',
  },
}

export default Languages
