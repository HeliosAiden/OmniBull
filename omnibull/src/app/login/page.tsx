"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard")
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/dashboard")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-[#01041C] to-[#03127C]">
      {/* Logo / Branding */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">OmniBull</h1>
        <p className="mt-2 text-sm text-gray-400">Unified CEX + DEX analytics & journaling</p>
      </div>

      {/* Auth Box */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/10 rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#FFA500",
                  brandAccent: "#FFD580",
                },
              },
            },
          }}
          theme="dark"
          providers={["google", "github"]}
        />
      </div>

      {/* Footer (Optional) */}
      <footer className="mt-8 text-sm text-gray-500">
        Built with 💙 by OmniBull
      </footer>
    </div>
  )
}
