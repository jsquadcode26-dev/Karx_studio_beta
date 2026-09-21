import type { Metadata } from 'next';
import { FaStar } from 'react-icons/fa';
import PageHeader from '@/components/ui/page-header';
import CtaBand from '@/components/ui/cta-band';
import Reviews from '@/components/reviews';
import LazyImage from '@/components/ui/lazy-image';
import { REVIEWS } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Reviews',
  description:
    'What couples across Thanjavur, Kumbakonam, Trichy and Mahabalipuram say about working with KARX Photography.',
  alternates: { canonical: '/reviews' },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Client <span className="gradient-text-premium">Reviews</span>
          </>
        }
        subtitle="Real words from the couples and families who trusted us with their moments."
      />

      <Reviews />

      <section className="bg-panel py-16 md:py-20" aria-labelledby="all-reviews-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="all-reviews-heading" className="text-fluid-section font-black text-ink">
            Every <span className="gradient-text-premium">Review</span>
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <li
                key={review.id}
                className="flex h-full flex-col rounded-2xl bg-panel p-6 shadow-premium"
              >
                <div
                  className="flex gap-1 text-accent"
                  role="img"
                  aria-label={`Rated ${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }, (_, i) => (
                    <FaStar key={i} aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 leading-relaxed text-body">
                  {review.text}
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  <LazyImage
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    sizes="48px"
                    className="h-12 w-12 rounded-full object-cover"
                    wrapperClassName="h-12 w-12 shrink-0 rounded-full border-2 border-accent/30"
                  />
                  <div>
                    <p className="font-bold text-ink">{review.name}</p>
                    <p className="text-sm text-body">{review.event}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Ready to Be Our Next <span className="gradient-text-premium">Story</span>?
          </>
        }
        description="Tell us about your day and we'll put together a plan that fits it."
        actionLabel="Get in Touch"
      />
    </>
  );
}
