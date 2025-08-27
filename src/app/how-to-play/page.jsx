"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HowItWorks() {
  const images = ["/bg1.png", "/bg2.png", "/bg3.png"];
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Slideshow only runs after mount
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [mounted, images.length]);

  // Fallback (server + before hydration)
  if (!mounted) {
    return (
      <main className="relative min-h-screen flex items-center justify-center text-white">
        <Image
          src={images[0]}
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </main>
    );
  }

  // Normal render after mount
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white px-6 py-10 overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 -z-10">
        {images.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt="Background"
            fill
            priority={idx === current}
            className={`object-cover object-center transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      </div>

      {/* Content */}
      <div className="max-w-4xl z-10 mt-40 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
          HOW IT WORKS
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
          Our platform makes it simple to get started, customize your experience,
          and achieve your goals step by step.
        </p>

        {/* Steps */}
        <div className="mt-10 grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
            <h3 className="text-xl font-bold text-yellow-300">📝 Step 1: Sign Up</h3>
            <p className="text-gray-300 mt-2">
              Create your free account in just a few seconds with your email or
              social login.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
            <h3 className="text-xl font-bold text-yellow-300">⚙️ Step 2: Customize</h3>
            <p className="text-gray-300 mt-2">
              Choose the tools and features that fit your workflow and goals.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
            <h3 className="text-xl font-bold text-yellow-300">🤝 Step 3: Collaborate</h3>
            <p className="text-gray-300 mt-2">
              Invite your team or friends and start collaborating seamlessly.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
            <h3 className="text-xl font-bold text-yellow-300">🚀 Step 4: Grow</h3>
            <p className="text-gray-300 mt-2">
              Scale effortlessly as your needs expand. We’re built to grow with
              you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
