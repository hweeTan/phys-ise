import { useSelector } from 'react-redux'

export const useFileInfo = () => {
  return useSelector((state) => state.fileInfo)
}
