'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  /** Classes for the positioned wrapper that holds the skeleton. */
  wrapperClassName?: string;
}

/**
 * Next.js Image with a pulsing skeleton that fades out once the bitmap is
 * decoded. Images below the fold stay lazy (Next's default); pass `priority`
 * for above-the-fold art.
 */
export default function LazyImage({
  className,
  wrapperClassName,
  alt,
  ...imageProps
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span className={cn('relative block overflow-hidden', wrapperClassName)}>
      {!isLoaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse-premium bg-neutral-200"
        />
      )}
      <Image
        {...imageProps}
        alt={alt}
        className={cn(
          'transition-opacity duration-500 ease-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={() => setIsLoaded(true)}
        // A broken file should not leave a skeleton pulsing forever.
        onError={() => setIsLoaded(true)}
      />
    </span>
  );
}
