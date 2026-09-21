import type { Metadata } from 'next';
import PageHeader from '@/components/ui/page-header';
import Contact from '@/components/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book KARX Photography for your wedding, pre-wedding shoot, maternity or event. Based in Thanjavur, available across Tamil Nadu.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Get in <span className="gradient-text-premium">Touch</span>
          </>
        }
        subtitle="Tell us about your event and we'll come back within 24 hours with availability and pricing."
      />
      <Contact />
    </>
  );
}
