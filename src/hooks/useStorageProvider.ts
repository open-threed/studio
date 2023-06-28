import { useEffect, useState } from 'react'
import clearLocalStorage from '../utils/clearLocalStorage'
// import getObjectDiff from '../../utils/getObjectDiff'

export default function useStorageProvider() {
  const [cleaning, setClear] = useState(false)
  
  useEffect(() => {
    if(window.location.href.includes('?reset=document')) {
      setClear(true)
      clearLocalStorage()
      setTimeout(() => {
        window.location.href = '/'
      }, 1000);
    } 
  }, [])

  const isLoading = cleaning

  return {
    isLoading
  }
}
