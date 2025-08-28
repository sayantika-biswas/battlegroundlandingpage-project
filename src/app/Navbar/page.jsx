"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
 export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState({ ios: null, aos: null });

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch("https://battlegroundbackend-project.onrender.com/api/navbar");
        const data = await res.json();
        // Assuming API returns an array of objects
        const ios = data.find((item) => item.label === "IOS DOWNLOAD");
        const aos = data.find((item) => item.label === "ANDROID DOWNLOAD");
        setDownloadLinks({ ios, aos });
      } catch (err) {
        // fallback: do nothing or set default links
      }
    }
    fetchLinks();
  }, []);

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-50 border-b-2 border-yellow-500">
      <div className="w-full flex items-center justify-between h-20 px-4 sm:px-6">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="BGMI Logo"
              width={140}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-sm ml-[500px]">
              <Link
            href="/"
            className="hover:text-yellow-100 text-yellow-400 whitespace-nowrap"
          >
            HOME
          </Link>
          <Link
            href="/how-to-play"
            className="hover:text-yellow-100 text-yellow-400 whitespace-nowrap"
          >
            HOW TO PLAY
          </Link>
          <Link
            href="/faq"
            className="hover:text-yellow-100 text-yellow-400 whitespace-nowrap"
          >
            FAQ
          </Link>
        </div>

        {/* Right: Download Buttons (desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          {downloadLinks.ios && (
            <Link
              href={downloadLinks.ios.url}
              target="_blank"
              className="px-3 py-1 bg-yellow-500 text-black font-bold hover:bg-yellow-400 whitespace-nowrap text-xs rounded-sm"
            >
              IOS DOWNLOAD
            </Link>
          )}
          {downloadLinks.aos && (
            <Link
              href={downloadLinks.aos.url}
              target="_blank"
              className="px-3 py-1 bg-yellow-500 text-black font-bold hover:bg-yellow-400 whitespace-nowrap text-xs rounded-sm"
            >
              AOS DOWNLOAD
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-yellow-400 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-yellow-500 px-6 py-4 space-y-4">
          <Link
            href="/how-to-play"
            className="block text-yellow-400 hover:text-yellow-100"
            onClick={() => setMenuOpen(false)}
          >
            HOW TO PLAY
          </Link>
          <Link
            href="/faq"
            className="block text-yellow-400 hover:text-yellow-100"
            onClick={() => setMenuOpen(false)}
          >
            FAQ
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            {downloadLinks.ios && (
              <Link
                href={downloadLinks.ios.url}
                target="_blank"
                className="px-3 py-2 bg-yellow-500 text-black font-bold hover:bg-yellow-400 text-center text-sm rounded-sm"
                onClick={() => setMenuOpen(false)}
              >
                IOS DOWNLOAD
              </Link>
            )}
            {downloadLinks.aos && (
              <Link
                href={downloadLinks.aos.url}
                target="_blank"
                className="px-3 py-2 bg-yellow-500 text-black font-bold hover:bg-yellow-400 text-center text-sm rounded-sm"
                onClick={() => setMenuOpen(false)}
              >
                AOS DOWNLOAD
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
// ...existing code...
