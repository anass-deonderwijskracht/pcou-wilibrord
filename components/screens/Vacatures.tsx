"use client";

import type { PortalVals } from "@/lib/use-portal";
import { DdOptions, PillGroup, PoVoChip, SearchInput, th } from "../ui";

export default function Vacatures({ v }: { v: PortalVals }) {
  const grid = "14px minmax(220px,1.8fr) 64px 80px 112px minmax(190px,1.4fr) minmax(150px,1.1fr) 18px";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginBottom: 20, minHeight: 44 }}>
        <div>
          <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>{v.pageTitle}</h1>
        </div>
        {v.canPost && (
          <button onClick={v.openModal} className="hv-bg-orange-dark" style={{ border: "none", cursor: "pointer", background: "#DC5A2B", color: "#FFFFFF", fontFamily: "inherit", fontSize: 14, fontWeight: 800, borderRadius: 999, padding: "11px 22px", flex: "none" }}>+ Vacature plaatsen</button>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, margin: "2px 0 12px", minHeight: 40 }}>
        <SearchInput value={v.search} onChange={v.onSearch} placeholder="Zoek op functie of school" width={210} />
        {v.showSchoolFilter && (
          <div style={{ position: "relative" }}>
            <button onClick={v.toggleFSchoolDd} className="hv-border-orange" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 999, padding: "8px 14px", maxWidth: 200 }}><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.fSchoolLabel}</span><span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
            {v.fSchoolDdOpen && (
              <>
                <div onClick={v.closeDd} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
                <div style={{ position: "absolute", left: 0, top: "calc(100% + 6px)", zIndex: 80, width: 290, background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 12, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 8, maxHeight: 320, display: "flex", flexDirection: "column" }}>
                  <input value={v.ddQuery} onChange={v.onDdQuery} placeholder="Zoek school…" className="fc-border-orange" style={{ fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "#43362F", background: "#FAF5EF", border: "1.5px solid #EDE1D5", borderRadius: 8, padding: "7px 10px", marginBottom: 6 }} />
                  <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <DdOptions options={v.fSchoolOpts} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#9A8677", textTransform: "uppercase", letterSpacing: ".05em" }}>Type</span>
          <PillGroup btns={v.typeBtns} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#9A8677", textTransform: "uppercase", letterSpacing: ".05em" }}>Status</span>
          <PillGroup btns={v.statusBtns} />
        </div>
        {v.filtersActive && (
          <button onClick={v.resetFilters} style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", textDecoration: "underline", padding: "6px 4px" }}>Wis filters</button>
        )}
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9A8677" }}>{v.resultLabel}</div>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span />
          <span style={th}>Vacature</span>
          <span style={th}>Type</span>
          <span style={th}>FTE</span>
          <span style={th}>Ingangsdatum</span>
          <span style={th}>Kandidaten</span>
          <span style={th}>Geplaatst door</span>
          <span />
        </div>
        {v.vacRows.map((r, i) => (
          <div key={i} onClick={r.open} className="hv-bg-row" style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #F6EDE3", cursor: "pointer" }}>
            <div>
              {r.isOpen && <span title="Open" style={{ display: "block", width: 11, height: 11, borderRadius: 999, background: "#DC5A2B" }} />}
              {r.isGevuld && <span title="Gevuld" style={{ display: "block", width: 11, height: 11, borderRadius: 999, background: "#A6C939" }} />}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#43362F" }}>{r.functie}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>{r.schoolLine}</div>
            </div>
            <div>
              <PoVoChip isPO={r.isPO} isVO={r.isVO} />
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.fte}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#6E5B4E" }}>{r.ingang}</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
              {r.showTeBeoordelen && <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: "#F5E9F4", color: "#8A2486" }}>{r.teBeoordelenLabel}</span>}
              {r.showMijn && <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: "#FCEDE4", color: "#C05020" }}>{r.mijnLabel}</span>}
              {r.showDash && <span style={{ fontSize: 13, fontWeight: 600, color: "#C9B5A3" }}>—</span>}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#43362F" }}>{r.doorNaam}</div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>{r.doorDatum}</div>
            </div>
            <span style={{ color: "#C9B5A3", fontSize: 18, fontWeight: 800 }}>›</span>
          </div>
        ))}
        {v.noResults && (
          <div style={{ padding: "46px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#43362F" }}>Geen vacatures gevonden</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9A8677", marginTop: 4 }}>Pas de filters aan of wis ze om alles te zien.</div>
          </div>
        )}
      </div>
    </div>
  );
}
