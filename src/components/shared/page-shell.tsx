'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
  variant = 'default',
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  variant?: 'default' | 'classifieds'
}) {
  const isClassifieds = variant === 'classifieds'
  return (
    <div className={isClassifieds ? 'min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_50%)]' : 'min-h-screen bg-background'}>
      <NavbarShell />
      <main>
        <section
          className={
            isClassifieds
              ? 'border-b border-slate-200/80 bg-white/80'
              : 'border-b border-border bg-secondary/30'
          }
        >
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className={isClassifieds ? 'text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl' : 'text-3xl font-bold text-foreground'}>
                  {title}
                </h1>
                {description && (
                  <p className={isClassifieds ? 'mt-3 max-w-2xl text-slate-600' : 'mt-2 max-w-2xl text-muted-foreground'}>{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
