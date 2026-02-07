"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import ImageSequence from "./ImageSequence";

// --- Overlay Components ---

const OverlayText = ({
    children,
    progress,
    stageStart,
    stageEnd,
    className = ""
}: {
    children: React.ReactNode;
    progress: any;
    stageStart: number; // 0-1
    stageEnd: number; // 0-1
    className?: string;
}) => {
    const opacity = useTransform(
        progress,
        [stageStart, stageStart + 0.05, stageEnd - 0.05, stageEnd],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        progress,
        [stageStart, stageStart + 0.05],
        [20, 0]
    );

    return (
        <motion.div style={{ opacity, y }} className={`absolute pointer-events-none ${className}`}>
            {children}
        </motion.div>
    );
};

const DataNode = ({
    label,
    value,
    x,
    y,
    delay = 0,
    progress,
    visibleRange
}: {
    label: string;
    value: string;
    x: string; // "10%"
    y: string;
    delay?: number;
    progress: any;
    visibleRange: [number, number];
}) => {
    // Opacity based on progress
    const opacity = useTransform(
        progress,
        [visibleRange[0], visibleRange[0] + 0.05, visibleRange[1] - 0.05, visibleRange[1]],
        [0, 1, 1, 0]
    );

    return (
        <motion.div
            style={{ opacity, left: x, top: y }}
            className="absolute flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-crave-accent/30"
        >
            <div className="w-2 h-2 rounded-full bg-crave-accent animate-pulse" />
            <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider leading-none">{label}</span>
                <span className="text-xs font-mono text-crave-accent">{value}</span>
            </div>
        </motion.div>
    )
}

// --- Main Component ---

export default function ScrollFoodHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[600vh] bg-crave-bg">
            {/* 
        Sticky Canvas Container 
        Using existing ImageSequence which defaults to food_bowl_animation 
      */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ImageSequence
                    folderPath="/food_bowl_animation"
                    frameCount={240}
                    className="bg-crave-bg"
                />

                {/* --- STAGE 1: Empty System (0-20%) --- */}
                <OverlayText
                    progress={scrollYProgress}
                    stageStart={0}
                    stageEnd={0.2}
                    className="inset-0 flex items-center justify-center text-center"
                >
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-2xl pb-4">
                        CraveLogic
                    </h1>
                    <p className="mt-4 text-xl md:text-3xl font-light text-[#4c1d95] tracking-widest uppercase">
                        - a foodoscope brand
                    </p>
                </OverlayText>

                {/* --- STAGE 2: Ingredient Arrival (20-45%) --- */}
                <OverlayText
                    progress={scrollYProgress}
                    stageStart={0.2}
                    stageEnd={0.45}
                    className="inset-0"
                >
                    <div className="absolute top-20 left-10 md:left-20">
                        <h2 className="text-3xl font-light text-white mb-2">Input Processing</h2>
                        <div className="h-0.5 w-24 bg-crave-accent mb-4" />
                        <p className="text-zinc-400 max-w-xs">Analyzing raw organic data inputs structure.</p>
                    </div>
                </OverlayText>

                {/* Data Nodes simulating analysis as items fall */}
                <DataNode
                    progress={scrollYProgress}
                    visibleRange={[0.22, 0.45]}
                    label="Lycopene"
                    value="85%"
                    x="20%"
                    y="40%"
                />
                <DataNode
                    progress={scrollYProgress}
                    visibleRange={[0.25, 0.45]}
                    label="Vit-C"
                    value="120mg"
                    x="70%"
                    y="30%"
                />
                <DataNode
                    progress={scrollYProgress}
                    visibleRange={[0.30, 0.45]}
                    label="Capsaicin"
                    value="High"
                    x="30%"
                    y="60%"
                />

                {/* --- STAGE 3: Intelligence Activation (45-70%) --- */}
                <OverlayText
                    progress={scrollYProgress}
                    stageStart={0.45}
                    stageEnd={0.70}
                    className="inset-0 flex items-center justify-end pr-10 md:pr-32"
                >
                    <div className="bg-black/80 backdrop-blur-md border border-zinc-800 p-6 rounded-xl w-80">
                        <h3 className="text-crave-accent font-mono text-sm mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-crave-accent rounded-full animate-ping" />
                            SYSTEM ACTIVE
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>API Status</span>
                                <span className="text-white">Connected</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                <motion.div
                                    style={{ width: useTransform(scrollYProgress, [0.45, 0.7], ["0%", "100%"]) }}
                                    className="bg-crave-accent h-full"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Analyzing Matches</span>
                                <span className="font-mono text-white">4,291</span>
                            </div>
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Flavor Profile</span>
                                <span className="font-mono text-white">Balanced</span>
                            </div>
                        </div>
                    </div>
                </OverlayText>

                {/* --- STAGE 4: Completed Dish (70-90%) --- */}
                <OverlayText
                    progress={scrollYProgress}
                    stageStart={0.70}
                    stageEnd={0.90}
                    className="inset-0 flex flex-col items-center justify-center pt-78" // Removed pt-96 to center text
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
                        From Ingredients <br />
                        <span className="text-crave-accent">→ Intelligence</span>
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-8 flex gap-4"
                    >
                        <button className="bg-crave-accent text-crave-bg px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all">
                            Explore Platform
                        </button>
                        <button className="border border-zinc-700 text-white px-8 py-3 rounded-full font-medium hover:bg-white/5 transition-all">
                            View API Docs
                        </button>
                    </motion.div>
                </OverlayText>

                {/* --- STAGE 5: Transitions handled naturally by spacing --- */}

            </div>
        </section>
    );
}
