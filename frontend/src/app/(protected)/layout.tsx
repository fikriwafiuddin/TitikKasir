import { AppHeader } from "@/components/layout/AppHeader"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import UserProvider from "@/components/UserProvider"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <UserProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="overflow-hidden">
            <main className="flex-1">
              <AppHeader />
              <div className="p-6 space-y-6">{children}</div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </>
  )
}
