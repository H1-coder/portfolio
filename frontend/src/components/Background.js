import { useEffect, useRef } from 'react';

const orb = 'absolute rounded-full motion-reduce:animate-none';

export default function Background() {
  const orbsRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canAnimate = window.matchMedia?.('(prefers-reduced-motion: no-preference) and (pointer: fine)').matches;
    if (!canAnimate) return undefined;

    let frame = 0;
    const onMove = ({ clientX, clientY }) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = clientX / window.innerWidth - 0.5;
        const y = clientY / window.innerHeight - 0.5;
        orbsRef.current.style.transform = `translate3d(${x * -40}px, ${y * -40}px, 0)`;
        glowRef.current.style.transform = `translate3d(${clientX - 300}px, ${clientY - 300}px, 0)`;
        glowRef.current.style.opacity = '1';
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={orbsRef} className="absolute inset-0 transition-transform duration-1000 ease-out">
        <div className={`${orb} -left-40 -top-40 h-[34rem] w-[34rem] bg-brand-1/35 blur-[120px] animate-float`} />
        <div
          className={`${orb} -right-40 top-1/4 h-[30rem] w-[30rem] bg-brand-3/30 blur-[120px] animate-float-slow [animation-delay:-8s]`}
        />
        <div
          className={`${orb} -bottom-40 left-1/4 h-[32rem] w-[32rem] bg-brand-2/30 blur-[130px] animate-float [animation-delay:-14s]`}
        />
        <div
          className={`${orb} bottom-1/4 right-1/4 h-64 w-64 bg-brand-1/20 blur-[100px] animate-float-slow [animation-delay:-20s]`}
        />
      </div>

      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]" />

      <div
        ref={glowRef}
        className="absolute left-0 top-0 hidden h-[600px] w-[600px] rounded-full bg-brand-2/10 opacity-0 blur-[100px] transition-opacity duration-700 lg:block"
      />
    </div>
  );
}
