import { getDbData } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Ingredients from '@/components/Ingredients';
import Products from '@/components/Products';
import Process from '@/components/Process';
import StorageInstructions from '@/components/StorageInstructions';
import Gallery from '@/components/Gallery';
import Locations from '@/components/Locations';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import ContactFooter from '@/components/ContactFooter';
import BackToTop from '@/components/BackToTop';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDbData();
  const seo = data.seo || {};

  return {
    title: seo.title || 'Swagruha Batters - Fresh Idli & Dosa Batter',
    description: seo.description || 'Fresh naturally fermented 1KG Idli & Dosa Batter made just like home.',
    keywords: seo.keywords || 'Idli Batter, Dosa Batter, Swagruha Batters',
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.ogImage || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200'],
    },
  };
}

export const revalidate = 0; // Dynamic server-side rendering for persistent data updates

export default async function HomePage() {
  const data = await getDbData();
  const siteInfo = data.siteInfo;
  const products = data.products;
  const whyChooseUs = data.whyChooseUs;
  const ingredients = data.ingredients;
  const processSteps = data.process;
  const storageRules = data.storageInstructions;
  const galleryItems = data.gallery;
  const locations = data.locations;
  const reviews = data.reviews;
  const faqs = data.faqs;

  return (
    <main className="min-h-screen bg-[#FFF8E7] text-gray-900 overflow-x-hidden selection:bg-[#1B5E20] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar phone={siteInfo.phonePrimary} brandName={siteInfo.brandName} />

      {/* Hero Section */}
      <Hero
        heroTitle={siteInfo.heroTitle}
        heroSubtitle={siteInfo.heroSubtitle}
        experienceYears={siteInfo.experienceYears}
        phone={siteInfo.phonePrimary}
      />

      {/* About Section */}
      <About
        aboutTitle={siteInfo.aboutTitle}
        aboutText1={siteInfo.aboutText1}
        aboutText2={siteInfo.aboutText2}
        aboutText3={siteInfo.aboutText3}
        aboutText4={siteInfo.aboutText4}
      />

      {/* Why Choose Us */}
      <WhyChooseUs items={whyChooseUs} />

      {/* Ingredients Showcase */}
      <Ingredients items={ingredients} />

      {/* Products Section */}
      <Products products={products} phone={siteInfo.phonePrimary} />

      {/* Fermentation Process */}
      <Process steps={processSteps} />

      {/* Storage Instructions */}
      <StorageInstructions rules={storageRules} />

      {/* Gallery Section */}
      <Gallery items={galleryItems} />

      {/* Retail Store Locations */}
      <Locations locations={locations} />

      {/* Customer Reviews */}
      <Reviews reviews={reviews} />

      {/* FAQ Accordion */}
      <FAQ faqs={faqs} />

      {/* Contact & Footer */}
      <ContactFooter siteInfo={siteInfo} />

      {/* Back to Top Floating Button */}
      <BackToTop />
    </main>
  );
}
