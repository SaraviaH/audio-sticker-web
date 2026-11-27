const PETALS = [
  { id: "p1", left: "9%", top: "16%", size: 15, rotate: -26, delay: "0s", duration: "11s" },
  { id: "p2", left: "86%", top: "12%", size: 18, rotate: 34, delay: "-3s", duration: "13s" },
  { id: "p3", left: "14%", top: "82%", size: 13, rotate: 48, delay: "-5s", duration: "12s" },
  { id: "p4", left: "91%", top: "74%", size: 16, rotate: -40, delay: "-2s", duration: "14s" },
  { id: "p5", left: "48%", top: "8%", size: 11, rotate: 18, delay: "-6s", duration: "10s" },
  { id: "p6", left: "62%", top: "88%", size: 12, rotate: -14, delay: "-4s", duration: "12.5s" },
];

export default function NeonBackdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="ambient-glow ambient-glow-left" />
      <div className="ambient-glow ambient-glow-right" />

      <svg className="silk-lines" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="silkGradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="45%" stopColor="#f472b6" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="silkGradB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0" />
            <stop offset="50%" stopColor="#e879f9" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#db2777" stopOpacity="0" />
          </linearGradient>
          <filter id="silkGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#silkGlow)" strokeWidth="1.25" fill="none">
          <line x1="-40" y1="210" x2="1120" y2="-40" stroke="url(#silkGradA)" />
          <line x1="220" y1="940" x2="1480" y2="120" stroke="url(#silkGradB)" />
          <line x1="780" y1="-30" x2="1320" y2="940" stroke="url(#silkGradA)" />
          <line x1="980" y1="-40" x2="480" y2="940" stroke="url(#silkGradB)" opacity="0.65" />
          <line x1="-30" y1="680" x2="1470" y2="540" stroke="url(#silkGradA)" opacity="0.45" />
        </g>
      </svg>

      <div className="petals-layer">
        {PETALS.map((petal) => (
          <svg
            key={petal.id}
            className="petal"
            viewBox="0 0 24 24"
            style={{
              left: petal.left,
              top: petal.top,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              "--petal-rot": `${petal.rotate}deg`,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
            }}
          >
            <path
              d="M12 2C16.8 4.4 20.5 9.2 19.4 14.8C18.5 19.2 14.8 21.8 11.2 21.9C7.4 22 4.3 18.6 4.7 14C5.1 9.1 8.4 4.8 12 2Z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
