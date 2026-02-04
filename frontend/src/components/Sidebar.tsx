"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tags,
  History,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "./ui/button"

const sidebarItems = [
  { name: "POS", href: "/pos", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Package },
  { name: "Categories", href: "/categories", icon: Tags },
  { name: "Orders", href: "/orders", icon: History },
  { name: "Reports", href: "/reports", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                T
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              TitikKasir
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "h-8 w-8 text-muted-foreground",
            !isCollapsed && "ml-auto",
          )}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                isCollapsed && "justify-center px-0",
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground",
                )}
              />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t space-y-2">
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-accent/50 border border-border/50">
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
              JD
            </div>
            <div className="flex flex-col overflow-hidden text-balance">
              <span className="text-sm font-semibold truncate">John Doe</span>
              <span className="text-xs text-muted-foreground truncate italic">
                Administrator
              </span>
            </div>
          </div>
        )}
        <Link
          href="/auth/login"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-all hover:bg-destructive/10",
            isCollapsed && "justify-center px-0",
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  )
}
