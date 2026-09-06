// Preflight line-icon set (v29). One custom set, uniform 1.5 stroke on a
// 24 unit grid, every icon distinct. Paths are taken from the Claude
// Design export; the four in section 08 are drawn to the same rules for
// the copy that replaced the export's placeholder (building, layers,
// shield, key).

type IconProps = {
  size?: number;
  strokeWidth?: number;
};

function Svg({
  size = 24,
  strokeWidth = 1.5,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        stroke: "currentColor",
        strokeWidth,
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        display: "block",
      }}
    >
      {children}
    </svg>
  );
}

/* ---- 01 Why this exists ---- */

export function IconShieldBolt(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l7.5 3v5.4c0 4.6-3.1 7.7-7.5 10.1C7.6 19.1 4.5 16 4.5 11.4V6z" />
      <path d="M12.8 8.2l-2 3.4h2.4l-1.6 3.4" />
    </Svg>
  );
}

export function IconDatabaseLeak(p: IconProps) {
  return (
    <Svg {...p}>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
      <path d="M5 5.5v7c0 1.5 3.1 2.8 7 2.8" />
      <path d="M19 5.5v5.2" />
      <path d="M17.5 14.5c1.6 2 2.4 3.2 2.4 4.1a2.4 2.4 0 01-4.8 0c0-.9.8-2.1 2.4-4.1z" />
    </Svg>
  );
}

export function IconEyeCrossed(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2.5 12S6 6.5 12 6.5s9.5 5.5 9.5 5.5-3.5 5.5-9.5 5.5S2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M4 20L20 4" />
    </Svg>
  );
}

export function IconTarget(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1.8v3.4M12 18.8v3.4M1.8 12h3.4M18.8 12h3.4" />
    </Svg>
  );
}

/* ---- 02 Proof ---- */

export function IconCrossTenant(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="4" width="8.5" height="8.5" rx="2" />
      <rect x="13" y="11.5" width="8.5" height="8.5" rx="2" />
      <path d="M11 8.2h6.2M17.2 8.2l-2-2M17.2 8.2l-2 2" />
    </Svg>
  );
}

export function IconCreditMint(p: IconProps) {
  return (
    <Svg {...p}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 11v5c0 1.7 3.4 3 7.5 3" />
      <path d="M17 15.5v5M14.5 18h5" />
    </Svg>
  );
}

export function IconNoRecovery(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 12a8.5 8.5 0 1114.6 5.9" />
      <path d="M3.5 7.5V12h4.5" />
      <path d="M12 8.5V12l2.4 1.6" />
      <path d="M19 19l3 3M22 19l-3 3" />
    </Svg>
  );
}

/* ---- 04 The operator kit ---- */

export function IconGuide(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 6.5C10.4 5.2 8.2 4.5 5 4.5v13c3.2 0 5.4.7 7 2 1.6-1.3 3.8-2 7-2v-13c-3.2 0-5.4.7-7 2z" />
      <path d="M12 6.5v12" />
    </Svg>
  );
}

export function IconChecklist(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 6.5l2 2 3.5-3.5M3 13l2 2 3.5-3.5M3 19.5l2 2 3.5-3.5" />
      <path d="M12 6h9M12 13h9M12 19.5h6" />
    </Svg>
  );
}

export function IconReport(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M14 3H6.5A1.5 1.5 0 005 4.5v15A1.5 1.5 0 006.5 21h11a1.5 1.5 0 001.5-1.5V8z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 12.5h7M8.5 16.5h4.5" />
    </Svg>
  );
}

export function IconFieldNotes(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 19.5V5a2 2 0 012-2h9.5L20 7.5v4" />
      <path d="M4 19.5A1.5 1.5 0 015.5 18H20" />
      <path d="M12.5 20.5l7.5-7.5 2 2-7.5 7.5-2.6.6z" />
    </Svg>
  );
}

