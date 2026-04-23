import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  LifeBuoy,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Tag,
  Wallet,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { classifieds } from '@/lib/classifieds-theme'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const guides = [
  {
    title: 'Post your first ad',
    description: 'Photos, pricing, categories, and how to stand out to serious local buyers.',
    icon: Tag,
    href: '/create/classified',
  },
  {
    title: 'Buy with confidence',
    description: 'Questions to ask, red flags to avoid, and how in-app chat keeps you safer.',
    icon: ShieldCheck,
    href: '/classifieds',
  },
  {
    title: 'Payments & boosts',
    description: 'Free listings, optional visibility boosts, and when fees may apply.',
    icon: Wallet,
    href: '/pricing',
  },
  {
    title: 'Trust & safety',
    description: 'Reporting listings, blocking users, and meeting in person the smart way.',
    icon: LifeBuoy,
    href: '/contact',
  },
] as const

const quickLinks = [
  { label: 'Browse categories', href: '/classifieds' },
  { label: 'Contact support', href: '/contact' },
  { label: 'Privacy overview', href: '/privacy' },
  { label: 'Terms of use', href: '/terms' },
] as const

const faqs = [
  {
    id: 'post',
    q: 'How do I create a classified listing?',
    a: 'Sign in, choose Post an Ad, add clear photos and an honest title, pick the right category, then publish. You can edit or pause your listing anytime from your dashboard.',
  },
  {
    id: 'meet',
    q: 'What are tips for safer in-person meetups?',
    a: 'Meet in public, daytime places; bring a friend when possible; inspect the item before you pay; never send prepaid gift cards or wire money to strangers. Use in-app chat until you are comfortable sharing contact details.',
  },
  {
    id: 'fee',
    q: 'Does it cost money to list?',
    a: 'Basic listings are free. Optional boosts and featured placement may have a fee—see our Pricing page for current plans.',
  },
  {
    id: 'report',
    q: 'How do I report a suspicious ad or user?',
    a: 'Open the listing, use Report, and describe what happened. Our team reviews safety reports and may remove content or restrict accounts that violate guidelines.',
  },
  {
    id: 'delete',
    q: 'How do I delete my account?',
    a: 'From account settings you can request deletion. Some information may be retained where required by law or for fraud prevention.',
  },
  {
    id: 'response',
    q: 'How fast is support?',
    a: 'We typically reply within one business day. Trust & safety issues are prioritized when there is immediate risk.',
  },
] as const

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_50%)] text-slate-950">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200/60 bg-white/60">
          <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(18,181,212,0.28),transparent_65%)] blur-2xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <span className={classifieds.badge}>
              <Sparkles className="h-3.5 w-3.5" />
              Help Center
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Answers for buyers, sellers, and everyone in between</h1>
            <p className={cn('mt-5 max-w-2xl text-base leading-8', classifieds.muted)}>
              Whether you are listing your first item or comparing offers across town, these guides keep you moving—without digging through unrelated product docs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={classifieds.pill}>
                Contact support
                <ArrowRight className="ml-2 inline h-4 w-4" />
              </Link>
              <Link href="/classifieds" className={classifieds.pillOutline}>
                Browse classifieds
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">Popular guides</h2>
            <p className={cn('mt-3 text-sm sm:text-base', classifieds.muted)}>Curated for how people actually use {SITE_CONFIG.name} today.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => (
              <Link
                key={g.title}
                href={g.href}
                className={cn(classifieds.panel, 'group flex flex-col p-6 transition hover:border-[#12B5D4]/40 hover:shadow-[0_28px_70px_rgba(18,181,212,0.12)]')}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#12B5D4]/12 text-[#0a6f82]">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950 group-hover:text-[#0a6f82]">{g.title}</h3>
                <p className={cn('mt-2 flex-1 text-sm leading-7', classifieds.muted)}>{g.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#0a6f82]">
                  Open guide
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200/60 bg-slate-50/60 py-12">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-[#12B5D4]/50 hover:text-[#0a6f82]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className={cn(classifieds.panel, 'p-8 lg:p-10')}>
              <div className="flex items-center gap-2 text-[#0a6f82]">
                <BookOpen className="h-6 w-6" />
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Frequently asked</h2>
              </div>
              <p className={cn('mt-3 text-sm leading-7', classifieds.muted)}>Straight answers about listings, safety, and your account.</p>
              <Accordion type="single" collapsible className="mt-8 w-full space-y-2">
                {faqs.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="group rounded-2xl border border-slate-200 bg-white px-4 data-[state=open]:border-[#12B5D4] data-[state=open]:bg-[#12B5D4]"
                  >
                    <AccordionTrigger className="text-left text-sm font-semibold text-slate-900 hover:no-underline group-data-[state=open]:text-white sm:text-base">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-slate-600 group-data-[state=open]:text-white/90">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="space-y-6">
              <div className={cn(classifieds.soft, 'p-8')}>
                <MessageCircle className="h-8 w-8 text-[#12B5D4]" />
                <h3 className="mt-4 text-xl font-semibold text-slate-950">Still stuck?</h3>
                <p className={cn('mt-3 text-sm leading-7', classifieds.muted)}>
                  Tell us what you tried and what you expected. Screenshots and listing links help us resolve issues faster.
                </p>
                <Link href="/contact" className={cn(classifieds.pill, 'mt-6 inline-flex w-fit items-center')}>
                  Open contact form
                </Link>
              </div>
              <div className="rounded-[2rem] border border-dashed border-[#12B5D4]/35 bg-[#12B5D4]/5 p-8 text-center">
                <p className="text-sm font-semibold text-[#0a6f82]">Pro tip</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">Add multiple clear photos and a firm price—listings with both tend to get replies sooner.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
