/**
 * Single source of truth for every piece of site copy, contact detail and media
 * reference, migrated from the original KARX portfolio. Components read from
 * here so a content change lands in one place instead of six.
 */

export const SITE = {
  name: 'KARX Photography',
  shortName: 'KARX',
  tagline: 'Capturing Timeless Moments',
  description:
    'Premium wedding photography, cinematography and creative visual storytelling in Thanjavur and across Tamil Nadu.',
  url: 'https://karx-photography.vercel.app',
  locale: 'en_IN',
  builtBy: 'JAYASURIYA@JSQuad',
  /** Search Console ownership token, carried over from the original site. */
  googleSiteVerification: 'l3jPd0PE92WbMiA5gUBuKUKKrJ6HpiUGOQhHp4UDXhQ',
  twitterHandle: '@karxstudio',
  /** Preview image for link shares. Resolved against SITE.url by metadataBase. */
  ogImage: '/assets/bg.jpg',
} as const;

export const CONTACT = {
  phoneDisplay: '096555 60551',
  phoneHref: 'tel:+919655560551',
  whatsappHref: 'https://wa.me/919655560551',
  email: 'Karxphotography@gmail.com',
  emailHref: 'mailto:Karxphotography@gmail.com',
  addressDisplay: 'HIG 501, Kurinji, Thanjavur',
  addressFull: 'HIG 501, Kurinji New Housing Unit, Thanjavur 613005, Tamil Nadu',
  mapsHref:
    'https://maps.google.com/?q=HIG+501+Kurinji+New+Housing+Unit+Thanjavur+613005',
  responseTime: "Fill out the form and we'll get back to you within 24 hours.",
} as const;

export interface SocialLink {
  label: string;
  href: string;
  /** Icon key resolved by the consuming component. */
  icon: 'instagram' | 'facebook' | 'whatsapp';
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/karx_photography', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/karxphotography', icon: 'facebook' },
  { label: 'WhatsApp', href: CONTACT.whatsappHref, icon: 'whatsapp' },
];

export interface NavLink {
  href: string;
  label: string;
}

/** Primary navigation. Every href must resolve to a real route. */
export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/films', label: 'Films' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

// ===================================
// PORTFOLIO
// ===================================

export interface PortfolioItem {
  id: number;
  category: string;
  image: string;
  title: string;
  location: string;
  /** Intrinsic pixel size, so the masonry grid reserves space and never shifts. */
  width: number;
  height: number;
}

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'pre-wedding', label: 'Pre-Wedding' },
  { id: 'maternity', label: 'Maternity' },
  { id: 'cinematic', label: 'Cinematic' },
  { id: 'concert', label: 'Concert' },
  { id: 'baby', label: 'Baby' },
] as const;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, category: 'wedding', image: '/images/portfolio/wedding1.jpg', title: 'Kavitha & Senthil', location: 'Thanjavur', width: 1080, height: 1346 },
  { id: 2, category: 'pre-wedding', image: '/images/portfolio/pre-wed1.jpg', title: 'Priya & Arun', location: 'Mahabalipuram', width: 1080, height: 1346 },
  { id: 3, category: 'maternity', image: '/images/portfolio/maternity1.jpg', title: 'Meenakshi & Karthik', location: 'Kumbakonam', width: 1080, height: 1346 },
  { id: 4, category: 'maternity', image: '/images/portfolio/maternity2.jpg', title: 'Lakshmi & Venkat', location: 'Trichy', width: 1080, height: 1346 },
  { id: 5, category: 'wedding', image: '/images/portfolio/wedding2.jpg', title: 'Sangeetha & Murugan', location: 'Thanjavur', width: 1080, height: 675 },
  { id: 6, category: 'cinematic', image: '/images/portfolio/cinematic1.jpg', title: 'Cinematic Moments', location: 'Chennai', width: 1080, height: 1346 },
  { id: 7, category: 'cinematic', image: '/images/portfolio/cinematic2.jpg', title: 'Cinematic Moments', location: 'Chennai', width: 1080, height: 1346 },
  { id: 8, category: 'maternity', image: '/images/portfolio/maternity3.jpg', title: 'Keerthi & Shanmugam', location: 'Pondicherry', width: 1080, height: 1350 },
  { id: 9, category: 'pre-wedding', image: '/images/portfolio/pre-wed2.jpg', title: 'Priya & Arun', location: 'Mahabalipuram', width: 1080, height: 1346 },
  { id: 10, category: 'pre-wedding', image: '/images/portfolio/pre-wed3.jpg', title: 'Sangeetha & Murugan', location: 'Mahabalipuram', width: 1080, height: 1346 },
  { id: 11, category: 'pre-wedding', image: '/images/portfolio/pre-wed4.jpg', title: 'Santhosh & Geetha', location: 'Mahabalipuram', width: 1080, height: 1350 },
  { id: 12, category: 'cinematic', image: '/images/portfolio/cinematic3.jpg', title: 'Cinematic Moments', location: 'Chennai', width: 1080, height: 1350 },
  { id: 13, category: 'baby', image: '/images/portfolio/baby.jpg', title: 'Little One', location: 'Chennai', width: 1080, height: 1350 },
  { id: 14, category: 'concert', image: '/images/portfolio/concert1.jpg', title: 'Concert Moments', location: 'Thanjavur', width: 1080, height: 1346 },
];

