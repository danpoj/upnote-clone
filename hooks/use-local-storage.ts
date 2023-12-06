import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
  key: string
): [value: T | undefined, setValue: Dispatch<SetStateAction<T | undefined>>, isMount: boolean] => {
  const [value, setValue] = useState<T>()
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    const localStorageValue = localStorage.getItem(key)

    if (!localStorageValue) return

    const parsedLocalStorageValue = JSON.parse(localStorageValue) as T
    setValue(parsedLocalStorageValue)
  }, [key])

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value, key])

  useEffect(() => {
    setIsMount(true)
  }, [])

  return [value, setValue, isMount]
}
