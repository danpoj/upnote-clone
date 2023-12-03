import { useEffect, useState } from 'react'

// 처음 Server Side Rendering인 경우 isLoading === false
// 브라우저 환경으로 넘어오면 isLoading === true 입니다.

// ✅ localStorage에 저장된 key가 있는 경우 value에 값을 저장합니다.
// ❌ localStorage에 저장된 key가 없는 경우 value === undefined 입니다.

// typescript를 사용하는 경우, generic으로 데이터 type을 넘겨줘야합니다.

export const useLocalStorage = <T>(
  key: string
): [value: T | undefined, setValueToLocalStorage: (val: T) => void, isMount: boolean] => {
  const [value, setValue] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)

  const setValueToLocalStorage = (val: T) => {
    localStorage.setItem(key, JSON.stringify(val))
    setValue(val)
  }

  useEffect(() => {
    const localStorageValue = localStorage.getItem(key)

    if (localStorageValue) {
      const parsedLocalStorageValue = JSON.parse(localStorageValue) as T
      setValue(parsedLocalStorageValue)
    }
  }, [key])

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return [value, setValueToLocalStorage, isLoading]
}
