import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Manage Your Domains?</h2>
      <p className="mb-8 text-muted-foreground">
        Access your personalized Domain Bridgeboard and start optimizing your
        digital assets today.
      </p>
      <Button size="lg">Go to Dashboard</Button>
    </section>
  );
}