export function IconRefresh(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M20.5 11a8.5 8.5 0 00-14.8-5" />
      <path d="M3.5 13a8.5 8.5 0 0014.8 5" />
      <path d="M5.5 1.5V6H10M18.5 22.5V18H14" />
    </Svg>
  );
}

/* ---- 05 How it works ---- */

export function IconTerminal(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M6.5 10l2.5 2.5-2.5 2.5M11.5 15h5" />
    </Svg>
  );
}

export function IconPasteProtocol(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 4.5H7A1.5 1.5 0 005.5 6v13A1.5 1.5 0 007 20.5h10A1.5 1.5 0 0018.5 19V6A1.5 1.5 0 0017 4.5h-2" />
      <rect x="9" y="2.5" width="6" height="4" rx="1.2" />
      <path d="M12 10v6M9.5 13.5L12 16l2.5-2.5" />
    </Svg>
  );
}

export function IconVerdict(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 17a9 9 0 1117 0" />
      <path d="M12 17l4.2-5" />
      <circle cx="12" cy="17" r="1.4" />
      <path d="M3.5 20.5h17" />
    </Svg>
  );
}

/* ---- 06 Who it's for ---- */

export function IconCheckCircle(p: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 12.5l3 3 6-6.5" />
    </Svg>
  );
}

export function IconCrossCircle(p: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.8 8.8l6.4 6.4M15.2 8.8l-6.4 6.4" />
    </Svg>
  );
}

/* ---- 07 What a pass means ---- */

export function IconFloor(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 18.5h18" />
      <path d="M6 18.5V13M12 18.5V9M18 18.5v-8" />
      <path d="M6 13l6-4 6 1" />
    </Svg>
  );
}

export function IconEvidence(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M13.5 3H7A1.5 1.5 0 005.5 4.5v15A1.5 1.5 0 007 21h10a1.5 1.5 0 001.5-1.5V8z" />
      <path d="M13.5 3v5h5" />
      <circle cx="11.5" cy="13.5" r="2.8" />
      <path d="M13.6 15.6l2.4 2.4" />
    </Svg>
  );
}

export function IconNoProof(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 18.4L18.4 5.6" />
    </Svg>
  );
}

export function IconStack(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l8.5 4.2L12 11.4 3.5 7.2z" />
      <path d="M3.5 12L12 16.2 20.5 12" />
      <path d="M3.5 16.8L12 21l8.5-4.2" />
    </Svg>
  );
}

/* ---- 08 Built by Deeper Designs ---- */

export function IconBuilding(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 21h17" />
      <path d="M5.5 21V5.5a1.5 1.5 0 011.5-1.5h5a1.5 1.5 0 011.5 1.5V21" />
      <path d="M13.5 21V10h4a1.5 1.5 0 011.5 1.5V21" />
      <path d="M8 8h3M8 12h3M8 16h3M16 14h1M16 17.5h1" />
    </Svg>
  );
}

export function IconLayers(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="3.5" width="8" height="7" rx="1.5" />
      <rect x="13" y="3.5" width="8" height="7" rx="1.5" />
      <rect x="3" y="13.5" width="8" height="7" rx="1.5" />
      <rect x="13" y="13.5" width="8" height="7" rx="1.5" />
    </Svg>
  );
}

export function IconShield(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l7.5 3v5.4c0 4.6-3.1 7.7-7.5 10.1C7.6 19.1 4.5 16 4.5 11.4V6z" />
      <path d="M8.8 11.8l2.3 2.4 4.1-4.6" />
    </Svg>
  );
}

export function IconKey(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="7.5" cy="15.5" r="4" />
      <path d="M10.4 12.6L20 3" />
      <path d="M17 6l2.3 2.3M14.6 8.4l2.3 2.3" />
    </Svg>
  );
}

/* ---- shared marks ---- */

export function IconTick({ size = 18, strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg size={size} strokeWidth={strokeWidth}>
      <path d="M4 12.5l5 5L20 6.5" />
    </Svg>
  );
}

export function IconCross({ size = 16, strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg size={size} strokeWidth={strokeWidth}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}
