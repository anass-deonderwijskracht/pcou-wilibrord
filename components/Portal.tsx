"use client";

import { usePortal, type PortalVals } from "@/lib/use-portal";
import { DdOptions } from "./ui";
import Dashboard from "./screens/Dashboard";
import Vacatures from "./screens/Vacatures";
import Plaatsingen from "./screens/Plaatsingen";
import Scholen from "./screens/Scholen";
import PartnersTab from "./screens/PartnersTab";
import Kandidaten from "./screens/Kandidaten";
import VacatureDetail from "./screens/VacatureDetail";
import PlaatsingDetail from "./screens/PlaatsingDetail";
import PartnerDetail from "./screens/PartnerDetail";
import SchoolDetail from "./screens/SchoolDetail";
import NieuweVacatureModal from "./screens/NieuweVacatureModal";
import CvModal from "./screens/CvModal";

export default function Portal() {
  const v = usePortal();
  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "'Archivo',system-ui,sans-serif", color: "#43362F", background: "#F8F3ED", WebkitFontSmoothing: "antialiased" }}>
      {v.loggedOut && <Login v={v} />}
      {v.loggedIn && (
        <>
          <Header v={v} />
          {v.navTop && <TopTabs v={v} />}
          <div style={{ flex: 1, display: "flex", alignItems: "stretch", overflow: "hidden", minHeight: 0 }}>
            {v.navSide && <Sidebar v={v} />}
            <div style={{ flex: 1, overflowY: "auto", scrollbarGutter: "stable" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "26px 32px 64px" }}>
                {v.drawerOpen && <VacatureDetail v={v} />}
                {v.pdShow && <PlaatsingDetail v={v} />}
                {v.ppShow && <PartnerDetail v={v} />}
                {v.sdShow && <SchoolDetail v={v} />}
                {v.tabDashboard && <Dashboard v={v} />}
                {v.tabVacatures && <Vacatures v={v} />}
                {v.tabPlaatsingen && <Plaatsingen v={v} />}
                {v.tabScholen && <Scholen v={v} />}
                {v.tabPartners && <PartnersTab v={v} />}
                {v.tabKandidaten && <Kandidaten v={v} />}
              </div>
            </div>
          </div>
          {v.modalOpen && <NieuweVacatureModal v={v} />}
          {v.cvOpen && <CvModal v={v} />}
          {v.navTop && (
            <button onClick={v.logout} className="hv-bg-cream" style={{ position: "fixed", left: 18, bottom: 18, zIndex: 85, cursor: "pointer", background: "#FFFFFF", border: "1.5px solid #E2D3C4", color: "#6E5B4E", fontFamily: "inherit", fontSize: 13, fontWeight: 800, borderRadius: 999, padding: "9px 16px", boxShadow: "0 4px 14px rgba(67,54,47,.10)" }}>← Uitloggen</button>
          )}
          {v.toastVisible && (
            <div style={{ position: "fixed", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 90, background: "#3A2B22", color: "#FFFFFF", borderRadius: 999, padding: "12px 24px", fontSize: 14, fontWeight: 800, boxShadow: "0 8px 24px rgba(46,30,22,.28)", animation: "dcToast .25s cubic-bezier(.2,.8,.3,1)" }}>{v.toastMsg}</div>
          )}
        </>
      )}
    </div>
  );
}

