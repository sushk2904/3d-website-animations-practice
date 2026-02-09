"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

// --- Sub-components ---

const PulseMetric = () => (
    <div className="h-full flex flex-col justify-between relative overflow-hidden group">
        <div className="flex justify-between items-start z-10">
            <h3 className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-crave-accent rounded-full animate-pulse" />
                Live Ingest
            </h3>
        </div>
        <div className="z-10">
            <div className="text-3xl text-white font-light tabular-nums tracking-tighter">892 <span className="text-zinc-600 text-sm">req/s</span></div>
            <div className="h-1 w-full bg-zinc-800 rounded-full mt-2 overflow-hidden">
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-gradient-to-r from-transparent via-crave-accent to-transparent opacity-50"
                />
            </div>
        </div>

        {/* Connection Line */}
        <svg className="absolute top-1/2 -right-6 w-12 h-px z-0 hidden lg:block overflow-visible">
            <motion.path
                d="M0,0 L48,0"
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="4 2"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -24 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </svg>
    </div>
);

const FlavorNetwork = () => (
    <div className="h-full flex flex-col justify-between relative overflow-hidden group">
        <div className="flex justify-between items-start z-10">
            <h3 className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest text-right w-full">
                Output Vector
            </h3>
        </div>
        <div className="z-10 text-right">
            <div className="text-sm text-zinc-400 mb-1">Dominant Note</div>
            <div className="text-2xl text-crave-accent font-serif italic">Umami</div>
            <div className="text-xs text-zinc-600 mt-1">Confidence: 98.4%</div>
        </div>

        {/* Connection Line */}
        <svg className="absolute top-1/2 -left-6 w-12 h-px z-0 hidden lg:block overflow-visible">
            <motion.path
                d="M0,0 L48,0"
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="4 2"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 24 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </svg>
    </div>
);

const CoreHub = () => (
    <div className="relative h-full flex flex-col items-center justify-center text-center z-10">
        <div className="absolute inset-0 rounded-full border border-crave-accent/20 animate-spin-slow m-8 opacity-20" />
        <div className="w-20 h-20 rounded-full border border-crave-accent/50 flex items-center justify-center mb-4 relative">
            <div className="absolute inset-0 rounded-full border border-white/10 scale-125 animate-ping opacity-20" />
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white]" />
        </div>
        <h2 className="text-2xl text-white font-bold tracking-tight">CraveOS <span className="text-crave-accent">Core</span></h2>
        <div className="text-zinc-500 text-[10px] bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800 mt-2">
            V 4.2.0 • ONLINE
        </div>
    </div>
);

export default function SpatialInterface() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set((clientX - centerX) / centerX);
        mouseY.set((clientY - centerY) / centerY);
    };

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 });

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden perspective-1000 py-20"
        >
            <div className="container mx-auto px-4 relative z-10 max-w-5xl">

                {/* Intro Text */}
                <div className="text-center mb-16 relative z-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-white text-3xl md:text-5xl font-bold mb-4"
                    >
                        The Intelligence Layer.
                    </motion.h2>
                    <p className="text-zinc-400 max-w-xl mx-auto">
                        Where raw ingredients become actionable insights.
                    </p>
                </div>

                {/* Unified Dashboard Module */}
                <motion.div
                    style={{ rotateX, rotateY }}
                    className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-zinc-950/40 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl flex items-center justify-center p-8 group overflow-hidden"
                >
                    {/* Inner Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-full relative z-10 items-center">

                        {/* Module 1: Input (Left) */}
                        <div className="h-full rounded-2xl bg-black/40 border border-zinc-800/50 p-6 hover:border-crave-accent/30 transition-colors">
                            <PulseMetric />
                        </div>

                        {/* Module 2: Core (Center) */}
                        <div className="h-full rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-crave-accent/10 p-8 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden">
                            {/* Scanline */}
                            <motion.div
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-px bg-crave-accent/30 shadow-[0_0_10px_rgba(251,191,36,0.5)] z-0"
                            />
                            <CoreHub />
                        </div>

                        {/* Module 3: Output (Right) */}
                        <div className="h-full rounded-2xl bg-black/40 border border-zinc-800/50 p-6 hover:border-crave-accent/30 transition-colors">
                            <FlavorNetwork />
                        </div>
                    </div>

                    {/* Background Grid inside the glass */}
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none rounded-3xl" />
                </motion.div>

            </div>

            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-crave-accent/10 rounded-full blur-[100px] pointer-events-none z-0" />
        </section>
    );
}
