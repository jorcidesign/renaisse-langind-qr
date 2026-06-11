// ── Renaisse Worker Script (Cloudflare Workers + Assets) ─────────────────
// Maneja la ruta /qr para tracking + redirect, y sirve assets estáticos para el resto.

function getDeviceType(userAgent) {
  if (!userAgent) return 'Other';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) return 'iOS';
  if (userAgent.includes('Android')) return 'Android';
  return 'Other';
}

function sanitizeCampaign(campaignParam) {
  if (!campaignParam) return 'unknown';
  const sanitized = campaignParam.replace(/[^a-zA-Z0-9\-_]/g, '');
  return sanitized || 'unknown';
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Ruta /qr: tracking + redirect ──
    if (url.pathname === '/qr' || url.pathname.startsWith('/qr/')) {
      const campaign = sanitizeCampaign(url.searchParams.get('c'));
      const cf = request.cf ?? {};
      const city = cf.city ?? 'unknown';
      const country = cf.country ?? 'unknown';
      const userAgent = request.headers.get('user-agent') ?? '';
      const referer = request.headers.get('referer') ?? 'direct';
      const device = getDeviceType(userAgent);

      const payload = {
        timestamp: new Date().toISOString(),
        campaign,
        city,
        country,
        device,
        referer
      };

      const sheetUrl = env.SHEET_URL || 'https://script.google.com/macros/s/TU_ID/exec';

      if (sheetUrl && !sheetUrl.includes('TU_ID')) {
        ctx.waitUntil(
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

      const targetBaseUrl = env.REDIRECT_TARGET || 'https://renaisse.pages.dev';
      const redirectUrl = new URL(targetBaseUrl);

      if (campaign !== 'unknown') {
        redirectUrl.searchParams.set('utm_source', 'qr');
        redirectUrl.searchParams.set('utm_campaign', campaign);
      }

      return Response.redirect(redirectUrl.toString(), 302);
    }

    // ── Todo lo demás: assets estáticos ──
    return env.ASSETS.fetch(request);
  }
};
