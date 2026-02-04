"use client"

import { ModeToggle } from "@/components/ui/mode-toggle"
import { Input } from "./ui/input"
import { Search, User } from "lucide-react"
import { Button } from "./ui/button"

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex w-full max-w-sm items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9 bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
          <User size={20} />
        </Button>
      </div>
    </header>
  )
}
