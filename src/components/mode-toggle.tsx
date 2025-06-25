"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
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
