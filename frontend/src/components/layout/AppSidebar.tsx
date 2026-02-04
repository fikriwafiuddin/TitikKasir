"use client"

import * as React from "react"
import {
  LogOut,
  TagsIcon,
  HistoryIcon,
  BarChart3Icon,
  PackageIcon,
  ShoppingCartIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const sidebarItems = [
  { name: "POS", href: "/pos", icon: ShoppingCartIcon },
  { name: "Produk", href: "/products", icon: PackageIcon },
  { name: "Kategori", href: "/categories", icon: TagsIcon },
  { name: "Transaksi", href: "/orders", icon: HistoryIcon },
  { name: "Laporan", href: "/reports", icon: BarChart3Icon },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border/50">
        <SidebarMenu className="flex justify-center">
          <SidebarMenuItem className="flex items-center font-bold">
            <Image
              className="w-8 h-8"
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
            />
            <span className="truncate ml-2">Titik Kasir</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  isActive={pathname === item.href}
                  className="text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-md data-[active=true]:shadow-primary/20"
                  onClick={() => {
                    if (isMobile) setOpenMobile(false)
                  }}
                >
                  <Link href={item.href}>
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Konfigurasi</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="sm">
                <Link href="/settings">
                  <SettingsIcon />
                  <span>Pengaturan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <UserIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">John Doe</span>
                <span className="truncate text-xs">Administrator</span>
              </div>
              <LogOut className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
