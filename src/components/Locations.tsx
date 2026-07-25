'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, ExternalLink, Clock, Sparkles, Compass } from 'lucide-react';

interface LocationItem {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapsUrl: string;
  embedMap: string;
  timing: string;
}

interface LocationsProps {
  locations: LocationItem[];
}

export default function Locations({ locations }: LocationsProps) {
  return (
    <section id="locations" className="py-20 bg-[#FFF8E7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B5E20]/10 text-[#1B5E20] text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-4 h-4 text-[#F9A825]" />
            Retail Outlets
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Visit Our Stores
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Customers visit our stores directly to purchase fresh 1 KG Idli & Dosa Batter packs daily.
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200 flex flex-col justify-between"
            >
              {/* Map Iframe Embed */}
              <div className="relative h-64 sm:h-72 w-full bg-gray-100 border-b border-gray-200">
                <iframe
                  title={loc.name}
                  src={loc.embedMap}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all"
                ></iframe>

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-xs font-extrabold text-[#1B5E20] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Open Today ({loc.timing})
                </div>
              </div>

              {/* Card Details */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-extrabold text-gray-900 flex items-center justify-between">
                    {loc.name}
                    <Sparkles className="w-5 h-5 text-[#F9A825]" />
                  </h3>

                  <p className="text-sm text-gray-600 flex items-start gap-2 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#1B5E20] shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>

                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1B5E20] shrink-0" />
                    <span>{loc.timing}</span>
                  </p>
                </div>

                {/* CTAs (STRICTLY Store Visit / Call / Get Directions) */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-extrabold text-xs shadow-md transition-all"
                  >
                    <Compass className="w-4 h-4 text-[#F9A825]" />
                    Get Directions
                  </a>

                  <a
                    href={`tel:${loc.phone}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#F9A825] hover:bg-[#FBC02D] text-[#1B5E20] font-black text-xs shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>

                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                    Google Maps
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
