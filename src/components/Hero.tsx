import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Put Your Unused Domains to Work
      </h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Simple tools to manage and monetize your parked domains. Host a landing
        page or list them for sale.
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>
    </section>
  );
}