// ===================================
// SERVICES
// ===================================

export interface Service {
  title: string;
  description: string;
  link: string;
  image: string;
  /** Icon key resolved by the services component. */
  icon: 'camera' | 'video' | 'baby' | 'music' | 'star';
}

export const SERVICES: Service[] = [
  {
    icon: 'camera',
    title: 'Premium Photography',
    description: 'Professional modeling and photography services for all your needs.',
    link: '/gallery',
    image: '/images/services/premium.jpg',
  },
  {
    icon: 'video',
    title: 'Cinematic Films',
    description: "Storytelling through cinematic wedding films that you'll treasure forever.",
    link: '/films',
    image: '/images/services/films.jpg',
  },
  {
    icon: 'baby',
    title: 'Maternity Shoots',
    description: 'Beautiful maternity photography celebrating the journey of motherhood.',
    link: '/contact',
    image: '/images/services/maternity.jpg',
  },
  {
    icon: 'music',
    title: 'Indoor Baby Shoots',
    description: 'Capturing the innocence and joy of your little one with indoor baby photography.',
    link: '/contact',
    image: '/images/services/indoor-baby.jpg',
  },
  {
    icon: 'camera',
    title: 'Wedding Photography',
    description: 'Capturing every precious moment of your special day with artistic excellence.',
    link: '/weddings',
    image: '/images/services/wedding.jpg',
  },
  {
    icon: 'star',
    title: 'Puberty Ceremonies',
    description: 'Documenting traditional celebrations with cultural sensitivity.',
    link: '/contact',
    image: '/images/services/puberty.jpg',
  },
  {
    icon: 'star',
    title: 'Ear Piercing Ceremonies',
    description: 'Capturing the joy and significance of ear piercing ceremonies with cultural sensitivity.',
    link: '/contact',
    image: '/images/services/ear-piercing.jpg',
  },
  {
    icon: 'star',
    title: 'Concert Photography',
    description: 'Capturing the energy and excitement of live music events with dynamic concert photography.',
    link: '/contact',
    image: '/images/services/concert.jpg',
  },
  {
    icon: 'baby',
    title: 'Baby Shoots',
    description: 'Capturing the innocence and joy of your little one with indoor baby photography.',
    link: '/contact',
    image: '/images/services/baby.jpg',
  },
];

// ===================================
// REVIEWS
// ===================================

export interface Review {
  id: number;
  name: string;
  event: string;
  image: string;
  rating: number;
  text: string;
}

