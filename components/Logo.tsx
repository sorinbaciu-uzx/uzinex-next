import Image from "next/image";

/**
 * Uzinex brand logo.
 * Uses /public/logo.svg if present (preferred — pixel-perfect from brand file).
 * Falls back to inline SVG recreation if missing.
 */
export function Logo({
  className = "h-9 w-auto",
  width = 180,
  height = 40,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/logo.svg"
      alt="Uzinex — utilaje & echipamente pentru industrie"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}
