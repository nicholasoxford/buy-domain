import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export function EmailSubscription() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log("Subscribing email:", email);
    toast({
      title: "Subscribed!",
      description: "You've been subscribed to weekly summary emails.",
    });
    setEmail("");
  };

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-6">Stay Informed</h2>
      <p className="text-center mb-8 text-muted-foreground">
        Subscribe to our weekly summary emails and never miss an opportunity.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </section>
  );
}
