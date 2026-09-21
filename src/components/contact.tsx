'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import SectionHeader from '@/components/ui/section-header';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { useScrollAnimation } from '@/lib/hooks';
import { CONTACT, EVENT_TYPES, SOCIAL_LINKS } from '@/lib/site-data';
import { cn } from '@/lib/utils';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Mirrors the server-side rules in /api/contact so the user sees errors first. */
function validateField(field: keyof FormValues, value: string): string | undefined {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Please tell us your name.';
      if (value.trim().length < 2) return 'Name must be at least 2 characters.';
      return undefined;
    case 'email':
      if (!value.trim()) return 'We need an email address to reply to you.';
      if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address.';
      return undefined;
    case 'phone': {
      if (!value.trim()) return 'Please share a phone number.';
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) return 'Enter a valid phone number.';
      return undefined;
    }
    default:
      return undefined;
  }
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  (['name', 'email', 'phone'] as const).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
} as const;

const CONTACT_DETAILS = [
  { icon: Phone, label: 'Phone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, external: false },
  { icon: FaWhatsapp, label: 'WhatsApp', value: CONTACT.phoneDisplay, href: CONTACT.whatsappHref, external: true },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: CONTACT.emailHref, external: false },
  { icon: MapPin, label: 'Location', value: CONTACT.addressDisplay, href: CONTACT.mapsHref, external: true },
];

const fieldClasses =
  'peer min-h-12 w-full rounded-lg border-2 border-field bg-surface px-4 pb-2 pt-6 text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-transparent focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,154,78,0.25)]';

const labelClasses =
  'pointer-events-none absolute left-4 top-4 origin-left text-body transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs';

export default function Contact() {
  const { ref: infoRef, animate: infoAnimate } = useScrollAnimation<HTMLDivElement>();
  const { ref: formRef, animate: formAnimate } = useScrollAnimation<HTMLDivElement>();

  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear an existing error as soon as the field becomes valid again.
    setErrors((prev) => {
      if (!prev[name as keyof FormValues]) return prev;
      const error = validateField(name as keyof FormValues, value);
      if (error) return prev;
      const next = { ...prev };
      delete next[name as keyof FormValues];
      return next;
    });
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const error = validateField(name as keyof FormValues, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('error');
      setSubmitMessage('Please fix the highlighted fields and try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitState('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const payload: { message?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || `Request failed with status ${response.status}`);
      }

      setSubmitState('success');
      setSubmitMessage(payload.message || "Thank you! We'll get back to you within 24 hours.");
      setValues(EMPTY_FORM);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitState('error');
      setSubmitMessage(
        error instanceof Error
          ? `${error.message} You can also reach us on ${CONTACT.phoneDisplay}.`
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: keyof FormValues) => (
    <AnimatePresence>
      {errors[field] && (
        <motion.p
          id={`${field}-error`}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-danger"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <section id="contact" className="bg-panel py-20 md:py-24" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Get in Touch"
          title={
            <span id="contact-heading">
              Let&apos;s Create <span className="gradient-text-premium">Magic Together</span>
            </span>
          }
          description="Ready to capture your story? We'd love to hear from you."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          {/* Contact details */}
          <motion.div
            ref={infoRef}
            variants={slideInLeft}
            initial="hidden"
            animate={infoAnimate}
          >
            <h3 className="text-2xl font-bold text-ink">Contact Information</h3>
            <p className="mt-2 text-body">{CONTACT.responseTime}</p>

            <ul className="mt-8 space-y-4">
              {CONTACT_DETAILS.map((detail) => {
                const Icon = detail.icon;
                return (
                  <li key={detail.label}>
                    <a
                      href={detail.href}
                      {...(detail.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group flex items-center gap-4 rounded-xl bg-panel p-4 shadow-subtle transition-[transform,box-shadow] duration-200 hover:translate-x-1 hover:shadow-premium"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-hover:scale-110">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-wider text-muted">
                          {detail.label}
                        </span>
                        <span className="block truncate font-medium text-ink">
                          {detail.value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted">
                Follow Us
              </h4>
              <ul className="mt-3 flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-panel text-body shadow-subtle transition-premium hover:-translate-y-0.5 hover:bg-accent hover:text-on-accent"
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          {/* Enquiry form */}
          <motion.div
            ref={formRef}
            variants={slideInRight}
            initial="hidden"
            animate={formAnimate}
            className="rounded-2xl bg-panel p-6 shadow-premium md:p-8"
          >
            <form onSubmit={handleSubmit} noValidate aria-describedby="contact-form-status">
              <fieldset disabled={isSubmitting} className="min-w-0 border-0 p-0">
                <legend className="sr-only">Enquiry details</legend>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=" "
                      required
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={cn(fieldClasses, errors.name && 'border-danger')}
                    />
                    <label htmlFor="name" className={labelClasses}>
                      Your Name *
                    </label>
                    {renderError('name')}
                  </div>

                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=" "
                      required
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={cn(fieldClasses, errors.email && 'border-danger')}
                    />
                    <label htmlFor="email" className={labelClasses}>
                      Email Address *
                    </label>
                    {renderError('email')}
                  </div>

                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=" "
                      required
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={cn(fieldClasses, errors.phone && 'border-danger')}
                    />
                    <label htmlFor="phone" className={labelClasses}>
                      Phone Number *
                    </label>
                    {renderError('phone')}
                  </div>

                  <div>
                    <label
                      htmlFor="eventType"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted"
                    >
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={values.eventType}
                      onChange={handleChange}
                      className="min-h-12 w-full rounded-lg border-2 border-field bg-surface px-4 text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,154,78,0.25)]"
                    >
                      <option value="">Select event type</option>
                      {EVENT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="eventDate"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted"
                    >
                      Event Date
                    </label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={values.eventDate}
                      onChange={handleChange}
                      className="min-h-12 w-full rounded-lg border-2 border-field bg-surface px-4 text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,154,78,0.25)]"
                    />
                  </div>

                  <div className="relative sm:col-span-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={handleChange}
                      placeholder=" "
                      className={cn(fieldClasses, 'resize-y')}
                    />
                    <label htmlFor="message" className={labelClasses}>
                      Your Message
                    </label>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 font-bold text-on-accent shadow-premium transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </fieldset>

              <div id="contact-form-status" role="status" aria-live="polite">
                <AnimatePresence mode="wait">
                  {submitState !== 'idle' && submitMessage && (
                    <motion.p
                      key={submitState + submitMessage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={cn(
                        'mt-4 flex items-start gap-2 rounded-lg p-4 text-sm',
                        submitState === 'success'
                          ? 'bg-success-surface text-success'
                          : 'bg-danger-surface text-danger'
                      )}
                    >
                      {submitState === 'success' ? (
                        <Check className="h-5 w-5 shrink-0" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                      )}
                      {submitMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
