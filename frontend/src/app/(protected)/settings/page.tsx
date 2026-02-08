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
import useSettingsStore from "@/store/useSettings"
import { toast } from "sonner"
import { useEffect } from "react"

export default function SettingsPage() {
  const { storeName, setStoreName } = useSettingsStore()

  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      storeName: storeName,
    },
  })

  useEffect(() => {
    form.reset({ storeName })
  }, [storeName, form])

  const onSubmit = (data: { storeName: string }) => {
    setStoreName(data.storeName)
    toast.success("Pengaturan berhasil disimpan")
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground">
          Kelola preferensi dan pengaturan aplikasi Anda di sini.
        </p>
      </div>

      <Card className="rounded-xl border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Informasi Toko</CardTitle>
          <CardDescription>
            Ubah nama toko Anda yang akan muncul di struk dan sidebar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Controller
                name="storeName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="storeName">Nama Toko</FieldLabel>
                    <Input
                      id="storeName"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="rounded-xl h-10"
                      placeholder="e.g. Toko Saya"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" className="rounded-xl h-11 w-full sm:w-auto">
              Simpan Perubahan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
