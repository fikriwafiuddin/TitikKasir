"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import authValidation from "@/validations/authValidation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormResetPassword } from "@/types/form"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { useUpdatePassword } from "@/services/hooks/useAuth"
import { Spinner } from "../ui/spinner"
import { LockIcon } from "lucide-react"

export function ResetPasswordForm() {
  const { mutate: updatePassword, isPending } = useUpdatePassword()

  const form = useForm<FormResetPassword>({
    resolver: zodResolver(authValidation.resetPassword),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit = (data: FormResetPassword) => {
    updatePassword(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password Baru</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  {...field}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  disabled={isPending}
                  className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm_password">
                Konfirmasi Password Baru
              </FieldLabel>
              <Input
                id="confirm_password"
                {...field}
                type="password"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
                className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-colors"
                placeholder="••••••••"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        className="w-full h-12 text-lg font-semibold rounded-xl"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner className="mr-2" />
            Memperbarui...
          </>
        ) : (
          <>
            <LockIcon size={18} className="mr-2" />
            Atur Ulang Password
          </>
        )}
      </Button>
    </form>
  )
}
