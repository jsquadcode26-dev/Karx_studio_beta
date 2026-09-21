import type { Metadata } from 'next';
import PageHeader from '@/components/ui/page-header';
import CtaBand from '@/components/ui/cta-band';
import WeddingsGallery from '@/components/weddings-gallery';

export const metadata: Metadata = {
  title: 'Weddings',
  description:
    'Wedding, pre-wedding and cinematic collections photographed by KARX across Thanjavur, Mahabalipuram, Trichy and beyond.',
  alternates: { canonical: '/weddings' },
};

export default function WeddingsPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Wedding <span className="gradient-text-premium">Collections</span>
          </>
        }
        subtitle="Every love story is unique. Here are some of our most beautiful wedding moments captured through our lens."
        image="/images/portfolio/wedding1.jpg"
      />
      <WeddingsGallery />
      <CtaBand
        title={
          <>
            Let&apos;s Create Your <span className="gradient-text-premium">Love Story</span>
          </>
        }
        description="Your wedding day is a celebration of love, and we're here to capture every precious moment."
        actionLabel="Plan Your Wedding"
      />
    </>
  );
}
