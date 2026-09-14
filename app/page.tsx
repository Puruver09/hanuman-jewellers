import Image from "next/image";
import { getMarketRates } from "@/lib/rates";
import RateCard from "@/components/rate-card";
import ActionButtons from "@/components/action-buttons";

const INSTAGRAM_URL = "https://www.instagram.com/hanumanjewelers009?igsi=MXMzaWp6Ymd2dnoweg==";
const MAPS_URL = "https://maps.app.goo.gl/3K7JEH4pYSA8VXvD7?g_st=ac";
const IBJA_URL = "https://ibja.co/";

export const revalidate = 900;

const products = [
  { title: "Gold Bars", text: "Pure bullion for gifting and investment.", icon: "▰" },
  { title: "Gold Coins", text: "Traditional choices for every auspicious occasion.", icon: "◉" },
  { title: "Silver Bars", text: "999 silver in investment-ready formats.", icon: "◇" },
  { title: "Silver Coins", text: "Elegant silver pieces for celebrations and gifting.", icon: "✦" },
];

export default async function Home() {
  const rates = await getMarketRates();

  return (
    <main>
      <div className="top-strip">
        <div>HANUMAN JEWELLERS • GOLD • SILVER • TRUST</div>
        <div>Market-linked indicative rates</div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand">
            <Image src="/logo.png" alt="Hanuman Jewellers" width={92} height={92} className="brand-logo" priority />
            <div>
              <div className="brand-name">Hanuman Jewellers</div>
              <div className="brand-tagline">FAITH • PURITY • PERFECTION</div>
            </div>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#rates">Live Rates</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="gold-button small" href={MAPS_URL} target="_blank" rel="noreferrer">Visit Store</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit" />
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO HANUMAN JEWELLERS</span>
          <h1>Where <span>Tradition</span><br />meets timeless shine.</h1>
          <p>
            Discover trusted gold and silver jewellery with transparent, market-linked pricing and a refined shopping experience inspired by India&apos;s bullion tradition.
          </p>
          <div className="hero-actions">
            <a href="#rates" className="gold-button">Check Today&apos;s Rates</a>
            <a href="#products" className="outline-button">Explore Products</a>
          </div>
          <div className="trust-row">
            <div><strong>999</strong><span>Fine Gold</span></div>
            <div><strong>22K</strong><span>Jewellery Gold</span></div>
            <div><strong>999</strong><span>Silver</span></div>
            <div><strong>IBJA</strong><span>Rate Source</span></div>
          </div>
        </div>
      </section>

      <section className="rates-section" id="rates">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LIVE MARKET DESK</span>
            <h2>Gold & Silver Rates</h2>
          </div>
          <div className="updated"><span className="pulse" /><span>Last checked {rates.updatedLabel}</span></div>
        </div>

        <div className="rate-grid rate-grid-three">
          <RateCard metal="Gold" purity="24K • 999" price={rates.gold999} unit="per gram • IBJA indicative retail rate" sourceUrl={IBJA_URL} accent="gold" />
          <RateCard metal="Gold" purity="22K • Jewellery" price={rates.gold22} unit="per gram • IBJA indicative retail rate" sourceUrl={IBJA_URL} accent="gold" />
          <RateCard metal="Silver" purity="999 Fine Silver" price={rates.silver999Kg} unit="per kg • IBJA daily market source" sourceUrl={IBJA_URL} accent="silver" />
        </div>

        <div className="rate-mini-row">
          <div><span>20K</span><strong>₹{rates.gold20.toLocaleString("en-IN")}/g</strong></div>
          <div><span>18K</span><strong>₹{rates.gold18.toLocaleString("en-IN")}/g</strong></div>
          <a href={IBJA_URL} target="_blank" rel="noreferrer">Open official IBJA rate desk ↗</a>
        </div>

        <div className="market-note">
          <span className="note-icon">i</span>
          <p>
            Rates are indicative and exclude applicable GST and making charges. Jewellery billing may vary by purity, weight, design, making charges, taxes and the rate applicable at the time of purchase. IBJA publishes benchmark and indicative retail rates; it does not represent Hanuman Jewellers&apos; final selling price.
          </p>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <div><span className="eyebrow">OUR COLLECTION</span><h2>Gold & Silver Essentials</h2></div>
          <span className="section-side-note">BUY • GIFT • INVEST</span>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.title}>
              <div className="product-icon">{product.icon}</div>
              <h3>{product.title}</h3>
              <p>{product.text}</p>
              <a href={MAPS_URL} target="_blank" rel="noreferrer">Enquire at store →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="features" id="about">
        <div className="feature"><span className="feature-number">01</span><h3>Transparent Pricing</h3><p>Clear market-linked reference rates with the important exclusions explained upfront.</p></div>
        <div className="feature"><span className="feature-number">02</span><h3>Trusted Craftsmanship</h3><p>Traditional jewellery values combined with contemporary designs and careful selection.</p></div>
        <div className="feature"><span className="feature-number">03</span><h3>Built on Trust</h3><p>A premium digital front for a family-focused jewellery shopping experience.</p></div>
      </section>

      <section className="visit-section" id="contact">
        <div className="visit-copy">
          <span className="eyebrow">HANUMAN JEWELLERS</span>
          <h2>Visit us for your next piece of gold.</h2>
          <p>Check the market reference rate online, then visit the store to explore jewellery, coins and bullion options with our team.</p>
          <ActionButtons instagramUrl={INSTAGRAM_URL} mapsUrl={MAPS_URL} />
        </div>
        <div className="visit-card">
          <div className="mini-logo-wrap"><Image src="/logo.png" alt="Hanuman Jewellers logo" width={125} height={125} /></div>
          <p className="visit-title">Hanuman Jewellers</p>
          <p className="visit-subtitle">Gold • Silver • Jewellery</p>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="map-link">Open Google Maps →</a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div><div className="footer-brand">Hanuman Jewellers</div><div className="footer-tag">FAITH • PURITY • PERFECTION</div></div>
          <div className="footer-links">
            <a href={IBJA_URL} target="_blank" rel="noreferrer">IBJA Rate Source</a>
            <a href="#rates">Live Rates</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps</a>
          </div>
        </div>
        <div className="copyright">© {new Date().getFullYear()} Hanuman Jewellers. All rights reserved.</div>
      </footer>
    </main>
  );
}
