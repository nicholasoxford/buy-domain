import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Pricing() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Template</CardTitle>
            <CardDescription>One-time purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$10</p>
            <p className="text-muted-foreground">per template</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Buy Now</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hosting</CardTitle>
            <CardDescription>Monthly subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$5</p>
            <p className="text-muted-foreground">per month for 5 domains</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Subscribe</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

