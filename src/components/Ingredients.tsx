'use client';

import { motion } from 'framer-motion';
import { Leaf, Sparkles, CheckCircle2 } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  desc: string;
  role: string;
  image: string;
}

interface IngredientsProps {
  items: Ingredient[];
}

export default function Ingredients({ items }: IngredientsProps) {
  return (
    <section id="ingredients" className="py-20 bg-[#1B5E20] text-white relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F9A825]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2E7D32]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F9A825] text-xs font-bold uppercase tracking-widest border border-white/10">
            <Leaf className="w-4 h-4" />
            100% Pure & Simple
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Selected Natural Ingredients
          </h2>
          <p className="text-base sm:text-lg text-white/80">
            We use only 3 wholesome ingredients combined with pure water. No chemicals, zero preservatives, and no artificial soda.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((ing, idx) => (
            <motion.div
              key={ing.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-xl flex flex-col justify-between group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={ing.image}
                  alt={ing.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20] via-transparent to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-[#F9A825] text-[#1B5E20] font-black text-xs rounded-full shadow-md">
                  {ing.role}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    {ing.name}
                    <Sparkles className="w-4 h-4 text-[#F9A825]" />
                  </h3>
                </div>

                <p className="text-sm text-white/85 leading-relaxed font-normal">
                  {ing.desc}
                </p>

                <div className="pt-3 border-t border-white/15 flex items-center gap-2 text-xs font-semibold text-[#F9A825]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Cleaned & Soaked In Purified Water
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
