/**
 * CONFIGURACIÓN DEL ENLACE DE DESCARGA DEL APK
 * --------------------------------------------
 * Tienes dos opciones para configurar el enlace después:
 *
 * Opción 1 (Recomendada para Netlify):
 *   Define la variable de entorno `VITE_APK_DOWNLOAD_URL` en el panel de Netlify
 *   (así el enlace real no queda guardado en el repositorio Git).
 *   Recuerda volver a desplegar (redeploy) tras cambiar una variable de entorno.
 *
 * Opción 2 (Directa en este archivo):
 *   Reemplaza el valor vacío de `FALLBACK_APK_URL` por tu enlace HTTPS directo al .apk.
 *   Ejemplo: "https://tu-servidor-o-storage.com/AudioStickerStudio.apk"
 */
const FALLBACK_APK_URL = "";

export const APP_INFO = {
  name: "Audio Sticker Studio",
  platform: "Android",
  fileName: "AudioStickerStudio.apk",
};

/**
 * Resuelve y valida el enlace HTTPS configurado únicamente en el momento de la descarga.
 */
export function resolveDownloadUrl() {
  const envUrl =
    typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_APK_DOWNLOAD_URL
      : "";

  const candidate = String(envUrl || FALLBACK_APK_URL || "").trim();
  if (!candidate) return null;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "https:") return null;
    return parsed.href;
  } catch {
    return null;
  }
}

export function isDownloadConfigured() {
  return resolveDownloadUrl() !== null;
}
