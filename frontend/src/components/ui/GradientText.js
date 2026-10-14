export default function GradientText({ className = '', children }) {
  return (
    <span
      className={`bg-brand-gradient bg-pan bg-clip-text text-transparent animate-pan motion-reduce:animate-none ${className}`}
    >
      {children}
    </span>
  );
}
