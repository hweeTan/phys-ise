import { useLang, i18n } from 'src/i18n'

export const Text = ({ as: Component = 'span', content, ...props }) => {
  useLang()

  return <Component {...props}>{i18n[content]}</Component>
}
