import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { classifieds } from '@/lib/classifieds-theme'
import { cn } from '@/lib/utils'

const highlights = [
  { label: 'Monthly active buyers', value: '48k+' },
  { label: 'Listings published', value: '120k+' },
  { label: 'Cities covered', value: '190+' },
]

const values = [
  { title: 'Local first', description: 'We optimize for short distances, faster replies, and safer handoffs—not endless nationwide scroll.' },
  { title: 'Trust by design', description: 'Clear photos, structured fields, and messaging that keeps your contact info private until you choose.' },
  { title: 'Fair pricing', description: 'Free listings for casual sellers with optional boosts when you want more visibility.' },
]

export default function AboutPage() {
  return (
    <PageShell
      variant="classifieds"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern classifieds marketplace focused on local buying, selling, and hiring—without the clutter of unrelated product lanes.`}
      actions={
        <>
          <Button variant="outline" className="rounded-full border-[#12B5D4]/40 text-[#0a6f82] hover:bg-[#12B5D4]/10" asChild>
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button className="rounded-full bg-[#12B5D4] text-white hover:bg-[#0fa3bf]" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-slate-200/80 bg-white shadow-sm">
          <CardContent className="space-y-4 p-6">
            <Badge className="rounded-full bg-[#12B5D4]/15 text-[#0a6f82]">Our story</Badge>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Built for neighbors, not noise.</h2>
            <p className="text-sm leading-7 text-slate-600">
              {SITE_CONFIG.name} started as a reaction to bloated marketplaces that mix unrelated formats. We focus on classifieds only—so search, chat, and checkout
              patterns stay consistent whether you are selling a phone, subletting a room, or hiring weekend help.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className={cn(classifieds.soft, 'p-4')}>
                  <div className="text-2xl font-semibold text-slate-950">{item.value}</div>
                  <div className="text-xs text-slate-600">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-slate-200/80 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-950">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className="border-slate-200/80 bg-white shadow-sm transition-transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-slate-200">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{member.bio}</p>
              <p className="mt-3 text-xs text-slate-500">{member.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
