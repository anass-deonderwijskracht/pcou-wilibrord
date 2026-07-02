"use client";

import type { PortalVals } from "@/lib/use-portal";
import { CalPanel, DdOptions } from "../ui";

const fieldLabel: React.CSSProperties = { fontSize: 12.5, fontWeight: 800, color: "#6E5B4E", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 12, padding: "10px 14px" };
const ddButton: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, width: "100%", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 12, padding: "10px 14px", textAlign: "left" };

export default function NieuweVacatureModal({ v }: { v: PortalVals }) {
  return (
    <div onClick={v.closeModal} style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(46,30,22,.42)", display: "flex", alignItems: "center", justifyContent: "center", animation: "dcFade .2s ease" }}>
      <div onClick={v.stopProp} style={{ width: 620, maxWidth: "92vw", maxHeight: "90vh", overflowY: "auto", background: "#FFFFFF", borderRadius: 18, padding: "26px 32px 28px", animation: "dcPop .25s cubic-bezier(.2,.8,.3,1)" }}>
        <h2 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 24, color: "#93278F", margin: "0 0 2px" }}>Nieuwe vacature</h2>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#8A7565" }}>{v.modalSub}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Titel *</div>
            <input value={v.nvFunctie} onChange={v.onNvFunctie} placeholder="Bijv. Leerkracht groep 6" className="fc-border-orange" style={inputStyle} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>School *</div>
            {v.isHRModal && (
              <div style={{ position: "relative" }}>
                <button onClick={v.toggleNvSchoolDd} className="hv-border-orange" style={ddButton}><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.nvSchoolLabel}</span><span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
                {v.nvSchoolDdOpen && (
                  <>
                    <div onClick={v.closeDd} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
                    <div style={{ position: "absolute", left: 0, top: "calc(100% + 6px)", zIndex: 80, width: "100%", background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 12, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 8, maxHeight: 300, display: "flex", flexDirection: "column" }}>
                      <input value={v.ddQuery} onChange={v.onDdQuery} placeholder="Zoek school…" className="fc-border-orange" style={{ fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "#43362F", background: "#FAF5EF", border: "1.5px solid #EDE1D5", borderRadius: 8, padding: "7px 10px", marginBottom: 6 }} />
                      <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                        <DdOptions options={v.nvSchoolOpts} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            {v.isDirModal && (
              <div style={{ width: "100%", fontSize: 14, fontWeight: 800, color: "#43362F", background: "#FAF5EF", border: "1.5px solid #EDE1D5", borderRadius: 12, padding: "10px 14px" }}>{v.dirSchoolNaam}</div>
            )}
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Reden</div>
            <input value={v.nvReden} onChange={v.onNvReden} placeholder="Bijv. zwangerschapsverlof" className="fc-border-orange" style={inputStyle} />
          </div>
          <div>
            <div style={fieldLabel}>Periode — begindatum</div>
            <div style={{ position: "relative" }}>
              <button onClick={v.toggleNvBeginCal} className="hv-border-orange" style={ddButton}>{v.nvBeginLabel}<span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
              {v.calNvBeginOpen && (
                <CalPanel closeDd={v.closeDd} calPrev={v.calPrev} calNext={v.calNext} calTitle={v.calTitle} calDays={v.calDays} panelPos={{ left: 0, top: "calc(100% + 6px)" }} />
              )}
            </div>
          </div>
          <div>
            <div style={fieldLabel}>Periode — einddatum</div>
            <div style={{ position: "relative" }}>
              <button onClick={v.toggleNvEindCal} className="hv-border-orange" style={ddButton}>{v.nvEindLabel}<span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
              {v.calNvEindOpen && (
                <CalPanel closeDd={v.closeDd} calPrev={v.calPrev} calNext={v.calNext} calTitle={v.calTitle} calDays={v.calDays} panelPos={{ right: 0, top: "calc(100% + 6px)" }} />
              )}
            </div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 800, color: "#6E5B4E" }}>Werkdagen</span>
              <button onClick={v.toggleAlleDagen} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 800, color: "#DC5A2B", padding: 0 }}>{v.alleDagenLabel}</button>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {v.dagChips.map((d, i) => (
                d.active ? (
                  <button key={i} onClick={d.toggle} style={{ border: "1.5px solid #DC5A2B", cursor: "pointer", background: "#FDF1EA", color: "#C05020", fontFamily: "inherit", fontSize: 13, fontWeight: 800, borderRadius: 999, padding: "8px 18px" }}>{d.label}</button>
                ) : (
                  <button key={i} onClick={d.toggle} className="hv-border-orange" style={{ border: "1.5px solid #E2D3C4", cursor: "pointer", background: "#FFFFFF", color: "#6E5B4E", fontFamily: "inherit", fontSize: 13, fontWeight: 800, borderRadius: 999, padding: "8px 18px" }}>{d.label}</button>
                )
              ))}
            </div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Vereist</div>
            <input value={v.nvVereist} onChange={v.onNvVereist} placeholder="Bijv. tweedegraads bevoegdheid" className="fc-border-orange" style={inputStyle} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Pre</div>
            <input value={v.nvPre} onChange={v.onNvPre} placeholder="Bijv. ervaring met EDI" className="fc-border-orange" style={inputStyle} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Leerlinggroep</div>
            <input value={v.nvGroep} onChange={v.onNvGroep} placeholder="Bijv. groep 5 of havo bovenbouw" className="fc-border-orange" style={inputStyle} />
          </div>
          <div>
            <div style={fieldLabel}>FTE</div>
            <div style={{ position: "relative" }}>
              <button onClick={v.toggleNvFteDd} className="hv-border-orange" style={ddButton}>{v.nvFte}<span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
              {v.nvFteDdOpen && (
                <>
                  <div onClick={v.closeDd} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
                  <div style={{ position: "absolute", left: 0, top: "calc(100% + 6px)", zIndex: 80, width: "100%", background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 12, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 8, display: "flex", flexDirection: "column", gap: 2 }}>
                    <DdOptions options={v.nvFteOpts} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <div style={fieldLabel}>Salarisschaal</div>
            <div style={{ position: "relative" }}>
              <button onClick={v.toggleNvSchaalDd} className="hv-border-orange" style={ddButton}>{v.nvSchaal}<span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
              {v.nvSchaalDdOpen && (
                <>
                  <div onClick={v.closeDd} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
                  <div style={{ position: "absolute", left: 0, top: "calc(100% + 6px)", zIndex: 80, width: "100%", background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 12, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 8, maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                    <DdOptions options={v.nvSchaalOpts} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Extra aandachtspunt(en)</div>
            <textarea value={v.nvExtra} onChange={v.onNvExtra} rows={3} placeholder="Bijv. duobaan bespreekbaar, start met inwerkweek" className="fc-border-orange" style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div>
            <div style={fieldLabel}>Sluitdatum</div>
            <div style={{ position: "relative" }}>
              <button onClick={v.toggleNvSluitCal} className="hv-border-orange" style={ddButton}>{v.nvSluitLabel}<span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
              {v.calNvSluitOpen && (
                <CalPanel closeDd={v.closeDd} calPrev={v.calPrev} calNext={v.calNext} calTitle={v.calTitle} calDays={v.calDays} panelPos={{ left: 0, bottom: "calc(100% + 6px)" }} />
              )}
            </div>
          </div>
          <div>
            <div style={fieldLabel}>Sluittijd</div>
            <div style={{ position: "relative" }}>
              <button onClick={v.toggleNvTijdDd} className="hv-border-orange" style={ddButton}>{v.nvSluitTijd} uur<span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
              {v.nvTijdDdOpen && (
                <>
                  <div onClick={v.closeDd} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
                  <div style={{ position: "absolute", left: 0, bottom: "calc(100% + 6px)", zIndex: 80, width: "100%", background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 12, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 8, maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                    <DdOptions options={v.nvTijdOpts} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={fieldLabel}>Type onderwijs</div>
            <div style={{ width: "100%", fontSize: 14, fontWeight: 800, color: "#43362F", background: "#FAF5EF", border: "1.5px solid #EDE1D5", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}><span>{v.modalConcept}</span><span style={{ fontSize: 11, fontWeight: 700, color: "#B7A594" }}>automatisch o.b.v. schooldata</span></div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button onClick={v.closeModal} className="hv-bg-cream" style={{ cursor: "pointer", background: "transparent", border: "1.5px solid #E2D3C4", color: "#6E5B4E", fontFamily: "inherit", fontSize: 14, fontWeight: 800, borderRadius: 999, padding: "10px 20px" }}>Annuleren</button>
          {v.canSubmitVac && (
            <button onClick={v.submitVac} className="hv-bg-orange-dark" style={{ border: "none", cursor: "pointer", background: "#DC5A2B", color: "#FFFFFF", fontFamily: "inherit", fontSize: 14, fontWeight: 800, borderRadius: 999, padding: "10px 22px" }}>Vacature plaatsen</button>
          )}
          {v.cannotSubmitVac && (
            <div style={{ background: "#F1E7DC", color: "#B7A594", fontSize: 14, fontWeight: 800, borderRadius: 999, padding: "10px 22px" }}>Vacature plaatsen</div>
          )}
        </div>
      </div>
    </div>
  );
}
