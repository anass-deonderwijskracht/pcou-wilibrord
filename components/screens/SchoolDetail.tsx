"use client";

import type { PortalVals } from "@/lib/use-portal";
import { PoVoChip, th } from "../ui";

function StatCard({ label, value, valueColor }: { label: string; value: string; valueColor: string }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "14px 18px 12px" }}>
      <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "#9A8677" }}>{label}</div>
      <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.2, color: valueColor }}>{value}</div>
    </div>
  );
}

export default function SchoolDetail({ v }: { v: PortalVals }) {
  const vacGrid = "14px minmax(200px,1.7fr) 70px 110px minmax(160px,1.2fr) 18px";
  const plGrid = "minmax(150px,1.2fr) minmax(170px,1.4fr) minmax(130px,1fr) 150px 18px";
  return (
    <div>
      <button onClick={v.sdBack} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: 0, marginBottom: 16 }}>← Terug naar overzicht</button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <PoVoChip isPO={v.sdIsPO} isVO={v.sdIsVO} />
      </div>
      <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>{v.sdNaam}</h1>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#8A7565", marginTop: 3 }}>{v.sdSub}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 20 }}>
        <StatCard label="Open vacatures" value={v.sdOpenN} valueColor="#DC5A2B" />
        <StatCard label="Te beoordelen" value={v.sdTbN} valueColor="#8A2486" />
        <StatCard label="Plaatsingen" value={v.sdPlN} valueColor="#66821B" />
        <StatCard label="Aanbiedingen" value={v.sdAanbN} valueColor="#93278F" />
      </div>
      <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 18, color: "#43362F", margin: "26px 0 12px" }}>Vacatures <span style={{ color: "#9A8677", fontWeight: 600 }}>({v.sdVacCount})</span></h3>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: vacGrid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span />
          <span style={th}>Vacature</span>
          <span style={th}>FTE</span>
          <span style={th}>Ingangsdatum</span>
          <span style={th}>Kandidaten</span>
          <span />
        </div>
        {v.sdVacRows.map((o, i) => (
          <div key={i} onClick={o.open} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: vacGrid, gap: 14, alignItems: "center", padding: "13px 20px", borderTop: "1px solid #F6EDE3", cursor: "pointer" }}>
            <div>
              {o.isOpen && <span title="Open" style={{ display: "block", width: 11, height: 11, borderRadius: 999, background: "#DC5A2B" }} />}
              {o.isGevuld && <span title="Gevuld" style={{ display: "block", width: 11, height: 11, borderRadius: 999, background: "#A6C939" }} />}
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#43362F" }}>{o.functie}</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{o.fte}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#6E5B4E" }}>{o.ingang}</div>
            <div>
              {o.showTb && <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: "#F5E9F4", color: "#8A2486" }}>{o.tbLabel}</span>}
              {o.showDash && <span style={{ fontSize: 13, fontWeight: 600, color: "#C9B5A3" }}>—</span>}
            </div>
            <span style={{ color: "#C9B5A3", fontSize: 18, fontWeight: 800 }}>›</span>
          </div>
        ))}
        {v.sdNoVacs && (
          <div style={{ padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9A8677", fontStyle: "italic" }}>Geen vacatures voor deze school.</div>
          </div>
        )}
      </div>
      <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 18, color: "#43362F", margin: "26px 0 12px" }}>Plaatsingen <span style={{ color: "#9A8677", fontWeight: 600 }}>({v.sdPlCount})</span></h3>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: plGrid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span style={th}>Kandidaat</span>
          <span style={th}>Vacature</span>
          <span style={th}>Partner</span>
          <span style={th}>Goedgekeurd</span>
          <span />
        </div>
        {v.sdPlRows.map((o, i) => (
          <div key={i} onClick={o.open} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: plGrid, gap: 14, alignItems: "center", padding: "13px 20px", borderTop: "1px solid #F6EDE3", cursor: "pointer" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#43362F" }}>{o.kandNaam}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#43362F" }}>{o.functie}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#43362F" }}>{o.partnerNaam}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#66821B" }}>✓ {o.goedOp}</div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>door {o.goedDoor}</div>
            </div>
            <span style={{ color: "#C9B5A3", fontSize: 18, fontWeight: 800 }}>›</span>
          </div>
        ))}
        {v.sdNoPl && (
          <div style={{ padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9A8677", fontStyle: "italic" }}>Nog geen plaatsingen voor deze school.</div>
          </div>
        )}
      </div>
    </div>
  );
}
