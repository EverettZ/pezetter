"use client"
import * as React from "react"
import { useTheme } from "next-themes"
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <NavigationMenuContent>
      <NavigationMenuLink onClick={() => setTheme("light")}>
        Light
      </NavigationMenuLink><NavigationMenuLink onClick={() => setTheme("dark")}>
        Dark
      </NavigationMenuLink><NavigationMenuLink onClick={() => setTheme("system")}>
        System
      </NavigationMenuLink>
    </NavigationMenuContent>
  )
}
