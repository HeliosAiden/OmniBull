"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User } from '@supabase/supabase-js'


export default function CEXPage() {
  const [user, setUser] = useState<User | null>(null)
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
