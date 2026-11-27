import { useMemo, useState } from "react";
import NeonBackdrop from "./components/NeonBackdrop.jsx";
import creatorAvatar from "./assets/creator-avatar.webp";
import kafkaIllustration from "./assets/kafka.webp";
import {
  APP_INFO,
  isDownloadConfigured,
  resolveAccessCode,
  resolveDownloadUrl,
} from "./config/download.js";

function detectAndroid() {
  if (typeof navigator === "undefined") return false;
  return /android/i.test(navigator.userAgent || "");
}

async function copyTextSafe(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback below
    }
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  } catch {
    return false;
  }
}

export default function App() {
  const isAndroid = useMemo(() => detectAndroid(), []);
  const configured = useMemo(() => isDownloadConfigured(), []);
  const accessCode = useMemo(() => resolveAccessCode(), []);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

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

  async function handleCopyCode() {
    if (!accessCode) return;
    const ok = await copyTextSafe(accessCode);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <main className="page">
      <NeonBackdrop />

      <div className="hero-stage">
        <section className="panel" aria-label="Descarga de aplicación Android">
          <span className="panel-accent-line" aria-hidden="true" />
          <span className="panel-corner-glow" aria-hidden="true" />

          <div className="panel-content">
            <div className="brand-row">
              <div className="logo-mark" aria-hidden="true">
                <svg viewBox="0 0 96 96" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="92"
                    height="92"
                    rx="24"
                    fill="#0C0A10"
                    stroke="rgba(236, 72, 153, 0.45)"
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

              <div className="creator-pill" title={`Creado por ${APP_INFO.creatorHandle}`}>
                <img
                  src={creatorAvatar}
                  alt={`Logo de ${APP_INFO.creatorHandle}`}
                  className="creator-avatar"
                  width="36"
                  height="36"
                  draggable="false"
                />
                <div className="creator-meta">
                  <span className="creator-handle">@{APP_INFO.creatorHandle}</span>
                  <span className="version-tag">{APP_INFO.version}</span>
                </div>
              </div>
            </div>

            <div className="heading-block">
              <h1 className="title">{APP_INFO.name}</h1>
              <p className="subtitle">APK para {APP_INFO.platform}</p>
            </div>

            {accessCode ? (
              <div className="access-box" aria-label="Clave de acceso inicial">
                <div className="access-meta">
                  <span className="access-label">Clave de acceso</span>
                  <code className="access-code">{accessCode}</code>
                </div>
                <button
                  type="button"
                  className={`copy-btn${copied ? " is-copied" : ""}`}
                  onClick={handleCopyCode}
                  aria-label="Copiar clave de acceso"
                >
                  {copied ? (
                    <>
                      <svg
                        className="copy-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Copiada</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="copy-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            ) : null}

            <div className="actions-block">
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
              ) : (
                <p className="hint">Ingresa la clave al abrir la app por primera vez</p>
              )}
            </div>
          </div>

          <div className="panel-visual" aria-hidden="true">
            <div className="visual-aura" />
            <div className="visual-ledge-line" />
            <img
              src={kafkaIllustration}
              alt=""
              className="kafka-figure"
              width="720"
              height="964"
              draggable="false"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
