import { useEffect } from "react"
import { useHeaderContext } from "../context/headerContext"

export const useHeaderTitle = (newTitle: string) => {
  const { title, setTitle } = useHeaderContext()

  useEffect(() => {
    const oldTitle = title

    setTitle(newTitle)

    return () => {
      setTitle(oldTitle)
    }
  }, [title, newTitle, setTitle])
}