"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Private page-view counts for Allen, read on his GoatCounter dashboard; the
// site shows visitors nothing. No cookies, no personal data. Off until the
// account name is filled in. To leave your own visits out, open any page
// once with #toggle-goatcounter at the end of the address, in each browser.
const GOATCOUNTER = "";

type GC = { count?: (o: { path: string }) => void };

export default function VisitCounter() {
  const pathname = usePathname();

  // The site changes pages without a full reload, so count each page here
  // (the script's own load-time count is switched off below).
  useEffect(() => {
    if (!GOATCOUNTER) return;
    let tries = 0;
    const send = () => {
      const gc = (window as unknown as { goatcounter?: GC }).goatcounter;
      if (gc?.count) gc.count({ path: pathname });
      else if (tries++ < 20) window.setTimeout(send, 250);
    };
    send();
  }, [pathname]);

  if (!GOATCOUNTER) return null;
  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${GOATCOUNTER}.goatcounter.com/count`}
      data-goatcounter-settings='{"no_onload": true}'
      strategy="afterInteractive"
    />
  );
}
