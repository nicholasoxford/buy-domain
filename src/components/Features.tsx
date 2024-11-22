import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Globe } from 'lucide-react'

export function Features() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Path to Success</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6" />
              Affordable Templates
            </CardTitle>
            <CardDescription>Perfect for quick setups and customization</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>One-time purchase of $10</li>
              <li>Fully responsive designs</li>
              <li>Easy to customize</li>
              <li>SEO optimized</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6" />
              Hassle-free Hosting
            </CardTitle>
            <CardDescription>Let us handle the technical details</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>$5/month for up to 5 domains</li>
              <li>Automatic SSL certificates</li>
              <li>99.9% uptime guarantee</li>
              <li>24/7 support</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

