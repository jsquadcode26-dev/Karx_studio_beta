'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { CONTACT, NAV_LINKS, SITE, SOCIAL_LINKS } from '@/lib/site-data';

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
} as const;

const EXPLORE_LINKS = NAV_LINKS.filter((link) => link.href !== '/');

const CONTACT_ROWS = [
  { icon: Phone, value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, external: false },
  { icon: Mail, value: CONTACT.email, href: CONTACT.emailHref, external: false },
  { icon: MapPin, value: CONTACT.addressDisplay, href: CONTACT.mapsHref, external: true },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-footer text-body">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                </svg>
              </span>
              <span className="text-xl font-black">
                <span className="text-white">{SITE.shortName}</span>
                <span className="gradient-text-premium ml-1">PHOTOGRAPHY</span>
              </span>
            </Link>

            <p className="mt-4 max-w-md leading-relaxed text-body">{SITE.description}</p>

            <ul className="mt-6 space-y-3">
              {CONTACT_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <li key={row.value}>
                    <a
                      href={row.href}
                      {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group inline-flex items-center gap-3 text-body transition-colors duration-200 hover:text-accent-hover"
                    >
                      <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                      <span>{row.value}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="text-lg font-bold text-ink">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-body transition-[color,transform] duration-200 hover:translate-x-1 hover:text-accent-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h2 className="text-lg font-bold text-ink">Follow Us</h2>
            <ul className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.label}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-raised text-body transition-colors duration-200 hover:bg-accent hover:text-on-accent"
                    >
                      <Icon aria-hidden="true" />
                    </motion.a>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-accent px-5 font-bold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
            >
              Book a Shoot
            </Link>
          </div>
        </div>

        <hr className="my-8 border-line" />

        <div className="flex flex-col items-center gap-3 text-sm text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>
            Built by <span className="font-semibold text-accent-hover">{SITE.builtBy}</span>
          </p>
        </div>
      </div>

      {/* Scroll to top — hidden from assistive tech and tab order while invisible */}
      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll back to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        initial={false}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 16,
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="no-print fixed bottom-6 right-6 z-[1030] flex h-12 w-12 items-center justify-center rounded-full bg-accent text-on-accent shadow-premium-lg transition-colors duration-200 hover:bg-accent-hover"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
}
