"use client";

import type { PortalVals } from "@/lib/use-portal";
import { CalPanel, PillGroup } from "../ui";

export default function Dashboard({ v }: { v: PortalVals }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20, minHeight: 44 }}>
        <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#9A8677", textTransform: "uppercase", letterSpacing: ".05em" }}>Periode</span>
          <div style={{ position: "relative" }}>
            <button onClick={v.toggleDashVanCal} className="hv-border-orange" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 999, padding: "8px 14px" }}>{v.dashVanLabel}<span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
            {v.calDashVanOpen && (
              <CalPanel closeDd={v.closeDd} calPrev={v.calPrev} calNext={v.calNext} calTitle={v.calTitle} calDays={v.calDays} panelPos={{ right: 0, top: "calc(100% + 6px)" }} />
            )}
          </div>
          <span style={{ color: "#9A8677", fontWeight: 700 }}>–</span>
          <div style={{ position: "relative" }}>
            <button onClick={v.toggleDashTotCal} className="hv-border-orange" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 999, padding: "8px 14px" }}>{v.dashTotLabel}<span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
            {v.calDashTotOpen && (
              <CalPanel closeDd={v.closeDd} calPrev={v.calPrev} calNext={v.calNext} calTitle={v.calTitle} calDays={v.calDays} panelPos={{ right: 0, top: "calc(100% + 6px)" }} />
            )}
          </div>
          {v.dashPeriodeActive && (
            <button onClick={v.resetDashPeriode} style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", textDecoration: "underline", padding: "4px 2px" }}>Wis</button>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {v.kpiCards.map((k, i) => (
          <div key={i} onClick={k.click} className="hv-border-orange" style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "16px 20px 14px", cursor: "pointer", transition: "border-color .15s" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "#9A8677" }}>{k.label}</div>
            <div style={{ position: "relative", display: "inline-block", padding: "2px 6px", margin: "2px 0 0 -6px" }}>
              {k.accent && (
                <svg viewBox="0 0 140 70" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: -12, top: -4, width: "calc(100% + 24px)", height: "calc(100% + 8px)", overflow: "visible", pointerEvents: "none" }}><ellipse cx="70" cy="35" rx="60" ry="26" fill="none" stroke="#A6C939" strokeWidth="5" strokeLinecap="round" transform="rotate(-4 70 35)" /></svg>
              )}
              <span style={{ position: "relative", fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 34, lineHeight: 1.1, color: "#93278F" }}>{k.value}</span>
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#9A8677" }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 16.5, color: "#43362F", margin: 0 }}>Vacaturestatus</h3>
            <button onClick={v.gotoVacatures} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: 0 }}>Alle vacatures →</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <div style={{ position: "relative", width: 150, height: 150, flex: "none" }}>
              <svg viewBox="0 0 140 140" width="150" height="150">
                <circle cx="70" cy="70" r="54" fill="none" stroke="#E7EEC9" strokeWidth="18" />
                <circle cx="70" cy="70" r="54" fill="none" stroke="#DC5A2B" strokeWidth="18" strokeDasharray={v.donutDash} transform="rotate(-90 70 70)" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1, color: "#93278F" }}>{v.donutTotal}</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "#9A8677", marginTop: 2 }}>vacatures</span>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: "#DC5A2B" }} />
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#6E5B4E" }}>Open</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 15, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{v.donutOpenN}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: "#A6C939" }} />
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#6E5B4E" }}>Gevuld</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 15, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{v.donutGevuldN}</span>
              </div>
              {v.showTypeSplit && (
                <>
                  <div style={{ borderTop: "1px solid #F0E4D8", margin: "4px 0" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 22, fontSize: 12, fontWeight: 800, color: "#8A2486" }}>PO</span>
                    <div style={{ flex: 1, height: 8, borderRadius: 999, background: "#F1E7DC", overflow: "hidden", display: "flex" }}>
                      <div style={{ height: "100%", background: "#DC5A2B", width: `${v.poOpenW}%` }} />
                      <div style={{ height: "100%", background: "#A6C939", width: `${v.poGevW}%` }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#9A8677", whiteSpace: "nowrap" }}>{v.poCounts}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 22, fontSize: 12, fontWeight: 800, color: "#C05020" }}>VO</span>
                    <div style={{ flex: 1, height: 8, borderRadius: 999, background: "#F1E7DC", overflow: "hidden", display: "flex" }}>
                      <div style={{ height: "100%", background: "#DC5A2B", width: `${v.voOpenW}%` }} />
                      <div style={{ height: "100%", background: "#A6C939", width: `${v.voGevW}%` }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#9A8677", whiteSpace: "nowrap" }}>{v.voCounts}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "20px 22px" }}>
          <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 16.5, color: "#43362F", margin: "0 0 16px" }}>{v.funnelTitle}</h3>
          <FunnelBar label="Totaal aanbiedingen" n={v.fTot} w={100} color="#5C4B40" />
          <FunnelBar label="In behandeling" n={v.fBehN} w={v.fBehW} color="#93278F" />
          <FunnelBar label="Goedgekeurd" n={v.fGoedN} w={v.fGoedW} color="#A6C939" />
          <FunnelBar label="Afgewezen" n={v.fAfgN} w={v.fAfgW} color="#C9503C" />
          <div style={{ marginTop: 14, fontSize: 13, fontWeight: 800 }}>
            {v.accOk && <span style={{ color: "#66821B" }}>✓ {v.accLineText}</span>}
            {v.accBad && <span style={{ color: "#C05020" }}>{v.accLineText}</span>}
            {v.accNone && <span style={{ color: "#9A8677" }}>Nog geen beoordelingen</span>}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 14, marginTop: 14 }}>
        {v.showPartnerChart && (
          <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 16.5, color: "#43362F", margin: 0, flex: 1 }}>Partnerprestaties</h3>
              {v.showPTypeToggle && (
                <PillGroup btns={v.pTypeBtns} wrapPad={2} btnPad="4px 11px" fontSize={11.5} />
              )}
              <button onClick={v.gotoPartnersTab} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: 0 }}>Details →</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: "#9A8677" }}><span style={{ width: 8, height: 8, borderRadius: 999, background: "#A6C939" }} />Goedgekeurd</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: "#9A8677" }}><span style={{ width: 8, height: 8, borderRadius: 999, background: "#93278F" }} />In behandeling</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: "#9A8677" }}><span style={{ width: 8, height: 8, borderRadius: 999, background: "#C9503C" }} />Afgewezen</span>
            </div>
            {v.pchartRows.map((p, i) => (
              <div key={i} onClick={v.gotoPartnersTab} className="hv-bg-row" style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 8px", borderRadius: 10, cursor: "pointer" }}>
                <span style={{ width: 158, fontSize: 13, fontWeight: 800, color: "#43362F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.naam}</span>
                <div style={{ flex: 1, height: 12, borderRadius: 999, background: "#F6EFE7", overflow: "hidden" }}>
                  <div style={{ height: "100%", display: "flex", borderRadius: 999, overflow: "hidden", width: `${p.barW}%` }}>
                    <div style={{ height: "100%", background: "#A6C939", width: `${p.goedW}%` }} />
                    <div style={{ height: "100%", background: "#93278F", width: `${p.behW}%` }} />
                    <div style={{ height: "100%", background: "#C9503C", width: `${p.afgW}%` }} />
                  </div>
                </div>
                <span style={{ width: 118, textAlign: "right", fontSize: 12, fontWeight: 700, color: "#9A8677", whiteSpace: "nowrap" }}>{p.meta}</span>
              </div>
            ))}
          </div>
        )}
        {v.showPoolCard && (
          <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 16.5, color: "#43362F", margin: 0 }}>Kandidatenpool</h3>
              <button onClick={v.gotoKandidaten} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: 0 }}>Naar pool →</button>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1, color: "#93278F" }}>{v.poolTotal}</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#9A8677" }}>kandidaten in je pool</span>
            </div>
            <div style={{ height: 14, borderRadius: 999, background: "#F6EFE7", overflow: "hidden", display: "flex", margin: "14px 0 16px" }}>
              <div style={{ height: "100%", background: "#D8C9B8", width: `${v.pbW}%` }} />
              <div style={{ height: "100%", background: "#93278F", width: `${v.paW}%` }} />
              <div style={{ height: "100%", background: "#A6C939", width: `${v.pgW}%` }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: "#D8C9B8" }} /><span style={{ fontSize: 13, fontWeight: 700, color: "#6E5B4E" }}>Beschikbaar</span><span style={{ flex: 1 }} /><span style={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{v.pbN}</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: "#93278F" }} /><span style={{ fontSize: 13, fontWeight: 700, color: "#6E5B4E" }}>Aangeboden</span><span style={{ flex: 1 }} /><span style={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{v.paN}</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: "#A6C939" }} /><span style={{ fontSize: 13, fontWeight: 700, color: "#6E5B4E" }}>Geplaatst</span><span style={{ flex: 1 }} /><span style={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{v.pgN}</span></div>
            </div>
          </div>
        )}

        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "20px 22px" }}>
          <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 16.5, color: "#43362F", margin: "0 0 12px" }}>{v.actieTitle}</h3>
          {v.actieEmpty && (
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#9A8677", fontStyle: "italic" }}>{v.actieEmptyText}</div>
          )}
          {v.actieRows.map((a, i) => (
            <div key={i} onClick={a.click} className="hv-border-orange" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid #F0E4D8", borderRadius: 12, marginBottom: 8, cursor: "pointer", background: "#FFFFFF" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#43362F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.t1}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#9A8677", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.t2}</div>
              </div>
              {a.chipPurple && <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: "#F5E9F4", color: "#8A2486", flex: "none" }}>{a.chipLabel}</span>}
              {a.chipOrange && <span style={{ display: "inline-flex", padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: "#FFFFFF", border: "1.5px solid #DC5A2B", color: "#DC5A2B", flex: "none" }}>{a.chipLabel}</span>}
              <span style={{ color: "#C9B5A3", fontSize: 18, fontWeight: 800 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FunnelBar({ label, n, w, color }: { label: string; n: string; w: number; color: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontSize: 12.5, fontWeight: 800, color: "#6E5B4E" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{n}</span>
      </div>
      <div style={{ height: 10, borderRadius: 999, background: "#F6EFE7", overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 999, background: color, width: `${w}%` }} />
      </div>
    </div>
  );
}
