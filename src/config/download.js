/**
 * CONFIGURACIÓN DEL ENLACE DE DESCARGA Y CLAVE DE ACCESO
 * ------------------------------------------------------
 * - Define `VITE_APK_DOWNLOAD_URL` en Netlify para mantener el enlace fuera del repo Git.
 * - `ACCESS_CODE` corresponde únicamente a la clave inicial de acceso a la app.
 */
const FALLBACK_APK_URL = "";
const DEFAULT_ACCESS_CODE = "shinju.n2597";

export const APP_INFO = {
  name: "Audio Sticker Studio",
  platform: "Android",
  version: "v1.0.2",
  creatorHandle: "shinju.n",
  fileName: "AudioStickerStudio-V1.0.2.usuario.apk",
};

export function resolveAccessCode() {
  const envCode =
    typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_ACCESS_CODE
      : "";
  return String(envCode || DEFAULT_ACCESS_CODE).trim();
}

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
