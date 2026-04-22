import { getBnrEurRate, eurToRon, formatRon, formatBnrDate } from "../lib/bnr";

async function main() {
  const rate = await getBnrEurRate();
  console.log("BNR rate:", rate);
  if (rate) {
    const ron = eurToRon(24900, rate.rate);
    console.log("24900 EUR =", ron ? formatRon(ron) : "null");
    console.log("Date:", formatBnrDate(rate.date));
  }
}

main().catch(console.error);
