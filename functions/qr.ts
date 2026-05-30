interface Env {
  SHEET_URL?: string;
  REDIRECT_TARGET?: string;
}

// ── 1. Separación de Responsabilidad: Detector de Dispositivos ───────────────
function getDeviceType(userAgent: string): string {
  if (!userAgent) return 'Other';
  
  if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
    return 'iOS';
  }
  if (userAgent.includes('Android')) {
    return 'Android';
  }
  return 'Other';
}

// ── 2. Separación de Responsabilidad: Sanitización de Parámetros ─────────────
function sanitizeCampaign(campaignParam: string | null): string {
  if (!campaignParam) return 'unknown';
  // Sanitizar para evitar inyecciones XSS o manipulaciones permitiendo solo letras, números, guiones y guiones bajos
  const sanitized = campaignParam.replace(/[^a-zA-Z0-9\-_]/g, '');
  return sanitized || 'unknown';
}

// ── 3. Manejador de la Solicitud (Cloudflare Pages Function) ──────────────────
export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // Sanitizar el parámetro c (campaña)
  const campaign = sanitizeCampaign(url.searchParams.get('c'));

  // Obtener geolocalización provista por Cloudflare
  const cf = (request as any).cf ?? {};
  const city = cf.city ?? 'unknown';
  const country = cf.country ?? 'unknown';

  // Obtener cabeceras estándar
  const userAgent = request.headers.get('user-agent') ?? '';
  const referer = request.headers.get('referer') ?? 'direct';

  // Determinar dispositivo de forma desacoplada
  const device = getDeviceType(userAgent);

  // Payload estructurado para Google Sheets
  const payload = {
    timestamp: new Date().toISOString(),
    campaign,
    city,
    country,
    device,
    referer
  };

  // URL del webhook de Google Sheets (vía variables de entorno de Pages)
  const sheetUrl = env.SHEET_URL || 'https://script.google.com/macros/s/TU_ID/exec';

  // Ejecutamos fetch en background sin bloquear la redirección del usuario
  if (sheetUrl && !sheetUrl.includes('TU_ID')) {
    context.waitUntil(
      fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (!response.ok) {
          console.error(`[Tracking] Sheet webhook failed: ${response.statusText}`);
        }
      })
      .catch(error => {
        console.error('[Tracking] Network error posting to Google Sheets:', error);
      })
    );
  } else {
    console.warn('[Tracking] SHEET_URL environment variable is not configured.');
  }

  // Redireccionar al usuario a la landing page de manera inmediata
  const targetBaseUrl = env.REDIRECT_TARGET || 'https://renaisse.pages.dev';
  const redirectUrl = new URL(targetBaseUrl);
  
  if (campaign !== 'unknown') {
    redirectUrl.searchParams.set('utm_source', 'qr');
    redirectUrl.searchParams.set('utm_campaign', campaign);
  }

  return Response.redirect(redirectUrl.toString(), 302);
};
