import QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';

// Configuración de las campañas y el directorio de destino
const CAMPAIGNS = ['miraflores', 'surco', 'san-isidro', 'flyer-ig'];
const OUTPUT_DIR = path.resolve(__dirname, '../public/qrs');
const TRACKING_DOMAIN = 'https://track.renaisse.pages.dev/qr';

async function generateQRs() {
  console.log('🤖 Iniciando generación de códigos QR...');

  // Asegurar que el directorio de salida existe
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Directorio creado: ${OUTPUT_DIR}`);
  }

  for (const campaign of CAMPAIGNS) {
    const targetUrl = `${TRACKING_DOMAIN}?c=${campaign}`;
    const outputFilePath = path.join(OUTPUT_DIR, `qr-${campaign}.png`);

    try {
      await QRCode.toFile(outputFilePath, targetUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000', // El código QR en negro elegante
          light: '#ffffff' // Fondo blanco puro para máxima legibilidad
        }
      });
      console.log(`✅ Código QR generado con éxito: qr-${campaign}.png -> Target: ${targetUrl}`);
    } catch (err) {
      console.error(`❌ Error generando el QR para la campaña "${campaign}":`, err);
    }
  }

  console.log('🎉 ¡Todos los códigos QR han sido generados en /public/qrs/!');
}

generateQRs().catch(err => {
  console.error('❌ Error catastrófico en el script de generación:', err);
  process.exit(1);
});
