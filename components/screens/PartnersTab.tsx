"use client";

import type { PortalVals } from "@/lib/use-portal";
import { PillGroup, SearchInput, th } from "../ui";

export default function PartnersTab({ v }: { v: PortalVals }) {
  const grid = "minmax(200px,1.6fr) 104px 118px 108px 100px minmax(180px,1.3fr)";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20, minHeight: 44 }}>
        <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>Aanbestedingspartners</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, margin: "2px 0 12px", minHeight: 40 }}>
        <SearchInput value={v.search} onChange={v.onSearch} placeholder="Zoek een partner" width={250} />
        {v.showPTypeToggle && (
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#9A8677", textTransform: "uppercase", letterSpacing: ".05em" }}>Onderwijstype</span>
            <PillGroup btns={v.pTypeBtns} />
          </div>
        )}
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9A8677" }}>{v.partnersCountLabel}</div>
      </div>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span style={th}>Partner</span>
          <span style={th}>Aanbiedingen</span>
          <span style={th}>In behandeling</span>
          <span style={th}>Goedgekeurd</span>
          <span style={th}>Afgewezen</span>
          <span style={th}>Acceptatiegraad</span>
        </div>
        {v.partnerRows.map((p, i) => (
          <div key={i} onClick={p.open} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #F6EDE3", cursor: "pointer" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#43362F" }}>{p.naam}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>{p.sub}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{p.aanb}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#8A2486", fontVariantNumeric: "tabular-nums" }}>{p.beh}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#66821B", fontVariantNumeric: "tabular-nums" }}>{p.goed}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#B23A2A", fontVariantNumeric: "tabular-nums" }}>{p.afg}</div>
            <div>
              {p.showBar && (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, height: 8, borderRadius: 999, background: "#F1E7DC", overflow: "hidden" }}>
                    {p.haaltDoel && <div style={{ height: "100%", borderRadius: 999, background: "#A6C939", width: `${p.accPct}%` }} />}
                    {p.mistDoel && <div style={{ height: "100%", borderRadius: 999, background: "#DC5A2B", width: `${p.accPct}%` }} />}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: "tabular-nums", minWidth: 38 }}>{p.accLabel}</span>
                </div>
              )}
              {p.noBar && <span style={{ fontSize: 13, fontWeight: 600, color: "#C9B5A3" }}>nog geen beoordelingen</span>}
            </div>
          </div>
        ))}
        {v.partnersEmpty && (
          <div style={{ padding: "46px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#43362F" }}>Nog geen aanbiedingen voor deze school</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9A8677", marginTop: 4 }}>Zodra partners kandidaten aanbieden verschijnen hier hun prestaties.</div>
          </div>
        )}
      </div>
    </div>
  );
}
