"use client";

import type { PortalVals } from "@/lib/use-portal";

const sectionLabel: React.CSSProperties = { fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "#9A8677", margin: "18px 0 8px" };

export default function CvModal({ v }: { v: PortalVals }) {
  return (
    <div onClick={v.closeCv} style={{ position: "fixed", inset: 0, zIndex: 75, background: "rgba(46,30,22,.42)", display: "flex", alignItems: "center", justifyContent: "center", animation: "dcFade .2s ease" }}>
      <div onClick={v.stopProp} style={{ width: 640, maxWidth: "92vw", maxHeight: "88vh", overflowY: "auto", background: "#FFFFFF", borderRadius: 18, padding: "28px 34px 26px", animation: "dcPop .25s cubic-bezier(.2,.8,.3,1)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 22, color: "#93278F", margin: 0 }}>{v.cvNaam}</h2>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#43362F", marginTop: 2 }}>{v.cvProfiel}</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#9A8677", marginTop: 2 }}>{v.cvMeta}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#C05020", marginTop: 4 }}>{v.cvVia}</div>
          </div>
          <button onClick={v.closeCv} className="hv-bg-tan" style={{ border: "none", cursor: "pointer", width: 34, height: 34, borderRadius: 999, background: "#F1E7DC", color: "#6E5B4E", fontSize: 17, fontWeight: 800, lineHeight: 1, fontFamily: "inherit", flex: "none" }}>✕</button>
        </div>
        <div style={{ ...sectionLabel, margin: "20px 0 8px" }}>Profiel</div>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: "#5C4B40", margin: 0 }}>{v.cvSamenvatting}</p>
        <div style={sectionLabel}>Werkervaring</div>
        {v.cvWerk.map((w, i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 9 }}>
            <div style={{ width: 110, flex: "none", fontSize: 12.5, fontWeight: 700, color: "#9A8677" }}>{w.periode}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#43362F" }}>{w.rol}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#9A8677" }}>{w.org}</div>
            </div>
          </div>
        ))}
        <div style={sectionLabel}>Opleiding</div>
        {v.cvOpleiding.map((w, i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 9 }}>
            <div style={{ width: 110, flex: "none", fontSize: 12.5, fontWeight: 700, color: "#9A8677" }}>{w.periode}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#43362F" }}>{w.titel}</div>
          </div>
        ))}
        <div style={sectionLabel}>Vaardigheden</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {v.cvVaard.map((w, i) => (
            <span key={i} style={{ display: "inline-flex", padding: "4px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, background: "#F4EDE5", color: "#5C4B40" }}>{w.label}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#B7A594", marginTop: 18 }}>Demo-cv — automatisch gegenereerd op basis van kandidaatgegevens</div>
      </div>
    </div>
  );
}
