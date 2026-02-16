"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import authValidation from "@/validations/authValidation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormForgotPassword } from "@/types/form"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { useResetPassword } from "@/services/hooks/useAuth"
import { Spinner } from "../ui/spinner"
import { MailIcon, ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword()

  const form = useForm<FormForgotPassword>({
    resolver: zodResolver(authValidation.forgotPassword),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (data: FormForgotPassword) => {
    resetPassword(data)
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MailIcon size={32} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Cek Email Anda</h3>
          <p className="text-muted-foreground">
            Kami telah mengirimkan instruksi pemulihan kata sandi ke email Anda.
          </p>
        </div>
        <Button asChild className="w-full h-12 rounded-xl">
          <Link href="/auth/login">Kembali ke Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email Pemulihan</FieldLabel>
              <Input
                id="email"
                {...field}
                type="email"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
                className="h-12 rounded-xl bg-muted/20 border-border/50 focus:bg-background transition-colors"
                placeholder="john@example.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full h-12 text-lg font-semibold rounded-xl transition-all"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : "Kirim Link Reset"}
        </Button>
        <Button
          variant="ghost"
          asChild
          className="w-full h-12 rounded-xl text-muted-foreground hover:text-primary transition-colors"
        >
          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon size={16} />
            Kembali ke Login
          </Link>
        </Button>
      </div>
    </form>
  )
}
