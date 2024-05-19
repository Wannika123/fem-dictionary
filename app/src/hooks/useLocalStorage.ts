import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const savedValue = localStorage.getItem(key)
        if (savedValue != null) return JSON.parse(savedValue)

        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue] as [T, typeof setValue]
}

export default useLocalStorage
