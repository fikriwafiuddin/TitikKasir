"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { BellIcon } from "lucide-react"
import { ModeToggle } from "../ui/mode-toggle"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-8">
      <div className="flex w-full max-w-md items-center gap-2">
        <SidebarTrigger />
        {/* <div className="hidden md:block relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari..."
            className="pl-10 h-10 bg-background border-border/50 rounded-xl focus-visible:ring-primary/20"
          />
        </div> */}
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl hover:bg-accent h-10 w-10"
            >
              <BellIcon size={20} className="text-muted-foreground" />
              {/* <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-screen max-w-sm">
            <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-muted-foreground text-center">
                Tidak ada notifikasi
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