function Login({ v }: { v: PortalVals }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", minHeight: 0, display: "flex", padding: "40px 20px" }}>
      <div style={{ margin: "auto", width: 500, maxWidth: "94vw", background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 20, padding: "36px 40px", boxShadow: "0 24px 60px rgba(67,54,47,.10)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo.png" alt="PCOU Willibrord" style={{ height: 52, display: "block", marginBottom: 20 }} />
        <h1 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 26, color: "#93278F", margin: "0 0 2px" }}>Vacatureportaal</h1>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#8A7565", marginBottom: 24 }}>Log in om verder te gaan</div>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: "#6E5B4E", marginBottom: 8 }}>Ik log in als</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {v.loginRoles.map((r, i) => (
            r.selected ? (
              <button key={i} onClick={r.pick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, textAlign: "left", cursor: "pointer", fontFamily: "inherit", background: "#FDF1EA", border: "1.5px solid #DC5A2B", borderRadius: 12, padding: "12px 15px" }}>
                <span><span style={{ display: "block", fontSize: 14.5, fontWeight: 800, color: "#43362F" }}>{r.label}</span><span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>{r.sub}</span></span>
                <span style={{ color: "#DC5A2B", fontSize: 16, fontWeight: 800 }}>●</span>
              </button>
            ) : (
              <button key={i} onClick={r.pick} className="hv-border-orange" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, textAlign: "left", cursor: "pointer", fontFamily: "inherit", background: "#FFFFFF", border: "1.5px solid #E8DCCE", borderRadius: 12, padding: "12px 15px" }}>
                <span><span style={{ display: "block", fontSize: 14.5, fontWeight: 800, color: "#43362F" }}>{r.label}</span><span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#9A8677", marginTop: 1 }}>{r.sub}</span></span>
                <span style={{ color: "#E2D3C4", fontSize: 16, fontWeight: 800 }}>○</span>
              </button>
            )
          ))}
        </div>
        {v.loginDirSel && (
          <>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#6E5B4E", margin: "16px 0 6px" }}>Jouw school</div>
            <div style={{ position: "relative" }}>
              <button onClick={v.toggleLoginSchoolDd} className="hv-border-orange" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, width: "100%", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 12, padding: "10px 14px", textAlign: "left" }}><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.loginSchoolLabel}</span><span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
              {v.loginSchoolDdOpen && (
                <>
                  <div onClick={v.closeDd} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
                  <div style={{ position: "absolute", left: 0, top: "calc(100% + 6px)", zIndex: 80, width: "100%", background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 12, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 8, maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                    <DdOptions options={v.loginSchoolOpts} />
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {v.loginPartnerSel && (
          <>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#6E5B4E", margin: "16px 0 6px" }}>Jouw organisatie</div>
            <div style={{ position: "relative" }}>
              <button onClick={v.toggleLoginPartnerDd} className="hv-border-orange" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, width: "100%", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 12, padding: "10px 14px", textAlign: "left" }}><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.loginPartnerLabel}</span><span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span></button>
              {v.loginPartnerDdOpen && (
                <>
                  <div onClick={v.closeDd} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
                  <div style={{ position: "absolute", left: 0, top: "calc(100% + 6px)", zIndex: 80, width: "100%", background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 12, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 8, maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                    <DdOptions options={v.loginPartnerOpts} />
                  </div>
                </>
              )}
            </div>
          </>
        )}
        <button onClick={v.doLogin} className="hv-bg-orange-dark" style={{ border: "none", cursor: "pointer", background: "#DC5A2B", color: "#FFFFFF", fontFamily: "inherit", fontSize: 15, fontWeight: 800, borderRadius: 999, padding: "13px 24px", width: "100%", marginTop: 22 }}>Inloggen →</button>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: "#B7A594", marginTop: 12, textAlign: "center" }}>Demo-omgeving</div>
      </div>
    </div>
  );
}

