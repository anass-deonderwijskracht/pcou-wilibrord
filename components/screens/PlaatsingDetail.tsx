"use client";

import type { PortalVals } from "@/lib/use-portal";
import { Chip, PoVoChip } from "../ui";

export default function PlaatsingDetail({ v }: { v: PortalVals }) {
  const stepLabel: React.CSSProperties = { fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "#9A8677", marginTop: 9 };
  const stepValue: React.CSSProperties = { fontSize: 15, fontWeight: 800, color: "#43362F", marginTop: 2 };
  const stepSub: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#9A8677", marginTop: 1 };
  const cardLabel: React.CSSProperties = { fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "#9A8677" };
  const cardTitle: React.CSSProperties = { fontSize: 16, fontWeight: 800, color: "#43362F", marginTop: 6 };
  const cardSub: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "#8A7565", marginTop: 2 };
  const cardLink: React.CSSProperties = { border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: 0, marginTop: 10 };
  return (
    <div>
      <button onClick={v.pdBack} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: 0, marginBottom: 16 }}>← Terug naar overzicht</button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <PoVoChip isPO={v.pdIsPO} isVO={v.pdIsVO} />
        <Chip bg="#EFF4DC" color="#66821B">Plaatsing</Chip>
      </div>
      <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>{v.pdKandNaam}</h1>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#8A7565", marginTop: 3 }}>{v.pdFunctie} · {v.pdSchoolNaam}</div>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "24px 32px 22px", marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: 170 }}>
            <span style={{ width: 14, height: 14, borderRadius: 999, background: "#93278F", border: "4px solid #F5E9F4" }} />
            <div style={stepLabel}>Aangeboden</div>
            <div style={stepValue}>{v.pdAangeb}</div>
            <div style={stepSub}>door {v.pdPartnerNaam}</div>
          </div>
          <div style={{ flex: 1, height: 3, borderRadius: 999, background: "#EDE1D5", marginTop: 10 }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: 170 }}>
            <span style={{ width: 14, height: 14, borderRadius: 999, background: "#A6C939", border: "4px solid #EFF4DC" }} />
            <div style={stepLabel}>Goedgekeurd</div>
            <div style={stepValue}>{v.pdGoedOp}</div>
            <div style={stepSub}>door {v.pdGoedDoor}</div>
          </div>
          <div style={{ flex: 1, height: 3, borderRadius: 999, background: "#EDE1D5", marginTop: 10 }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: 170 }}>
            <span style={{ width: 14, height: 14, borderRadius: 999, background: "#DC5A2B", border: "4px solid #FCEDE4" }} />
            <div style={stepLabel}>In dienst per</div>
            <div style={stepValue}>{v.pdIngang}</div>
            <div style={stepSub}>bij {v.pdSchoolNaam}</div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={cardLabel}>Kandidaat</div>
            <div style={cardTitle}>{v.pdKandNaam}</div>
            <div style={cardSub}>{v.pdProfiel} · {v.pdFteErv}</div>
          </div>
          <button onClick={v.pdCv} className="hv-bg-orange-dark" style={{ border: "none", cursor: "pointer", background: "#DC5A2B", color: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 800, borderRadius: 999, padding: "9px 18px", flex: "none" }}>Bekijk CV</button>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "16px 20px" }}>
          <div style={cardLabel}>Vacature</div>
          <div style={cardTitle}>{v.pdFunctie}</div>
          <div style={cardSub}>{v.pdFuncMeta}</div>
          <button onClick={v.pdGotoVac} className="hv-underline" style={cardLink}>Bekijk vacature →</button>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "16px 20px" }}>
          <div style={cardLabel}>Partner</div>
          <div style={cardTitle}>{v.pdPartnerNaam}</div>
          <div style={cardSub}>{v.pdPartnerContact}</div>
          <button onClick={v.pdGotoPartner} className="hv-underline" style={cardLink}>Partnerprofiel →</button>
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "16px 20px" }}>
          <div style={cardLabel}>School</div>
          <div style={cardTitle}>{v.pdSchoolNaam}</div>
          <div style={cardSub}>{v.pdDirecteur}</div>
          <button onClick={v.pdGotoSchool} className="hv-underline" style={cardLink}>Schoolpagina →</button>
        </div>
      </div>
    </div>
  );
}
