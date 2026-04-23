import Link from 'next/link'
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  BadgeCheck,
  HeartHandshake,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { classifieds } from '@/lib/classifieds-theme'
import { cn } from '@/lib/utils'
import type { SitePost } from '@/lib/site-connector'
import { HomeCategoryTabs } from '@/components/home/home-category-tabs'

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
      ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
      ? (post.content as any).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

const testimonials = [
  {
    quote: 'Sold my desk in two days. Photos and chat made it painless.',
    name: 'Jordan Lee',
    place: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&q=80',
  },
  {
    quote: 'Found a great local bike without the usual sketchy meetups.',
    name: 'Priya Desai',
    place: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80',
  },
  {
    quote: 'Clear categories and quick replies. This is how classifieds should feel.',
    name: 'Marcus Hall',
    place: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
] as const

const faqItems = [
  {
    q: 'How do I post an ad?',
    a: 'Create a free account, add photos, set your price, and publish. Most listings go live in minutes.',
  },
  {
    q: 'Is messaging safe?',
    a: 'Use in-app chat to keep contact details private until you are ready. Report anything that feels off.',
  },
  {
    q: 'Are there fees?',
    a: 'Basic listings are free. Optional boosts help your ad reach more nearby buyers.',
  },
  {
    q: 'How do I avoid scams?',
    a: 'Meet in public places, verify items in person, and never send prepaid gift cards or wire transfers.',
  },
] as const

export function ClassifiedsMarketingHome({ classifiedPosts }: { classifiedPosts: SitePost[] }) {
  const featured = classifiedPosts.slice(0, 3)
  const heroPost = classifiedPosts[0]
  const heroImage = getPostImage(heroPost)
  const taskKey: TaskKey = 'classified'
  const route = SITE_CONFIG.tasks.find((t) => t.key === 'classified')?.route || '/classifieds'

  return (
    <main className={classifieds.shell}>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_55%)]">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(18,181,212,0.35),transparent_68%)] blur-2xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.25),transparent_70%)] blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-22">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className={classifieds.badge}>
                <Sparkles className="h-3.5 w-3.5" />
                Local classifieds
              </span>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">
                Find what you need, sell what you don&apos;t—right in your neighborhood.
              </h1>
              <p className={cn('mt-6 max-w-2xl text-base leading-8', classifieds.muted)}>{SITE_CONFIG.description}</p>
              <p className={cn('mt-3 max-w-2xl text-base leading-8', classifieds.muted)}>
                Browse curated categories, chat instantly, and move from search to sold without the noise of giant marketplaces.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/classifieds" className={classifieds.pill}>
                  Start browsing
                  <ArrowRight className="ml-2 inline h-4 w-4" />
                </Link>
                <Link href="/create/classified" className={classifieds.pillOutline}>
                  Post an ad
                </Link>
              </div>
              <div className="mt-12 grid gap-3 sm:grid-cols-3">
                {[
                  ['Trusted community', 'Safety tips built into every flow'],
                  ['Instant chat', 'Keep your number private until you choose'],
                  ['Simple pricing', 'Free listings with optional boosts'],
                ].map(([title, body]) => (
                  <div key={title} className={cn(classifieds.soft, 'p-4')}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a6f82]">{title}</p>
                    <p className="mt-2 text-sm font-medium text-slate-900">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-10 z-10 hidden max-w-[220px] rounded-2xl border border-slate-200/80 bg-white/95 p-4 text-sm shadow-lg backdrop-blur lg:block">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-2 font-semibold text-slate-900">“Fast, friendly, and local.”</p>
                <p className="text-xs text-slate-500">Verified buyer in your city</p>
              </div>
              <div className="absolute -right-4 bottom-16 z-10 hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-md lg:inline-flex">
                New listings daily
              </div>
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 -z-10 scale-105 rounded-[3rem] bg-[conic-gradient(from_120deg,#12B5D4,#a78bfa,#12B5D4)] opacity-40 blur-2xl" />
                <div className="overflow-hidden rounded-[2.75rem] border border-slate-200/80 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.18)]">
                  <div className="relative aspect-[4/5] w-full">
                    <ContentImage src={heroImage} alt={heroPost?.title || 'Featured listing'} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className={classifieds.badge}>Why {SITE_CONFIG.name}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950">The easiest way to buy and sell locally</h2>
          <p className={cn('mt-4 text-base leading-8', classifieds.muted)}>
            We trimmed the clutter so you can move faster—clear photos, honest descriptions, and messaging that stays on-platform until you are ready.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className={cn(classifieds.panel, 'p-8')}>
            <ShieldCheck className="h-8 w-8 text-[#12B5D4]" />
            <h3 className="mt-4 text-2xl font-semibold text-slate-950">Safety signals you can see</h3>
            <p className={cn('mt-3 text-sm leading-7', classifieds.muted)}>
              Verified contact channels, community reporting, and prompts that encourage safer handoffs. We surface the details that help you decide before you message.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-[#12B5D4]" />
                Clear seller history and response times
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-[#12B5D4]" />
                Encrypted chat with optional read receipts
              </li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cn(classifieds.soft, 'p-6')}>
              <MessageCircle className="h-6 w-6 text-[#12B5D4]" />
              <h4 className="mt-4 text-lg font-semibold">Chat that stays contextual</h4>
              <p className={cn('mt-2 text-sm leading-7', classifieds.muted)}>Keep questions tied to the listing so buyers and sellers stay aligned.</p>
            </div>
            <div className={cn(classifieds.soft, 'p-6')}>
              <HeartHandshake className="h-6 w-6 text-[#12B5D4]" />
              <h4 className="mt-4 text-lg font-semibold">Pricing that respects your time</h4>
              <p className={cn('mt-2 text-sm leading-7', classifieds.muted)}>Free to list, simple boosts when you want more visibility.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">Simple, safe, and effective</h2>
            <p className={cn('mt-3 text-base', classifieds.muted)}>Everything you need to move an item without juggling five different apps.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Verified sellers',
                body: 'Signals that show who is responsive, local, and consistently delivering great handoffs.',
                icon: BadgeCheck,
                tint: 'bg-[#12B5D4]/12 text-[#0a6f82]',
              },
              {
                title: 'Instant chat',
                body: 'Ask questions, share pickup windows, and confirm details without exposing your phone number.',
                icon: MessageCircle,
                tint: 'bg-[#a78bfa]/15 text-[#5b3cc4]',
              },
              {
                title: 'Secure payments',
                body: 'Optional protected checkout flows where available—cash-friendly meetups when you prefer in person.',
                icon: ShieldCheck,
                tint: 'bg-emerald-100 text-emerald-800',
              },
            ].map((card) => (
              <div key={card.title} className={cn(classifieds.panel, 'flex h-full flex-col p-7')}>
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-full', card.tint)}>
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{card.title}</h3>
                <p className={cn('mt-3 flex-1 text-sm leading-7', classifieds.muted)}>{card.body}</p>
                <Link href="/classifieds" className="mt-6 text-sm font-semibold text-[#0a6f82] hover:underline">
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">Shop by category</h2>
          <p className={cn('mt-3 text-base', classifieds.muted)}>Pick a lane to see what makes each marketplace different inside {SITE_CONFIG.name}.</p>
        </div>
        <div className="mt-12">
          <HomeCategoryTabs />
        </div>
      </section>

      <section className="bg-slate-50/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0a6f82]">Fresh near you</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Featured listings</h2>
            </div>
            <Link href="/classifieds" className="text-sm font-semibold text-[#0a6f82] hover:underline">
              View all classifieds
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featured.length ? (
              featured.map((post) => (
                <TaskPostCard key={post.id} post={post} href={`${route}/${post.slug}`} taskKey={taskKey} />
              ))
            ) : (
              <div className={cn(classifieds.panel, 'col-span-full p-10 text-center text-sm text-slate-600')}>
                New listings are on the way. Be the first to post in your area.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">What our community says</h2>
          <p className={cn('mt-3 text-base', classifieds.muted)}>Real stories from buyers and sellers who like a calmer marketplace.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className={cn(classifieds.panel, 'p-6')}>
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-800">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.avatar} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.place}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-[linear-gradient(120deg,#e8f9fc_0%,#f4f6fb_55%,#ffffff_100%)] px-8 py-12 text-center shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:px-12">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Start selling today for <span className="text-[#12B5D4]">free</span>
          </h2>
          <p className={cn('mx-auto mt-4 max-w-2xl text-base', classifieds.muted)}>
            Publish in minutes, add crisp photos, and reach serious local buyers without paying upfront listing fees.
          </p>
          <Link href="/create/classified" className={cn(classifieds.pill, 'mt-8 inline-flex items-center justify-center')}>
            Create your listing
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-[-0.04em] text-slate-950">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-10 w-full space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`item-${index}`}
                className="group rounded-2xl border border-slate-200 bg-white px-4 data-[state=open]:border-[#12B5D4] data-[state=open]:bg-[#12B5D4]"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline group-data-[state=open]:text-white">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-slate-600 group-data-[state=open]:text-white/90">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#f4fbfd] py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 -z-10 mx-auto max-w-sm rounded-full bg-[radial-gradient(circle,rgba(18,181,212,0.35),transparent_65%)] blur-2xl" />
            <div className="relative w-full max-w-xs rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="mx-auto aspect-square max-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-white text-xs font-semibold text-slate-500">Scan to open app</div>
              </div>
              <p className="mt-4 text-center text-xs text-slate-500">QR preview for marketing — download links below.</p>
            </div>
          </div>
          <div>
            <p className={classifieds.badge}>On the go</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950">Get the app</h2>
            <p className={cn('mt-4 text-base leading-8', classifieds.muted)}>
              Save searches, reply faster, and get gentle alerts when new listings match what you are hunting for.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-xs font-semibold text-white">Download on the App Store</span>
              <span className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-xs font-semibold text-white">Get it on Google Play</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