export const GOOGLE_RATING = { score: '5.0', count: '10+ Reviews' } as const;

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Kavitha & Senthil Kumar',
    event: 'Wedding - Thanjavur',
    image: '/images/reviews/review1.jpg',
    rating: 5,
    text: 'Sandy captured our traditional Thanjavur wedding beautifully! Every ritual, every emotion - he got it all perfectly. The Big Temple photos are absolutely stunning. Highly recommend KARX Photography!',
  },
  {
    id: 2,
    name: 'Priya & Arun Balaji',
    event: 'Destination Wedding - Mahabalipuram',
    image: '/images/reviews/review2.jpg',
    rating: 5,
    text: 'We had our wedding at Mahabalipuram beach resort. Sandy and his team traveled from Thanjavur and captured every beautiful moment. The cinematic film is like a movie!',
  },
  {
    id: 3,
    name: 'Meenakshi & Karthikeyan',
    event: 'Wedding - Kumbakonam',
    image: '/images/reviews/review3.jpg',
    rating: 5,
    text: 'From pre-wedding shoots at Darasuram temple to our wedding ceremony, KARX was amazing throughout. Sandy has an incredible eye for candid moments. Our album is a treasure!',
  },
  {
    id: 4,
    name: 'Lakshmi & Venkatesh',
    event: 'Wedding Films - Trichy',
    image: '/images/reviews/review4.jpg',
    rating: 5,
    text: 'The wedding film Sandy created is nothing short of a Tamil cinema! Every time we watch it, we relive our special day at Srirangam temple. Best investment ever!',
  },
  {
    id: 5,
    name: 'Sangeetha & Murugan',
    event: 'Pre-wedding + Wedding - Thanjavur',
    image: '/images/reviews/review5.jpg',
    rating: 5,
    text: "We chose KARX for our pre-wedding shoot at Brihadeeswarar Temple and wedding. Sandy's creativity and attention to detail is unmatched. Thank you for the beautiful memories!",
  },
];

// ===================================
// FILMS
// ===================================

export interface Film {
  id: number;
  title: string;
  year: number;
  duration: string;
  description: string;
  category: string;
  videoUrl: string;
  image: string;
}

export const FILMS: Film[] = [
  {
    id: 1,
    title: 'Kavitha & Senthil - Wedding Film',
    year: 2023,
    duration: '8 min',
    description:
      'A beautiful traditional wedding captured with cinematic excellence. Every moment tells a story of love and celebration.',
    category: 'Wedding',
    videoUrl: '/images/films/flim1.mp4',
    image: '/images/films/film1.jpg',
  },
  {
    id: 2,
    title: 'Priya & Arun - Destination Love',
    year: 2023,
    duration: '10 min',
    description:
      'Destination wedding at the serene coastal location of Mahabalipuram, blending romance with scenic beauty.',
    category: 'Pre-Wedding',
    videoUrl: '/images/films/flim1.mp4',
    image: '/images/films/film1.jpg',
  },
  {
    id: 3,
    title: 'Meenakshi & Karthikeyan - Cinematic',
    year: 2023,
    duration: '12 min',
    description:
      'A cinematic masterpiece that captures the essence of traditional Tamil wedding customs with modern filmmaking.',
    category: 'Wedding',
    videoUrl: '/images/films/flim1.mp4',
    image: '/images/films/film1.jpg',
  },
  {
    id: 4,
    title: 'Baby Sara - First Year Journey',
    year: 2023,
    duration: '5 min',
    description: 'A beautiful journey of motherhood and the incredible moments of the little one.',
    category: 'Maternity',
    videoUrl: '/images/films/flim1.mp4',
    image: '/images/films/film1.jpg',
  },
  {
    id: 5,
    title: 'Ananya - Coming of Age',
    year: 2023,
    duration: '9 min',
    description: 'The joy, laughter, and emotions of a perfect puberty ceremony captured in cinematic detail.',
    category: 'Puberty',
    videoUrl: '/images/films/flim1.mp4',
    image: '/images/films/film1.jpg',
  },
  {
    id: 6,
    title: 'Rocking Beats - Live Concert',
    year: 2024,
    duration: '6 min',
    description: 'Electrifying performances and crowd energy documented in this concert film.',
    category: 'Concert',
    videoUrl: '/images/films/flim1.mp4',
    image: '/images/films/film1.jpg',
  },
];

// ===================================
// WEDDINGS
// ===================================

