'use client';

import { motion } from 'framer-motion';
import { Snowflake, AlertCircle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface StorageRule {
  id: string;
  title: string;
  desc: string;
  important: boolean;
}

interface StorageProps {
  rules: StorageRule[];
}

export default function StorageInstructions({ rules }: StorageProps) {
  return (
    <section id="storage" className="py-20 bg-[#FFF8E7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Card Outer Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#1B5E20] to-[#0D3B10] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-white/20 relative overflow-hidden"
        >
          {/* Background Snowflake Graphic */}
          <Snowflake className="absolute -bottom-10 -right-10 w-72 h-72 text-white/5 pointer-events-none animate-spin-slow" />

          {/* Header */}
          <div className="max-w-2xl space-y-4 mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9A825] text-[#1B5E20] text-xs font-black uppercase tracking-widest shadow-md">
              <Snowflake className="w-4 h-4" />
              Refrigeration & Freshness Guide
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Storage Instructions for Best Results
            </h2>
            <p className="text-base sm:text-lg text-white/80">
              Because our batter is 100% natural with zero preservatives, follow these simple storage tips to maintain cloud softness and crisp golden dosas.
            </p>
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, idx) => (
              <div
                key={rule.id || idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-3 hover:bg-white/15 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#F9A825] text-[#1B5E20] flex items-center justify-center font-bold">
                    {rule.important ? <ShieldAlert className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  {rule.important && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 font-bold text-[10px] uppercase">
                      Key Tip
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">
                  {rule.title}
                </h3>

                <p className="text-xs text-white/80 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Warning Banner */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/90 font-medium">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#F9A825]" />
              <span>For optimal sweetness & fluffiness, consume fresh within 48 hours of purchase.</span>
            </div>
            <span className="font-extrabold text-[#F9A825]">100% Natural • Zero Soda • Zero Preservatives</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
