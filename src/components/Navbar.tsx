'use client';

import { useState, useEffect } from 'react';
import { Phone, MapPin, Menu, X, ChevronRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  phone: string;
  brandName: string;
}

export default function Navbar({ phone, brandName }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Products', href: '#products' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Process', href: '#process' },
    { name: 'Storage', href: '#storage' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Locations', href: '#locations' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1B5E20]/95 backdrop-blur-md shadow-lg py-3 text-white'
          : 'bg-gradient-to-b from-[#1B5E20]/90 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A825] to-[#FBC02D] text-[#1B5E20] font-black flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            S
          </div>
          <div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1">
              {brandName}
              <Sparkles className="w-4 h-4 text-[#F9A825] animate-pulse" />
            </span>
            <span className="text-[10px] sm:text-xs text-[#F9A825] block font-medium -mt-1 tracking-wider uppercase">
              Fresh Idli & Dosa Batter
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-white/90 hover:text-[#F9A825] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F9A825] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#locations"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-105"
          >
            <MapPin className="w-3.5 h-3.5 text-[#F9A825]" />
            Visit Store
          </a>
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2 rounded-full bg-gradient-to-r from-[#F9A825] to-[#FBC02D] hover:from-[#FBC02D] hover:to-[#F9A825] text-[#1B5E20] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0D3B10] border-t border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between text-base font-semibold text-white/90 hover:text-[#F9A825] px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-white/40" />
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="#locations"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold py-2.5 rounded-xl bg-white/10 text-white border border-white/20"
            >
              <MapPin className="w-4 h-4 text-[#F9A825]" />
              Visit Store
            </a>
            <a
              href={`tel:${phone}`}
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold py-2.5 rounded-xl bg-[#F9A825] text-[#1B5E20] shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