function Header({ v }: { v: PortalVals }) {
  return (
    <div style={{ background: "#FFFFFF", borderBottom: "1px solid #EFE3D8", display: "flex", alignItems: "center", gap: 16, padding: "0 28px", height: 76, flex: "none" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/logo.png" alt="PCOU Willibrord" style={{ height: 48, display: "block" }} />
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {v.isHR && (
          <div style={{ position: "relative" }}>
            <button onClick={v.togglePicker} className="hv-border-orange" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#43362F", background: "#FFFFFF", border: "1.5px solid #E2D3C4", borderRadius: 999, padding: "8px 14px", maxWidth: 260 }}>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.hrScopeLabel}</span>
              <span style={{ color: "#C9B5A3", fontSize: 10 }}>▼</span>
            </button>
            {v.pickerOpen && (
              <>
                <div onClick={v.closePicker} style={{ position: "fixed", inset: 0, zIndex: 78 }} />
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 80, width: 300, background: "#FFFFFF", border: "1px solid #EDE1D5", borderRadius: 14, boxShadow: "0 18px 44px rgba(67,54,47,.18)", padding: 10, maxHeight: 400, display: "flex", flexDirection: "column", animation: "dcPop .18s cubic-bezier(.2,.8,.3,1)" }}>
                  <input value={v.pickerQuery} onChange={v.onPickerQuery} placeholder="Zoek school…" className="fc-border-orange" style={{ fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "#43362F", background: "#FAF5EF", border: "1.5px solid #EDE1D5", borderRadius: 9, padding: "8px 12px", marginBottom: 8 }} />
                  <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    {v.pickerAlleSel && (
                      <button onClick={v.pickAlle} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, textAlign: "left", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 800, color: "#C05020", background: "#FCEDE4", borderRadius: 9, padding: "9px 11px" }}>Alle scholen<span>✓</span></button>
                    )}
                    {v.pickerAlleNot && (
                      <button onClick={v.pickAlle} className="hv-bg-cream" style={{ textAlign: "left", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "#43362F", background: "transparent", borderRadius: 9, padding: "9px 11px" }}>Alle scholen</button>
                    )}
                    <DdOptions options={v.pickerOptions} variant="picker" />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TopTabs({ v }: { v: PortalVals }) {
  return (
    <div style={{ background: "#FFFFFF", borderBottom: "1px solid #EFE3D8", display: "flex", gap: 8, padding: "0 28px", flex: "none" }}>
      {v.tabs.map((t, i) => (
        t.active ? (
          <button key={i} onClick={t.select} style={{ display: "flex", alignItems: "center", gap: 7, border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#DC5A2B", padding: "15px 12px 12px", borderBottom: "3px solid #DC5A2B" }}>{t.label}
            {t.showBadge && <span style={{ background: "#93278F", color: "#FFFFFF", fontSize: 11, fontWeight: 800, borderRadius: 999, padding: "1px 7px" }}>{t.badge}</span>}
          </button>
        ) : (
          <button key={i} onClick={t.select} className="hv-text-dark" style={{ display: "flex", alignItems: "center", gap: 7, border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#8A7565", padding: "15px 12px 12px", borderBottom: "3px solid transparent" }}>{t.label}
            {t.showBadge && <span style={{ background: "#93278F", color: "#FFFFFF", fontSize: 11, fontWeight: 800, borderRadius: 999, padding: "1px 7px" }}>{t.badge}</span>}
          </button>
        )
      ))}
    </div>
  );
}

function Sidebar({ v }: { v: PortalVals }) {
  return (
    <div style={{ width: 236, flex: "none", background: "#FFFFFF", borderRight: "1px solid #EFE3D8", padding: "16px 12px 14px", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {v.canPost && (
          <button onClick={v.openModal} className="hv-bg-orange-dark" style={{ border: "none", cursor: "pointer", background: "#DC5A2B", color: "#FFFFFF", fontFamily: "inherit", fontSize: 14, fontWeight: 800, borderRadius: 999, padding: "11px 16px", width: "100%", marginBottom: 10 }}>+ Vacature plaatsen</button>
        )}
        {v.tabs.map((t, i) => (
          t.active ? (
            <button key={i} onClick={t.select} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 800, color: "#C05020", background: "#FCEDE4", borderRadius: 10, padding: "11px 13px" }}>{t.label}<span style={{ flex: 1 }} />
              {t.showBadge && <span style={{ background: "#93278F", color: "#FFFFFF", fontSize: 11, fontWeight: 800, borderRadius: 999, padding: "1px 7px" }}>{t.badge}</span>}
            </button>
          ) : (
            <button key={i} onClick={t.select} className="hv-bg-cream" style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 800, color: "#6E5B4E", background: "transparent", borderRadius: 10, padding: "11px 13px" }}>{t.label}<span style={{ flex: 1 }} />
              {t.showBadge && <span style={{ background: "#93278F", color: "#FFFFFF", fontSize: 11, fontWeight: 800, borderRadius: 999, padding: "1px 7px" }}>{t.badge}</span>}
            </button>
          )
        ))}
      </div>
      <div style={{ borderTop: "1px solid #F0E4D8", margin: "10px 4px" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "4px 8px 10px" }}>
        <span style={{ width: 30, height: 30, borderRadius: 999, background: "#DC5A2B", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flex: "none" }}>{v.personaInitials}</span>
        <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: "#43362F", lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.personaNaam}</span>
        </span>
      </div>
      <button onClick={v.logout} className="hv-bg-cream" style={{ cursor: "pointer", background: "transparent", border: "1.5px solid #E2D3C4", color: "#6E5B4E", fontFamily: "inherit", fontSize: 13, fontWeight: 800, borderRadius: 999, padding: "9px 16px", width: "100%" }}>← Uitloggen</button>
    </div>
  );
}