export interface WeddingStory {
  id: number;
  couple: string;
  date: string;
  location: string;
  category: 'Wedding' | 'Pre-Wed' | 'Cinematic';
  image: string;
}

export const WEDDING_CATEGORIES = ['All', 'Wedding', 'Pre-Wed', 'Cinematic'] as const;

export const WEDDINGS: WeddingStory[] = [
  { id: 1, couple: 'Kavitha & Senthil', date: 'December 2023', location: 'Thanjavur', category: 'Wedding', image: '/images/portfolio/wedding1.jpg' },
  { id: 2, couple: 'Priya & Arun', date: 'November 2023', location: 'Mahabalipuram', category: 'Pre-Wed', image: '/images/portfolio/pre-wed1.jpg' },
  { id: 3, couple: 'Meenakshi & Karthikeyan', date: 'October 2023', location: 'Kumbakonam', category: 'Cinematic', image: '/images/portfolio/cinematic1.jpg' },
  { id: 4, couple: 'Lakshmi & Venkatesh', date: 'September 2023', location: 'Trichy', category: 'Wedding', image: '/images/portfolio/wedding2.jpg' },
  { id: 5, couple: 'Sangeetha & Murugan', date: 'August 2023', location: 'Thanjavur', category: 'Pre-Wed', image: '/images/portfolio/pre-wed2.jpg' },
  { id: 6, couple: 'Ananya & Rahul', date: 'July 2023', location: 'Ooty', category: 'Cinematic', image: '/images/portfolio/cinematic2.jpg' },
  { id: 7, couple: 'Deepa & Ravi', date: 'June 2023', location: 'Chennai', category: 'Pre-Wed', image: '/images/portfolio/pre-wed3.jpg' },
  { id: 8, couple: 'Nithya & Balaji', date: 'May 2023', location: 'Madurai', category: 'Cinematic', image: '/images/portfolio/cinematic3.jpg' },
  { id: 9, couple: 'Divya & Prakash', date: 'April 2023', location: 'Coimbatore', category: 'Pre-Wed', image: '/images/portfolio/pre-wed4.jpg' },
];

// ===================================
// GALLERY (Instagram)
// ===================================

export interface GalleryPost {
  id: number;
  type: string;
  url: string;
  category: string;
}

export const GALLERY_CATEGORIES = ['All', 'Weddings', 'Portraits', 'Pre-Wedding', 'Behind the Scenes'] as const;

export const GALLERY_POSTS: GalleryPost[] = [
  { id: 1, type: 'Wedding Photography', url: 'https://www.instagram.com/p/DWEhTDHklGi/', category: 'Weddings' },
  { id: 2, type: 'Wedding Photography', url: 'https://www.instagram.com/p/DWEgFOHkmqT/', category: 'Weddings' },
  { id: 3, type: 'Wedding/Engagement', url: 'https://www.instagram.com/reel/DVqwvG2EknY/', category: 'Weddings' },
  { id: 4, type: 'Wedding/Cinematic', url: 'https://www.instagram.com/reel/DOaFBvCEkmO/', category: 'Weddings' },
  { id: 5, type: 'Pre-wedding Shoot', url: 'https://www.instagram.com/reel/CtWvOC0AEIU/', category: 'Pre-Wedding' },
  { id: 6, type: 'Wedding Portrait', url: 'https://www.instagram.com/p/DV3jo3XEsvZ/', category: 'Portraits' },
  { id: 7, type: 'Wedding Portrait', url: 'https://www.instagram.com/p/DV3iixkkgw7/', category: 'Portraits' },
  { id: 8, type: 'Wedding Portrait', url: 'https://www.instagram.com/p/DV3hXJVkjo3/', category: 'Portraits' },
  { id: 9, type: 'Wedding Portrait', url: 'https://www.instagram.com/p/DV3gYoNkgos/', category: 'Portraits' },
  { id: 10, type: 'Wedding Portrait', url: 'https://www.instagram.com/p/DV3iH3Ikjkv/', category: 'Portraits' },
  { id: 11, type: 'Equipment/Behind the Scenes', url: 'https://www.instagram.com/reel/DEZNT4QJ2xd/', category: 'Behind the Scenes' },
  { id: 12, type: 'Wedding Photography', url: 'https://www.instagram.com/p/DPQvDwhkiJg/', category: 'Weddings' },
  { id: 13, type: 'Wedding Portrait', url: 'https://www.instagram.com/p/DV84aWMDaAw/', category: 'Portraits' },
  { id: 14, type: 'Wedding/Couple Portrait', url: 'https://www.instagram.com/p/DQwbZZ9ElsQ/', category: 'Portraits' },
  { id: 15, type: 'Wedding/Couple Portrait', url: 'https://www.instagram.com/p/DN12sRh5L-p/', category: 'Portraits' },
  { id: 16, type: 'Wedding Photography', url: 'https://www.instagram.com/p/DSFhu0ogFq5/', category: 'Weddings' },
  { id: 17, type: 'Wedding Highlights', url: 'https://www.instagram.com/p/DSKmsQeDDwi/', category: 'Weddings' },
  { id: 18, type: 'Wedding Reel', url: 'https://www.instagram.com/reel/DR6irfqku60/', category: 'Weddings' },
  { id: 19, type: 'Wedding Teaser', url: 'https://www.instagram.com/reel/DOszfRYDIKc/', category: 'Weddings' },
  { id: 20, type: 'Wedding/Couple Portrait', url: 'https://www.instagram.com/p/DRKHu4Cklmd/', category: 'Portraits' },
];

