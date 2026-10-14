import { useRef, useState } from 'react';
import { profile } from '../data/content';
import GlassCard from './ui/GlassCard';
import GradientButton from './ui/GradientButton';
import Reveal from './ui/Reveal';
import Section from './ui/Section';
import SocialLinks from './ui/SocialLinks';

// Relative so production calls its own Vercel function; in development the CRA
// dev server forwards /api/* to the deployed site (see src/setupProxy.js).
const API_URL = '/api/contact';
const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactItems = [
  { icon: 'fa-solid fa-envelope', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: 'fa-solid fa-phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: profile.location },
];

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please enter your name.';
  if (!email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please provide a valid email address.';
  if (!message.trim()) errors.message = 'Please write a message.';
  return errors;
}

function Field({ label, name, error, optional, multiline, ...props }) {
  const Control = multiline ? 'textarea' : 'input';
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
        {optional && <span className="ml-1 font-normal text-slate-400">(optional)</span>}
      </label>
      <Control
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 transition-colors focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-1/70 ${
          multiline ? 'min-h-[9rem] resize-y' : ''
        } ${error ? 'border-rose-400/70' : 'border-white/15 hover:border-white/25'}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-rose-300">
          <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    const firstInvalid = Object.keys(validationErrors)[0];
    if (firstInvalid) {
      formRef.current.elements[firstInvalid].focus();
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData(EMPTY_FORM);
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message.' });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error.name === 'AbortError' ? 'Request timeout. Please try again.' : 'Network error. Please try again later.',
      });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Get in" highlight="touch">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <GlassCard className="flex h-full flex-col p-6 sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-white">Contact Information</h3>
            <p className="mt-3 leading-relaxed text-slate-300">
              Let's connect and create something extraordinary together.
            </p>

            <ul className="mt-8 space-y-4">
              {contactItems.map(({ icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-button text-ink shadow-glow-sm">
                      <i className={icon} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
                      <span className="block break-words font-medium text-white">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-4 rounded-2xl p-2 -m-2 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <SocialLinks className="mt-auto pt-10" />
          </GlassCard>
        </Reveal>

        <Reveal index={1}>
          <GlassCard as="form" ref={formRef} noValidate onSubmit={handleSubmit} className="h-full space-y-5 p-6 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
            </div>
            <Field
              label="Subject"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              optional
            />
            <Field
              label="Message"
              name="message"
              multiline
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              required
            />

            <div role="status" aria-live="polite">
              {submitStatus && (
                <p
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
                    submitStatus.type === 'success'
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                      : 'border-rose-400/30 bg-rose-400/10 text-rose-200'
                  }`}
                >
                  <i
                    className={`fa-solid ${submitStatus.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}
                    aria-hidden="true"
                  />
                  {submitStatus.message}
                </p>
              )}
            </div>

            <GradientButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? 'Sending…' : 'Send Message'}
              <i className={`fa-solid ${isSubmitting ? 'fa-spinner animate-spin' : 'fa-paper-plane'}`} aria-hidden="true" />
            </GradientButton>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
