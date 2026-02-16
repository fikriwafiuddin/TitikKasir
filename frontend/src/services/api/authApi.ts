import { createClient } from "@/lib/supabase/client"
import { FormLogin, FormRegister } from "@/types/form"

const login = async (data: FormLogin) => {
  const supabase = createClient()

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) throw error
  return authData
}

const register = async (data: FormRegister) => {
  const supabase = createClient()

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    },
  })

  if (error) throw error
  return authData
}

const logout = async () => {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

const resetPasswordForEmail = async (email: string) => {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  if (error) throw error
}

const updatePassword = async (password: string) => {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({
    password: password,
  })
  if (error) throw error
}

const authApi = {
  login,
  register,
  logout,
  resetPasswordForEmail,
  updatePassword,
}

export default authApi