// ===================================
// ABOUT
// ===================================

export const ABOUT_STORY = [
  'KARX Photography was founded with a simple mission: to capture the most precious moments in life with unmatched artistry and technical excellence. What started as a passion project has evolved into a full-fledged creative studio serving clients across India and beyond.',
  "Our journey has been marked by numerous accolades, featured stories, and most importantly, the trust and love of our clients. We believe that every moment has a story, and it's our privilege to tell it in the most beautiful way possible.",
  'From intimate wedding ceremonies to large-scale productions, we bring the same passion, creativity, and technical expertise to every project.',
] as const;

export const ABOUT_STATS = [
  { icon: 'camera', number: '1000+', label: 'Projects Completed' },
  { icon: 'users', number: '500+', label: 'Happy Clients' },
  { icon: 'award', number: '15+', label: 'Awards Won' },
  { icon: 'heart', number: '100%', label: 'Client Satisfaction' },
] as const;

export const ABOUT_VALUES = [
  { icon: 'camera', title: 'Excellence', description: 'We strive for perfection in every shot, every edit, and every project we undertake.' },
  { icon: 'heart', title: 'Passion', description: 'Our love for storytelling and photography drives us to create exceptional work.' },
  { icon: 'users', title: 'Collaboration', description: 'We work closely with our clients to understand their vision and bring it to life.' },
  { icon: 'award', title: 'Innovation', description: 'We continuously evolve our techniques and embrace new technologies in filmmaking.' },
] as const;

export const ABOUT_TEAM = [
  {
    name: 'Karx Photography',
    role: 'Founder & Lead Photographer',
    image: '/images/detailes/founder.jpg',
    bio: 'Passionate cinematographer with 10+ years of experience in capturing beautiful moments.',
  },
  {
    name: 'Creative Director',
    role: 'Video Editor & Color Grader',
    image: '/images/detailes/founder.jpg',
    bio: 'Expert in post-production with a keen eye for detail and cinematic storytelling.',
  },
  {
    name: 'Photography Lead',
    role: 'Photographer & Drone Specialist',
    image: '/images/detailes/founder.jpg',
    bio: 'Specialized in aerial photography and unique perspectives that tell deeper stories.',
  },
] as const;

// ===================================
// CONTACT FORM
// ===================================

export const EVENT_TYPES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'pre-wedding', label: 'Pre-Wedding' },
  { value: 'destination', label: 'Destination Wedding' },
  { value: 'maternity', label: 'Maternity' },
  { value: 'concert', label: 'Concert' },
  { value: 'other', label: 'Other' },
] as const;
