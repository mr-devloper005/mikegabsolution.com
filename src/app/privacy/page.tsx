import Link from 'next/link'
import { FileText, Lock, Shield, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { classifieds } from '@/lib/classifieds-theme'
import { cn } from '@/lib/utils'

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'collect', label: 'What we collect' },
  { id: 'use', label: 'How we use data' },
  { id: 'share', label: 'Sharing & processors' },
  { id: 'retention', label: 'Retention' },
  { id: 'rights', label: 'Your choices' },
  { id: 'children', label: 'Children' },
  { id: 'changes', label: 'Updates' },
  { id: 'contact', label: 'Contact' },
] as const

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_45%)] text-slate-950">
      <NavbarShell />
      <main>
        <section className="border-b border-slate-200/60 bg-white/75">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <span className={classifieds.badge}>
              <Lock className="h-3.5 w-3.5" />
              Privacy
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Privacy Policy</h1>
            <p className={cn('mt-4 max-w-2xl text-base leading-8', classifieds.muted)}>
              This policy explains how {SITE_CONFIG.name} collects, uses, and protects information when you use our classifieds marketplace and related support channels.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Last updated: April 22, 2026</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:items-start">
            <aside className={cn(classifieds.panel, 'sticky top-24 hidden p-5 lg:block')}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a6f82]">On this page</p>
              <nav className="mt-4 space-y-2">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block text-sm text-slate-600 transition hover:text-[#0a6f82]">
                    {item.label}
                  </a>
                ))}
              </nav>
              <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-[#0a6f82] hover:underline">
                Privacy questions →
              </Link>
            </aside>

            <div className="min-w-0 space-y-10">
              <section id="overview" className={cn(classifieds.panel, 'scroll-mt-28 p-8 lg:p-10')}>
                <div className="flex items-center gap-2 text-[#0a6f82]">
                  <Shield className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Overview</h2>
                </div>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  We built {SITE_CONFIG.name} so you can list, discover, and message locally. That means we process account details, listing content, messages you send through the
                  product, and limited technical data to keep the service reliable and secure. We do not sell your personal information.
                </p>
              </section>

              <section id="collect" className={cn(classifieds.soft, 'scroll-mt-28 p-8')}>
                <h2 className="text-xl font-semibold text-slate-950">What we collect</h2>
                <ul className={cn('mt-4 list-disc space-y-3 pl-5 text-sm leading-8', classifieds.muted)}>
                  <li>
                    <strong className="text-slate-800">Account data:</strong> name, email, password (stored using industry-standard hashing where applicable), and profile fields you
                    choose to add.
                  </li>
                  <li>
                    <strong className="text-slate-800">Listing &amp; content:</strong> titles, descriptions, photos, categories, pricing signals, and anything you voluntarily include in
                    an ad or message thread.
                  </li>
                  <li>
                    <strong className="text-slate-800">Usage &amp; device data:</strong> approximate location derived from IP (for fraud prevention and relevance), log events, cookies
                    or similar technologies, and diagnostics that help us fix bugs.
                  </li>
                  <li>
                    <strong className="text-slate-800">Support interactions:</strong> messages you send to our team, including attachments you provide.
                  </li>
                </ul>
              </section>

              <section id="use" className={cn(classifieds.panel, 'scroll-mt-28 p-8 lg:p-10')}>
                <h2 className="text-xl font-semibold text-slate-950">How we use information</h2>
                <ul className={cn('mt-4 list-disc space-y-3 pl-5 text-sm leading-8', classifieds.muted)}>
                  <li>Operate and improve search, messaging, moderation, and fraud detection.</li>
                  <li>Send service-related notices (for example, security alerts or policy updates).</li>
                  <li>Measure aggregate product usage so we can prioritize features that help local buyers and sellers.</li>
                  <li>Comply with law and respond to lawful requests from authorities when required.</li>
                </ul>
              </section>

              <section id="share" className={cn(classifieds.soft, 'scroll-mt-28 p-8')}>
                <h2 className="text-xl font-semibold text-slate-950">Sharing &amp; processors</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  We use trusted vendors for hosting, email delivery, analytics, and customer support tooling. They may process data on our behalf under contracts that limit use to
                  providing the service. Public listing fields are visible to other users by design—do not post sensitive information you do not want seen locally.
                </p>
              </section>

              <section id="retention" className={cn(classifieds.panel, 'scroll-mt-28 p-8 lg:p-10')}>
                <h2 className="text-xl font-semibold text-slate-950">Retention</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  We keep information as long as your account is active or as needed to provide the service. Backup copies may persist for a limited period. Some records may be kept
                  longer where required for legal, tax, or safety reasons.
                </p>
              </section>

              <section id="rights" className={cn(classifieds.soft, 'scroll-mt-28 p-8')}>
                <h2 className="text-xl font-semibold text-slate-950">Your choices</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  Depending on where you live, you may have rights to access, correct, export, or delete personal data. You can update many profile fields in-app. For other requests,
                  contact us and we will verify your identity before fulfilling sensitive actions.
                </p>
              </section>

              <section id="children" className={cn(classifieds.panel, 'scroll-mt-28 p-8 lg:p-10')}>
                <h2 className="text-xl font-semibold text-slate-950">Children</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  {SITE_CONFIG.name} is not directed to children under 13 (or the age required in your jurisdiction). We do not knowingly collect personal information from children.
                </p>
              </section>

              <section id="changes" className={cn(classifieds.soft, 'scroll-mt-28 p-8')}>
                <h2 className="text-xl font-semibold text-slate-950">Updates to this policy</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  When we make material changes, we will post the revised policy on this page and update the “Last updated” date. Continued use of the service after changes means you
                  accept the revised policy.
                </p>
              </section>

              <section id="contact" className="scroll-mt-28 rounded-[2rem] border border-dashed border-[#12B5D4]/40 bg-[#12B5D4]/6 p-8">
                <div className="flex items-center gap-2 text-[#0a6f82]">
                  <FileText className="h-5 w-5" />
                  <h2 className="text-xl font-semibold text-slate-950">Contact</h2>
                </div>
                <p className={cn('mt-3 text-sm leading-7', classifieds.muted)}>
                  Questions about privacy? Reach the team at{' '}
                  <a href={`mailto:hello@${SITE_CONFIG.domain}`} className="font-semibold text-[#0a6f82] hover:underline">
                    hello@{SITE_CONFIG.domain}
                  </a>{' '}
                  or use the{' '}
                  <Link href="/contact" className="font-semibold text-[#0a6f82] hover:underline">
                    contact form
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>

          <div className="mx-auto mt-4 max-w-3xl rounded-2xl border border-slate-200 bg-white/90 p-5 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a6f82]">Jump to</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-[#12B5D4]/50">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200/60 bg-slate-50/70 py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
            <div>
              <p className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-900 sm:justify-start">
                <Sparkles className="h-4 w-4 text-[#12B5D4]" />
                Need the rules of the road?
              </p>
              <p className={cn('mt-1 text-sm', classifieds.muted)}>Our Terms of Service explain acceptable use for listings and messaging.</p>
            </div>
            <Link href="/terms" className={classifieds.pillOutline}>
              Read terms
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
