'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Baby, Camera, Music, Star, Video, type LucideIcon } from 'lucide-react';
import SectionHeader from '@/components/ui/section-header';
import LazyImage from '@/components/ui/lazy-image';
import { staggerContainerSlow, staggerItem } from '@/lib/animations';
import { useScrollAnimation } from '@/lib/hooks';
import { SERVICES, type Service } from '@/lib/site-data';

const ICONS: Record<Service['icon'], LucideIcon> = {
  camera: Camera,
  video: Video,
  baby: Baby,
  music: Music,
  star: Star,
};

export default function Services() {
  // `once` keeps the entrance from replaying every time the section scrolls by.
  const { ref, animate } = useScrollAnimation<HTMLUListElement>();

  return (
    <section
      id="services"
      className="bg-panel py-20 md:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="What We Do"
          title={
            <span id="services-heading">
              Our <span className="gradient-text-premium">Services</span>
            </span>
          }
          description="Comprehensive photography and cinematography services for all your special moments"
        />

        <motion.ul
          ref={ref}
          variants={staggerContainerSlow}
          initial="hidden"
          animate={animate}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.li key={service.title} variants={staggerItem} className="h-full">
                <Link
                  href={service.link}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-panel shadow-premium transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-premium-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <LazyImage
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      wrapperClassName="absolute inset-0"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                    />
                    <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 text-accent shadow-premium transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-ink transition-colors duration-200 group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-body">{service.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
                      Explore
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
