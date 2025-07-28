// import { createClient } from '../utils/supabase/server'
// import { redirect } from 'next/navigation'
// import { cookies } from 'next/headers'

export default async function Page() {
  // const cookieStore = cookies()
  // const supabase = createClient(cookieStore)

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (!user) {
  //   redirect('/login')
  // }

  // ✅ Fetch only this user's todos (assuming row-level security is enabled)
  // const { data: todos, error } = await supabase
  //   .from('todos')
  //   .select('*')
  //   .eq('user_id', user.id)

  return (
    <main className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-2xl mb-4">This is your main page</h1>
    </main>
  )
}
