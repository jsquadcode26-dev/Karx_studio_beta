import type { Metadata, Viewport } from 'next';
import './globals.css';
import PortfolioNavbar from '@/components/portfolio-navbar';
import Footer from '@/components/footer';
import PageTransition from '@/components/page-transition';
import { CONTACT, SITE, SOCIAL_LINKS } from '@/lib/site-data';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Wedding Photographer in Thanjavur, Tamil Nadu`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    'Karx Photography',
    'wedding photography Thanjavur',
    'wedding cinematography Tamil Nadu',
    'pre-wedding shoot Thanjavur',
    'maternity photography',
    'baby photography',
    'concert photography',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  // Tells Google which URL is authoritative for the home page; each route adds
  // its own. Without this, the same page reachable on two hosts splits ranking.
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: 'website',
    images: [
      {
        url: SITE.ogImage,
        width: 1920,
        height: 1080,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    creator: SITE.twitterHandle,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: { google: SITE.googleSiteVerification },
};

// Next 16 requires viewport and themeColor as their own export, not inside `metadata`.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f0f11',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: CONTACT.phoneHref.replace('tel:', ''),
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'HIG 501, Kurinji New Housing Unit',
    addressLocality: 'Thanjavur',
    addressRegion: 'Tamil Nadu',
    postalCode: '613005',
    addressCountry: 'IN',
  },
  image: new URL(SITE.ogImage, SITE.url).toString(),
  logo: new URL(SITE.ogImage, SITE.url).toString(),
  priceRange: '$$',
  sameAs: SOCIAL_LINKS.filter((link) => link.icon !== 'whatsapp').map((link) => link.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1070] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:font-bold focus:text-on-accent"
        >
          Skip to main content
        </a>

        <PortfolioNavbar />

        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
