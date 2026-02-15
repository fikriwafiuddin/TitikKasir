"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import settingsSchema from "@/validations/settingsValidation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useUpdateUserData } from "@/services/hooks/useUser"
import { Spinner } from "@/components/ui/spinner"
import { useGetUserData } from "@/services/hooks/useUser"
import { useAuth } from "@/context/AuthContext"
import {
  UserIcon,
  MailIcon,
  StoreIcon,
  LogOutIcon,
  ShieldAlertIcon,
  CheckCircleIcon,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect } from "react"

export default function SettingsPage() {
  const { user: authUser, signOut } = useAuth()
  const { data: userData, isLoading: loadingUser } = useGetUserData()
  const { mutate: update, isPending: updating } = useUpdateUserData()

  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      shop_name: userData?.shop_name || "",
    },
  })

  // Sync form default values when data arrives
  useEffect(() => {
    if (userData?.shop_name) {
      form.reset({ shop_name: userData.shop_name })
    }
  }, [userData, form])

  const onSubmit = (data: { shop_name: string }) => {
    update(data, {
      onSuccess: () => {
        form.reset(data)
      },
    })
  }

  const userDisplayName = authUser?.user_metadata?.first_name
    ? `${authUser.user_metadata.first_name} ${authUser.user_metadata.last_name || ""}`.trim()
    : "Pengguna"

  return (
    <div className="flex flex-col gap-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">
          Kelola informasi akun dan preferensi toko Anda.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Account Information Section */}
        <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary">
              <UserIcon size={18} />
              <CardTitle className="text-lg">Informasi Akun</CardTitle>
            </div>
            <CardDescription>
              Detail akun yang terhubung dengan sistem ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <UserIcon size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{userDisplayName}</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <MailIcon size={13} />
                  {authUser?.email}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shop Information Section */}
        <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary">
              <StoreIcon size={18} />
              <CardTitle className="text-lg">Informasi Toko</CardTitle>
            </div>
            <CardDescription>
              Ubah identitas toko Anda yang akan tertera pada struk belanja.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup>
                <Controller
                  name="shop_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="shop_name">Nama Toko</FieldLabel>
                      <Input
                        id="shop_name"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        disabled={loadingUser || updating}
                        className="rounded-xl h-11 bg-muted/20 border-border/50 focus:bg-background transition-colors"
                        placeholder="e.g. Toko Berkah Jaya"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                className="rounded-xl h-11 w-full sm:w-auto font-semibold px-8"
                disabled={updating || !form.formState.isDirty || loadingUser}
              >
                {updating ? (
                  <>
                    <Spinner className="mr-2" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon size={16} className="mr-2" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone Section */}
        <Card className="rounded-2xl border-destructive/20 bg-destructive/5 shadow-sm overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-destructive">
              <ShieldAlertIcon size={18} />
              <CardTitle className="text-lg">Zona Bahaya</CardTitle>
            </div>
            <CardDescription className="text-destructive/70">
              Tindakan sensitif terkait akses akun Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/10 bg-background/50">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm">Keluar dari Sesi</span>
                <span className="text-xs text-muted-foreground max-w-[240px]">
                  Akhiri sesi Anda saat ini pada perangkat ini.
                </span>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-lg h-9 font-medium"
                  >
                    <LogOutIcon size={14} className="mr-2" />
                    Keluar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah Anda yakin ingin keluar?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Anda perlu masuk kembali untuk mengakses data toko dan
                      melakukan transaksi.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={signOut}
                      className="rounded-xl bg-destructive hover:bg-destructive/90"
                    >
                      Ya, Keluar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium opacity-50">
          Titik Kasir v1.0.0
        </p>
      </div>
    </div>
  )
}
