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
 * `eventId` é opcional e serve para deduplicar este evento com o mesmo
 * evento enviado em paralelo pela Conversions API (ver meta-conversions-api.ts).
 * Quando o mesmo `eventId` chega pelas duas vias, o Facebook junta-os como
 * um único evento em vez de contar a conversão a dobrar.
 *
 * Documentação de eventos standard:
 * https://developers.facebook.com/docs/meta-pixel/reference
 */
export function trackMetaPixelEvent(
  eventName: string,
  params?: Record<string, unknown>,
  eventId?: string,
): void {
  if (typeof window === "undefined") return;

  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;

  if (typeof fbq === "function") {
    if (eventId) {
      fbq("track", eventName, params ?? {}, { eventID: eventId });
    } else {
      fbq("track", eventName, params);
    }
  } else {
    console.warn("[Meta Pixel] fbq ainda não está carregado — evento não enviado:", eventName);
  }
}

/**
 * Gera um identificador único para um evento — usado para ligar o evento
 * disparado pelo Pixel (browser) ao mesmo evento enviado pela Conversions
 * API (servidor), permitindo ao Facebook deduplicá-los.
 */
export function generateEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

/**
 * Lê o valor de um cookie pelo nome. Usado para ler os cookies `_fbp`
 * (Facebook Browser ID) e `_fbc` (Facebook Click ID) que o próprio Pixel
 * cria automaticamente — enviá-los na Conversions API melhora muito a
 * qualidade de correspondência (match quality) do evento no Facebook.
 */
export function getFacebookCookie(name: "_fbp" | "_fbc"): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  const value = match?.[1];
  return value ? decodeURIComponent(value) : undefined;
}
