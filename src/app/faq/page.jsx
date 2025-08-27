"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function FAQ() {
  const images = ["/bg4.png", "/bg5.png", "/bg6.png"];
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null); // track open question

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [mounted, images.length]);

  const faqs = [
    {
      q: "What is this platform about?",
      a: "We provide tools and services that help individuals and businesses achieve their goals more effectively.",
    },
    {
      q: "Is it free to use?",
      a: "Yes! You can start for free. Premium features are available through affordable plans.",
    },
    {
      q: "Can I use it on mobile devices?",
      a: "Absolutely. Our platform is fully responsive and works on all major devices.",
    },
    {
      q: "How do I contact support?",
      a: "You can reach our support team anytime via email or live chat.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. We use industry-standard encryption and take privacy very seriously.",
    },
  ];

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

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-10 lg:px-20 py-16 md:py-20 overflow-hidden">
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
      <div className="w-full max-w-5xl z-10 mt-24 md:mt-15 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-600 to-red-800 bg-clip-text text-transparent drop-shadow-lg">
          FAQ
        </h1>
        <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl font-medium text-gray-300 px-2">
          Find answers to the most common questions about our platform.
        </p>

        {/* FAQ Items */}
        <div className="mt-8 md:mt-12 grid gap-6 sm:gap-8">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 md:p-8 hover:bg-white/20 transition-all cursor-pointer text-center"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-300">
                {item.q}
              </h3>
              {openIndex === idx && (
                <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
