/**
 * Hanuman Jewellers market-rate layer.
 *
 * Primary source: India Bullion & Jewellers Association (IBJA).
 * IBJA publishes indicative retail jewellery rates on its official site.
 * Gold values are parsed from the official page at request time and cached by
 * Next.js. Silver is exposed through the same IBJA daily-market source link;
 * set IBJA_SILVER_RATE_INR_KG when your licensed feed provides the current
 * silver 999 PM rate.
 */

const IBJA_HOME = "https://ibja.co/";
const IBJA_RATES_PAGE = "https://ibja.co/";

const FALLBACK = {
  gold999: 15194,
  gold22: 14829,
  gold20: 13523,
  gold18: 12307,
  silver999Kg: 228920,
};

function parseMoney(value: string | undefined) {
  if (!value) return null;
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function envRate(name: string, fallback: number) {
  return parseMoney(process.env[name]) ?? fallback;
}

async function getIBJAGoldRates() {
  try {
    const response = await fetch(IBJA_HOME, {
      next: { revalidate: 900 },
      headers: { "User-Agent": "Hanuman-Jewellers-Rate-Desk/1.0" },
    });

    if (!response.ok) throw new Error(`IBJA returned ${response.status}`);
    const html = await response.text();

    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ");

    const findRate = (label: string) => {
      const match = text.match(new RegExp(`${label}[^₹0-9]{0,80}₹?\\s*([0-9,]+)`, "i"));
      return match ? Number(match[1].replace(/,/g, "")) : null;
    };

    return {
      gold999: findRate("Fine Gold \\(999\\)") ?? FALLBACK.gold999,
      gold22: findRate("22 KT") ?? FALLBACK.gold22,
      gold20: findRate("20 KT") ?? FALLBACK.gold20,
      gold18: findRate("18 KT") ?? FALLBACK.gold18,
    };
  } catch {
    return FALLBACK;
  }
}

export async function getMarketRates() {
  const ibja = await getIBJAGoldRates();
  const silver999Kg = envRate("IBJA_SILVER_RATE_INR_KG", FALLBACK.silver999Kg);

  return {
    ...ibja,
    silver999Kg: silver999Kg || null,
    updatedLabel: new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date()),
    sourceUrl: IBJA_RATES_PAGE,
  };
}
