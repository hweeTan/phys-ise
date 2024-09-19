import { useSelector } from 'react-redux'

export const useWindows = () => {
  return useSelector((state) => state.windows)
}
