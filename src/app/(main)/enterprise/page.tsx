"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitEnterpriseForm } from "@/lib/enterprise";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function EnterprisePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-900">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900 to-slate-900" />

      <div className="relative z-10 container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
            Enterprise Solutions
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-center text-slate-400 max-w-2xl mx-auto">
            Get advanced features, dedicated support, and custom solutions for
            your organization
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-75" />
            <Card className="relative h-full p-6 sm:p-8 bg-slate-900/60 border-purple-500/20">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white">
                  Enterprise Features
                </h2>
                <ul className="space-y-4 text-slate-300">
                  {[
                    "Dedicated account manager",
                    "Custom domain limits",
                    "Advanced analytics",
                    "Priority support",
                    "Custom integrations",
                    "SLA guarantees",
                    "Team collaboration tools",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <span className="text-purple-400">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-75" />
            <Card className="relative h-full p-6 sm:p-8 bg-slate-900/60 border-purple-500/20">
              <form
                action={async (formData) => {
                  const result = await submitEnterpriseForm(formData);
                  if (result.success) router.push(result.redirect);
                }}
                className="space-y-6"
              >
                {[
                  { id: "company", label: "Company Name", type: "text" },
                  { id: "name", label: "Contact Name", type: "text" },
                  { id: "email", label: "Work Email", type: "email" },
                  { id: "phone", label: "Phone Number", type: "tel" },
                ].map(({ id, label, type }) => (
                  <div key={id} className="space-y-2">
                    <Label
                      htmlFor={id}
                      className="text-sm font-medium text-slate-200"
                    >
                      {label}
                    </Label>
                    <Input
                      id={id}
                      name={id}
                      type={type}
                      required
                      className="w-full h-11 bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-slate-400"
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <Label
                    htmlFor="employees"
                    className="text-sm font-medium text-slate-200"
                  >
                    Number of Employees
                  </Label>
                  <select
                    id="employees"
                    name="employees"
                    required
                    className="w-full h-11 bg-slate-800/50 border-slate-700 rounded-md text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="">Select...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-1000">201-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-200"
                  >
                    Tell us about your needs
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-slate-400"
                    placeholder="What are your domain management requirements?"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/30"
                >
                  Contact Sales
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
