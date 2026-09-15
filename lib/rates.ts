/**
 * Hanuman Jewellers market-rate layer.
 *
 * Gold source: Moneycontrol MCX Gold futures (Oct 5, 2026 contract).
 * The MCX quote is treated as the 24K/999 base rate for the website.
 * Other purities are calculated proportionally from the 24K base:
 *   22K = 24K × 22/24
 *   20K = 24K × 20/24
 *   18K = 24K × 18/24
 *
 * IMPORTANT: MCX futures are a market reference, not a retail jewellery
 * selling price. GST, making charges, local premiums/discounts, etc. are
 * intentionally not included here.
 */

const MONEYCONTROL_GOLD_URL =
  "https://www.moneycontrol.com/commodity/mcx-gold-price/?type=futures&exp=2026-10-05";

const FALLBACK_GOLD_24K_10G = 152655;
const FALLBACK_SILVER_999_KG = 228920;

function parseMoney(value: string | undefined) {
  if (!value) return null;
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function envRate(name: string, fallback: number) {
  return parseMoney(process.env[name]) ?? fallback;
}

/**
 * Attempts to read the current MCX gold futures quote from Moneycontrol.
 * Moneycontrol can change its HTML/embedded market-data structure, so the
 * environment-variable fallback keeps the site usable if the page cannot be
 * parsed temporarily.
 */
async function getMoneycontrolGold24K() {
  try {
    const response = await fetch(MONEYCONTROL_GOLD_URL, {
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Hanuman-Jewellers-Rate-Desk/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) throw new Error(`Moneycontrol returned ${response.status}`);

    const html = await response.text();

    // First try common JSON/HTML market-data patterns.
    const patterns = [
      /(?:lastPrice|currentPrice|ltp|last_traded_price|price)\s*["']?\s*:\s*["']?([0-9]{5,7}(?:\.[0-9]+)?)/i,
      /(?:lastPrice|currentPrice|ltp|last_traded_price|price)[^0-9]{0,80}([0-9]{5,7}(?:\.[0-9]+)?)/i,
      /Previous Close\s*\|\s*([0-9,]+)[\s\S]{0,500}?[−-]?([0-9,.]+)\s*\(/i,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (!match) continue;

      // Pattern 3 is previous-close plus change, so derive the current quote.
      if (pattern === patterns[2] && match[2]) {
        const previous = parseMoney(match[1]);
        const change = parseMoney(match[2]);
        if (previous && change) {
          return Math.max(0, previous - change);
        }
      }

      const price = parseMoney(match[1]);
      if (price && price > 50000 && price < 1000000) return price;
    }

    // Fallback parser for the visible text representation used by the page.
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ");

    const previousMatch = text.match(/Previous Close\s*\|\s*([0-9,]+)/i);
    const changeMatch = text.match(/([−-]?[0-9,]+(?:\.[0-9]+)?)\s*\([−-]?[0-9.]+%\)/i);

    if (previousMatch && changeMatch) {
      const previous = parseMoney(previousMatch[1]);
      const change = parseMoney(changeMatch[1]);
      if (previous && change) return Math.max(0, previous - change);
    }

    throw new Error("Could not parse Moneycontrol gold price");
  } catch {
    return envRate("MCX_GOLD_RATE_INR_10G", FALLBACK_GOLD_24K_10G);
  }
}

function calculatePurityRates(gold24k10g: number) {
  const perGram24k = gold24k10g / 10;

  return {
    gold999: perGram24k,
    gold22: perGram24k * (22 / 24),
    gold20: perGram24k * (20 / 24),
    gold18: perGram24k * (18 / 24),
  };
}

export async function getMarketRates() {
  const gold24k10g = await getMoneycontrolGold24K();
  const gold = calculatePurityRates(gold24k10g);
  const silver999Kg = envRate("SILVER_RATE_INR_KG", FALLBACK_SILVER_999_KG);

  return {
    ...gold,
    gold24k10g,
    silver999Kg,
    updatedLabel: new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date()),
    sourceUrl: MONEYCONTROL_GOLD_URL,
    sourceName: "Moneycontrol • MCX Gold Futures (05 Oct 2026)",
  };
}
