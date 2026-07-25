'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, CheckCircle2, Sparkles, ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  weight: string;
  price: string;
  image: string;
  inStock: boolean;
  badge: string;
  highlights: string[];
}

interface ProductsProps {
  products: Product[];
  phone: string;
}

export default function Products({ products, phone }: ProductsProps) {
  return (
    <section id="products" className="py-20 bg-[#FFF8E7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] text-xs font-bold uppercase tracking-widest">
            <ShoppingBag className="w-4 h-4 text-[#F9A825]" />
            Our Fresh Signatures
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            100% Fresh 1 KG Pack Batters
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Ground fresh every morning and naturally fermented overnight. Visit our retail shops to purchase directly.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {products.map((prod, idx) => (
            <motion.div
              key={prod.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 flex flex-col justify-between group"
            >
              {/* Product Visual Container */}
              <div className="relative h-72 overflow-hidden bg-gray-900">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-[#F9A825] text-[#1B5E20] font-black text-xs rounded-full shadow-md">
                    {prod.badge}
                  </span>
                  <span className="px-3 py-1 bg-[#1B5E20] text-white font-bold text-xs rounded-full shadow-md">
                    {prod.weight}
                  </span>
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white text-right">
                  <span className="text-xs text-gray-500 block font-semibold uppercase">Fresh Pack</span>
                  <span className="text-2xl font-black text-[#1B5E20]">{prod.price}</span>
                </div>
              </div>

              {/* Product Info & Action */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                      {prod.name}
                    </h3>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {prod.inStock ? 'In Stock Daily' : 'Restocking Fresh'}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#1B5E20] tracking-wide uppercase">
                    {prod.tagline}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {prod.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="pt-2 space-y-1.5">
                    {prod.highlights?.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons (STRICTLY NO Cart / Checkout / WhatsApp) */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#locations"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <MapPin className="w-4 h-4 text-[#F9A825]" />
                    Visit Store To Buy
                  </a>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-sm transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#1B5E20]" />
                    Call Shop
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
