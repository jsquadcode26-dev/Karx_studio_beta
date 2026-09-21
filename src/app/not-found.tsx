import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-panel px-4 py-24">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-3 text-fluid-page font-black text-ink">
          This frame is <span className="gradient-text-premium">out of focus</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-body">
          The page you were looking for does not exist. Try the gallery, or get in touch and
          we&apos;ll point you the right way.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-lg bg-accent px-6 font-bold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
          >
            Back Home
          </Link>
          <Link
            href="/gallery"
            className="inline-flex min-h-12 items-center rounded-lg border-2 border-accent px-6 font-bold text-accent transition-colors duration-200 hover:bg-accent hover:text-on-accent"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
