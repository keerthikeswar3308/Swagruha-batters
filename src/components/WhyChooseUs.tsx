'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  Award,
  Sparkles,
  Leaf,
  ShieldCheck,
  CheckCircle,
  Sun,
  Zap,
  Heart,
  Users,
  LucideIcon,
} from 'lucide-react';

interface WhyItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

interface WhyChooseUsProps {
  items: WhyItem[];
}

const iconMap: Record<string, LucideIcon> = {
  Clock,
  Award,
  Sparkles,
  Leaf,
  ShieldCheck,
  CheckCircle,
  Sun,
  Zap,
  Heart,
  Users,
};

export default function WhyChooseUs({ items }: WhyChooseUsProps) {
  return (
    <section id="why-us" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#F9A825]" />
            Why Families Love Swagruha
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Crafted for Perfect Mornings
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            We take pride in following traditional preparation standards so every breakfast brings smiles to your dining table.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-[#FFF8E7]/60 hover:bg-[#FFF8E7] border border-[#F9A825]/20 hover:border-[#1B5E20]/30 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-[#F9A825] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1B5E20] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center gap-1 text-[11px] font-bold text-[#1B5E20]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F9A825]" />
                  Swagruha Standard
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
