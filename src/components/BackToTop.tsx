'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#1B5E20] hover:bg-[#0D3B10] text-[#F9A825] shadow-2xl border-2 border-[#F9A825] flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none"
      aria-label="Back to Top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
