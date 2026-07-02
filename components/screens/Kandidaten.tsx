"use client";

import type { PortalVals } from "@/lib/use-portal";
import { KandStatusChip, SearchInput, th } from "../ui";

export default function Kandidaten({ v }: { v: PortalVals }) {
  const grid = "minmax(210px,1.7fr) 70px 90px 118px minmax(220px,1.6fr)";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20, minHeight: 44 }}>
        <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>Kandidatenpool</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, margin: "2px 0 12px", minHeight: 40 }}>
        <SearchInput value={v.search} onChange={v.onSearch} placeholder="Zoek op naam of profiel" width={250} />
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9A8677" }}>{v.kandCountLabel}</div>
      </div>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span style={th}>Kandidaat</span>
          <span style={th}>FTE</span>
          <span style={th}>Ervaring</span>
          <span style={th}>Status</span>
          <span style={th}>Aangeboden bij</span>
        </div>
        {v.kandRows.map((k, i) => (
          <div key={i} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "13px 20px", borderTop: "1px solid #F6EDE3" }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: "#43362F" }}>{k.naam}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#9A8677" }}>{k.profiel}</div>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{k.fte}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#6E5B4E" }}>{k.ervaring}</div>
            <div>
              <KandStatusChip isBeschikbaar={k.isBeschikbaar} isAangeboden={k.isAangeboden} isGeplaatst={k.isGeplaatst} />
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#6E5B4E" }}>{k.aangebodenBij}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
