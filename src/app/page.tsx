import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Moon, Sun } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Page() {
  return (
    <>
      <div className="flex justify-between p-4">
        <h1 className="text-4xl font-bold">Everett Zettersten</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 mr-1" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 mr-1" />
                <span className="sr-only">Toggle theme</span>
              </NavigationMenuTrigger>
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  )
}