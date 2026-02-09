"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

// --- Sub-components for Floating Widgets ---

const FloatingCard = ({ children, className = "", delay = 0, x = 0, y = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: "backOut" }}
        className={`absolute rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden ${className}`}
        style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.4) 100%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
    >
        {children}
        {/* Shine FX */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    </motion.div>
);

const PulseMetric = () => (
    <div className="p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
            <h3 className="text-zinc-400 text-xs font-mono uppercase tracking-widest">Live Pulse</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </div>
        <div className="flex items-end gap-2">
            <span className="text-4xl text-white font-light tabular-nums">892</span>
            <span className="text-zinc-500 text-xs mb-1">req/s</span>
        </div>
        {/* Waveform */}
        <div className="h-10 flex items-end gap-1 mt-2">
            {[40, 70, 45, 90, 60, 75, 50, 80, 55, 95].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: "20%" }}
                    animate={{ height: [`${h}%`, `${h * 0.5}%`, `${h}%`] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                    className="flex-1 bg-crave-accent/30 rounded-t-sm"
                />
            ))}
        </div>
    </div>
);

const FlavorNetwork = () => {
    return (
        <div className="p-6 h-full relative">
            <h3 className="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-4">Taste Graph</h3>
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <motion.circle cx="50%" cy="50%" r="40" stroke="currentColor" strokeWidth="1" className="text-zinc-500"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <circle cx="50%" cy="50%" r="2" fill="white" />
                <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="white" strokeWidth="0.5" />
                <circle cx="20%" cy="30%" r="3" fill="#fbbf24" /> {/* Gold Node */}
            </svg>
            <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
                <div className="text-center">
                    <div className="text-[10px] text-zinc-500">DOMINANT</div>
                    <div className="text-white font-serif italic text-lg">Umami</div>
                </div>
                <div className="text-center">
                    <div className="text-[10px] text-zinc-500">PAIRING</div>
                    <div className="text-crave-accent font-serif italic text-lg">Citrus+</div>
                </div>
            </div>
        </div>
    );
};

const PredictiveCard = () => (
    <div className="p-5 h-full flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/50">
            <span className="text-xl">🚀</span>
        </div>
        <div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Trending Forecast</div>
            <div className="text-white font-medium">Spicy Honey Glaze</div>
            <div className="text-xs text-crave-accent mt-1">Expected +240% Growth</div>
        </div>
    </div>
);


export default function SpatialInterface() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Parallax logic for mouse movement
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set((clientX - centerX) / centerX);
        mouseY.set((clientY - centerY) / centerY);
    };

    const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), { stiffness: 100, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), { stiffness: 100, damping: 20 });

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden perspective-1000"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crave-accent/5 via-black to-black opacity-50" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

            {/* Central Typography */}
            <div className="absolute z-0 text-center pointer-events-none opacity-20 select-none">
                <h1 className="text-[12rem] font-bold text-white tracking-tighter leading-none mix-blend-overlay">
                    CRAVE
                </h1>
                <h1 className="text-[12rem] font-bold text-white tracking-tighter leading-none mix-blend-overlay ml-32">
                    OS
                </h1>
            </div>

            {/* Floating Interface Container */}
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center z-10 preserve-3d"
            >
                {/* --- Widget 1: Live Pulse (Top Left) --- */}
                <FloatingCard
                    className="w-64 h-40 top-[10%] left-[15%]"
                    delay={0.1}
                >
                    <PulseMetric />
                </FloatingCard>

                {/* --- Widget 2: Flavor Network (Right Center) --- */}
                <FloatingCard
                    className="w-72 h-72 top-[20%] right-[10%]"
                    delay={0.2}
                >
                    <FlavorNetwork />
                </FloatingCard>

                {/* --- Widget 3: Predictive Card (Bottom Left) --- */}
                <FloatingCard
                    className="w-80 h-24 bottom-[20%] left-[20%]"
                    delay={0.3}
                >
                    <PredictiveCard />
                </FloatingCard>

                {/* --- Widget 4: Central Command (Center) --- */}
                <FloatingCard
                    className="w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !bg-black/80 border-crave-accent/20"
                    delay={0}
                >
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                        <div className="absolute inset-0 border border-crave-accent/10 rounded-3xl m-2" />
                        <div className="w-16 h-16 rounded-full border-2 border-crave-accent flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        </div>
                        <h2 className="text-3xl text-white font-bold mb-2">System Active</h2>
                        <p className="text-zinc-500 text-sm max-w-[200px]">
                            Analyzing global taste vectors in real-time.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <button className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:scale-105 transition-transform">
                                INITIATE
                            </button>
                            <button className="px-6 py-2 border border-white/20 text-white text-xs font-bold rounded-full hover:bg-white/10 transition-colors">
                                CONFIGURE
                            </button>
                        </div>
                    </div>
                </FloatingCard>

            </motion.div>
        </section>
    );
}
