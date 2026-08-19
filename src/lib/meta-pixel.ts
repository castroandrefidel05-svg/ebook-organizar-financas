// ============================================================
// Configuração do Meta Pixel (Facebook/Instagram Ads)
// ============================================================

// ID do Pixel — "VENDAS INFOPRODUTOS"
export const META_PIXEL_ID = "1043575291815903";

// 🔗 LINK DE CHECKOUT DA KURSINHA
export const CHECKOUT_URL = "https://pay.kursinha.com/c/6a85df69cad99341d8a538e8";

/**
 * Gera o script de arranque (bootstrap) do Meta Pixel.
 * É injetado uma única vez no <head>/<body> da aplicação (ver __root.tsx).
 */
export function getMetaPixelBootstrapScript(): string {
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
}

/**
 * Dispara um evento standard do Meta Pixel (ex: "InitiateCheckout", "Lead").
 * Só funciona no browser (client-side) — em SSR não faz nada.
 *
 * Documentação de eventos standard:
 * https://developers.facebook.com/docs/meta-pixel/reference
 */
export function trackMetaPixelEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;

  if (typeof fbq === "function") {
    fbq("track", eventName, params);
  } else {
    console.warn("[Meta Pixel] fbq ainda não está carregado — evento não enviado:", eventName);
  }
}
