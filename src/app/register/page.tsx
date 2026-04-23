import { Tag, Sparkles, ListChecks, Bookmark, FileText, Image as ImageIcon } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { RegisterForm } from '@/components/auth/register-form'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_100%)] text-slate-950',
      panel: 'border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]',
      side: 'border border-slate-200/80 bg-white/90 shadow-sm',
      muted: 'text-slate-600',
      action: 'bg-[#12B5D4] text-white hover:bg-[#0fa3bf]',
      icon: Tag,
      title: 'Create your seller profile in minutes',
      body: 'Post photos, set a fair price, and reach serious local buyers without paying upfront listing fees.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon
  const isDirectory = productKind === 'directory'

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className={isDirectory ? 'h-8 w-8 text-[#12B5D4]' : 'h-8 w-8'} />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            {isDirectory ? (
              <div className="mt-8 grid gap-4">
                {[
                  { t: 'Free to start', d: 'List essentials without a credit card on file.', Icon: Sparkles },
                  { t: 'Guided listing steps', d: 'Photo tips, pricing nudges, and safer meetup reminders.', Icon: ListChecks },
                ].map((item) => (
                  <div key={item.t} className="flex gap-3 rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-4 py-4 text-sm">
                    <item.Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#12B5D4]" />
                    <div>
                      <p className="font-semibold text-slate-900">{item.t}</p>
                      <p className="mt-1 text-slate-600">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 grid gap-4">
                {['Different onboarding per product family', 'No repeated one-size-fits-all shell', 'Profile, publishing, and discovery aligned'].map((item) => (
                  <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0a6f82]">Create account</p>
            <RegisterForm actionClass={config.action} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
