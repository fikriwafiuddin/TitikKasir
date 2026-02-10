"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import authValidation from "@/validations/authValidation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormLogin } from "@/types/form"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { useLogin } from "@/services/hooks/useAuth"
import Link from "next/link"
import { Spinner } from "../ui/spinner"

export function LoginForm() {
  const { mutate: login, isPending } = useLogin()

  const form = useForm<FormLogin>({
    resolver: zodResolver(authValidation.login),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: FormLogin) => {
    login(data)
  }

  return (
    <form
      id="form-login"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                {...field}
                type="email"
                aria-invalid={fieldState.invalid}
                className="h-12 rounded-xl"
                placeholder="john@example.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
              <Input
                id="password"
                {...field}
                type="password"
                aria-invalid={fieldState.invalid}
                className="h-12 rounded-xl"
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
        {isPending ? <Spinner /> : "Masuk"}
      </Button>
    </form>
  )
}
