"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function StickyNavbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(true);

    // useTransform to map scrollY to opacity/blur
    // We want it to be hidden at 0, and fade in by 100px
    const opacity = useTransform(scrollY, [0, 100], [0, 1]);
    const blur = useTransform(scrollY, [0, 100], [0, 10]);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setHidden(latest < 50);
        });
    }, [scrollY]);

    return (
        <motion.nav
            style={{
                backgroundColor: "rgba(5, 5, 5, 0.75)",
                backdropFilter: "blur(12px)",
                opacity
            }}
            className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-6 md:px-12 border-b border-white/5 transition-opacity duration-500"
        >
            {/* Left: Logo */}
            <div className="text-white font-medium tracking-tight text-sm">
                Sony WH-1000XM6
            </div>

            {/* Center: Links (Hidden on mobile) */}
            <div className="hidden md:flex items-center gap-8 text-xs font-medium text-white/70">
                <a href="#" className="hover:text-white transition-colors">Overview</a>
                <a href="#" className="hover:text-white transition-colors">Technology</a>
                <a href="#" className="hover:text-white transition-colors">Noise Cancelling</a>
                <a href="#" className="hover:text-white transition-colors">Specs</a>
            </div>

            {/* Right: CTA */}
            <div>
                <button className="bg-gradient-to-r from-luxury-gold to-yellow-600 text-black text-xs font-bold px-4 py-1.5 rounded-full hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    Pre-order
                </button>
            </div>
        </motion.nav>
    );
}
