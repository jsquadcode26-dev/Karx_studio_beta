'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { InstagramEmbed } from 'react-social-media-embed';
import { useIntersectionObserver } from '@/lib/hooks';
import { GALLERY_CATEGORIES, GALLERY_POSTS, type GalleryPost } from '@/lib/site-data';
import { cn } from '@/lib/utils';

/**
 * Instagram's embed script pulls in an iframe per post, so a post only mounts
 * once it is within 400px of the viewport. Until then it holds its place with a
 * skeleton, which keeps the first paint cheap on a 20-post feed.
 */
function DeferredEmbed({ post }: { post: GalleryPost }) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    rootMargin: '400px 0px',
    threshold: 0,
  });

  return (
    <div
      ref={ref}
      className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-field bg-white shadow-subtle"
    >
      {isIntersecting ? (
        <div className="flex justify-center [&_iframe]:!min-w-full">
          <InstagramEmbed url={post.url} width="100%" captioned={false} />
        </div>
      ) : (
        <div className="h-[520px] animate-pulse-premium bg-neutral-200" aria-hidden="true" />
      )}
      <span className="sr-only">{post.type}</span>
    </div>
  );
}

export default function GalleryFeed() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const posts = useMemo(
    () =>
      activeCategory === 'All'
        ? GALLERY_POSTS
        : GALLERY_POSTS.filter((post) => post.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="bg-surface py-14 md:py-20" aria-label="Instagram gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 md:gap-3">
          <Filter className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {GALLERY_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  'min-h-11 rounded-full px-5 text-sm font-semibold transition-premium',
                  isActive
                    ? 'bg-accent text-on-accent shadow-premium'
                    : 'bg-raised text-body hover:bg-accent-soft hover:text-accent'
                )}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        <p className="mb-8 text-sm text-muted" aria-live="polite">
          Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>

        {/* `key` forces a fresh mount per filter so embeds re-measure cleanly. */}
        <div key={activeCategory} className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {posts.map((post) => (
            <DeferredEmbed key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
