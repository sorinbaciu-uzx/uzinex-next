/**
 * Uzinex brand logo.
 * Loads /public/logo.svg via plain <img> (SVG doesn't benefit from next/image optimization).
 */
export function Logo({
  className = "",
  width = 165,
  height = 36,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <img
      src="/logo.svg"
      alt="Uzinex — utilaje & echipamente pentru industrie"
      width={width}
      height={height}
      className={className}
      style={{ width, height }}
    />
  );
}
