import Link from 'next/link'
import { Clock, Mail, MapPin, MessageSquare, Phone, Send, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { classifieds } from '@/lib/classifieds-theme'
import { cn } from '@/lib/utils'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: MessageSquare,
    title: 'Listing & account help',
    body: 'Trouble publishing, editing photos, or verifying your email—we will walk you through the fix.',
  },
  {
    icon: Phone,
    title: 'Trust & safety',
    body: 'Report scams, harassment, or policy violations. Include listing URLs when possible.',
  },
  {
    icon: MapPin,
    title: 'Partnerships',
    body: `Programs, schools, and neighborhoods that want to bring ${SITE_CONFIG.name} to more locals.`,
  },
] as const

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_50%)] text-slate-950">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200/60 bg-white/70">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.2),transparent_70%)] blur-2xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <span className={classifieds.badge}>
              <Sparkles className="h-3.5 w-3.5" />
              Contact
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">We are here for buyers, sellers, and community partners</h1>
            <p className={cn('mt-5 max-w-2xl text-base leading-8', classifieds.muted)}>
              Share enough context that we can route your message correctly the first time. Most questions about listings or accounts are answered within one business day.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <span className={cn(classifieds.soft, 'inline-flex items-center gap-2 px-4 py-2 font-medium text-slate-800')}>
                <Mail className="h-4 w-4 text-[#12B5D4]" />
                hello@{SITE_CONFIG.domain}
              </span>
              <span className={cn(classifieds.soft, 'inline-flex items-center gap-2 px-4 py-2 font-medium text-slate-800')}>
                <Clock className="h-4 w-4 text-[#12B5D4]" />
                Mon–Fri, 9am–6pm local
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
            <div className="space-y-5">
              {lanes.map((lane) => (
                <div key={lane.title} className={cn(classifieds.panel, 'p-6')}>
                  <lane.icon className="h-6 w-6 text-[#12B5D4]" />
                  <h2 className="mt-3 text-xl font-semibold text-slate-950">{lane.title}</h2>
                  <p className={cn('mt-2 text-sm leading-7', classifieds.muted)}>{lane.body}</p>
                </div>
              ))}
              <div className={cn(classifieds.soft, 'p-6')}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a6f82]">Self-serve</p>
                <p className={cn('mt-2 text-sm leading-7', classifieds.muted)}>
                  Many answers live in the Help Center—pricing, safety, and how listings work.
                </p>
                <Link href="/help" className="mt-4 inline-flex text-sm font-semibold text-[#0a6f82] hover:underline">
                  Visit Help Center →
                </Link>
              </div>
            </div>

            <div className={cn(classifieds.panel, 'p-8 lg:p-10')}>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Send a message</h2>
              <p className={cn('mt-2 text-sm', classifieds.muted)}>All fields help us respond faster.</p>
              <form className="mt-8 grid gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Name</label>
                  <input
                    className="mt-2 h-12 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none ring-[#12B5D4]/30 focus:ring-2"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</label>
                  <input
                    type="email"
                    className="mt-2 h-12 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none ring-[#12B5D4]/30 focus:ring-2"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Topic</label>
                  <input
                    className="mt-2 h-12 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none ring-[#12B5D4]/30 focus:ring-2"
                    placeholder="e.g. Listing removed, payment question"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Message</label>
                  <textarea
                    className="mt-2 min-h-[180px] w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-[#12B5D4]/30 focus:ring-2"
                    placeholder="What happened, what did you expect, and any links or screenshots that help."
                  />
                </div>
                <button type="button" className={cn(classifieds.pill, 'inline-flex h-12 w-full items-center justify-center sm:w-auto')}>
                  <Send className="mr-2 h-4 w-4" />
                  Send message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
