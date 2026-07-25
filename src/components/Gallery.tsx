'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Sparkles, X, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] text-xs font-bold uppercase tracking-widest">
            <ImageIcon className="w-4 h-4 text-[#F9A825]" />
            Authentic Visual Feast
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our Kitchen & Creations
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Take a look at our daily stone grinding, soft idlis, golden crispy dosas, and fresh batter preparation.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1B5E20] text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveImage(item)}
                className="group relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-64 cursor-pointer bg-gray-900"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 flex items-end justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F9A825] text-[#1B5E20] font-black text-[10px] uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-white mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Lightbox */}
        {activeImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-gray-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full max-h-[75vh] object-contain bg-black"
              />
              <div className="p-6 bg-gray-950 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#F9A825] uppercase tracking-wider">
                    {activeImage.category}
                  </span>
                  <h3 className="text-xl font-bold">{activeImage.title}</h3>
                </div>
                <span className="text-xs text-gray-400">Swagruha Batters Gallery</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
