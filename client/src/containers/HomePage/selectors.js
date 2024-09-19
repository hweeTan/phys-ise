import { useSelector } from 'react-redux'

export const useHomePage = () => {
  return useSelector((state) => state.homePage)
}
