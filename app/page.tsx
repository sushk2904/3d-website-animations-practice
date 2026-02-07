"use client";

import ScrollFoodHero from "./components/ScrollFoodHero";
import StickyNavbar from "./components/StickyNavbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-crave-bg">
      <StickyNavbar />
      <ScrollFoodHero />

      {/* Dashboard Preview / Footer Placeholder */}
      <section className="h-screen bg-black flex items-center justify-center border-t border-zinc-800">
        <div className="text-center">
          <h3 className="text-zinc-500 text-sm tracking-widest uppercase mb-4">CraveLogic Dashboard</h3>
          <p className="text-white text-2xl font-light">The intelligence continues.</p>
        </div>
      </section>
    </main>
  );
}
