export function CompassMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="compassGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14.5" stroke="url(#compassGradient)" strokeWidth="2" />
      <path d="M20.5 11.5L14 14L11.5 20.5L18 18L20.5 11.5Z" fill="url(#compassGradient)" />
      <circle cx="16" cy="16" r="1.6" fill="white" />
    </svg>
  );
}

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";
  const iconSize = size === "lg" ? "h-9 w-9" : size === "sm" ? "h-5 w-5" : "h-6 w-6";
  return (
    <span className="inline-flex items-center gap-2">
      <CompassMark className={iconSize} />
      <span
        className={`bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text font-bold tracking-tight text-transparent ${textSize}`}
      >
        Sales Compass
      </span>
    </span>
  );
}
