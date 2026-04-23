'use client'

import Link from 'next/link'
import { Car, Cpu, Home, Briefcase, Wrench, Sofa, CheckCircle2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { classifieds } from '@/lib/classifieds-theme'
import { cn } from '@/lib/utils'

const categories = [
  {
    id: 'electronics',
    label: 'Electronics',
    querySlug: 'technology',
    icon: Cpu,
    bullets: ['Phones, laptops, and accessories', 'Warranty-friendly meetups', 'Compare specs before you buy'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  },
  {
    id: 'vehicles',
    label: 'Vehicles',
    querySlug: 'automotive',
    icon: Car,
    bullets: ['Cars, bikes, and parts', 'Mileage and history at a glance', 'Message sellers securely'],
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    querySlug: 'real-estate',
    icon: Home,
    bullets: ['Rentals and properties nearby', 'Neighborhood-level discovery', 'Schedule tours faster'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    id: 'furniture',
    label: 'Furniture',
    querySlug: 'furniture',
    icon: Sofa,
    bullets: ['Curated home goods', 'Pickup windows that work', 'Photos that show true condition'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  },
  {
    id: 'jobs',
    label: 'Jobs',
    querySlug: 'jobs-payroll',
    icon: Briefcase,
    bullets: ['Roles across industries', 'Clear compensation signals', 'Apply with a focused profile'],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  },
  {
    id: 'services',
    label: 'Services',
    querySlug: 'service',
    icon: Wrench,
    bullets: ['Local pros you can trust', 'Verified badges where available', 'Book and chat in one place'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  },
] as const

export function HomeCategoryTabs() {
  const defaultTab = categories[0]?.id ?? 'electronics'

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="mb-10 flex h-auto w-full flex-wrap justify-center gap-2 bg-transparent p-0">
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.id}
            className={cn(
              'rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition data-[state=active]:border-[#12B5D4] data-[state=active]:bg-[#12B5D4] data-[state=active]:text-white data-[state=active]:shadow-md',
            )}
          >
            <span className="inline-flex items-center gap-2">
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((cat) => (
        <TabsContent key={cat.id} value={cat.id} className="mt-0 outline-none">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div className={cn(classifieds.panel, 'p-8 lg:p-10')}>
              <p className={classifieds.badge}>Browse {cat.label}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Everything you need in one lane</h3>
              <ul className="mt-6 space-y-4">
                {cat.bullets.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-7 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#12B5D4]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/classifieds?category=${cat.querySlug}`} className={cn(classifieds.pill, 'mt-8 inline-flex w-fit items-center justify-center')}>
                Explore category
              </Link>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_20%,rgba(18,181,212,0.22),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(167,139,250,0.18),transparent_50%)]" />
              <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cat.image} alt="" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
