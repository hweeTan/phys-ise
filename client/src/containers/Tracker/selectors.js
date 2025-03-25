import { useSelector } from 'react-redux'

export const useTracker = () => {
  return useSelector((state) => state.tracker)
}
