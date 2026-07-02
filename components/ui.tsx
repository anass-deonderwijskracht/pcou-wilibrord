"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CalDay, DdOption } from "@/lib/use-portal";

/* Tabelkop-cel */
export const th: CSSProperties = {
  fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "#9A8677",
};

export function Chip({ bg, color, children }: { bg: string; color: string; children: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: bg, color }}>
      {children}
    </span>
  );
}

export function PoVoChip({ isPO, isVO }: { isPO: boolean; isVO: boolean }) {
  return (
    <>
      {isPO && <Chip bg="#F5E9F4" color="#8A2486">PO</Chip>}
      {isVO && <Chip bg="#FCEDE4" color="#C05020">VO</Chip>}
    </>
  );
}

export function OfferStatusChip({ isBeh, isGoed, isAfg }: { isBeh: boolean; isGoed: boolean; isAfg: boolean }) {
  return (
    <>
      {isBeh && <Chip bg="#F5E9F4" color="#8A2486">In behandeling</Chip>}
      {isGoed && <Chip bg="#EFF4DC" color="#66821B">Goedgekeurd</Chip>}
      {isAfg && <Chip bg="#F9E9E5" color="#B23A2A">Afgewezen</Chip>}
    </>
  );
}

export function KandStatusChip({ isBeschikbaar, isAangeboden, isGeplaatst }: { isBeschikbaar: boolean; isAangeboden: boolean; isGeplaatst: boolean }) {
  return (
    <>
      {isBeschikbaar && <Chip bg="#F4EDE5" color="#6E5B4E">Beschikbaar</Chip>}
      {isAangeboden && <Chip bg="#F5E9F4" color="#8A2486">Aangeboden</Chip>}
      {isGeplaatst && <Chip bg="#EFF4DC" color="#66821B">Geplaatst</Chip>}
    </>
  );
}

/* Dropdown-opties: kopjes + (de)geselecteerde items */
export function DdOptions({ options, variant = "dd" }: { options: DdOption[]; variant?: "dd" | "picker" }) {
  const isPicker = variant === "picker";
  const headerPad = isPicker ? "10px 11px 4px" : "8px 10px 3px";
  const radius = isPicker ? 9 : 8;
  const pad = isPicker ? "9px 11px" : "8px 10px";
  const hoverCls = isPicker ? "hv-bg-cream" : "hv-bg-grey";
  return (
    <>
      {options.map((o, i) => (
        o.isHeader ? (
          <div key={i} style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "#B7A594", padding: headerPad }}>{o.label}</div>
        ) : o.sel ? (
          <button key={i} onClick={o.pick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, textAlign: "left", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#C05020", background: "#FCEDE4", borderRadius: radius, padding: pad }}>{o.label}<span>✓</span></button>
        ) : (
          <button key={i} onClick={o.pick} className={hoverCls} style={{ textAlign: "left", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "#43362F", background: "transparent", borderRadius: radius, padding: pad }}>{o.label}</button>
        )
      ))}
    </>
  );
}

/* Kalender-popover (paneel + sluit-overlay) */
export function CalPanel({ closeDd, calPrev, calNext, calTitle, calDays, panelPos }: {
  closeDd: () => void;
  calPrev: () => void;
  calNext: () => void;
  calTitle: string;
  calDays: CalDay[];
  panelPos: CSSProperties;
}) {
  const navBtn: CSSProperties = { border: "none", cursor: "pointer", width: 28, height: 28, borderRadius: 999, background: "#F1E7DC", color: "#6E5B4E", fontSize: 14, fontWeight: 800, fontFamily: "inherit" };
  const dow: CSSProperties = { fontSize: 10.5, fontWeight: 800, color: "#B7A594", textAlign: "center" };
  return (
    <>
      <div onClick={closeDd} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
      <div style={{ position: "absolute", zIndex: 80, width: 272, background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 12, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 12, ...panelPos }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <button onClick={calPrev} className="hv-bg-tan" style={navBtn}>‹</button>
          <span style={{ fontSize: 13.5, fontWeight: 800, color: "#43362F" }}>{calTitle}</span>
          <button onClick={calNext} className="hv-bg-tan" style={navBtn}>›</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
          <span style={dow}>ma</span><span style={dow}>di</span><span style={dow}>wo</span><span style={dow}>do</span><span style={dow}>vr</span><span style={dow}>za</span><span style={dow}>zo</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
          {calDays.map((d, i) => (
            d.blank ? (
              <span key={i} />
            ) : d.sel ? (
              <button key={i} onClick={d.pick} style={{ border: "none", cursor: "pointer", height: 30, borderRadius: 8, background: "#DC5A2B", color: "#FFFFFF", fontFamily: "inherit", fontSize: 12.5, fontWeight: 800 }}>{d.n}</button>
            ) : (
              <button key={i} onClick={d.pick} className="hv-bg-grey" style={{ border: "none", cursor: "pointer", height: 30, borderRadius: 8, background: "transparent", color: "#43362F", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700 }}>{d.n}</button>
            )
          ))}
        </div>
      </div>
    </>
  );
}

/* Zoekveld met vergrootglas */
export function SearchInput({ value, onChange, placeholder, width }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  width: number;
}) {
  return (
    <div style={{ position: "relative" }}>
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <circle cx="9" cy="9" r="6" stroke="#B7A594" strokeWidth="2" />
        <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="#B7A594" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input value={value} onChange={onChange} placeholder={placeholder} className="fc-border-orange" style={{ fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 999, padding: "9px 16px 9px 36px", width }} />
    </div>
  );
}

/* Pill-toggle groep (Alle / PO / VO, Alle / Open / Gevuld, …) */
export interface PillBtn { label: string; active: boolean; inactive: boolean; select: () => void }

export function PillGroup({ btns, wrapPad = 3, btnPad = "6px 13px", fontSize = 12.5 }: {
  btns: PillBtn[];
  wrapPad?: number;
  btnPad?: string;
  fontSize?: number;
}) {
  return (
    <div style={{ display: "flex", background: "#F1E7DC", borderRadius: 999, padding: wrapPad }}>
      {btns.map((b, i) => (
        b.active ? (
          <button key={i} onClick={b.select} style={{ border: "none", cursor: "pointer", padding: btnPad, borderRadius: 999, fontFamily: "inherit", fontSize, fontWeight: 800, background: "#FFFFFF", color: "#C05020", boxShadow: "0 1px 3px rgba(67,54,47,.12)" }}>{b.label}</button>
        ) : (
          <button key={i} onClick={b.select} className="hv-text-dark" style={{ border: "none", cursor: "pointer", padding: btnPad, borderRadius: 999, fontFamily: "inherit", fontSize, fontWeight: 800, background: "transparent", color: "#8A7565" }}>{b.label}</button>
        )
      ))}
    </div>
  );
}
