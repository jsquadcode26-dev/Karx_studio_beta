'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

/**
 * Focus-ring pulse colours. Framer Motion interpolates between raw colour
 * values, so these cannot be CSS variables — they mirror --color-accent and a
 * dimmed shade of it from globals.css.
 */
const FOCUS_ACCENT = '#d99a4e';
const FOCUS_ACCENT_DIM = '#8a5f2b';

interface LandingPageProps {
  onComplete?: () => void;
  skipEnabled?: boolean;
}

export default function LandingPage({ onComplete, skipEnabled = true }: LandingPageProps) {
  const [phase, setPhase] = useState<'initial' | 'focusing' | 'capturing' | 'revealing'>('initial');
  const [showContent, setShowContent] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Motion-sensitive visitors go straight to the site rather than sitting
    // through a four-second camera sequence.
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Full sequence finishes at 4000ms: viewfinder, focus, shutter, reveal.
    const timers = [
      setTimeout(() => setPhase('focusing'), 500),
      setTimeout(() => setPhase('capturing'), 2000),
      setTimeout(() => {
        setPhase('revealing');
        setShowContent(true);
      }, 2500),
      setTimeout(() => onComplete?.(), 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete, prefersReducedMotion]);

  const handleSkip = () => {
    setPhase('revealing');
    setShowContent(true);
    onComplete?.();
  };

  return (
    <motion.div
      role="presentation"
      className="fixed inset-0 w-screen h-screen z-[10000] flex items-center justify-center overflow-hidden bg-panel"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-40 h-40 rounded-full bg-accent-hover/10 blur-3xl" />
      </motion.div>

      {/* Viewfinder */}
      <motion.div
        className={`relative w-[90vw] h-[90vh] max-w-[1200px] max-h-[700px] border-2 rounded-lg flex items-center justify-center transition-all duration-500 ${
          phase === 'focusing' ? 'border-accent/80 shadow-premium-lg' : 
          phase === 'capturing' ? 'border-ink shadow-premium-xl' : 'border-accent/30'
        }`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Viewfinder Grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[33.33%] w-full h-[1px] bg-accent/20" />
          <div className="absolute top-[66.66%] w-full h-[1px] bg-accent/20" />
          <div className="absolute left-[33.33%] h-full w-[1px] bg-accent/20" />
          <div className="absolute left-[66.66%] h-full w-[1px] bg-accent/20" />
        </div>

        {/* Focus Points */}
        <div className="absolute w-[60%] h-[60%] grid grid-cols-3 grid-rows-3 gap-5 place-items-center">
          {[...Array(9)].map((_, i) => (
            <motion.div 
              key={i} 
              className="w-3 h-3 border-2 border-accent rounded-full opacity-30"
              animate={{
                scale: phase === 'focusing' ? [1, 1.5, 1] : 1,
                opacity: phase === 'focusing' ? [0.3, 1, 0.3] : 0.3
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: phase === 'focusing' ? 2 : 0
              }}
            />
          ))}
        </div>

        {/* Center Focus Ring */}
        <motion.div 
          className="w-24 h-24 border-2 border-accent rounded-full flex items-center justify-center relative"
          animate={{
            scale: phase === 'focusing' ? [1, 1.2, 1, 1.1, 1] : 1,
            borderColor: phase === 'focusing' ? [FOCUS_ACCENT, FOCUS_ACCENT_DIM, FOCUS_ACCENT] : FOCUS_ACCENT
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div className="w-2 h-2 bg-accent rounded-full" />
          {/* Focus confirmation indicator */}
          {phase === 'capturing' && (
            <motion.div
              className="absolute inset-0 border-2 border-green-500 rounded-full"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>

        {/* Camera Info Overlay */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-accent/80 font-mono text-xs md:text-sm">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <span><span className="opacity-50">KARX</span> STUDIOZ</span>
            </div>
            <div className="flex gap-4">
              <span><span className="opacity-50">ISO</span> AUTO</span>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-4">
              <span>f/1.8</span>
              <span>1/250</span>
            </div>
            <motion.span 
              className="text-red-500 font-bold flex items-center gap-1"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ● REC
            </motion.span>
          </div>
        </div>

        {/* Exposure Meter */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="flex gap-2 h-2 items-end">
            {[...Array(11)].map((_, i) => (
              <span 
                key={i} 
                className={`w-[1px] bg-accent/50 ${i === 5 ? 'h-4 bg-accent' : 'h-2'}`} 
              />
            ))}
          </div>
          <motion.div 
            className="w-1 h-3 bg-footer mt-1"
            animate={{ x: phase === 'focusing' ? [-20, 0, 10, 0] : 0 }}
            transition={{ duration: 1.5 }}
          />
        </div>
      </motion.div>

      {/* Camera Shutter Blades - Enhanced */}
      <AnimatePresence>
        {phase === 'capturing' && (
          <motion.div 
            className="absolute inset-0 z-[10001]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full h-full">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-[150%] h-[150%] origin-center bg-panel"
                  style={{ 
                    clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100%)` 
                  }}
                  animate={{ 
                    transform: [
                      `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100%)`,
                      `translate(-50%, -50%) rotate(${i * 45}deg) translateY(0%)`,
                      `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100%)`
                    ]
                  }}
                  transition={{ 
                    duration: 0.4,
                    times: [0, 0.5, 1],
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flash Effect - Enhanced */}
      <AnimatePresence>
        {phase === 'capturing' && (
          <motion.div
            className="absolute inset-0 z-[10002] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, times: [0, 0.5, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Brand Reveal */}
      <AnimatePresence>
        {showContent && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-[10003] bg-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div 
              className="flex flex-col items-center px-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Logo with enhanced animation */}
              <motion.div 
                className="w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8 relative"
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="30" 
                    className="fill-none stroke-accent stroke-2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="20" 
                    className="fill-none stroke-accent/60 stroke-2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="10" 
                    className="fill-none stroke-accent/40 stroke-2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                  <circle cx="42" cy="42" r="4" className="fill-ink/80" />
                </svg>
              </motion.div>

              {/* Brand Name */}
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-2 flex flex-wrap justify-center items-center gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="text-ink">KARX</span>
                <span className="gradient-text-premium italic">PHOTOGRAPHY</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p 
                className="text-accent tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-light mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Capturing Timeless Moments
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button */}
      {skipEnabled && phase !== 'revealing' && !showContent && (
        <motion.button 
          className="absolute bottom-8 right-8 md:bottom-10 md:right-10 text-body hover:text-ink flex items-center gap-2 group transition-premium uppercase tracking-widest text-xs font-bold bg-ink/5 hover:bg-ink/10 px-4 md:px-6 py-2 md:py-3 rounded-full border border-ink/15"
          onClick={handleSkip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip <span className="group-hover:translate-x-1 transition-transform">→</span>
        </motion.button>
      )}

      {/* Loading Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-footer/10 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-accent to-accent-hover"
          initial={{ width: '0%' }}
          animate={{ 
            width: phase === 'initial' ? '10%' : 
                   phase === 'focusing' ? '50%' : 
                   phase === 'capturing' ? '80%' : '100%'
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
