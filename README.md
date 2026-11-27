# Audio Sticker Studio — Web de Descarga (Android)

Página web estática minimalista en React + Vite, con fondo negro puro (`#000000`) y preparada para desplegar en **Netlify** como un único archivo `dist/index.html`.

## Configurar el enlace de descarga del APK

Tienes dos formas:

1. **Variable de entorno en Netlify (recomendado — no guarda el enlace en Git):**
   - Ve a **Project configuration → Environment variables** en Netlify.
   - Crea `VITE_APK_DOWNLOAD_URL` con tu enlace `https://...` al archivo `.apk`.
   - Ejecuta un **redeploy** (las variables `VITE_` se inyectan en tiempo de compilación).

2. **Directamente en código:**
   - Edita `FALLBACK_APK_URL` en `src/config/download.js`.

## Desarrollo y compilación local

```bash
npm install
npm run dev
npm run build
```

Al ejecutar `npm run build`, el resultado en `dist/` es únicamente `dist/index.html` (JS y CSS integrados, minificados y sin source maps).

## Seguridad aplicada y límites reales de un sitio estático

- **Solo `index.html` publicado:** `vite-plugin-singlefile` genera un único `dist/index.html`, sin carpeta `assets/`, sin archivos `.map` y sin listado de directorios.
- **Sin redirecciones a otras rutas:** cualquier otra ruta distinta a `/` o `/index.html` responde `404` directamente.
- **Cabeceras de endurecimiento en `netlify.toml`:** `Content-Security-Policy`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, `Cache-Control: no-store`, `HSTS` y `Permissions-Policy`.
- **Nota honesta:** en una web 100% estática, cualquier enlace descargado desde el navegador puede inspeccionarse en la pestaña de red al iniciar la descarga. Si en el futuro necesitas control de acceso real o ocultar por completo el origen del archivo, usa **Project visibility (Private)** en Netlify o una **Netlify Function** con una variable de entorno de servidor (sin prefijo `VITE_`).
