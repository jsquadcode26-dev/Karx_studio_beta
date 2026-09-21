import type { Metadata } from 'next';
import { Award, Camera, Heart, Users, type LucideIcon } from 'lucide-react';
import PageHeader from '@/components/ui/page-header';
import CtaBand from '@/components/ui/cta-band';
import LazyImage from '@/components/ui/lazy-image';
import { ABOUT_STATS, ABOUT_STORY, ABOUT_TEAM, ABOUT_VALUES, SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story, values and team behind KARX Photography — a creative studio in Thanjavur capturing weddings and milestones across Tamil Nadu.',
  alternates: { canonical: '/about' },
};

const ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  users: Users,
  award: Award,
  heart: Heart,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            About <span className="gradient-text-premium">{SITE.shortName}</span>
          </>
        }
        subtitle="A creative studio built on craft, patience and a love for the moments people keep."
      />

      {/* Story */}
      <section className="bg-surface py-16 md:py-20" aria-labelledby="story-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <LazyImage
            src="/images/detailes/company.jpg"
            alt="The KARX Photography studio at work"
            width={680}
            height={453}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full rounded-2xl object-cover"
            wrapperClassName="rounded-2xl shadow-premium-lg"
          />

          <div>
            <h2 id="story-heading" className="text-fluid-section font-black text-ink">
              Our <span className="gradient-text-premium">Story</span>
            </h2>
            {ABOUT_STORY.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-panel py-16 md:py-20" aria-label="Studio at a glance">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {ABOUT_STATS.map((stat) => {
            const Icon = ICONS[stat.icon];
            return (
              <li
                key={stat.label}
                className="rounded-2xl bg-panel p-6 text-center shadow-premium transition-transform duration-300 hover:-translate-y-1 md:p-8"
              >
                <Icon className="mx-auto h-8 w-8 text-accent" aria-hidden="true" />
                <p className="mt-4 text-3xl font-black text-ink">{stat.number}</p>
                <p className="mt-1 text-sm text-body">{stat.label}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Values */}
      <section className="bg-surface py-16 md:py-20" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="values-heading" className="text-center text-fluid-section font-black text-ink">
            Our <span className="gradient-text-premium">Values</span>
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_VALUES.map((value) => {
              const Icon = ICONS[value.icon];
              return (
                <li
                  key={value.title}
                  className="h-full rounded-2xl bg-panel p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
                >
                  <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{value.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="bg-panel py-16 md:py-20" aria-labelledby="team-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="team-heading" className="text-center text-fluid-section font-black text-ink">
            Our <span className="gradient-text-premium">Team</span>
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {ABOUT_TEAM.map((member) => (
              <li key={member.role} className="group text-center">
                <LazyImage
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  width={512}
                  height={640}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  wrapperClassName="rounded-2xl shadow-premium"
                />
                <h3 className="mt-5 text-xl font-bold text-ink">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{member.role}</p>
                <p className="mt-2 text-sm text-body">{member.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Ready to Create <span className="gradient-text-premium">Magic</span>?
          </>
        }
        description="Let's talk about your date, your venue and the story you want told."
        actionLabel="Contact Us"
      />
    </>
  );
}
