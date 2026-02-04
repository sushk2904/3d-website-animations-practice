"use client";

import ImageSequence from "./components/ImageSequence";
import StickyNavbar from "./components/StickyNavbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Text Section Component
const TextSection = ({
  children,
  className = "",
  offset = 0
}: {
  children: React.ReactNode;
  className?: string;
  offset: number;
}) => {
  return (
    <div
      className={`absolute w-full px-6 md:px-20 flex flex-col justify-center ${className}`}
      style={{ top: `${offset}%` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative min-h-screen">
      <StickyNavbar />

      {/* 
        Scroll Track: 500vh height gives us enough room to play the sequence.
        The ImageSequence is sticky inside this track.
      */}
      <div className="relative h-[800vh]">
        <ImageSequence />

        {/* Overlays Container */}
        <div className="absolute inset-0 z-10 pointer-events-none">

          {/* 0-15% : Hero */}
          <TextSection offset={2} className="items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 drop-shadow-2xl"
            >
              Sony WH-1000XM6
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-6 text-xl md:text-2xl text-luxury-gold font-light tracking-wide"
            >
              Silence, perfected.
            </motion.p>
          </TextSection>

          {/* 15-40% : Engineering Reveal (Left) */}
          <TextSection offset={20} className="items-start text-left md:pl-32 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Precision-engineered <br />
                <span className="text-luxury-purple opacity-90">for silence.</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-light">
                Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity. Every component is tuned for balance, power, and comfort—hour after hour.
              </p>
            </motion.div>
          </TextSection>

          {/* 40-65% : Noise Cancelling (Right) */}
          <TextSection offset={45} className="items-end text-right md:pr-32 ml-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Adaptive noise cancelling, <br />
                <span className="text-luxury-gold opacity-90">redefined.</span>
              </h2>
              <ul className="text-lg text-white/70 space-y-4 font-light">
                <li>Multi-microphone array listens in every direction.</li>
                <li>Real-time noise analysis adjusts to your environment.</li>
                <li>Your music stays pure—planes, trains, and crowds fade away.</li>
              </ul>
            </motion.div>
          </TextSection>

          {/* 65-85% : Sound & Upscaling (Center/Left) */}
          <TextSection offset={70} className="items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/5"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Immersive, lifelike sound.
              </h2>
              <p className="text-lg text-white/70 loading-relaxed">
                High-performance drivers unlock detail, depth, and texture in every track.
                AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
              </p>
            </motion.div>
          </TextSection>

          {/* 85-100% : Reassembly & CTA */}
          <TextSection offset={90} className="items-center text-center pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Hear everything.
              </h2>
              <h3 className="text-3xl md:text-5xl font-light text-white/60 mb-10">
                Feel nothing else.
              </h3>

              <div className="flex flex-col md:flex-row gap-6 justify-center items-center pointer-events-auto">
                <button className="bg-luxury-gold text-black text-lg font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  Experience WH-1000XM6
                </button>
                <button className="text-white hover:text-luxury-gold transition-colors text-lg font-medium underline-offset-4 hover:underline">
                  See full specs
                </button>
              </div>
            </motion.div>
          </TextSection>

        </div>
      </div>

      {/* Footer / buffer */}
      <div className="h-screen bg-luxury-black flex items-center justify-center">
        <p className="text-white/20 text-sm">Designed by Sony. Engineered for the future.</p>
      </div>
    </main>
  );
}
