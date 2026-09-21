import type { Metadata } from 'next';
import PageHeader from '@/components/ui/page-header';
import CtaBand from '@/components/ui/cta-band';
import FilmsShowcase from '@/components/films-showcase';

export const metadata: Metadata = {
  title: 'Films',
  description:
    'Cinematic wedding films, pre-wedding stories and event highlights shot across Tamil Nadu by KARX Photography.',
  alternates: { canonical: '/films' },
};

export default function FilmsPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Our <span className="gradient-text-premium">Films</span>
          </>
        }
        subtitle="Cinematic storytelling that captures the heartbeat of every special moment in stunning detail"
        image="/images/films/film1.jpg"
      />
      <FilmsShowcase />
      <CtaBand
        title={
          <>
            Bring Your <span className="gradient-text-premium">Story</span> to Life
          </>
        }
        description="Let us create a cinematic film that captures the essence of your wedding day."
        actionLabel="Start Your Project"
      />
    </>
  );
}
