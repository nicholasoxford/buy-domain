import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Unleash the Power of Your Dormant Domains
      </h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Transform your unused domains into profitable assets. Choose between sleek templates or effortless hosting, and watch your digital real estate thrive.
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">Learn More</Button>
      </div>
    </section>
  )
}

