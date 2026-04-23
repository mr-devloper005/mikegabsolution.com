import Link from 'next/link'
import { Gavel, Scale, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { classifieds } from '@/lib/classifieds-theme'
import { cn } from '@/lib/utils'

const toc = [
  { id: 'agreement', label: 'Agreement' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'listings', label: 'Listings & conduct' },
  { id: 'content', label: 'Content & license' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'limitation', label: 'Limitation of liability' },
  { id: 'law', label: 'Governing law' },
  { id: 'contact-terms', label: 'Contact' },
] as const

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_45%)] text-slate-950">
      <NavbarShell />
      <main>
        <section className="border-b border-slate-200/60 bg-white/75">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <span className={classifieds.badge}>
              <Scale className="h-3.5 w-3.5" />
              Legal
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Terms of Service</h1>
            <p className={cn('mt-4 max-w-2xl text-base leading-8', classifieds.muted)}>
              These terms govern your use of {SITE_CONFIG.name}, including posting classified ads, browsing listings, and using messaging or support features we provide.
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
              <Link href="/privacy" className="mt-6 inline-flex text-sm font-semibold text-[#0a6f82] hover:underline">
                Privacy policy →
              </Link>
            </aside>

            <div className="min-w-0 space-y-10">
              <section id="agreement" className={cn(classifieds.panel, 'scroll-mt-28 p-8 lg:p-10')}>
                <div className="flex items-center gap-2 text-[#0a6f82]">
                  <Gavel className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Agreement to terms</h2>
                </div>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  By accessing or using {SITE_CONFIG.name}, you agree to these Terms and our Privacy Policy. If you do not agree, do not use the service. We may update these Terms
                  from time to time; material changes will be reflected on this page with an updated date.
                </p>
              </section>

              <section id="accounts" className={cn(classifieds.soft, 'scroll-mt-28 p-8')}>
                <h2 className="text-xl font-semibold text-slate-950">Accounts &amp; security</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  You are responsible for safeguarding your login credentials and for all activity under your account. Provide accurate information and notify us promptly if you suspect
                  unauthorized access. We may suspend or terminate accounts that violate these Terms or create risk for other users.
                </p>
              </section>

              <section id="listings" className={cn(classifieds.panel, 'scroll-mt-28 p-8 lg:p-10')}>
                <h2 className="text-xl font-semibold text-slate-950">Listings &amp; acceptable conduct</h2>
                <ul className={cn('mt-4 list-disc space-y-3 pl-5 text-sm leading-8', classifieds.muted)}>
                  <li>List only items or services you have the right to sell or offer. No stolen goods, counterfeit products, or illegal services.</li>
                  <li>No harassment, hate speech, spam, or deceptive pricing intended to mislead buyers.</li>
                  <li>Honor the commitments you make in messages and listings. Keep meetups safe and lawful.</li>
                  <li>We may remove or restrict listings that violate community standards or applicable law.</li>
                </ul>
              </section>

              <section id="content" className={cn(classifieds.soft, 'scroll-mt-28 p-8')}>
                <h2 className="text-xl font-semibold text-slate-950">Your content &amp; license to us</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  You retain ownership of content you submit. You grant {SITE_CONFIG.name} a worldwide, non-exclusive license to host, display, distribute, and promote your content as
                  needed to operate and improve the marketplace (for example, showing your listing in search results or thumbnails in marketing surfaces).
                </p>
              </section>

              <section id="disclaimers" className={cn(classifieds.panel, 'scroll-mt-28 p-8 lg:p-10')}>
                <h2 className="text-xl font-semibold text-slate-950">Disclaimers</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  The service is provided “as is” to the maximum extent permitted by law. We do not guarantee uninterrupted availability or that every listing is accurate. Users deal
                  with one another directly; {SITE_CONFIG.name} is not a party to transactions between buyers and sellers unless we explicitly offer a separate protected checkout
                  feature where stated.
                </p>
              </section>

              <section id="limitation" className={cn(classifieds.soft, 'scroll-mt-28 p-8')}>
                <h2 className="text-xl font-semibold text-slate-950">Limitation of liability</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  To the fullest extent permitted by law, {SITE_CONFIG.name} and its affiliates will not be liable for indirect, incidental, special, consequential, or punitive
                  damages, or any loss of profits or data, arising from your use of the service. Our aggregate liability for any claim is limited to the greater of the amounts you paid
                  us in the twelve months before the claim or fifty dollars (USD), unless applicable law requires otherwise.
                </p>
              </section>

              <section id="law" className={cn(classifieds.panel, 'scroll-mt-28 p-8 lg:p-10')}>
                <h2 className="text-xl font-semibold text-slate-950">Governing law</h2>
                <p className={cn('mt-4 text-sm leading-8', classifieds.muted)}>
                  These Terms are governed by the laws applicable to {SITE_CONFIG.name}’s operating entity, without regard to conflict-of-law rules. Courts in that jurisdiction have
                  exclusive venue, except where consumer protection laws in your country give you a non-waivable right to sue locally.
                </p>
              </section>

              <section id="contact-terms" className="scroll-mt-28 rounded-[2rem] border border-dashed border-[#12B5D4]/40 bg-[#12B5D4]/6 p-8">
                <h2 className="text-xl font-semibold text-slate-950">Questions about these terms?</h2>
                <p className={cn('mt-3 text-sm leading-7', classifieds.muted)}>
                  Write to{' '}
                  <a href={`mailto:hello@${SITE_CONFIG.domain}`} className="font-semibold text-[#0a6f82] hover:underline">
                    hello@{SITE_CONFIG.domain}
                  </a>{' '}
                  or visit our{' '}
                  <Link href="/contact" className="font-semibold text-[#0a6f82] hover:underline">
                    contact page
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
                How we handle your data
              </p>
              <p className={cn('mt-1 text-sm', classifieds.muted)}>Read the Privacy Policy for collection, use, and retention practices.</p>
            </div>
            <Link href="/privacy" className={classifieds.pillOutline}>
              Privacy policy
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
