"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, Calendar, ClipboardCheck, FileText, Home, LogOut, Menu, Settings, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock user data - in a real app, this would come from authentication
const currentUser = {
  name: "John Doe",
  email: "john@example.com",
  role: "superuser", // "superuser", "staff", or "user"
  avatar: "/placeholder.svg?height=32&width=32",
}

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile, openMobile, setOpenMobile } = useSidebar()

  // Navigation items based on user role
  const navigationItems = getNavigationItems(currentUser.role)

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-40 md:hidden"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="p-0">
            <div className="flex h-full flex-col">
              <div className="border-b p-4">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">Attendance System</span>
                </div>
              </div>

              <div className="flex-1 overflow-auto py-2">
                <nav className="grid gap-1 px-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                        pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setOpenMobile(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="border-t p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                    </div>
                  </div>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="hidden w-64 flex-col border-r bg-card md:flex">
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Attendance System</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-0 hover:bg-transparent">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

// Helper function to get navigation items based on user role
function getNavigationItems(role: string) {
  const baseItems = [
    { label: "Dashboard", href: "/", icon: Home },
    { label: "Calendar", href: "/calendar", icon: Calendar },
  ]

  if (role === "superuser") {
    return [
      ...baseItems,
      { label: "Staff Management", href: "/staff", icon: Users },
      { label: "User Management", href: "/users", icon: Users },
      { label: "Reports", href: "/reports", icon: FileText },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Settings", href: "/settings", icon: Settings },
    ]
  } else if (role === "staff") {
    return [
      ...baseItems,
      { label: "Take Attendance", href: "/attendance", icon: ClipboardCheck },
      { label: "Reports", href: "/reports", icon: FileText },
    ]
  } else {
    // Regular user
    return [...baseItems, { label: "My Attendance", href: "/my-attendance", icon: ClipboardCheck }]
  }
}

