"use client"

import { useGetUserData } from "@/services/hooks/useUser"
import { Spinner } from "./ui/spinner"

export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useGetUserData()

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
        <Spinner className="size-12" />
        <span className="text-muted-foreground">Memuat preferensi...</span>
      </div>
    )
  }
  return <>{children}</>
}
