"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const testimonials = [
  {
    name: "Nemo",
    role: "Domain Investor",
    image: "/nemo.png", // You'll need to add these images
    quote:
      "This platform has transformed how I manage my domain portfolio. The analytics and instant notifications have helped me close deals faster than ever.",
    stats: "500+ domains managed",
  },
  {
    name: "Johnny",
    role: "Digital Asset Manager",
    image: "/johnny.png",
    quote:
      "The self-hosted solution is a game-changer. I love having complete control while still getting all the premium features. Best investment I've made for my domains.",
    stats: "Doubled conversion rate",
  },
  {
    name: "DJ",
    role: "Startup Founder",
    image: "/dj.png",
    quote:
      "Clean, professional, and incredibly effective. Our domain sales have increased by 300% since implementing this solution. The ROI is absolutely incredible.",
    stats: "$100k+ in sales",
  },
];

export function Testimonials() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text mb-4">
            Trusted by Leading Domain Investors
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join hundreds of successful domain investors who have transformed
            their portfolio management and increased their sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />

              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-500/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-16 w-16">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>

                <blockquote className="text-slate-300 mb-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                <div className="flex items-center gap-2 text-sm">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-purple-300">{testimonial.stats}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
