"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ImageSequenceProps {
    folderPath?: string;
    frameCount?: number;
    filePrefix?: string;
    className?: string; // Allow custom styling positioning
}

export default function ImageSequence({
    folderPath = "/food_bowl_animation",
    frameCount = 240,
    filePrefix = "ezgif-frame-",
    className = ""
}: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll();

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Adjust padding for filenames: ezgif-frame-001.jpg
            // Assuming 3 digits padding based on previous file inspection
            const frameIndex = i.toString().padStart(3, "0");
            img.src = `${folderPath}/${filePrefix}${frameIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [folderPath, frameCount, filePrefix]);

    // Draw frame based on scroll
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];

        // Cover logic
        // We want the image to behave like object-fit: cover
        // The canvas itself is 100vw/100vh
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw seamless background if needed, but image should rely on transparency or matching bg
        // Assuming image is black bg.
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Listen to scroll changes
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * (frameCount - 1))
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial Render
    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }
    }, [isLoaded]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) {
                // Recalculate current frame
                const currentProgress = scrollYProgress.get();
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.floor(currentProgress * (frameCount - 1))
                );
                renderFrame(frameIndex);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, scrollYProgress]);

    return (
        <div className={`sticky top-0 h-screen w-full overflow-hidden bg-luxury-black ${className}`}>
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-luxury-black text-luxury-gold">
                    <p className="animate-pulse text-sm tracking-widest uppercase">Loading Experience...</p>
                </div>
            )}
        </div>
    );
}
