'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { isClassifiedsShell } from '@/lib/classifieds-theme'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-slate-200/80 bg-white/95 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    nav: 'text-slate-600 hover:text-[#0a6f82]',
    cta: 'bg-[#12B5D4] text-white hover:bg-[#0fa3bf]',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-slate-200/80 bg-white/95 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    nav: 'text-slate-600 hover:text-[#0a6f82]',
    cta: 'bg-[#12B5D4] text-white hover:bg-[#0fa3bf]',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
} as const

const classifiedsDirectoryNav = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/classifieds' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About Us', href: '/about' },
] as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'
  const useClassifiedsNav = isDirectoryProduct && isClassifiedsShell(recipe)

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 text-slate-950 shadow-[0_4px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl',
        )}
      >
        <nav className="mx-auto flex min-h-16 w-full max-w-7xl items-stretch justify-between gap-2 px-4 sm:min-h-[4.5rem] sm:gap-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex min-w-0 max-w-[min(100%,12rem)] shrink-0 items-center sm:max-w-none">
            <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl p-1.5 transition group-hover:shadow-md sm:h-12 sm:w-12',
                  palette.logo,
                )}
              >
                <img src="/favicon.png?v=20260401" alt="" width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 sm:block">
                <span className="block truncate text-base font-semibold leading-tight tracking-[-0.02em] sm:text-lg">{SITE_CONFIG.name}</span>
                <span className="mt-0.5 line-clamp-1 hidden text-[9px] uppercase leading-none tracking-[0.22em] text-slate-500 sm:block sm:text-[10px]">
                  {siteContent.navbar.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: primary nav (desktop) */}
          <div className="hidden min-w-0 flex-1 items-center justify-center px-2 lg:flex">
            <div className="inline-flex max-w-2xl flex-wrap items-center justify-center gap-1 sm:gap-0.5">
              {useClassifiedsNav
                ? classifiedsDirectoryNav.map((item) => {
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                          isActive
                            ? 'bg-[#12B5D4]/12 text-[#0a6f82] shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100/90 hover:text-[#0a6f82]',
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })
                : primaryNavigation.slice(0, 4).map((task) => {
                    const isActive = pathname.startsWith(task.route)
                    return (
                      <Link
                        key={task.key}
                        href={task.route}
                        className={cn(
                          'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                          isActive ? 'bg-foreground/10 text-foreground' : palette.nav,
                        )}
                      >
                        {task.label}
                      </Link>
                    )
                  })}
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex min-w-0 shrink-0 items-center justify-end gap-1.5 sm:gap-2">
            {primaryTask && !useClassifiedsNav ? (
              <Link
                href={primaryTask.route}
                className="hidden max-w-[10rem] items-center gap-1.5 truncate rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 hover:bg-slate-50 md:inline-flex lg:max-w-[12rem]"
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{primaryTask.label}</span>
              </Link>
            ) : null}

            {isAuthenticated ? (
              <NavbarAuthControls useClassifieds={useClassifiedsNav} />
            ) : (
              <div className="hidden h-10 items-stretch md:flex">
                <Button variant="ghost" size="sm" asChild className="h-10 min-w-[5.5rem] rounded-full border border-[#12B5D4]/35 bg-white/80 px-4 text-sm font-semibold text-[#0a6f82] shadow-sm hover:bg-[#12B5D4]/10">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 rounded-full text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={cn('border-t border-slate-200/80', palette.mobile)}>
            <div className="max-h-[min(80vh,520px)] space-y-1 overflow-y-auto px-3 py-3 sm:px-4">
              {useClassifiedsNav
                ? classifiedsDirectoryNav.map((item) => {
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn('flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-[#12B5D4] text-white' : palette.post)}
                      >
                        {item.name}
                      </Link>
                    )
                  })
                : mobileNavigation.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )
                  })}

              {!isAuthenticated && (
                <div className="mt-2 border-t border-slate-200/80 pt-3">
                  <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Account</p>
                  <div className="grid gap-2 sm:grid-cols-1 sm:gap-2">
                    <Button variant="ghost" asChild className="h-11 w-full justify-center rounded-full border border-slate-200 text-[#0a6f82]">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
