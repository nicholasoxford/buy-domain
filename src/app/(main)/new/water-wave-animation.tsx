"use client";

import React from "react";
import { motion } from "framer-motion";

const WaveShape = ({
  color,
  animationDuration,
  offset,
  baseY = 120,
  amplitude = 20,
}: {
  color: string;
  animationDuration: number;
  offset: number;
  baseY?: number;
  amplitude?: number;
}) => {
  return (
    <motion.path
      fill={color}
      initial={{
        d: `
          M 0 ${baseY}
          Q 200 ${baseY - amplitude} 400 ${baseY}
          T 800 ${baseY}
          T 1200 ${baseY}
          V 300
          H 0
          Z
        `,
      }}
      animate={{
        d: [
          `
            M 0 ${baseY}
            Q 200 ${baseY - amplitude} 400 ${baseY}
            T 800 ${baseY}
            T 1200 ${baseY}
            V 300
            H 0
            Z
          `,
          `
            M 0 ${baseY}
            Q 200 ${baseY + amplitude} 400 ${baseY}
            T 800 ${baseY}
            T 1200 ${baseY}
            V 300
            H 0
            Z
          `,
          `
            M 0 ${baseY}
            Q 200 ${baseY - amplitude} 400 ${baseY}
            T 800 ${baseY}
            T 1200 ${baseY}
            V 300
            H 0
            Z
          `,
        ],
      }}
      transition={{
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        delay: offset,
      }}
    />
  );
};

export default function WaterWaveAnimation() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-50 via-sky-50 to-sky-100 flex items-end justify-center overflow-hidden">
      {/* Fishing Line */}
      <div
        className="absolute z-10 w-[1px] h-[180px] bg-gradient-to-b from-slate-400/80 to-transparent"
        style={{
          bottom: "45%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Bobber */}
      <motion.div
        className="absolute z-20"
        animate={{
          y: [-2, 2, -2],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "56px",
          height: "89px",
          bottom: "45%",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "drop-shadow(0 6px 8px rgba(0, 0, 0, 0.08))",
        }}
      >
        <img src="/bobber.svg" alt="Fishing Bobber" className="w-full h-full" />
      </motion.div>

      {/* Multiple ripple effects */}
      {[0, 1.75].map((delay, index) => (
        <motion.div
          key={index}
          className="absolute z-15 w-16 h-16 rounded-full border border-sky-200/20"
          animate={{
            scale: [1, 2, 2],
            opacity: [0.15, 0, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: delay,
          }}
          style={{
            bottom: "42%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      ))}

      {/* Bobber reflection */}
      <motion.div
        className="absolute z-15 w-8 h-4 bg-white/10 rounded-full blur-sm"
        animate={{
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          bottom: "41%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Wave container */}
      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1200 300"
          className="w-full h-96"
          preserveAspectRatio="none"
        >
          {/* Background waves */}
          <WaveShape
            color="rgba(125, 211, 252, 0.04)"
            animationDuration={8}
            offset={0}
            baseY={150}
            amplitude={40}
          />
          <WaveShape
            color="rgba(125, 211, 252, 0.06)"
            animationDuration={7.5}
            offset={0.2}
            baseY={150}
            amplitude={35}
          />
          <WaveShape
            color="rgba(125, 211, 252, 0.08)"
            animationDuration={7}
            offset={0.4}
            baseY={150}
            amplitude={30}
          />
          <WaveShape
            color="rgba(125, 211, 252, 0.12)"
            animationDuration={6.5}
            offset={0.6}
            baseY={150}
            amplitude={25}
          />
          <WaveShape
            color="rgba(147, 197, 253, 0.16)"
            animationDuration={6}
            offset={0.8}
            baseY={150}
            amplitude={20}
          />
        </svg>
      </div>
    </div>
  );
}
