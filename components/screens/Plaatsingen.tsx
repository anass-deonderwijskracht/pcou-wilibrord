"use client";

import type { PortalVals } from "@/lib/use-portal";
import { PoVoChip, SearchInput, th } from "../ui";

export default function Plaatsingen({ v }: { v: PortalVals }) {
  const grid = "minmax(140px,1.2fr) minmax(150px,1.3fr) 54px minmax(140px,1.2fr) minmax(125px,1fr) 100px 150px 18px";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20, minHeight: 44 }}>
        <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>Plaatsingen</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, margin: "2px 0 12px", minHeight: 40 }}>
        <SearchInput value={v.search} onChange={v.onSearch} placeholder="Zoek op kandidaat, school of partner" width={280} />
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9A8677" }}>{v.plaatsingenCountLabel}</div>
      </div>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span style={th}>School</span>
          <span style={th}>Vacature</span>
          <span style={th}>Type</span>
          <span style={th}>Kandidaat</span>
          <span style={th}>Partner</span>
          <span style={th}>Ingangsdatum</span>
          <span style={th}>Goedgekeurd</span>
          <span />
        </div>
        {v.plaatsingRows.map((r, i) => (
          <div key={i} onClick={r.open} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #F6EDE3", cursor: "pointer" }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#43362F" }}>{r.schoolNaam}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#43362F" }}>{r.functie}</div>
            <div>
              <PoVoChip isPO={r.isPO} isVO={r.isVO} />
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#43362F" }}>{r.kandNaam}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#43362F" }}>{r.partnerNaam}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#6E5B4E" }}>{r.ingang}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#66821B" }}>✓ {r.goedOp}</div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>door {r.goedDoor}</div>
            </div>
            <span style={{ color: "#C9B5A3", fontSize: 18, fontWeight: 800 }}>›</span>
          </div>
        ))}
        {v.plaatsingenEmpty && (
          <div style={{ padding: "46px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#43362F" }}>Nog geen plaatsingen</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9A8677", marginTop: 4 }}>{v.plaatsingenEmptyText}</div>
          </div>
        )}
      </div>
    </div>
  );
}
