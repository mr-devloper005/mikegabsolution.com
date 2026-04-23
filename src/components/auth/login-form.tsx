'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function LoginForm({ actionClass }: { actionClass: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await login(email, password)
    router.push('/')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <Input className="h-12 rounded-full border-slate-200 bg-white px-4" type="email" autoComplete="email" placeholder="Email address" value={email} onChange={(ev) => setEmail(ev.target.value)} required />
      <Input className="h-12 rounded-full border-slate-200 bg-white px-4" type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} required />
      <button type="submit" disabled={isLoading} className={cn('inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:opacity-60', actionClass)}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
      <div className="flex items-center justify-between text-sm text-slate-600">
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#0a6f82] hover:underline">
          <Sparkles className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </form>
  )
}
