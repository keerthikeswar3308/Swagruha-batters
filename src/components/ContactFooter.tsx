'use client';

import { Phone, MapPin, Clock, Mail, Compass, Sparkles, Heart } from 'lucide-react';

interface SiteInfo {
  brandName: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  primaryAddress: string;
  workingHours: string;
}

interface ContactFooterProps {
  siteInfo: SiteInfo;
}

export default function ContactFooter({ siteInfo }: ContactFooterProps) {
  const schemaOrgJSON = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteInfo.brandName,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop',
    telephone: siteInfo.phonePrimary,
    email: siteInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteInfo.primaryAddress,
      addressLocality: 'Nellore',
      addressRegion: 'Andhra Pradesh',
      postalCode: '524001',
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Su 06:00-21:00',
    url: 'https://swagruhabatters.com',
    priceRange: '₹60 - ₹65',
    description: siteInfo.tagline,
  };

  return (
    <footer id="contact" className="bg-[#0D3B10] text-white pt-20 pb-8 relative overflow-hidden">
      {/* JSON-LD Schema.org for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSON) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Top Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Brand Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F9A825] text-[#1B5E20] font-black flex items-center justify-center text-2xl shadow-lg">
                S
              </div>
              <div>
                <h3 className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
                  {siteInfo.brandName}
                  <Sparkles className="w-4 h-4 text-[#F9A825]" />
                </h3>
                <span className="text-xs text-[#F9A825] font-semibold tracking-widest uppercase">
                  {siteInfo.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              Family-owned fresh Idli & Dosa batter manufacturer with 9+ years of trusted homemade taste. 100% natural, hygienically packed in 1 KG pouches daily.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`tel:${siteInfo.phonePrimary}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F9A825] text-[#1B5E20] font-black text-xs shadow-lg hover:bg-[#FBC02D] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Store 1
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  siteInfo.brandName + ' ' + siteInfo.primaryAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs border border-white/20 hover:bg-white/20 transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#F9A825]" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Contact Details Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F9A825]/20 text-[#F9A825] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">Call Us Directly</h4>
              <div className="space-y-1 text-xs text-white/80 font-medium">
                <a href={`tel:${siteInfo.phonePrimary}`} className="block hover:text-[#F9A825] transition-colors">
                  Store 1: {siteInfo.phonePrimary}
                </a>
                <a href={`tel:${siteInfo.phoneSecondary}`} className="block hover:text-[#F9A825] transition-colors">
                  Store 2: {siteInfo.phoneSecondary}
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F9A825]/20 text-[#F9A825] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">Store Locations</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                {siteInfo.primaryAddress}
              </p>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F9A825]/20 text-[#F9A825] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">Working Hours</h4>
              <p className="text-xs text-white/80 font-medium">
                {siteInfo.workingHours}
              </p>
            </div>

            {/* Email / Info Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F9A825]/20 text-[#F9A825] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-white">Direct Email</h4>
              <p className="text-xs text-white/80 font-medium">
                {siteInfo.email}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/70">
          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <a href="#hero" className="hover:text-[#F9A825] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#F9A825] transition-colors">About Us</a>
            <a href="#products" className="hover:text-[#F9A825] transition-colors">Products</a>
            <a href="#ingredients" className="hover:text-[#F9A825] transition-colors">Ingredients</a>
            <a href="#locations" className="hover:text-[#F9A825] transition-colors">Locations</a>
            <a href="#reviews" className="hover:text-[#F9A825] transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-[#F9A825] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-1 font-medium">
            <span>© {new Date().getFullYear()} {siteInfo.brandName}. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
