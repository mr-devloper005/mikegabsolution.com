import Link from 'next/link'
import { Check } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { classifieds } from '@/lib/classifieds-theme'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    cadence: 'per month',
    blurb: 'Perfect for occasional sellers clearing closets or upgrading gear.',
    features: ['3 active listings', 'Standard placement in search', 'In-app messaging', 'Safety checklist'],
    cta: 'Start for free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Plus',
    price: '$19',
    cadence: 'per month',
    blurb: 'When you sell often and want more reach without managing ads elsewhere.',
    features: ['25 active listings', 'Category spotlight rotation', 'Bump credits each week', 'Priority support'],
    cta: 'Choose Plus',
    href: '/register',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$49',
    cadence: 'per month',
    blurb: 'For power sellers, small shops, and teams publishing at scale.',
    features: ['Unlimited listings', 'Branded storefront page', 'Team seats (up to 5)', 'Advanced insights'],
    cta: 'Talk to sales',
    href: '/contact',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_45%)] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className={classifieds.badge}>Pricing</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Simple plans for local classifieds</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Start free, upgrade when you need more visibility. No surprise fees on casual selling—just straightforward tools for {SITE_CONFIG.name}.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                classifieds.panel,
                'flex flex-col p-8',
                tier.highlight && 'ring-2 ring-[#12B5D4]/60 shadow-[0_28px_80px_rgba(18,181,212,0.18)]',
              )}
            >
              {tier.highlight ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a6f82]">Most popular</p> : <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Plan</span>}
              <h2 className="mt-2 text-2xl font-semibold">{tier.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{tier.blurb}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                <span className="text-sm text-slate-500">{tier.cadence}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-slate-700">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#12B5D4]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={tier.href} className={cn(tier.highlight ? classifieds.pill : classifieds.pillOutline, 'mt-8 inline-flex justify-center text-center')}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-slate-500">
          Taxes may apply based on your region. You can change or cancel a paid plan any time from your dashboard.
        </p>
      </main>
      <Footer />
    </div>
  )
}
