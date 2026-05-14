import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ShieldCheck, MessageCircle, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const values = [
  { title: 'Local first', description: 'We optimize for short distances, faster replies, and safer handoffs to avoid noisy nationwide browsing.' },
  { title: 'Trust by design', description: 'Clear photos, structured fields, and messaging that keeps your contact info private until you choose.' },
  { title: 'Fair pricing', description: 'Free listings for casual sellers with optional boosts when you want more visibility.' },
]

export default function AboutPage() {
  return (
    <PageShell
      variant="classifieds"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a local classifieds marketplace built for simple buying and selling, safer conversations, and faster neighborhood discovery.`}
      actions={
        <>
          <Button variant="outline" className="rounded-full border-[#12B5D4]/40 text-[#0a6f82] hover:bg-[#12B5D4]/10" asChild>
            <Link href="/classifieds">Browse classifieds</Link>
          </Button>
          <Button className="rounded-full bg-[#12B5D4] text-white hover:bg-[#0fa3bf]" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <Card className="overflow-hidden border-slate-200/80 bg-gradient-to-b from-white to-[#f7fcff] shadow-sm">
          <CardContent className="grid gap-8 p-7 lg:grid-cols-[1.15fr_0.85fr] lg:p-9">
            <div>
              <Badge className="rounded-full bg-[#12B5D4]/15 text-[#0a6f82]">Our story</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">Built for neighbors, not noise.</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">
                {SITE_CONFIG.name} was created to make local classifieds feel calmer, safer, and easier to trust.
                Instead of mixing too many content types, we focus on a clean flow where buyers and sellers can discover,
                message, and decide without confusion.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a6f82]">What we improve</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[#12B5D4]" />Cleaner category discovery</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[#12B5D4]" />Safer buyer-seller conversations</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[#12B5D4]" />Faster local decision making</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value, index) => (
            <Card key={value.title} className="border-slate-200/80 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#12B5D4]/12 text-[#0a6f82]">
                  {index === 0 ? <MapPin className="h-5 w-5" /> : null}
                  {index === 1 ? <ShieldCheck className="h-5 w-5" /> : null}
                  {index === 2 ? <MessageCircle className="h-5 w-5" /> : null}
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
