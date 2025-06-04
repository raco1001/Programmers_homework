import { Theme } from "@/style/theme"
import { useEffect, useState, } from "react"

export const useMediaQuery = (theme: Theme) => {
  const [isMobile, setIsMobile] = useState(window.matchMedia(theme.mediaQuery.mobile).matches)

  useEffect(() => {
    const isMobileQuery = window.matchMedia(theme.mediaQuery.mobile).matches

    setIsMobile(isMobileQuery)
  }, [])
  return { isMobile }
}


export default useMediaQuery