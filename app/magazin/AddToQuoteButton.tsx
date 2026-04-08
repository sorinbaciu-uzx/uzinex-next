"use client";

type Props = {
  sku: string;
  name: string;
  variant?: "card" | "primary";
  children?: React.ReactNode;
};

export function AddToQuoteButton({ sku, name, variant = "card", children }: Props) {
  const onClick = () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("uzinex_quote_cart");
      const list: { sku: string; name: string; qty: number }[] = raw
        ? JSON.parse(raw)
        : [];
      const existing = list.find((i) => i.sku === sku);
      if (existing) existing.qty += 1;
      else list.push({ sku, name, qty: 1 });
      localStorage.setItem("uzinex_quote_cart", JSON.stringify(list));
    } catch {}
    window.open("/oferta", "_blank", "noopener,noreferrer");
  };

  if (variant === "primary") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-center text-[13px] py-3 bg-uzx-orange hover:bg-uzx-orange2 text-white font-medium transition shadow-lg shadow-uzx-orange/20"
      >
        {children ?? "Cere ofertă"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-center text-xs lg:text-sm py-2.5 bg-uzx-orange hover:bg-uzx-orange2 text-white transition"
    >
      Ofertă
    </button>
  );
}
