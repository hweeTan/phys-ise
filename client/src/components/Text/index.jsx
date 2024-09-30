import { useLang, i18n } from 'src/i18n'

export const Text = ({ as = 'span', content, ...props }) => {
  useLang()

  const Component = as

  return <Component {...props}>{i18n[content]}</Component>
}
