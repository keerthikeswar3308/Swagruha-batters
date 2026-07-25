'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  step: number;
  title: string;
  desc: string;
}

interface ProcessProps {
  steps: ProcessStep[];
}

export default function Process({ steps }: ProcessProps) {
  return (
    <section id="process" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#F9A825]" />
            Traditional Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our 6-Step Freshness Timeline
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            From raw natural grain selection to your breakfast table—here is how we prepare pure batter daily.
          </p>
        </div>

        {/* Timeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative bg-[#FFF8E7]/70 rounded-3xl p-8 border border-[#F9A825]/20 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B5E20] text-[#F9A825] font-black text-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                    Step 0{item.step}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#1B5E20] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-semibold text-[#1B5E20]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F9A825]" />
                  Quality Assured
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
