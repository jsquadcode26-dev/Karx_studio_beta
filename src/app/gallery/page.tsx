import type { Metadata } from 'next';
import PageHeader from '@/components/ui/page-header';
import GalleryFeed from '@/components/gallery-feed';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'The latest photos and reels from KARX Photography — weddings, portraits, pre-wedding shoots and behind the scenes.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Gallery <span className="gradient-text-premium">Collection</span>
          </>
        }
        subtitle="Photos and films from our recent work, straight from the studio feed and organised by category."
      />
      <GalleryFeed />
    </>
  );
}
