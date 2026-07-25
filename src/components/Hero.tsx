'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  heroTitle: string;
  heroSubtitle: string;
  experienceYears: string;
  phone: string;
}

export default function Hero({ heroTitle, heroSubtitle, experienceYears, phone }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#0D3B10] text-white"
    >
      {/* Floating Animated Ingredients Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Rice Grain Element */}
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[8%] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold flex items-center gap-2 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-[#FFF8E7]"></span>
          🌾 Selected Aged Rice
        </motion.div>

        {/* Floating Urad Dal Element */}
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[5%] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold flex items-center gap-2 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-[#F9A825]"></span>
          ✨ Premium White Urad Dal
        </motion.div>

        {/* Floating Fenugreek Seed Element */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-28 left-[12%] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold flex items-center gap-2 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-[#FBC02D]"></span>
          🌱 Natural Fenugreek Boost
        </motion.div>

        {/* Glow ambient background graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F9A825]/15 rounded-full blur-3xl pointer-events-none animate-glow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9A825]/20 border border-[#F9A825]/40 text-[#F9A825] text-xs sm:text-sm font-bold tracking-wide shadow-inner">
            <Award className="w-4 h-4" />
            <span>{experienceYears} Years of Family Trust & Authentic Taste</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            {heroTitle.split(',')[0]},
            <span className="block text-[#F9A825] underline decoration-[#F9A825]/40 underline-offset-8 mt-1">
              {heroTitle.split(',')[1] || 'Made Just Like Home'}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {heroSubtitle}
          </p>

          {/* Quick Value Pillars */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-white/80 font-semibold">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
              100% Naturally Fermented
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <ShieldCheck className="w-4 h-4 text-[#F9A825]" />
              Zero Preservatives
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <Sparkles className="w-4 h-4 text-[#F9A825]" />
              Daily Fresh Grinding
            </span>
          </div>

          {/* Call to Actions (STRICTLY Store Visit / Call Now) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#locations"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#F9A825] to-[#FBC02D] hover:from-[#FBC02D] hover:to-[#F9A825] text-[#1B5E20] font-extrabold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <MapPin className="w-5 h-5" />
              Visit Our Store
            </a>
            <a
              href={`tel:${phone}`}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold text-base backdrop-blur-md transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5 text-[#F9A825]" />
              Call Now
            </a>
          </div>

          {/* Store Visit Notice Banner */}
          <div className="pt-3 text-xs text-white/75 font-medium flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Fresh 1 KG Packs Available Directly At Our Retail Stores Daily! (No Delivery)
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Glow backdrop behind food frame */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#F9A825] to-[#2E7D32] opacity-30 blur-2xl animate-pulse" />

            {/* Food Image Card Container */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-gray-900 group">
              <img
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop"
                alt="Fresh South Indian Idlis and Crispy Dosa with Chutney and Sambar on Banana Leaf"
                className="w-full h-[420px] sm:h-[480px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Food Highlights Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-gray-900 shadow-xl border border-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm text-[#1B5E20]">
                    Authentic South Indian Breakfast
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F9A825] text-[#1B5E20] font-black text-xs">
                    1 KG ONLY
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Prepared with traditional stone-milled accuracy for fluffy idlis & golden dosas.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
