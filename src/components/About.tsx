'use client';

import { motion } from 'framer-motion';
import { Award, Clock, HeartHandshake, ShieldCheck, Users } from 'lucide-react';

interface AboutProps {
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutText3: string;
  aboutText4: string;
}

export default function About({
  aboutTitle,
  aboutText1,
  aboutText2,
  aboutText3,
  aboutText4,
}: AboutProps) {
  return (
    <section id="about" className="py-20 bg-[#FFF8E7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Card Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=1000&auto=format&fit=crop"
                alt="Swagruha Batters Traditional Kitchen Heritage"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 bg-[#F9A825] text-[#1B5E20] font-black text-xs rounded-full uppercase tracking-wider">
                  Family-Owned Business
                </span>
                <h3 className="text-2xl font-bold">9+ Years of Uncompromising Quality</h3>
                <p className="text-xs text-white/80">
                  Preserving grandmothers' traditional recipes in every 1 KG pack.
                </p>
              </div>
            </div>

            {/* Floating Stat Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden sm:flex">
              <div className="w-12 h-12 rounded-xl bg-[#1B5E20] text-[#F9A825] flex items-center justify-center font-black text-2xl">
                9+
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Years Experience</p>
                <p className="text-sm font-extrabold text-gray-900">Thousands of Happy Families</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] text-xs font-bold uppercase tracking-widest">
              <HeartHandshake className="w-4 h-4 text-[#F9A825]" />
              Our Story & Heritage
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {aboutTitle}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              <p className="font-semibold text-gray-900 border-l-4 border-[#1B5E20] pl-4 py-1">
                {aboutText1}
              </p>
              <p>{aboutText2}</p>
              <p>{aboutText3}</p>
              <p className="font-semibold text-[#1B5E20]">{aboutText4}</p>
            </div>

            {/* Pillar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-1">
                <Clock className="w-6 h-6 text-[#1B5E20]" />
                <h4 className="font-bold text-sm text-gray-900">Fresh Daily</h4>
                <p className="text-xs text-gray-500">Milled every morning</p>
              </div>
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-1">
                <ShieldCheck className="w-6 h-6 text-[#1B5E20]" />
                <h4 className="font-bold text-sm text-gray-900">100% Hygienic</h4>
                <p className="text-xs text-gray-500">Stainless steel unit</p>
              </div>
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100 space-y-1">
                <Award className="w-6 h-6 text-[#1B5E20]" />
                <h4 className="font-bold text-sm text-gray-900">Pure Natural</h4>
                <p className="text-xs text-gray-500">Zero artificial soda</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
