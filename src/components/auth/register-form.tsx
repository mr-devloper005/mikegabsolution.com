'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function RegisterForm({ actionClass }: { actionClass: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await signup(name, email, password)
    router.push('/')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <Input className="h-12 rounded-full border-slate-200 bg-white px-4" placeholder="Full name" value={name} onChange={(ev) => setName(ev.target.value)} autoComplete="name" required />
      <Input className="h-12 rounded-full border-slate-200 bg-white px-4" type="email" placeholder="Email address" value={email} onChange={(ev) => setEmail(ev.target.value)} autoComplete="email" required />
      <Input className="h-12 rounded-full border-slate-200 bg-white px-4" type="password" placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} autoComplete="new-password" required />
      <Input className="h-12 rounded-full border-slate-200 bg-white px-4" placeholder="What are you listing first? (optional)" />
      <button type="submit" disabled={isLoading} className={cn('inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:opacity-60', actionClass)}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Already have an account?</span>
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#0a6f82] hover:underline">
          <Sparkles className="h-4 w-4" />
          Sign in
        </Link>
      </div>
    </form>
  )
}
