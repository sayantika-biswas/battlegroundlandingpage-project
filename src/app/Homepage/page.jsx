"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
 export default function Homepage() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [storeLinks, setStoreLinks] = useState({ apple: null, google: null });
  console.log({images})
  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch("https://backend-landingpage-zs9q.onrender.com/api/store-links");
        const data = await res.json();
        const apple = data.find((item) => item.type === "apple");
        const google = data.find((item) => item.type === "google");
        setStoreLinks({ apple, google });
      } catch (err) {
        // fallback: do nothing or set default links
      }
    }
    fetchLinks();
  }, []);

  // Fetch background images from API
  useEffect(() => {
    async function fetchBgImages() {
      try {
        const res = await fetch("https://backend-landingpage-zs9q.onrender.com/api/bgcarousel");
        const data = await res.json();
        console.log({data})
        // If API returns array of objects with url property
        setImages(data.map(img => img.imageUrl));
      } catch (err) {
        // fallback: do nothing or set default images
      }
    }
    fetchBgImages();
  }, []);

  // Mounted flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // Background slideshow
  useEffect(() => {
    if (!mounted || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [mounted, images.length]);

  // Fallback (server + before hydration)
  if (!mounted || images.length === 0) {
    return (
      <main className="relative min-h-screen flex items-center justify-center text-white">
        <Image
          src={"/bg1.png"}
          alt="Background"
          fill
          className="object-cover object-top"
          priority
        />
      </main>
    );
  }

  // Normal render after mount
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 overflow-hidden overflow-x-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 -z-10">
        {images.map((url, idx) => (
          <Image
            key={idx}
            src={url}
            alt="Background"
            fill
            priority={idx === current}
            className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="text-center md:text-left max-w-4xl z-10 mt-32 sm:mt-40 md:mt-48 lg:mt-56">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          INDIA KA BATTLEGROUND
        </h1>
      </div>

      {/* Download Buttons */}
      <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-6 justify-center">
        {storeLinks.apple && (
          <Link
            href={storeLinks.apple.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-white/50 transition-transform"
          >
            <Image
              src="/apple.png"
              alt="App Store"
              width={140}
              height={45}
            className="drop-shadow-lg sm:w-[160px] sm:h-[50px]"
            priority
          />
        </Link>
         )}

       {storeLinks.google && (
         <Link
           href={storeLinks.google.url}
           target="_blank"
           rel="noopener noreferrer"
           className="p-2 rounded-xl hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-white/50 transition-transform"
        >
          <Image
            src="/googleplay.png"
            alt="Google Play"
            width={140}
            height={45}
            className="drop-shadow-lg sm:w-[160px] sm:h-[50px]"
            priority
          />
        </Link>
       )}

      </div>

      {/* Other Buttons */}
      <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6 justify-center">
        <Link
          href="https://www.unipin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 sm:px-5 py-1.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:shadow-[0_0_12px_rgba(255,215,0,0.6)] text-sm sm:text-base md:text-lg"
        >
          BUY UC at UniPin
        </Link>

        <Link
          href="https://battlegroundsmobileindia.com/apkdownload"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 sm:px-5 py-1.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:shadow-[0_0_12px_rgba(255,215,0,0.6)] text-sm sm:text-base md:text-lg"
        >
          APK DOWNLOAD
        </Link>
      </div>
    </main>
  );
}

// ...existing code...
