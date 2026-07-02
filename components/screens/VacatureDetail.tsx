"use client";

import type { PortalVals } from "@/lib/use-portal";
import { Chip, PillGroup, th } from "../ui";

export default function VacatureDetail({ v }: { v: PortalVals }) {
  const grid = "minmax(150px,1.3fr) 56px 76px minmax(125px,1fr) 105px 60px minmax(225px,1.4fr)";
  const li: React.CSSProperties = { fontSize: 14, fontWeight: 600, color: "#5C4B40" };
  const liLabel: React.CSSProperties = { fontWeight: 800, color: "#43362F" };
  return (
    <div>
      <button onClick={v.closeDrawer} className="hv-underline" style={{ border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#DC5A2B", padding: 0, marginBottom: 16 }}>← Terug naar overzicht</button>
      <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.15, color: "#93278F", margin: 0 }}>{v.dvFunctie}</h1>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#8A7565", marginTop: 3 }}>{v.dvSchoolLine}</div>
      <button onClick={v.toggleDvDetails} className="hv-orange-full" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, cursor: "pointer", background: "#FFFFFF", border: "1.5px solid #E2D3C4", color: "#6E5B4E", fontFamily: "inherit", fontSize: 13, fontWeight: 800, borderRadius: 999, padding: "8px 16px" }}>{v.dvDetailsLabel}</button>
      {v.dvDetailsOpen && (
        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 14, padding: "16px 20px", marginTop: 12, maxWidth: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            {v.dvIsPO && <Chip bg="#F5E9F4" color="#8A2486">PO</Chip>}
            {v.dvIsVO && <Chip bg="#FCEDE4" color="#C05020">VO</Chip>}
            {v.dvIsOpen && <span style={{ display: "inline-flex", padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800, background: "#FFFFFF", border: "1.5px solid #DC5A2B", color: "#DC5A2B" }}>Open</span>}
            {v.dvIsGevuld && <Chip bg="#EFF4DC" color="#66821B">Gevuld</Chip>}
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 7 }}>
            <li style={li}><span style={liLabel}>FTE:</span> {v.dvFte}</li>
            <li style={li}><span style={liLabel}>Salarisschaal:</span> {v.dvSchaal}</li>
            <li style={li}><span style={liLabel}>Ingangsdatum:</span> {v.dvIngang}</li>
            <li style={li}><span style={liLabel}>Geplaatst door:</span> {v.dvGeplaatst}</li>
            <li style={li}><span style={liLabel}>Type onderwijs:</span> {v.dvConcept}</li>
            {v.dvShowReden && <li style={li}><span style={liLabel}>Reden:</span> {v.dvReden}</li>}
            {v.dvShowPeriode && <li style={li}><span style={liLabel}>Periode:</span> {v.dvPeriode}</li>}
            {v.dvShowDagen && <li style={li}><span style={liLabel}>Werkdagen:</span> {v.dvDagen}</li>}
            {v.dvShowGroep && <li style={li}><span style={liLabel}>Leerlinggroep:</span> {v.dvGroep}</li>}
            {v.dvShowVereist && <li style={li}><span style={liLabel}>Vereist:</span> {v.dvVereist}</li>}
            {v.dvShowPre && <li style={li}><span style={liLabel}>Pre:</span> {v.dvPre}</li>}
            {v.dvShowSluit && <li style={li}><span style={liLabel}>Sluitdatum:</span> {v.dvSluit}</li>}
            {v.dvShowExtra && <li style={{ ...li, lineHeight: 1.5 }}><span style={liLabel}>Extra aandachtspunt(en):</span> {v.dvExtra}</li>}
            {v.dvShowOms && <li style={{ ...li, lineHeight: 1.5 }}><span style={liLabel}>Omschrijving:</span> {v.dvOmschrijving}</li>}
          </ul>
        </div>
      )}
      {v.dvShowBanner && (
        <div style={{ marginTop: 16, background: "#EFF4DC", border: "1px solid #D6E3A8", borderRadius: 12, padding: "12px 16px", fontSize: 13.5, fontWeight: 800, color: "#5F7A16", maxWidth: 860 }}>✓ {v.dvBanner}</div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 0 12px" }}>
        <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 18, color: "#43362F", margin: 0 }}>{v.dvOffersTitle} <span style={{ color: "#9A8677", fontWeight: 600 }}>({v.dvOffersCount})</span></h3>
        <PillGroup btns={v.dvKandBtns} btnPad="5px 13px" fontSize={12} />
      </div>
      <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "11px 20px", background: "#FBF6F0", borderBottom: "1px solid #F3E9DE" }}>
          <span style={th}>Kandidaat</span>
          <span style={th}>FTE</span>
          <span style={th}>Ervaring</span>
          <span style={th}>Partner</span>
          <span style={th}>Aangeboden op</span>
          <span style={th}>CV</span>
          <span style={th}>Status / actie</span>
        </div>
        {v.dvOffers.map((o, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: grid, gap: 14, alignItems: "center", padding: "13px 20px", borderTop: "1px solid #F6EDE3", background: "#FFFFFF" }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#43362F" }}>{o.kandNaam}</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{o.fte}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#6E5B4E" }}>{o.ervaring}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#43362F" }}>{o.partnerNaam}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#6E5B4E" }}>{o.datum}</div>
            <div>
              <button onClick={o.cv} className="hv-orange-full" style={{ cursor: "pointer", background: "#FFFFFF", border: "1.5px solid #E2D3C4", color: "#6E5B4E", fontFamily: "inherit", fontSize: 12, fontWeight: 800, borderRadius: 999, padding: "6px 12px" }}>CV</button>
            </div>
            <div>
              {o.canReview && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={o.approve} className="hv-bg-green-dark" style={{ border: "none", cursor: "pointer", background: "#77951F", color: "#FFFFFF", fontFamily: "inherit", fontSize: 12.5, fontWeight: 800, borderRadius: 999, padding: "7px 14px" }}>✓ Goedkeuren</button>
                  <button onClick={o.reject} className="hv-bg-red-light" style={{ cursor: "pointer", background: "#FFFFFF", border: "1.5px solid #EAD6CC", color: "#B23A2A", fontFamily: "inherit", fontSize: 12.5, fontWeight: 800, borderRadius: 999, padding: "7px 14px" }}>✕ Afwijzen</button>
                </div>
              )}
              {o.showStatusChip && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
                  {o.isBeh && <Chip bg="#F5E9F4" color="#8A2486">In behandeling</Chip>}
                  {o.isGoed && <Chip bg="#EFF4DC" color="#66821B">Goedgekeurd</Chip>}
                  {o.isAfg && <Chip bg="#F9E9E5" color="#B23A2A">Afgewezen</Chip>}
                  {o.showBesluit && <span style={{ fontSize: 11, fontWeight: 600, color: "#9A8677" }}>{o.besluitLine}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
        {v.dvNoOffers && (
          <div style={{ padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9A8677", fontStyle: "italic" }}>Geen kandidaten in deze weergave.</div>
          </div>
        )}
      </div>
      {v.showOtherOffers && (
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#9A8677", marginTop: 10 }}>+ {v.otherOffersLabel}</div>
      )}
      {v.showOfferForm && (
        <div style={{ background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 16, padding: "20px 22px", marginTop: 16, maxWidth: 720 }}>
          <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 700, fontSize: 17, color: "#43362F", margin: "0 0 4px" }}>Kandidaat aanbieden</h3>
          {v.hasAvailable && (
            <>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#9A8677", marginBottom: 10 }}>Kies een beschikbare kandidaat uit je pool:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {v.offerCandidates.map((c, i) => (
                  c.selected ? (
                    <button key={i} onClick={c.pick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, textAlign: "left", cursor: "pointer", fontFamily: "inherit", background: "#FDF1EA", border: "1.5px solid #DC5A2B", borderRadius: 12, padding: "11px 14px" }}>
                      <span><span style={{ display: "block", fontSize: 14, fontWeight: 800, color: "#43362F" }}>{c.naam}</span><span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>{c.sub}</span></span>
                      <span style={{ color: "#DC5A2B", fontSize: 16, fontWeight: 800 }}>●</span>
                    </button>
                  ) : (
                    <button key={i} onClick={c.pick} className="hv-border-orange" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, textAlign: "left", cursor: "pointer", fontFamily: "inherit", background: "#FFFFFF", border: "1.5px solid #E8DCCE", borderRadius: 12, padding: "11px 14px" }}>
                      <span><span style={{ display: "block", fontSize: 14, fontWeight: 800, color: "#43362F" }}>{c.naam}</span><span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>{c.sub}</span></span>
                      <span style={{ color: "#E2D3C4", fontSize: 16, fontWeight: 800 }}>○</span>
                    </button>
                  )
                ))}
              </div>
              <textarea value={v.offerNote} onChange={v.onOfferNote} rows={2} placeholder="Korte motivatie (optioneel)" className="fc-border-orange" style={{ width: "100%", marginTop: 12, fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 12, padding: "10px 14px", resize: "vertical" }} />
              {v.canSubmitOffer && (
                <button onClick={v.submitOffer} className="hv-bg-orange-dark" style={{ marginTop: 12, border: "none", cursor: "pointer", background: "#DC5A2B", color: "#FFFFFF", fontFamily: "inherit", fontSize: 14, fontWeight: 800, borderRadius: 999, padding: "11px 22px" }}>Kandidaat aanbieden</button>
              )}
              {v.offerHint && (
                <div style={{ marginTop: 12, fontSize: 12.5, fontWeight: 700, color: "#B7A594" }}>Selecteer eerst een kandidaat.</div>
              )}
            </>
          )}
          {v.noAvailable && (
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#9A8677", fontStyle: "italic", marginTop: 6 }}>Geen beschikbare kandidaten in je pool voor deze vacature.</div>
          )}
        </div>
      )}
    </div>
  );
}
