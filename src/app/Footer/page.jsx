"use client";
import Image from "next/image";
import {
  FaArrowUp,
  FaDiscord,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function Footer() {

  const [showCookie, setShowCookie] = useState(true);
  const [storeLinks, setStoreLinks] = useState({ apple: null, google: null });
    const [socialLinks, setSocialLinks] = useState({ instagram: null, facebook: null, youtube: null, discord: null });

    useEffect(() => {
      async function fetchSocialLinks() {
        try {
          const res = await fetch("https://backend-landingpage-zs9q.onrender.com/api/social-links");
          const data = await res.json();
          const instagram = data.find((item) => item.type === "instagram");
          const facebook = data.find((item) => item.type === "facebook");
          const youtube = data.find((item) => item.type === "youtube");
          const discord = data.find((item) => item.type === "discord");
          setSocialLinks({ instagram, facebook, youtube, discord });
        } catch (err) {
          // fallback: do nothing or set default links
        }
      }
      fetchSocialLinks();
    }, []);

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


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-gray-400 text-sm relative">
      <div className="h-10 bg-black" />

      {/* Background Section with Overlaid Content */}
      <div className="relative w-full h-[300px] pt-5 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/footerbg.png"
          alt="Footer Background"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-center px-6">



          {/* App Icon */}
          <Image
            src="/footerlogo1.png"
            alt="App Icon"
            width={70}
            height={70}
            className="mb-3 sm:mb-4 drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          />

          {/* Heading */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-6">
            INDIA'S BATTLEGROUNDS IS COMING SOON
          </h2>

          {/* Store Badges */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            {storeLinks.apple && (
              <Link
                href={storeLinks.apple.url}
                target="_blank"
                className="transform transition duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-green-400/30 rounded-xl"
              >
                <Image
                  src="/apple.png"
                  alt="App Store"
                  width={150}
                  height={50}
                  className="drop-shadow-lg"
                />
              </Link>
            )}
            {storeLinks.google && (
              <Link
                href={storeLinks.google.url}
                target="_blank"
                className="transform transition duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-green-400/30 rounded-xl"
              >
                <Image
                  src="/googleplay.png"
                  alt="Google Play"
                  width={150}
                  height={50}
                  className="drop-shadow-lg"
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Black Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center gap-6 bg-black text-center">
        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="relative w-32 h-10 sm:w-40 sm:h-12">
            <Image
              src="/footerlogo01.png"
              alt="Footer Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative w-32 h-10 sm:w-40 sm:h-12">
            <Image
              src="/footerlogo02.png"
              alt="Footer Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs md:text-sm">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            Rules of Conduct
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            Community Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            Content Guidelines
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            HOME Terms
          </a>
          <span>|</span>
          <a href="#" className="hover:text-white">
            WOW Terms
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 sm:space-x-6 mt-2 sm:mt-4">
          {socialLinks.instagram && (
            <Link href={socialLinks.instagram.url} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={18} className="hover:text-yellow-400 transition" />
            </Link>
          )}
          {socialLinks.facebook && (
            <Link href={socialLinks.facebook.url} target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={18} className="hover:text-yellow-400 transition" />
            </Link>
          )}
          {socialLinks.youtube && (
            <Link href={socialLinks.youtube.url} target="_blank" rel="noopener noreferrer">
              <FaYoutube size={18} className="hover:text-yellow-400 transition" />
            </Link>
          )}
          {socialLinks.discord && (
            <Link href={socialLinks.discord.url} target="_blank" rel="noopener noreferrer">
              <FaDiscord size={18} className="hover:text-yellow-400 transition" />
            </Link>
          )}
        </div>

        {/* Copyright */}
        <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
          © 2025 KRAFTON, Inc. All rights reserved.
        </p>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 bg-white text-black p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
        aria-label="Scroll to Top"
      >
        <FaArrowUp />
      </button>

      {/* Cookie Bar */}
      {showCookie && (
        <div className="bg-gray-900 text-gray-300 text-[10px] sm:text-xs py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <span className="text-center sm:text-left">
            This website uses cookies to ensure you get the best experience.{" "}
            <a href="#" className="underline hover:text-white">Learn more</a>
          </span>
          <button
            onClick={() => setShowCookie(false)}
            className="bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold hover:bg-yellow-500"
          >
            ✕
          </button>
        </div>
      )}
    </footer>
  );
}
