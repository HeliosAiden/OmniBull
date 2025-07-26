"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login")
      } else {
        setUser(data.user)
      }
    })
  }, [router])

  return (
    <div className="p-10 text-white bg-black h-screen">
      <h1 className="text-2xl">Welcome to your Dashboard</h1>
      {user && <p>Your email: {user.email}</p>}
    </div>
  )
}
