"use client";

import type { PortalVals } from "@/lib/use-portal";
import { PillGroup, PoVoChip, SearchInput, th } from "../ui";

export default function Scholen({ v }: { v: PortalVals }) {
  const grid = "minmax(240px,2fr) 64px 100px 130px 110px 130px";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20, minHeight: 44 }}>
        <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>Scholen</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, margin: "2px 0 12px", minHeight: 40 }}>
        <SearchInput value={v.search} onChange={v.onSearch} placeholder="Zoek een school" width={250} />
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#9A8677", textTransform: "uppercase", letterSpacing: ".05em" }}>Type</span>
          <PillGroup btns={v.typeBtns} />
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9A8677" }}>{v.scholenCountLabel}</div>
      </div>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span style={th}>School</span>
          <span style={th}>Type</span>
          <span style={th}>Open</span>
          <span style={th}>Te beoordelen</span>
          <span style={th}>Plaatsingen</span>
          <span />
        </div>
        {v.schoolRows.map((s, i) => (
          <div key={i} onClick={s.open} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "12px 20px", borderTop: "1px solid #F6EDE3", cursor: "pointer" }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: "#43362F" }}>{s.naam}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#9A8677" }}>{s.plaats}</div>
            </div>
            <div>
              <PoVoChip isPO={s.isPO} isVO={s.isVO} />
            </div>
            <div>
              {s.openHot && <span style={{ fontSize: 15, fontWeight: 800, color: "#DC5A2B", fontVariantNumeric: "tabular-nums" }}>{s.openStr}</span>}
              {s.openCold && <span style={{ fontSize: 14, fontWeight: 600, color: "#C9B5A3" }}>–</span>}
            </div>
            <div>
              {s.tbHot && <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: "#F5E9F4", color: "#8A2486" }}>{s.tbStr}</span>}
              {s.tbCold && <span style={{ fontSize: 14, fontWeight: 600, color: "#C9B5A3" }}>–</span>}
            </div>
            <div>
              {s.plHot && <span style={{ fontSize: 15, fontWeight: 800, color: "#66821B", fontVariantNumeric: "tabular-nums" }}>{s.plStr}</span>}
              {s.plCold && <span style={{ fontSize: 14, fontWeight: 600, color: "#C9B5A3" }}>–</span>}
            </div>
            <div style={{ textAlign: "right" }}>
              <button onClick={s.bekijk} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: "4px 2px" }}>Vacatures →</button>
            </div>
          </div>
        ))}
        {v.schoolNoResults && (
          <div style={{ padding: "46px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#43362F" }}>Geen scholen gevonden</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9A8677", marginTop: 4 }}>Pas de zoekopdracht of het type aan.</div>
          </div>
        )}
      </div>
    </div>
  );
}
