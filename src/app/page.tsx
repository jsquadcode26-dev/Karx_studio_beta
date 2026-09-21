'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '@/components/landing-page';
import Hero from '@/components/hero';
import Portfolio from '@/components/portfolio';
import Services from '@/components/services';
import Reviews from '@/components/reviews';
import Contact from '@/components/contact';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  // The page itself always renders underneath the intro, so the content is in
  // the HTML for crawlers and paints the moment the overlay lifts.
  useEffect(() => {
    if (!showIntro) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  return (
    <>
      <AnimatePresence>
        {showIntro && <LandingPage key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <Hero />
      <Portfolio />
      <Services />
      <Reviews />
      <Contact />
    </>
  );
}
