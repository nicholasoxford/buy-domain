"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Globe, ArrowRight, Loader2 } from "lucide-react";
import { useOffers } from "@/contexts/OffersContext";

// Move the FloatingOrb component here
const FloatingOrb = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.2, 1],
      x: [0, 100, 0],
      y: [0, -50, 0],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
  />
);

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  offer: z.string().min(1, "Please enter an offer amount"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters"),
});

export function OfferForm() {
  const { addOffer } = useOffers();
  const [characterCount, setCharacterCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [siteBaseUrl, setSiteBaseUrl] = useState<string>(
    "https://domain-bridge.com"
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "idle";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const [currentDomain, setCurrentDomain] = useState<string>(
    "https://domain-bridge.com"
  );

  useEffect(() => {
    if (currentDomain && form.getValues("description")) {
      const description = form.getValues("description");
      const updatedDescription = description.replace(
        /([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/g,
        currentDomain
      );
      form.setValue("description", updatedDescription);
    }
  }, [currentDomain]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "John Smith",
      email: "john@example.com",
      offer: "5000",
      description: `Hi, I'm interested in purchasing ${siteBaseUrl} for my upcoming project. I plan to use it for a new SaaS platform in the tech space. Looking forward to discussing this opportunity with you.`,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: "idle", message: "" });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const newOffer = {
        timestamp: new Date().toISOString(),
        domain: siteBaseUrl,
        email: values.email,
        amount: parseInt(values.offer),
        description: values.description,
      };

      addOffer(newOffer);

      setSubmitStatus({
        type: "success",
        message: "Your offer has been submitted successfully!",
      });
      form.reset();
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit offer. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 rounded-2xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-slate-900" />

      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb delay={0} />
        <FloatingOrb delay={2} />
        <FloatingOrb delay={4} />
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(600px at 0% 0%, purple 0%, transparent 80%)",
            "radial-gradient(600px at 100% 100%, purple 0%, transparent 80%)",
            "radial-gradient(600px at 0% 100%, purple 0%, transparent 80%)",
            "radial-gradient(600px at 100% 0%, purple 0%, transparent 80%)",
            "radial-gradient(600px at 0% 0%, purple 0%, transparent 80%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Form container */}
      <div className="relative w-full max-w-xl mx-auto p-8">
        <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-pink-500/10 rounded-2xl" />

          <div className="relative p-8">
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-2 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm"
              >
                <Globe className="w-8 h-8 text-purple-300" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
                  Make Your Offer
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Secure {siteBaseUrl} with a compelling offer
                </p>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Your Name
                  </label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <input
                    {...form.register("email")}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Your Offer (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <input
                    {...form.register("offer")}
                    type="number"
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  How will you use this domain?
                </label>
                <textarea
                  {...form.register("description")}
                  onChange={(e) => {
                    form.register("description").onChange(e);
                    setCharacterCount(e.target.value.length);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                  placeholder={`Share your vision for ${siteBaseUrl}...`}
                />
                <div className="text-xs text-slate-400">
                  {characterCount}/500 characters
                </div>
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {submitStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`rounded-lg p-4 text-sm ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={`relative w-full group ${
                  isSubmitting ? "cursor-not-allowed opacity-80" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                />
                <div className="relative flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold leading-none">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Submit Offer
                      </motion.div>
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.button>

              {/* Form validation errors */}
              <AnimatePresence>
                {Object.keys(form.formState.errors).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400"
                  >
                    <ul className="list-disc list-inside space-y-1">
                      {Object.entries(form.formState.errors).map(
                        ([field, error]) => (
                          <li key={field}>{error?.message?.toString()}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
