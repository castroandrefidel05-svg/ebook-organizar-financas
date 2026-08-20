// ============================================================
// Meta Conversions API (CAPI) — envio de eventos a partir do servidor
// ============================================================
//
// Complementa o Meta Pixel "normal" (que corre no browser do visitante).
// Quando o browser bloqueia o Pixel (ad blockers, Safari/iOS, definições
// de privacidade, etc.), este envio a partir do servidor continua a
// chegar ao Facebook — não pode ser bloqueado do lado do visitante.
//
// Requer a variável de ambiente META_TOKEN, configurada
// nas "Environment Variables" do projeto na Vercel (nunca no código).
// Gera-se em: Gestor de Eventos do Facebook > [o teu pixel] > Definições
// > Conversions API > Gerar token de acesso.

import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

import { META_PIXEL_ID } from "./meta-pixel";

const GRAPH_API_VERSION = "v21.0";

type LeadEventInput = {
  /** Mesmo identificador usado no evento correspondente do Pixel, para deduplicação. */
  eventId: string;
  /** URL da página onde o clique aconteceu. */
  eventSourceUrl: string;
  /** Cookie _fbp criado pelo Pixel (Facebook Browser ID). */
  fbp: string | undefined;
  /** Cookie _fbc criado pelo Pixel (Facebook Click ID). */
  fbc: string | undefined;
};

/**
 * Envia um evento "Lead" ao Facebook diretamente do servidor.
 * Chamado a partir do CTAButton quando alguém clica num botão que leva
 * ao checkout externo — o clique em si é tratado como o "Lead".
 */
export const sendLeadConversionEvent = createServerFn({ method: "POST" })
  .validator((input: LeadEventInput) => input)
  .handler(async ({ data }) => {
    const accessToken = process.env["META_TOKEN"];

    if (!accessToken) {
      // Sem token configurado, não faz nada (e não rebenta a página).
      // Ver Environment Variables no projeto da Vercel (nome: META_TOKEN).
      console.warn(
        "[Meta Conversions API] META_TOKEN não está definido — evento 'Lead' não enviado.",
      );
      return { sent: false };
    }

    const userAgent = getRequestHeader("user-agent");
    const clientIp = getRequestIP({ xForwardedFor: true });

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: data.eventId,
          event_source_url: data.eventSourceUrl,
          action_source: "website",
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            fbp: data.fbp,
            fbc: data.fbc,
          },
        },
      ],
    };

    try {
      const response = await fetch(
        `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        console.error("[Meta Conversions API] Falha ao enviar evento:", await response.text());
        return { sent: false };
      }

      return { sent: true };
    } catch (error) {
      console.error("[Meta Conversions API] Erro ao enviar evento:", error);
      return { sent: false };
    }
  });
