import { changeTheme, useTheme } from '@nextui-org/react'
import { Moon, Sun } from 'lucide-react'

export function ThemeMode() {
  const { isDark } = useTheme()

  const handleChange = () => {
    const nextTheme = isDark ? 'light' : 'dark'

    window.localStorage.setItem('data-theme', nextTheme)

    changeTheme(nextTheme)
  }

  return (
    <div className="cursor-pointer" onClick={handleChange}>
      {isDark ? <Sun /> : <Moon />}
    </div>
  )
}
