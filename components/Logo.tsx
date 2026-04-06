export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 70"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Uzinex"
    >
      <g fill="#1e6bb8">
        <path d="M0 4 L18 4 L18 38 Q18 46 26 46 Q34 46 34 38 L34 4 L52 4 L52 39 Q52 60 26 60 Q0 60 0 39 Z" />
        <path d="M58 4 L106 4 L106 16 L80 46 L106 46 L106 58 L58 58 L58 46 L84 16 L58 16 Z" />
        <rect x="112" y="4" width="16" height="54" />
        <path d="M134 4 L150 4 L168 32 L168 4 L184 4 L184 58 L168 58 L150 30 L150 58 L134 58 Z" />
        <path d="M190 4 L230 4 L230 16 L206 16 L206 24 L226 24 L226 36 L206 36 L206 46 L230 46 L230 58 L190 58 Z" />
      </g>
      <g fill="#f5851f">
        <path d="M236 4 L254 4 L264 22 L274 4 L292 4 L274 30 L294 58 L276 58 L264 38 L252 58 L234 58 L254 30 Z" />
      </g>
      <text
        x="0"
        y="69"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="400"
        fill="#1e6bb8"
        letterSpacing="0.5"
      >
        utilaje &amp; echipamente pentru industrie
      </text>
    </svg>
  );
}
