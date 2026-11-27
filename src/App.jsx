import { useMemo, useState } from "react";
import { APP_INFO, isDownloadConfigured, resolveDownloadUrl } from "./config/download.js";

function detectAndroid() {
  if (typeof navigator === "undefined") return false;
  return /android/i.test(navigator.userAgent || "");
}

export default function App() {
  const isAndroid = useMemo(() => detectAndroid(), []);
  const configured = useMemo(() => isDownloadConfigured(), []);
  const [status, setStatus] = useState("");

  function handleDownload() {
    const url = resolveDownloadUrl();
    if (!url) {
      setStatus("Descarga no disponible todavía.");
      return;
    }

    setStatus("Iniciando descarga...");

    // Construimos el disparador solo al pulsar el botón para no exponer un href fijo en el HTML.
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.setAttribute("download", APP_INFO.fileName);
    anchor.rel = "noopener noreferrer";
    anchor.referrerPolicy = "no-referrer";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return (
    <main className="page">
      <section className="card" aria-label="Descarga de aplicación Android">
        <div className="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 96 96" fill="none">
            <rect
              x="2"
              y="2"
              width="92"
              height="92"
              rx="26"
              fill="#0B0B0D"
              stroke="#242429"
              strokeWidth="2"
            />
            <path
              d="M31 22 H65 A10 10 0 0 1 75 32 V60 L60 75 H31 A10 10 0 0 1 21 65 V32 A10 10 0 0 1 31 22 Z"
              fill="#FFFFFF"
            />
            <path d="M60 65 Q60 60 65 60 L75 60 L60 75 Z" fill="#D4D4D8" />
            <path
              d="M34 44 V52 M41 37 V58 M48 32 V63 M55 39 V56 M62 44 V52"
              stroke="#000000"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="title">{APP_INFO.name}</h1>
        <p className="subtitle">APK para {APP_INFO.platform}</p>

        <button
          type="button"
          className="download-btn"
          onClick={handleDownload}
          disabled={!configured}
          aria-disabled={!configured}
        >
          <svg
            className="btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 11 5 5 5-5" />
            <path d="M5 20h14" />
          </svg>
          <span>{configured ? "Descargar APK" : "APK próximamente"}</span>
        </button>

        {status ? (
          <p className="feedback" role="status" aria-live="polite">
            {status}
          </p>
        ) : !isAndroid ? (
          <p className="hint">Diseñada para teléfonos Android (.apk)</p>
        ) : null}
      </section>
    </main>
  );
}
