type RateCardProps = {
  metal: string;
  purity: string;
  price: number | null;
  unit: string;
  sourceUrl: string;
  accent: "gold" | "silver";
};

function formatINR(value: number | null) {
  if (value === null) return "Rate unavailable";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function RateCard({ metal, purity, price, unit, sourceUrl, accent }: RateCardProps) {
  return (
    <article className={`rate-card ${accent}`}>
      <div className="rate-top">
        <div>
          <span className="metal-label">{metal}</span>
          <h3>{purity}</h3>
        </div>
        <div className="metal-orb" aria-hidden="true">{metal === "Gold" ? "Au" : "Ag"}</div>
      </div>
      <div className="rate-price">{formatINR(price)}</div>
      <div className="rate-unit">{unit}</div>
      <a className="market-button" href={sourceUrl} target="_blank" rel="noreferrer">
        View IBJA source <span>↗</span>
      </a>
    </article>
  );
}
