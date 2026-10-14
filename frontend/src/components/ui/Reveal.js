import { useEffect, useRef, useState } from 'react';

// Full class names so Tailwind can generate them; index picks the stagger step.
const DELAYS = ['delay-0', 'delay-100', 'delay-200', 'delay-300', 'delay-[400ms]', 'delay-500'];

export default function Reveal({ as: Tag = 'div', index = 0, className = '', children, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        DELAYS[index % DELAYS.length]
      } ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
