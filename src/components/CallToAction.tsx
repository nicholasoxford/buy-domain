import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Monetize Your Domains?
      </h2>
      <p className="text-lg mb-6">
        Join Domain Dash today and start turning your idle domains into profit.
      </p>
      <Button size="lg" variant="secondary">
        Get Started Now
      </Button>
    </div>
  );
}
