'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { mobileMenuSlide, modalBackdrop } from '@/lib/animations';
import { NAV_LINKS, SITE } from '@/lib/site-data';
import { cn } from '@/lib/utils';

interface NavigationProps {
  /** Start see-through and only solidify once the page scrolls. */
  transparent?: boolean;
}

export default function PortfolioNavbar({ transparent = false }: NavigationProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    // Run once so a page restored mid-scroll starts in the right state.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isSolid = !transparent || isScrolled;

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[1030] transition-[background-color,box-shadow] duration-300',
          isSolid ? 'bg-surface/90 shadow-premium backdrop-blur-premium' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav aria-label="Main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="group flex items-center gap-2" aria-label={`${SITE.name} home`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover transition-transform duration-200 group-hover:scale-105">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                </svg>
              </span>
              <span className="text-lg font-black sm:text-xl md:text-2xl">
                <span className={isSolid ? 'text-ink' : 'text-white'}>{SITE.shortName}</span>
                {/* Solid rather than the gradient: at 18px this is normal-size
                    text, so it needs the full 4.5:1 across the whole wordmark. */}
                <span className={cn('ml-1', isSolid ? 'text-accent' : 'text-accent-hover')}>
                  PHOTOGRAPHY
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative flex min-h-11 items-center px-4 text-sm font-semibold transition-colors duration-200',
                        active
                          ? 'text-accent'
                          : isSolid
                            ? 'text-body hover:text-accent'
                            : 'text-white/90 hover:text-white'
                      )}
                    >
                      {link.label}
                      {/* Hover underline: CSS group-hover so it reacts to the whole link. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-2 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-200 group-hover:scale-x-100"
                      />
                      {active && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          aria-hidden="true"
                          className="absolute inset-x-3 bottom-2 h-0.5 rounded-full bg-accent"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-200 md:hidden',
                isSolid ? 'text-ink hover:bg-raised' : 'text-white hover:bg-white/10'
              )}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[1040] bg-black/50 md:hidden"
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              id="mobile-menu"
              className="fixed bottom-0 right-0 top-16 z-[1050] w-full max-w-xs bg-panel shadow-premium-xl md:hidden"
              variants={mobileMenuSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav aria-label="Mobile" className="flex flex-col gap-2 p-6">
                {NAV_LINKS.map((link, index) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex min-h-12 items-center rounded-lg px-4 text-lg font-medium transition-colors duration-200',
                          active
                            ? 'bg-accent text-on-accent'
                            : 'text-body hover:bg-raised hover:text-accent'
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
