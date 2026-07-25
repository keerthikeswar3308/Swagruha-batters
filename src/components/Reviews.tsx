'use client';

import { motion } from 'framer-motion';
import { Star, MessageSquare, CheckCircle, Sparkles, ExternalLink } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section id="reviews" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Rating Summary Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-4 h-4 text-[#F9A825]" />
            Customer Voice
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Loved by Local Families
          </h2>

          {/* Aggregate Rating Banner */}
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-[#FFF8E7] border border-[#F9A825]/30 shadow-md">
            <div className="text-4xl font-black text-[#1B5E20]">4.9</div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-1 text-[#F9A825]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F9A825]" />
                ))}
              </div>
              <p className="text-xs font-bold text-gray-600">
                Average Rating based on hundreds of store customers
              </p>
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FFF8E7]/50 hover:bg-[#FFF8E7] rounded-3xl p-6 border border-[#F9A825]/20 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#F9A825]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F9A825]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400">
                    {rev.date}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 leading-relaxed font-medium italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verified Badge */}
              <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">{rev.name}</h4>
                  <span className="text-[10px] text-gray-500 block">Verified Store Customer</span>
                </div>
                {rev.verified && (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Callout Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-gray-50 border border-gray-200 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#1B5E20] text-[#F9A825] font-black text-xl flex items-center justify-center">
              G
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Google Verified Reviews</h4>
              <p className="text-xs text-gray-500">Read or leave a review on Google Maps</p>
            </div>
          </div>
          <a
            href="#locations"
            className="inline-flex items-center gap-2 text-xs font-extrabold px-4 py-2.5 rounded-xl bg-[#1B5E20] text-white hover:bg-[#2E7D32] transition-colors"
          >
            Find Us On Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
