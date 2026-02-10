"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import authValidation from "@/validations/authValidation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormRegister } from "@/types/form"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { useRegister } from "@/services/hooks/useAuth"
import { Spinner } from "../ui/spinner"

export function RegisterForm() {
  const { mutate: register, isPending } = useRegister()

  const form = useForm<FormRegister>({
    resolver: zodResolver(authValidation.register),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit = (data: FormRegister) => {
    register(data)
  }

  return (
    <form
      id="form-register"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="first_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="first_name">Nama Depan</FieldLabel>
                <Input
                  id="first_name"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12 rounded-xl"
                  placeholder="John"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="last_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="last-name">Nama Belakang</FieldLabel>
                <Input
                  id="last-name"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className="h-12 rounded-xl"
                  placeholder="Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
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
              <FieldLabel htmlFor="password">Password</FieldLabel>
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
        <Controller
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm_password">
                Konfirmasi Password
              </FieldLabel>
              <Input
                id="confirm_password"
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
        {isPending ? <Spinner /> : "Daftar Akun"}
      </Button>
    </form>
  )
}
