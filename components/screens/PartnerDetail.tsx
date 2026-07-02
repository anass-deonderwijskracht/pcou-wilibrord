"use client";

import type { PortalVals } from "@/lib/use-portal";
import { KandStatusChip, OfferStatusChip, th } from "../ui";

function StatCard({ label, value, valueColor, sub }: { label: string; value: string; valueColor: string; sub: string }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "14px 18px 12px" }}>
      <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "#9A8677" }}>{label}</div>
      <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.2, color: valueColor }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#9A8677" }}>{sub}</div>
    </div>
  );
}

export default function PartnerDetail({ v }: { v: PortalVals }) {
  const offerGrid = "minmax(150px,1.1fr) minmax(200px,1.7fr) 110px 130px 18px";
  const poolGrid = "minmax(200px,1.7fr) 64px 84px 130px 90px";
  return (
    <div>
      <button onClick={v.ppBack} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: 0, marginBottom: 16 }}>← Terug naar overzicht</button>
      <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>{v.ppNaam}</h1>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#8A7565", marginTop: 3 }}>{v.ppContact}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginTop: 20 }}>
        <StatCard label="Aanbiedingen" value={v.ppAanb} valueColor="#93278F" sub={v.ppPoVo} />
        <StatCard label="In behandeling" value={v.ppBeh} valueColor="#8A2486" sub="wacht op beoordeling" />
        <StatCard label="Goedgekeurd" value={v.ppGoed} valueColor="#66821B" sub="plaatsingen" />
        <StatCard label="Afgewezen" value={v.ppAfg} valueColor="#B23A2A" sub="niet geselecteerd" />
        <StatCard label="Acceptatiegraad" value={v.ppAcc} valueColor="#93278F" sub="van beoordeelde kandidaten" />
      </div>
      <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 18, color: "#43362F", margin: "26px 0 12px" }}>Aanbiedingen <span style={{ color: "#9A8677", fontWeight: 600 }}>({v.ppOfferCount})</span></h3>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: offerGrid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span style={th}>Kandidaat</span>
          <span style={th}>Vacature</span>
          <span style={th}>Aangeboden op</span>
          <span style={th}>Status</span>
          <span />
        </div>
        {v.ppOfferRows.map((o, i) => (
          <div key={i} onClick={o.open} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: offerGrid, gap: 14, alignItems: "center", padding: "13px 20px", borderTop: "1px solid #F6EDE3", cursor: "pointer" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#43362F" }}>{o.kandNaam}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#43362F" }}>{o.functie}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#9A8677" }}>{o.schoolLine}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#6E5B4E" }}>{o.datum}</div>
            <div>
              <OfferStatusChip isBeh={o.isBeh} isGoed={o.isGoed} isAfg={o.isAfg} />
            </div>
            <span style={{ color: "#C9B5A3", fontSize: 18, fontWeight: 800 }}>›</span>
          </div>
        ))}
        {v.ppNoOffers && (
          <div style={{ padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9A8677", fontStyle: "italic" }}>Nog geen aanbiedingen binnen deze weergave.</div>
          </div>
        )}
      </div>
      <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 18, color: "#43362F", margin: "26px 0 12px" }}>Kandidatenpool <span style={{ color: "#9A8677", fontWeight: 600 }}>({v.ppPoolCount})</span></h3>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: poolGrid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span style={th}>Kandidaat</span>
          <span style={th}>FTE</span>
          <span style={th}>Ervaring</span>
          <span style={th}>Status</span>
          <span style={th}>CV</span>
        </div>
        {v.ppKandRows.map((k, i) => (
          <div key={i} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: poolGrid, gap: 14, alignItems: "center", padding: "12px 20px", borderTop: "1px solid #F6EDE3" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#43362F" }}>{k.naam}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#9A8677" }}>{k.profiel}</div>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{k.fte}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#6E5B4E" }}>{k.ervaring}</div>
            <div>
              <KandStatusChip isBeschikbaar={k.isBeschikbaar} isAangeboden={k.isAangeboden} isGeplaatst={k.isGeplaatst} />
            </div>
            <div>
              <button onClick={k.cv} className="hv-orange-full" style={{ cursor: "pointer", background: "#FFFFFF", border: "1.5px solid #E2D3C4", color: "#6E5B4E", fontFamily: "inherit", fontSize: 12, fontWeight: 800, borderRadius: 999, padding: "6px 12px" }}>CV</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
