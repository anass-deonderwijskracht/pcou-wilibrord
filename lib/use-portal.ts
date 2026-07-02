"use client";

import { useRef, useState } from "react";
import type { Aanbieding, Kandidaat, NieuweVacature, Partner, Rol, School, SchoolType, Vacature } from "./types";
import {
  buildCv, conceptOf, dirNaam, fmtDatum, hrNaam, kandidaten, nvLeeg, offerData,
  parseDatum, parseIso, partnerContacts, partnerEmails, partners, scholen, vacData, vacExtraData,
} from "./data";

// Demo-props uit het origineel (data-props)
const START_ROL: Rol = "hr";
const ACCEPTATIEGRAAD_DOEL = 60;

export interface PortalState {
  loggedIn: boolean;
  loginRole: Rol | null;
  role: Rol | null;
  nav: "side" | "top";
  tab: string;
  dvDetailsOpen: boolean;
  dvKandFilter: "alle" | "open";
  hrScope: string;
  pickerOpen: boolean;
  pickerQuery: string;
  pType: "alle" | SchoolType;
  dashVan: string;
  dashTot: string;
  ddOpen: string | null;
  ddQuery: string;
  calY: number;
  calM: number;
  dirSchoolId: string;
  partnerId: string;
  search: string;
  fSchool: string;
  fType: "alle" | SchoolType;
  fStatus: "alle" | "open" | "gevuld";
  drawerVacId: string | null;
  detailPlaatsingId: string | null;
  detailPartnerId: string | null;
  detailSchoolId: string | null;
  cvKandId: string | null;
  modalOpen: boolean;
  nv: NieuweVacature;
  offerSel: string | null;
  offerNote: string;
  toast: string | null;
  vacatures: Vacature[];
  aanbiedingen: Aanbieding[];
}

const initialState: PortalState = {
  loggedIn: false,
  loginRole: null,
  role: null,
  nav: "side",
  tab: "dashboard",
  dvDetailsOpen: false,
  dvKandFilter: "open",
  hrScope: "alle",
  pickerOpen: false,
  pickerQuery: "",
  pType: "alle",
  dashVan: "",
  dashTot: "",
  ddOpen: null,
  ddQuery: "",
  calY: 2026,
  calM: 6,
  dirSchoolId: "s3",
  partnerId: "p1",
  search: "",
  fSchool: "alle",
  fType: "alle",
  fStatus: "open",
  drawerVacId: null,
  detailPlaatsingId: null,
  detailPartnerId: null,
  detailSchoolId: null,
  cvKandId: null,
  modalOpen: false,
  nv: nvLeeg(),
  offerSel: null,
  offerNote: "",
  toast: null,
  vacatures: vacData.map((v) => ({ ...v, ...(vacExtraData[v.id] || {}) })),
  aanbiedingen: offerData.map((o) => ({ ...o })),
};

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface DdOption {
  isHeader: boolean;
  label: string;
  sel: boolean;
  notSel: boolean;
  pick?: () => void;
}

export interface CalDay {
  blank: boolean;
  sel: boolean;
  notSel: boolean;
  n: string;
  pick?: () => void;
}

export function usePortal() {
  const [state, setState] = useState<PortalState>(initialState);
  const S = state;
  const set = (patch: Partial<PortalState>) => setState((s) => ({ ...s, ...patch }));
  const tt = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nextV = useRef(19);
  const nextA = useRef(28);

  const getRole = (): Rol => S.role || START_ROL;

  const showToast = (msg: string) => {
    clearTimeout(tt.current);
    set({ toast: msg });
    tt.current = setTimeout(() => set({ toast: null }), 3400);
  };

  const setRole = (r: Rol) => {
    set({ role: r, tab: "dashboard", search: "", fSchool: "alle", fType: "alle", fStatus: "open", drawerVacId: null, detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null, cvKandId: null, modalOpen: false, offerSel: null, offerNote: "" });
  };

  const setTab = (t: string) => {
    set({ tab: t, search: "", fSchool: "alle", fType: "alle", fStatus: "open", drawerVacId: null, detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null, cvKandId: null });
  };

  const doLogin = () => {
    const lr = S.loginRole || START_ROL;
    set({ loggedIn: true, role: lr, tab: "dashboard", hrScope: "alle", pType: "alle", dashVan: "", dashTot: "", search: "", fSchool: "alle", fType: "alle", fStatus: "open", drawerVacId: null, modalOpen: false, offerSel: null, offerNote: "", pickerOpen: false, pickerQuery: "", detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null, cvKandId: null });
  };

  const logout = () => {
    set({ loggedIn: false, drawerVacId: null, detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null, cvKandId: null, modalOpen: false, pickerOpen: false, toast: null });
  };

  const reviewerNaam = () => (getRole() === "hr" ? hrNaam + " (HR)" : dirNaam(S.dirSchoolId));

  const approve = (offerId: string) => {
    const offers = S.aanbiedingen.map((o) => ({ ...o }));
    const t = offers.find((o) => o.id === offerId);
    if (!t) return;
    t.status = "goedgekeurd";
    t.beoordeeldOp = "2 jul";
    t.beoordeeldDoor = reviewerNaam();
    offers.forEach((o) => {
      if (o.vacId === t.vacId && o.id !== t.id && o.status === "in behandeling") {
        o.status = "afgewezen";
        o.beoordeeldOp = "2 jul";
        o.beoordeeldDoor = reviewerNaam();
        o.reactie = "De vacature is ingevuld met een andere kandidaat.";
      }
    });
    const vacs = S.vacatures.map((v) => (v.id === t.vacId ? { ...v, status: "gevuld" as const } : v));
    const kand = kandidaten.find((k) => k.id === t.kandId);
    set({ aanbiedingen: offers, vacatures: vacs });
    showToast((kand ? kand.naam : "Kandidaat") + " goedgekeurd — vacature staat op Gevuld");
  };

  const reject = (offerId: string) => {
    const offers = S.aanbiedingen.map((o) => (o.id === offerId ? { ...o, status: "afgewezen" as const, beoordeeldOp: "2 jul", beoordeeldDoor: reviewerNaam(), reactie: o.reactie || "Niet geselecteerd door de school." } : o));
    const t = S.aanbiedingen.find((o) => o.id === offerId);
    const kand = t ? kandidaten.find((k) => k.id === t.kandId) : null;
    set({ aanbiedingen: offers });
    showToast((kand ? kand.naam : "Kandidaat") + " afgewezen");
  };

  const submitOffer = () => {
    if (!S.offerSel || !S.drawerVacId) return;
    const kand = kandidaten.find((k) => k.id === S.offerSel);
    const vac = S.vacatures.find((v) => v.id === S.drawerVacId);
    const nieuw: Aanbieding = {
      id: "a" + nextA.current++,
      vacId: S.drawerVacId,
      kandId: S.offerSel,
      partnerId: S.partnerId,
      status: "in behandeling",
      datum: "2 jul",
      motivatie: S.offerNote.trim() || "Aangeboden via het vacatureportaal.",
    };
    set({ aanbiedingen: [...S.aanbiedingen, nieuw], offerSel: null, offerNote: "" });
    showToast((kand ? kand.naam : "Kandidaat") + " aangeboden voor " + (vac ? vac.functie : "vacature"));
  };

  const submitVac = () => {
    const role = getRole();
    const schoolId = role === "directeur" ? S.dirSchoolId : S.nv.schoolId;
    if (!S.nv.functie.trim() || !schoolId) return;
    const nieuw: Vacature = {
      id: "v" + nextV.current++,
      schoolId,
      functie: S.nv.functie.trim(),
      fte: S.nv.fte,
      schaal: S.nv.schaal,
      ingang: fmtDatum(S.nv.begin) || "In overleg",
      geplaatstOp: "2 jul",
      status: "open",
      omschrijving: "",
      door: role === "directeur" ? dirNaam(S.dirSchoolId) : hrNaam + " (HR)",
      reden: S.nv.reden.trim(),
      periode: S.nv.begin ? fmtDatum(S.nv.begin) + (S.nv.eind ? " t/m " + fmtDatum(S.nv.eind) : "") : "",
      dagen: S.nv.dagen.join(" · "),
      vereist: S.nv.vereist.trim(),
      pre: S.nv.pre.trim(),
      leerlinggroep: S.nv.leerlinggroep.trim(),
      extra: S.nv.extra.trim(),
      sluit: S.nv.sluitDatum ? fmtDatum(S.nv.sluitDatum) + " · " + (S.nv.sluitTijd || "12:00") + " uur" : "",
    };
    set({
      vacatures: [nieuw, ...S.vacatures],
      modalOpen: false,
      nv: nvLeeg(),
      tab: "vacatures", search: "", fSchool: "alle", fType: "alle", fStatus: "open",
    });
    showToast("Vacature “" + nieuw.functie + "” geplaatst");
  };

  const setNv = <K extends keyof NieuweVacature>(key: K, val: NieuweVacature[K]) => {
    setState((s) => ({ ...s, nv: { ...s.nv, [key]: val } }));
  };

  const toggleDag = (d: string) => {
    const dagen = S.nv.dagen.includes(d) ? S.nv.dagen.filter((x) => x !== d) : [...S.nv.dagen, d];
    setNv("dagen", dagen);
  };

  const openCal = (field: string, iso: string) => {
    let y = 2026, m = 6;
    if (iso) {
      const p = String(iso).split("-");
      y = parseInt(p[0], 10) || 2026;
      m = (parseInt(p[1], 10) || 7) - 1;
    }
    set({ ddOpen: field, calY: y, calM: m, ddQuery: "" });
  };

  const calShift = (d: number) => {
    let m = S.calM + d, y = S.calY;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    set({ calM: m, calY: y });
  };

  const assignCal = (field: string, iso: string) => {
    if (field === "calNvBegin") setNv("begin", iso);
    else if (field === "calNvEind") setNv("eind", iso);
    else if (field === "calNvSluit") setNv("sluitDatum", iso);
    else if (field === "calDashVan") set({ dashVan: iso });
    else if (field === "calDashTot") set({ dashTot: iso });
    set({ ddOpen: null });
  };

  // ==================== renderVals ====================
  const anyDetail = !!(S.drawerVacId || S.detailPlaatsingId || S.detailPartnerId || S.detailSchoolId);
  const role = getRole();
  const doel = Math.max(0, Math.min(100, ACCEPTATIEGRAAD_DOEL));
  const schoolById: Record<string, School> = {};
  scholen.forEach((s) => { schoolById[s.id] = s; });
  const partnerById: Record<string, Partner> = {};
  partners.forEach((p) => { partnerById[p.id] = p; });
  const kandById: Record<string, Kandidaat> = {};
  kandidaten.forEach((k) => { kandById[k.id] = k; });
  const offers = S.aanbiedingen;
  const vacs = S.vacatures;
  const offersByVac: Record<string, Aanbieding[]> = {};
  offers.forEach((o) => { (offersByVac[o.vacId] = offersByVac[o.vacId] || []).push(o); });
  const vnum = (id: string) => parseInt(String(id).slice(1), 10) || 0;

  const enrich = (v: Vacature) => {
    const os = offersByVac[v.id] || [];
    return {
      v, os,
      school: schoolById[v.schoolId],
      beh: os.filter((o) => o.status === "in behandeling"),
      goed: os.filter((o) => o.status === "goedgekeurd"),
      afg: os.filter((o) => o.status === "afgewezen"),
    };
  };
  type Enriched = ReturnType<typeof enrich>;
  const doorOf = (v: Vacature) => v.door || ((schoolById[v.schoolId] && schoolById[v.schoolId].type === "PO") ? hrNaam + " (HR)" : dirNaam(v.schoolId));
  const inPeriode = (o: Aanbieding) => {
    if (!S.dashVan && !S.dashTot) return true;
    const t = parseDatum(o.datum);
    if (!t) return true;
    if (S.dashVan && t < parseIso(S.dashVan)) return false;
    if (S.dashTot && t > parseIso(S.dashTot)) return false;
    return true;
  };

  // ---- scope per rol ----
  const hrScope = role === "hr" ? S.hrScope || "alle" : "alle";
  const scopedVacs = (role === "directeur"
    ? vacs.filter((v) => v.schoolId === S.dirSchoolId)
    : hrScope !== "alle"
      ? vacs.filter((v) => v.schoolId === hrScope)
      : vacs).map(enrich);
  const mijnOffers = role === "partner" ? offers.filter((o) => o.partnerId === S.partnerId) : [];

  // ---- KPI's ----
  const openVacs = scopedVacs.filter((e) => e.v.status === "open");
  const gevuldVacs = scopedVacs.filter((e) => e.v.status === "gevuld");
  const tbSum = openVacs.reduce((n, e) => n + e.beh.length, 0);
  const aanbTotal = scopedVacs.reduce((n, e) => n + e.os.filter(inPeriode).length, 0);
  const setF = (patch: Partial<PortalState>) => () => set({ tab: "vacatures", search: "", fSchool: "alle", fType: "alle", fStatus: "open", drawerVacId: null, ...patch });

  let kpiCards: { label: string; value: string; sub: string; accent: boolean; click: () => void }[];
  if (role === "partner") {
    const mijnDash = mijnOffers.filter(inPeriode);
    const mBeh = mijnDash.filter((o) => o.status === "in behandeling").length;
    const mGoed = mijnDash.filter((o) => o.status === "goedgekeurd").length;
    const mVacs = new Set(mijnDash.map((o) => o.vacId)).size;
    kpiCards = [
      { label: "Openstaande vacatures", value: String(openVacs.length), sub: "bij alle scholen", accent: false, click: setF({ fStatus: "open" }) },
      { label: "Mijn aanbiedingen", value: String(mijnDash.length), sub: "op " + mVacs + (mVacs === 1 ? " vacature" : " vacatures"), accent: false, click: setF({ fStatus: "alle" }) },
      { label: "In behandeling", value: String(mBeh), sub: "wachten op beoordeling", accent: false, click: setF({ fStatus: "open" }) },
      { label: "Mijn plaatsingen", value: String(mGoed), sub: "goedgekeurde kandidaten", accent: true, click: () => setTab("plaatsingen") },
    ];
  } else {
    kpiCards = [
      { label: "Openstaande vacatures", value: String(openVacs.length), sub: "nu online", accent: false, click: setF({ fStatus: "open" }) },
      { label: "Te beoordelen", value: String(tbSum), sub: role === "directeur" ? "wachten op jouw beoordeling" : "wachten op de scholen", accent: false, click: setF({ fStatus: "open" }) },
      { label: "Plaatsingen", value: String(gevuldVacs.length), sub: "gevulde vacatures", accent: true, click: () => setTab("plaatsingen") },
      { label: "Aanbiedingen totaal", value: String(aanbTotal), sub: "van " + partners.length + " partners", accent: false, click: setF({ fStatus: "alle" }) },
    ];
  }

  // ---- filters + rijen ----
  const q = S.search.trim().toLowerCase();
  const filtered = scopedVacs.filter((e) => {
    if (role !== "directeur" && S.fSchool !== "alle" && e.v.schoolId !== S.fSchool) return false;
    if (S.fType !== "alle" && e.school.type !== S.fType) return false;
    if (S.fStatus !== "alle" && e.v.status !== S.fStatus) return false;
    if (q && !(e.v.functie.toLowerCase().includes(q) || e.school.naam.toLowerCase().includes(q))) return false;
    return true;
  });
  filtered.sort((a, b) =>
    ((a.v.status === "open" ? 0 : 1) - (b.v.status === "open" ? 0 : 1)) ||
    (b.beh.length - a.beh.length) ||
    (vnum(b.v.id) - vnum(a.v.id))
  );

  const vacRows = filtered.map((e) => {
    const isOpen = e.v.status === "open";
    const mijn = role === "partner" ? e.os.filter((o) => o.partnerId === S.partnerId) : [];
    const plaatsing = e.goed[0];
    let mijnLabel = "";
    if (mijn.length) {
      const parts: string[] = [];
      const mb = mijn.filter((o) => o.status === "in behandeling").length;
      const mg = mijn.filter((o) => o.status === "goedgekeurd").length;
      const ma = mijn.filter((o) => o.status === "afgewezen").length;
      if (mg) parts.push(mg + " geplaatst");
      if (mb) parts.push(mb + " in behandeling");
      if (ma) parts.push(ma + " afgewezen");
      mijnLabel = "Jij: " + parts.join(" · ");
    }
    let kandSub: string;
    if (!e.os.length) kandSub = "Nog geen aanbiedingen";
    else {
      const bits = [e.os.length + (e.os.length === 1 ? " aanbieding" : " aanbiedingen")];
      if (e.afg.length) bits.push(e.afg.length + " afgewezen");
      kandSub = bits.join(" · ");
    }
    return {
      functie: e.v.functie,
      schoolLine: e.school.naam + " · " + e.school.plaats,
      isPO: e.school.type === "PO",
      isVO: e.school.type === "VO",
      fte: e.v.fte,
      ingang: e.v.ingang,
      showPlaatsing: !!(plaatsing && !isOpen),
      plaatsingLabel: plaatsing ? "Gevuld: " + (kandById[plaatsing.kandId] ? kandById[plaatsing.kandId].naam : "") + " · " + (partnerById[plaatsing.partnerId] ? partnerById[plaatsing.partnerId].naam : "") : "",
      showTeBeoordelen: role !== "partner" && isOpen && e.beh.length > 0,
      teBeoordelenLabel: e.beh.length + " te beoordelen",
      showMijn: role === "partner" && mijn.length > 0,
      mijnLabel,
      showDash: !(role !== "partner" && isOpen && e.beh.length > 0) && !(role === "partner" && mijn.length > 0),
      doorLine: "Geplaatst door " + doorOf(e.v) + " · " + e.v.geplaatstOp,
      doorNaam: doorOf(e.v),
      doorDatum: e.v.geplaatstOp,
      kandSub,
      isOpen,
      isGevuld: !isOpen,
      open: () => set({ drawerVacId: e.v.id, offerSel: null, offerNote: "", dvDetailsOpen: false, dvKandFilter: "open", detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null }),
    };
  });

  // ---- scholen (HR) ----
  const schoolRows = scholen
    .map((s) => {
      const sv = vacs.filter((v) => v.schoolId === s.id).map(enrich);
      const open = sv.filter((e) => e.v.status === "open").length;
      const tb = sv.filter((e) => e.v.status === "open").reduce((n, e) => n + e.beh.length, 0);
      const pl = sv.filter((e) => e.v.status === "gevuld").length;
      return { s, open, tb, pl };
    })
    .filter((r) => {
      if (S.fType !== "alle" && r.s.type !== S.fType) return false;
      if (q && !r.s.naam.toLowerCase().includes(q)) return false;
      return true;
    })
    .sort((a, b) => (b.open - a.open) || (b.tb - a.tb) || (b.pl - a.pl) || a.s.naam.localeCompare(b.s.naam))
    .map((r) => ({
      naam: r.s.naam,
      plaats: r.s.plaats,
      isPO: r.s.type === "PO",
      isVO: r.s.type === "VO",
      openHot: r.open > 0, openCold: r.open === 0, openStr: String(r.open),
      tbHot: r.tb > 0, tbCold: r.tb === 0, tbStr: r.tb + " te beoordelen",
      plHot: r.pl > 0, plCold: r.pl === 0, plStr: String(r.pl),
      bekijk: (e: React.MouseEvent) => { if (e && e.stopPropagation) e.stopPropagation(); set({ tab: "vacatures", search: "", fType: "alle", fStatus: "open", fSchool: r.s.id }); },
      open: () => set({ detailSchoolId: r.s.id, drawerVacId: null, detailPlaatsingId: null, detailPartnerId: null, cvKandId: null }),
    }));

  // ---- partners ----
  const scopeOffers = role === "directeur"
    ? offers.filter((o) => { const v = vacs.find((x) => x.id === o.vacId); return v && v.schoolId === S.dirSchoolId; })
    : hrScope !== "alle"
      ? offers.filter((o) => { const v = vacs.find((x) => x.id === o.vacId); return v && v.schoolId === hrScope; })
      : offers;
  const vacTypeOf = (o: Aanbieding) => { const v = vacs.find((x) => x.id === o.vacId); const sch = v ? schoolById[v.schoolId] : null; return sch ? sch.type : ""; };
  const pOffers = S.pType === "alle" ? scopeOffers : scopeOffers.filter((o) => vacTypeOf(o) === S.pType);
  const pRaw = partners
    .map((p) => {
      const po = pOffers.filter((o) => o.partnerId === p.id);
      const allPo = scopeOffers.filter((o) => o.partnerId === p.id);
      const poCnt = allPo.filter((o) => vacTypeOf(o) === "PO").length;
      const voCnt = allPo.filter((o) => vacTypeOf(o) === "VO").length;
      const beh = po.filter((o) => o.status === "in behandeling").length;
      const goed = po.filter((o) => o.status === "goedgekeurd").length;
      const afg = po.filter((o) => o.status === "afgewezen").length;
      const beoordeeld = goed + afg;
      const accPct = beoordeeld ? Math.round((goed / beoordeeld) * 100) : 0;
      const pool = kandidaten.filter((k) => k.partnerId === p.id).length;
      const uniq = new Set(po.map((o) => o.vacId)).size;
      return { p, aanb: po.length, beh, goed, afg, beoordeeld, accPct, pool, uniq, poCnt, voCnt };
    })
    .filter((r) => role !== "directeur" || r.aanb > 0)
    .sort((a, b) => (b.goed - a.goed) || (b.accPct - a.accPct) || (b.aanb - a.aanb));
  const partnerRows = pRaw.filter((r) => !q || r.p.naam.toLowerCase().includes(q)).map((r) => ({
    naam: r.p.naam,
    sub: r.poCnt + "× PO · " + r.voCnt + "× VO · " + r.pool + " kandidaten in pool",
    aanb: String(r.aanb), beh: String(r.beh), goed: String(r.goed), afg: String(r.afg),
    showBar: r.beoordeeld > 0, noBar: r.beoordeeld === 0,
    haaltDoel: r.beoordeeld > 0 && r.accPct >= doel,
    mistDoel: r.beoordeeld > 0 && r.accPct < doel,
    accPct: r.accPct,
    accLabel: r.accPct + "%",
    open: () => set({ detailPartnerId: r.p.id, drawerVacId: null, detailPlaatsingId: null, cvKandId: null }),
  }));
  const dirSchool = schoolById[S.dirSchoolId];
  const partnersSub = role === "directeur"
    ? "Prestaties op aanbiedingen voor " + (dirSchool ? dirSchool.naam : "") + " · doel acceptatiegraad ≥ " + doel + "%"
    : "Prestaties over alle scholen van de stichting · doel acceptatiegraad ≥ " + doel + "%";

  // ---- kandidaten (partner) ----
  const pool = kandidaten.filter((k) => k.partnerId === S.partnerId);
  const kandStatus = (k: Kandidaat) => {
    const ko = offers.filter((o) => o.kandId === k.id);
    if (ko.some((o) => o.status === "goedgekeurd")) return "geplaatst";
    if (ko.some((o) => o.status === "in behandeling")) return "aangeboden";
    return "beschikbaar";
  };
  const rank: Record<string, number> = { beschikbaar: 0, aangeboden: 1, geplaatst: 2 };
  const kandRows = pool
    .map((k) => ({ k, st: kandStatus(k) }))
    .filter((x) => !q || x.k.naam.toLowerCase().includes(q) || x.k.profiel.toLowerCase().includes(q))
    .sort((a, b) => (rank[a.st] - rank[b.st]) || a.k.naam.localeCompare(b.k.naam))
    .map(({ k, st }) => {
      const ko = offers.filter((o) => o.kandId === k.id);
      const bij = ko.map((o) => {
        const v = vacs.find((x) => x.id === o.vacId);
        const sch = v ? schoolById[v.schoolId] : null;
        return v ? v.functie + " — " + (sch ? sch.naam : "") + (o.status === "afgewezen" ? " (afgewezen)" : "") : "";
      }).filter(Boolean).join("  ·  ");
      return {
        naam: k.naam, profiel: k.profiel, fte: k.fte, ervaring: k.ervaring,
        isBeschikbaar: st === "beschikbaar", isAangeboden: st === "aangeboden", isGeplaatst: st === "geplaatst",
        aangebodenBij: bij || "—",
      };
    });
  const partner = partnerById[S.partnerId];
  const kandCards = [
    { label: "In de pool", value: String(pool.length), sub: "kandidaten totaal", accent: false },
    { label: "Beschikbaar", value: String(pool.filter((k) => kandStatus(k) === "beschikbaar").length), sub: "direct aan te bieden", accent: false },
    { label: "Aangeboden", value: String(pool.filter((k) => kandStatus(k) === "aangeboden").length), sub: "in behandeling bij scholen", accent: false },
    { label: "Geplaatst", value: String(pool.filter((k) => kandStatus(k) === "geplaatst").length), sub: "goedgekeurd door scholen", accent: true },
  ];

  // ---- drawer ----
  const dvRaw = S.drawerVacId ? vacs.find((v) => v.id === S.drawerVacId) : null;
  const dv: Enriched | null = dvRaw ? enrich(dvRaw) : null;
  let dvOffers: {
    kandNaam: string; profiel: string; fte: string; ervaring: string; partnerNaam: string; datum: string;
    isBeh: boolean; isGoed: boolean; isAfg: boolean; canReview: boolean; showStatusChip: boolean;
    showBesluit: boolean; besluitLine: string; cv: () => void; approve: () => void; reject: () => void;
  }[] = [];
  let showOtherOffers = false, otherOffersLabel = "";
  let offerCandidates: { naam: string; sub: string; selected: boolean; unselected: boolean; pick: () => void }[] = [];
  let hasAvailable = false;
  if (dv) {
    const list = role === "partner" ? dv.os.filter((o) => o.partnerId === S.partnerId) : dv.os;
    const orank: Record<string, number> = { "in behandeling": 0, goedgekeurd: 1, afgewezen: 2 };
    dvOffers = [...list]
      .filter((o) => S.dvKandFilter === "alle" || o.status !== "afgewezen")
      .sort((a, b) => (orank[a.status] - orank[b.status]) || (vnum(b.id) - vnum(a.id)))
      .map((o) => {
        const k = kandById[o.kandId];
        const p = partnerById[o.partnerId];
        const canReview = role !== "partner" && o.status === "in behandeling" && dv.v.status === "open";
        return {
          kandNaam: k ? k.naam : "",
          profiel: k ? k.profiel : "",
          fte: k ? k.fte : "",
          ervaring: k ? k.ervaring : "",
          partnerNaam: p ? p.naam : "",
          datum: o.datum,
          isBeh: o.status === "in behandeling",
          isGoed: o.status === "goedgekeurd",
          isAfg: o.status === "afgewezen",
          canReview,
          showStatusChip: !canReview,
          showBesluit: o.status !== "in behandeling" && !!(o.beoordeeldDoor || o.beoordeeldOp),
          besluitLine: "door " + (o.beoordeeldDoor || dirNaam(dv.v.schoolId)) + (o.beoordeeldOp ? " · " + o.beoordeeldOp : ""),
          cv: () => set({ cvKandId: o.kandId }),
          approve: () => approve(o.id),
          reject: () => reject(o.id),
        };
      });
    if (role === "partner") {
      const others = dv.os.length - list.length;
      showOtherOffers = others > 0;
      otherOffersLabel = others + (others === 1 ? " aanbieding" : " aanbiedingen") + " van andere partners";
      offerCandidates = pool
        .filter((k) => kandStatus(k) === "beschikbaar" && !dv.os.some((o) => o.kandId === k.id))
        .map((k) => ({
          naam: k.naam,
          sub: k.profiel + " · " + k.fte + " fte · " + k.ervaring + " ervaring",
          selected: S.offerSel === k.id,
          unselected: S.offerSel !== k.id,
          pick: () => set({ offerSel: k.id }),
        }));
      hasAvailable = offerCandidates.length > 0;
    }
  }
  const dvPlaatsing = dv ? dv.goed[0] : null;

  // ---- dashboard ----
  const C = 2 * Math.PI * 54;
  const donutTotal = scopedVacs.length;
  const openFrac = donutTotal ? openVacs.length / donutTotal : 0;
  const donutDash = (openFrac * C).toFixed(1) + " " + (C - openFrac * C).toFixed(1);
  const typeAgg = (t: SchoolType) => {
    const list = scopedVacs.filter((e) => e.school.type === t);
    const o = list.filter((e) => e.v.status === "open").length;
    const g = list.length - o;
    return {
      ow: list.length ? Math.round((o / list.length) * 100) : 0,
      gw: list.length ? Math.round((g / list.length) * 100) : 0,
      counts: o + " open · " + g + " gevuld",
    };
  };
  const poAgg = typeAgg("PO");
  const voAgg = typeAgg("VO");
  const funnelOffers = (role === "partner" ? mijnOffers : scopeOffers).filter(inPeriode);
  const fTot = funnelOffers.length;
  const fBeh = funnelOffers.filter((o) => o.status === "in behandeling").length;
  const fGoed = funnelOffers.filter((o) => o.status === "goedgekeurd").length;
  const fAfg = funnelOffers.filter((o) => o.status === "afgewezen").length;
  const fW = (n: number) => (fTot ? Math.round((n / fTot) * 100) : 0);
  const beoordeeldTot = fGoed + fAfg;
  const accPctTot = beoordeeldTot ? Math.round((fGoed / beoordeeldTot) * 100) : 0;
  const dashPO = pOffers.filter(inPeriode);
  const pchartRaw = partners.map((p) => {
    const po = dashPO.filter((o) => o.partnerId === p.id);
    const goed = po.filter((o) => o.status === "goedgekeurd").length;
    const beh = po.filter((o) => o.status === "in behandeling").length;
    const afg = po.filter((o) => o.status === "afgewezen").length;
    const beoordeeld = goed + afg;
    return { p, aanb: po.length, goed, beh, afg, beoordeeld, accPct: beoordeeld ? Math.round((goed / beoordeeld) * 100) : 0 };
  }).filter((r) => role !== "directeur" || r.aanb > 0)
    .sort((a, b) => (b.goed - a.goed) || (b.accPct - a.accPct) || (b.aanb - a.aanb));
  const maxAanb = Math.max(1, ...pchartRaw.map((r) => r.aanb));
  const pchartRows = pchartRaw.map((r) => ({
    naam: r.p.naam,
    barW: Math.round((r.aanb / maxAanb) * 100),
    goedW: r.aanb ? Math.round((r.goed / r.aanb) * 100) : 0,
    behW: r.aanb ? Math.round((r.beh / r.aanb) * 100) : 0,
    afgW: r.aanb ? Math.round((r.afg / r.aanb) * 100) : 0,
    meta: r.aanb + " aanb. · " + (r.beoordeeld ? r.accPct + "%" : "—"),
  }));
  let actieRows: { t1: string; t2: string; chipLabel: string; chipPurple: boolean; chipOrange: boolean; click: () => void }[];
  if (role === "partner") {
    actieRows = scopedVacs
      .filter((e) => e.v.status === "open" && !e.os.some((o) => o.partnerId === S.partnerId))
      .sort((a, b) => vnum(b.v.id) - vnum(a.v.id))
      .slice(0, 6)
      .map((e) => ({
        t1: e.v.functie,
        t2: e.school.naam + " · " + e.school.plaats + " · per " + e.v.ingang,
        chipLabel: "Open",
        chipPurple: false,
        chipOrange: true,
        click: () => set({ drawerVacId: e.v.id, offerSel: null, offerNote: "", dvDetailsOpen: false, dvKandFilter: "open", detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null }),
      }));
  } else {
    actieRows = openVacs
      .filter((e) => e.beh.length > 0)
      .sort((a, b) => b.beh.length - a.beh.length)
      .slice(0, 6)
      .map((e) => ({
        t1: e.v.functie,
        t2: e.school.naam + " · " + e.school.plaats,
        chipLabel: e.beh.length + " te beoordelen",
        chipPurple: true,
        chipOrange: false,
        click: () => set({ drawerVacId: e.v.id, offerSel: null, offerNote: "", dvDetailsOpen: false, dvKandFilter: "open", detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null }),
      }));
  }
  const poolB = pool.filter((k) => kandStatus(k) === "beschikbaar").length;
  const poolA = pool.filter((k) => kandStatus(k) === "aangeboden").length;
  const poolG = pool.filter((k) => kandStatus(k) === "geplaatst").length;
  const poolW = (n: number) => (pool.length ? Math.round((n / pool.length) * 100) : 0);

  // ---- plaatsingen ----
  const plaatsingSrc = role === "partner" ? offers.filter((o) => o.partnerId === S.partnerId) : scopeOffers;
  const plaatsingRows = plaatsingSrc
    .filter((o) => o.status === "goedgekeurd")
    .map((o) => {
      const v = vacs.find((x) => x.id === o.vacId);
      if (!v) return null;
      const school = schoolById[v.schoolId];
      const k = kandById[o.kandId];
      const p = partnerById[o.partnerId];
      return {
        functie: v.functie,
        schoolNaam: school ? school.naam : "",
        schoolPlaats: school ? school.plaats : "",
        isPO: school ? school.type === "PO" : false,
        isVO: school ? school.type === "VO" : false,
        kandNaam: k ? k.naam : "",
        kandProfiel: k ? k.profiel : "",
        partnerNaam: p ? p.naam : "",
        ingang: v.ingang,
        goedOp: o.beoordeeldOp || o.datum,
        goedDoor: o.beoordeeldDoor || dirNaam(v.schoolId),
        _sort: vnum(v.id),
        open: () => set({ detailPlaatsingId: o.id, drawerVacId: null, detailPartnerId: null, cvKandId: null }),
      };
    })
    .filter((r): r is NonNullable<typeof r> => !!r)
    .filter((r) => !q || r.kandNaam.toLowerCase().includes(q) || r.functie.toLowerCase().includes(q) || r.schoolNaam.toLowerCase().includes(q) || r.partnerNaam.toLowerCase().includes(q))
    .sort((a, b) => b._sort - a._sort);

  // ---- plaatsing detail ----
  const pdOffer = S.detailPlaatsingId ? offers.find((o) => o.id === S.detailPlaatsingId) : null;
  const pdVac = pdOffer ? vacs.find((v) => v.id === pdOffer.vacId) : null;
  const pdSchool = pdVac ? schoolById[pdVac.schoolId] : null;
  const pdKand = pdOffer ? kandById[pdOffer.kandId] : null;
  const pdPartner = pdOffer ? partnerById[pdOffer.partnerId] : null;
  const pdShow = !!(pdOffer && pdVac && pdSchool && pdKand && pdPartner);

  // ---- partner detail ----
  const ppPartner = S.detailPartnerId ? partnerById[S.detailPartnerId] : null;
  let ppKandRows: { naam: string; profiel: string; fte: string; ervaring: string; isBeschikbaar: boolean; isAangeboden: boolean; isGeplaatst: boolean; cv: () => void }[] = [];
  let ppOfferRows: { kandNaam: string; functie: string; schoolLine: string; datum: string; isBeh: boolean; isGoed: boolean; isAfg: boolean; open: () => void }[] = [];
  let ppAanb = 0, ppBeh = 0, ppGoed = 0, ppAfg = 0, ppAcc = "—", ppPoVo = "";
  if (ppPartner) {
    const po = scopeOffers.filter((o) => o.partnerId === ppPartner.id);
    ppAanb = po.length;
    ppBeh = po.filter((o) => o.status === "in behandeling").length;
    ppGoed = po.filter((o) => o.status === "goedgekeurd").length;
    ppAfg = po.filter((o) => o.status === "afgewezen").length;
    ppAcc = (ppGoed + ppAfg) ? Math.round((ppGoed / (ppGoed + ppAfg)) * 100) + "%" : "—";
    ppPoVo = po.filter((o) => vacTypeOf(o) === "PO").length + "× PO · " + po.filter((o) => vacTypeOf(o) === "VO").length + "× VO";
    ppOfferRows = [...po].sort((a, b) => vnum(b.id) - vnum(a.id)).map((o) => {
      const v = vacs.find((x) => x.id === o.vacId);
      const sch = v ? schoolById[v.schoolId] : null;
      const k = kandById[o.kandId];
      return {
        kandNaam: k ? k.naam : "",
        functie: v ? v.functie : "",
        schoolLine: sch ? sch.naam + " · " + sch.plaats : "",
        datum: o.datum,
        isBeh: o.status === "in behandeling",
        isGoed: o.status === "goedgekeurd",
        isAfg: o.status === "afgewezen",
        open: () => { if (v) set({ drawerVacId: v.id, detailPartnerId: null, detailPlaatsingId: null, dvDetailsOpen: false, dvKandFilter: "alle", offerSel: null, offerNote: "" }); },
      };
    });
    ppKandRows = kandidaten.filter((k) => k.partnerId === ppPartner.id)
      .map((k) => ({ k, st: kandStatus(k) }))
      .sort((a, b) => (rank[a.st] - rank[b.st]) || a.k.naam.localeCompare(b.k.naam))
      .map(({ k, st }) => ({
        naam: k.naam, profiel: k.profiel, fte: k.fte, ervaring: k.ervaring,
        isBeschikbaar: st === "beschikbaar", isAangeboden: st === "aangeboden", isGeplaatst: st === "geplaatst",
        cv: () => set({ cvKandId: k.id }),
      }));
  }

  // ---- school detail ----
  const sdSchool = S.detailSchoolId ? schoolById[S.detailSchoolId] : null;
  let sdVacRows: { functie: string; fte: string; ingang: string; isOpen: boolean; isGevuld: boolean; showTb: boolean; tbLabel: string; showDash: boolean; open: () => void }[] = [];
  let sdPlRows: { kandNaam: string; functie: string; partnerNaam: string; goedOp: string; goedDoor: string; open: () => void }[] = [];
  let sdOpen = 0, sdTb = 0, sdPl = 0, sdAanb = 0;
  if (sdSchool) {
    const sv = vacs.filter((v) => v.schoolId === sdSchool.id).map(enrich);
    sdOpen = sv.filter((e) => e.v.status === "open").length;
    sdTb = sv.filter((e) => e.v.status === "open").reduce((n, e) => n + e.beh.length, 0);
    sdPl = sv.filter((e) => e.v.status === "gevuld").length;
    sdAanb = sv.reduce((n, e) => n + e.os.length, 0);
    sdVacRows = [...sv]
      .sort((a, b) => ((a.v.status === "open" ? 0 : 1) - (b.v.status === "open" ? 0 : 1)) || (vnum(b.v.id) - vnum(a.v.id)))
      .map((e) => ({
        functie: e.v.functie,
        fte: e.v.fte,
        ingang: e.v.ingang,
        isOpen: e.v.status === "open",
        isGevuld: e.v.status === "gevuld",
        showTb: e.v.status === "open" && e.beh.length > 0,
        tbLabel: e.beh.length + " te beoordelen",
        showDash: !(e.v.status === "open" && e.beh.length > 0),
        open: () => set({ drawerVacId: e.v.id, detailSchoolId: null, detailPlaatsingId: null, detailPartnerId: null, offerSel: null, offerNote: "", dvDetailsOpen: false, dvKandFilter: "open" }),
      }));
    sdPlRows = offers
      .filter((o) => { if (o.status !== "goedgekeurd") return false; const v = vacs.find((x) => x.id === o.vacId); return !!(v && v.schoolId === sdSchool.id); })
      .map((o) => {
        const v = vacs.find((x) => x.id === o.vacId);
        const k = kandById[o.kandId];
        const p = partnerById[o.partnerId];
        return {
          kandNaam: k ? k.naam : "",
          functie: v ? v.functie : "",
          partnerNaam: p ? p.naam : "",
          goedOp: o.beoordeeldOp || o.datum,
          goedDoor: o.beoordeeldDoor || dirNaam(sdSchool.id),
          open: () => set({ detailPlaatsingId: o.id, detailSchoolId: null, drawerVacId: null, detailPartnerId: null }),
        };
      });
  }

  // ---- cv preview ----
  const cvKand = S.cvKandId ? kandById[S.cvKandId] : null;
  const cvData = cvKand ? buildCv(cvKand) : null;

  // ---- tabs ----
  const tabDefs: [string, string][] = role === "hr"
    ? [["dashboard", "Dashboard"], ["vacatures", "Vacatures"], ["plaatsingen", "Plaatsingen"], ["scholen", "Scholen"], ["partners", "Aanbestedingspartners"]]
    : role === "directeur"
      ? [["dashboard", "Dashboard"], ["vacatures", "Vacatures"], ["plaatsingen", "Plaatsingen"], ["partners", "Aanbestedingspartners"]]
      : [["dashboard", "Dashboard"], ["vacatures", "Vacatures"], ["plaatsingen", "Plaatsingen"], ["kandidaten", "Kandidaten"]];
  const tabs = tabDefs.map(([key, label]) => ({
    label,
    active: S.tab === key,
    inactive: S.tab !== key,
    showBadge: key === "vacatures" && role !== "partner" && openVacs.length > 0,
    badge: String(openVacs.length),
    select: () => setTab(key),
  }));

  const roles = ([["hr", "HR stichting"], ["directeur", "Schooldirecteur"], ["partner", "Aanbestedingspartner"]] as [Rol, string][]).map(([key, label]) => ({
    label,
    active: role === key,
    inactive: role !== key,
    select: () => setRole(key),
  }));

  const mkBtns = <F extends "pType" | "fType" | "fStatus" | "dvKandFilter">(defs: [PortalState[F], string][], cur: PortalState[F], field: F) =>
    defs.map(([val, label]) => ({
      label,
      active: cur === val,
      inactive: cur !== val,
      select: () => set({ [field]: val } as Partial<PortalState>),
    }));

  const filtersActive = !!q || S.fSchool !== "alle" || S.fType !== "alle" || S.fStatus !== "open";

  const pageSub = role === "hr"
    ? "Alle vacatures van de stichting · PO plaatst het stafbureau, VO plaatsen de scholen zelf"
    : role === "directeur"
      ? (dirSchool ? dirSchool.naam + " · beoordeel aangeboden kandidaten en volg je vacatures" : "")
      : "Alle vacatures van PCOU Willibrord — open een vacature om een kandidaat aan te bieden";

  // ---- login / persona / picker ----
  const lr = S.loginRole || START_ROL;
  const loginRoles = ([
    ["hr", "HR-medewerker stichting", "Stafbureau HR & Onderwijs"],
    ["directeur", "Schooldirecteur", "Beoordeelt kandidaten voor de eigen school"],
    ["partner", "Aanbestedingspartner", "Biedt kandidaten aan uit de eigen pool"],
  ] as [Rol, string, string][]).map(([key, label, sub]) => ({
    label, sub,
    selected: lr === key,
    unselected: lr !== key,
    pick: () => set({ loginRole: key }),
  }));
  const personaNaam = role === "hr" ? hrNaam : role === "directeur" ? dirNaam(S.dirSchoolId) : (partnerContacts[S.partnerId] || "");
  const personaRol = role === "hr" ? "HR · Stichting PCOU Willibrord" : role === "directeur" ? "Directeur · " + (dirSchool ? dirSchool.naam : "") : (partner ? partner.naam : "");
  const personaInitials = personaNaam.split(" ").filter(Boolean).map((w) => w[0]).join("").replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
  const pickerQ = S.pickerQuery.trim().toLowerCase();
  const mkOpts = (t: SchoolType): DdOption[] => scholen
    .filter((s) => s.type === t && (!pickerQ || s.naam.toLowerCase().includes(pickerQ)))
    .sort((a, b) => a.naam.localeCompare(b.naam))
    .map((s) => ({
      isHeader: false,
      label: s.naam,
      sel: hrScope === s.id,
      notSel: hrScope !== s.id,
      pick: () => set({ hrScope: s.id, pickerOpen: false, pickerQuery: "", drawerVacId: null, detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null }),
    }));
  const poOpts = mkOpts("PO");
  const voOpts = mkOpts("VO");
  const pickerOptions: DdOption[] = [];
  if (poOpts.length) { pickerOptions.push({ isHeader: true, label: "Primair onderwijs", sel: false, notSel: false }); pickerOptions.push(...poOpts); }
  if (voOpts.length) { pickerOptions.push({ isHeader: true, label: "Voortgezet onderwijs", sel: false, notSel: false }); pickerOptions.push(...voOpts); }

  // ---- custom dropdowns & kalenders ----
  const dd = S.ddOpen;
  const openDd = (key: string) => () => set({ ddOpen: S.ddOpen === key ? null : key, ddQuery: "" });
  const ddq = S.ddQuery.trim().toLowerCase();
  const mkDdOpt = (label: string, sel: boolean, fn: () => void): DdOption => ({ isHeader: false, label, sel, notSel: !sel, pick: () => { fn(); set({ ddOpen: null, ddQuery: "" }); } });
  const mkSchoolOpts = (selId: string, assign: (id: string) => void, withAlle: boolean): DdOption[] => {
    const out: DdOption[] = [];
    if (withAlle && (!ddq || "alle scholen".includes(ddq))) out.push(mkDdOpt("Alle scholen", selId === "alle", () => assign("alle")));
    const grp = (t: SchoolType) => scholen
      .filter((s) => s.type === t && (!ddq || s.naam.toLowerCase().includes(ddq)))
      .sort((a, b) => a.naam.localeCompare(b.naam));
    const po2 = grp("PO"), vo2 = grp("VO");
    if (po2.length) { out.push({ isHeader: true, label: "Primair onderwijs", sel: false, notSel: false }); po2.forEach((s) => out.push(mkDdOpt(s.naam, selId === s.id, () => assign(s.id)))); }
    if (vo2.length) { out.push({ isHeader: true, label: "Voortgezet onderwijs", sel: false, notSel: false }); vo2.forEach((s) => out.push(mkDdOpt(s.naam, selId === s.id, () => assign(s.id)))); }
    return out;
  };
  const fSchoolOpts = dd === "fSchool" ? mkSchoolOpts(S.fSchool, (id) => set({ fSchool: id }), true) : [];
  const nvSchoolOpts = dd === "nvSchool" ? mkSchoolOpts(S.nv.schoolId, (id) => setNv("schoolId", id), false) : [];
  const loginIds = ["s1", "s5", "s7", "s17", "s25", "s27", "s34", "s42", "s46", "s3", "s10", "s12", "s15", "s16", "s23", "s32"];
  const loginSchoolOpts: DdOption[] = [];
  if (dd === "loginSchool") {
    const ls = (t: SchoolType) => scholen.filter((s) => loginIds.includes(s.id) && s.type === t).sort((a, b) => a.naam.localeCompare(b.naam));
    const lsPo = ls("PO"), lsVo = ls("VO");
    loginSchoolOpts.push({ isHeader: true, label: "Primair onderwijs", sel: false, notSel: false });
    lsPo.forEach((s) => loginSchoolOpts.push(mkDdOpt(s.naam, S.dirSchoolId === s.id, () => set({ dirSchoolId: s.id }))));
    loginSchoolOpts.push({ isHeader: true, label: "Voortgezet onderwijs", sel: false, notSel: false });
    lsVo.forEach((s) => loginSchoolOpts.push(mkDdOpt(s.naam, S.dirSchoolId === s.id, () => set({ dirSchoolId: s.id }))));
  }
  const loginPartnerOpts = dd === "loginPartner" ? partners.map((p) => mkDdOpt(p.naam, S.partnerId === p.id, () => set({ partnerId: p.id }))) : [];
  const nvFteOpts = dd === "nvFte" ? ["0,4", "0,6", "0,8", "0,8–1,0", "1,0"].map((x) => mkDdOpt(x, S.nv.fte === x, () => setNv("fte", x))) : [];
  const nvSchaalOpts = dd === "nvSchaal" ? ["L10", "L11", "L12", "LB", "LC", "LD", "Schaal 6", "Schaal 7"].map((x) => mkDdOpt(x, S.nv.schaal === x, () => setNv("schaal", x))) : [];
  const nvTijdOpts = dd === "nvTijd" ? ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"].map((x) => mkDdOpt(x, S.nv.sluitTijd === x, () => setNv("sluitTijd", x))) : [];
  const calDays: CalDay[] = [];
  let calTitle = "";
  if (dd && dd.indexOf("cal") === 0) {
    const maanden = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
    const cy = S.calY, cm = S.calM;
    calTitle = maanden[cm] + " " + cy;
    const firstDow = (new Date(cy, cm, 1).getDay() + 6) % 7;
    const dim = new Date(cy, cm + 1, 0).getDate();
    const curVal = dd === "calNvBegin" ? S.nv.begin : dd === "calNvEind" ? S.nv.eind : dd === "calNvSluit" ? S.nv.sluitDatum : dd === "calDashVan" ? S.dashVan : S.dashTot;
    const pad2 = (n: number) => (n < 10 ? "0" : "") + n;
    for (let i = 0; i < firstDow; i++) calDays.push({ blank: true, sel: false, notSel: false, n: "" });
    for (let d2 = 1; d2 <= dim; d2++) {
      const iso2 = cy + "-" + pad2(cm + 1) + "-" + pad2(d2);
      const sel2 = curVal === iso2;
      calDays.push({ blank: false, sel: sel2, notSel: !sel2, n: String(d2), pick: () => assignCal(dd, iso2) });
    }
  }
  const alleDagenSel = ["ma", "di", "wo", "do", "vr"].every((x) => S.nv.dagen.includes(x));

  const nvSchoolOk = role === "directeur" ? true : !!S.nv.schoolId;
  const canSubmitVac = !!S.nv.functie.trim() && nvSchoolOk;

  return {
    // header + tabs
    roles, tabs,
    isHR: role === "hr",
    loggedIn: !!S.loggedIn,
    loggedOut: !S.loggedIn,
    loginRoles,
    loginDirSel: lr === "directeur",
    loginPartnerSel: lr === "partner",
    doLogin: () => doLogin(),
    logout: () => logout(),
    personaNaam, personaRol, personaInitials,
    hrScopeLabel: hrScope === "alle" ? "Alle scholen" : (schoolById[hrScope] ? schoolById[hrScope].naam : "Alle scholen"),
    togglePicker: () => set({ pickerOpen: !S.pickerOpen }),
    closePicker: () => set({ pickerOpen: false, pickerQuery: "" }),
    pickerOpen: S.pickerOpen,
    pickerQuery: S.pickerQuery,
    onPickerQuery: (e: InputEvent) => set({ pickerQuery: e.target.value }),
    pickerAlleSel: hrScope === "alle",
    pickerAlleNot: hrScope !== "alle",
    pickAlle: () => set({ hrScope: "alle", pickerOpen: false, pickerQuery: "", drawerVacId: null, detailPlaatsingId: null, detailPartnerId: null, detailSchoolId: null }),
    pickerOptions,
    pTypeBtns: mkBtns<"pType">([["alle", "Alle"], ["PO", "PO"], ["VO", "VO"]], S.pType, "pType"),
    showPTypeToggle: role === "hr",
    isDir: role === "directeur", isPartner: role === "partner",
    dirSchoolId: S.dirSchoolId,
    partnerId: S.partnerId,
    // views
    tabVacatures: S.tab === "vacatures" && !anyDetail,
    tabScholen: S.tab === "scholen" && !anyDetail,
    tabPartners: S.tab === "partners" && !anyDetail,
    tabKandidaten: S.tab === "kandidaten" && !anyDetail,
    tabDashboard: S.tab === "dashboard" && !anyDetail,
    tabPlaatsingen: S.tab === "plaatsingen" && !anyDetail,
    plaatsingenSub: role === "hr"
      ? "Alle gevulde vacatures binnen de stichting"
      : role === "directeur"
        ? (dirSchool ? dirSchool.naam : "") + " · gevulde vacatures"
        : (partner ? partner.naam : "") + " · jouw geplaatste kandidaten",
    plaatsingRows,
    plaatsingenEmpty: plaatsingRows.length === 0,
    plaatsingenEmptyText: role === "partner"
      ? "Bied kandidaten aan op open vacatures — goedgekeurde kandidaten verschijnen hier."
      : "Zodra een kandidaat wordt goedgekeurd verschijnt de plaatsing hier.",
    // plaatsing detail
    pdShow,
    pdBack: () => set({ detailPlaatsingId: null }),
    pdKandNaam: pdKand ? pdKand.naam : "",
    pdProfiel: pdKand ? pdKand.profiel : "",
    pdFteErv: pdKand ? pdKand.fte + " fte · " + pdKand.ervaring + " ervaring" : "",
    pdPartnerNaam: pdPartner ? pdPartner.naam : "",
    pdPartnerContact: pdPartner ? "Contactpersoon: " + (partnerContacts[pdPartner.id] || "—") : "",
    pdFunctie: pdVac ? pdVac.functie : "",
    pdFuncMeta: pdVac ? pdVac.fte + " fte · " + pdVac.schaal + " · start " + pdVac.ingang : "",
    pdSchoolNaam: pdSchool ? pdSchool.naam : "",
    pdSchoolMeta: pdSchool ? pdSchool.plaats + " · " + conceptOf(pdSchool.id) : "",
    pdDirecteur: pdSchool ? "Contactpersoon: " + dirNaam(pdSchool.id) : "",
    pdIsPO: pdSchool ? pdSchool.type === "PO" : false,
    pdIsVO: pdSchool ? pdSchool.type === "VO" : false,
    pdAangeb: pdOffer ? pdOffer.datum : "",
    pdGoedOp: pdOffer ? (pdOffer.beoordeeldOp || pdOffer.datum) : "",
    pdGoedDoor: pdOffer && pdVac ? (pdOffer.beoordeeldDoor || dirNaam(pdVac.schoolId)) : "",
    pdIngang: pdVac ? pdVac.ingang : "",
    pdMotivatie: pdOffer ? (pdOffer.motivatie || "") : "",
    pdGotoVac: () => { if (pdVac) set({ drawerVacId: pdVac.id, detailPlaatsingId: null, dvDetailsOpen: false, dvKandFilter: "alle", offerSel: null, offerNote: "" }); },
    pdGotoPartner: () => { if (pdPartner) set({ detailPartnerId: pdPartner.id, detailPlaatsingId: null }); },
    pdCv: () => { if (pdKand) set({ cvKandId: pdKand.id }); },
    pdGotoSchool: () => { if (pdSchool) set({ detailSchoolId: pdSchool.id, detailPlaatsingId: null }); },
    // partner detail
    ppShow: !!ppPartner,
    ppBack: () => set({ detailPartnerId: null }),
    ppNaam: ppPartner ? ppPartner.naam : "",
    ppContact: ppPartner ? "Contactpersoon: " + (partnerContacts[ppPartner.id] || "—") + (partnerEmails[ppPartner.id] ? " · " + partnerEmails[ppPartner.id] : "") : "",
    ppAanb: String(ppAanb), ppBeh: String(ppBeh), ppGoed: String(ppGoed), ppAfg: String(ppAfg), ppAcc, ppPoVo,
    ppOfferRows,
    ppOfferCount: String(ppOfferRows.length),
    ppNoOffers: ppOfferRows.length === 0,
    ppKandRows,
    ppPoolCount: String(ppKandRows.length),
    // school detail
    sdShow: !!sdSchool,
    sdBack: () => set({ detailSchoolId: null }),
    sdNaam: sdSchool ? sdSchool.naam : "",
    sdSub: sdSchool ? sdSchool.plaats + " · " + conceptOf(sdSchool.id) + " · Contactpersoon: " + dirNaam(sdSchool.id) : "",
    sdIsPO: sdSchool ? sdSchool.type === "PO" : false,
    sdIsVO: sdSchool ? sdSchool.type === "VO" : false,
    sdOpenN: String(sdOpen),
    sdTbN: String(sdTb),
    sdPlN: String(sdPl),
    sdAanbN: String(sdAanb),
    sdVacRows,
    sdVacCount: String(sdVacRows.length),
    sdNoVacs: sdVacRows.length === 0,
    sdPlRows,
    sdPlCount: String(sdPlRows.length),
    sdNoPl: sdPlRows.length === 0,
    // cv preview
    cvOpen: !!cvKand,
    closeCv: () => set({ cvKandId: null }),
    cvNaam: cvKand ? cvKand.naam : "",
    cvProfiel: cvKand ? cvKand.profiel : "",
    cvMeta: cvData ? cvData.meta : "",
    cvVia: cvKand && partnerById[cvKand.partnerId] ? "Via " + partnerById[cvKand.partnerId].naam : "",
    cvSamenvatting: cvData ? cvData.samenvatting : "",
    cvWerk: cvData ? cvData.werk : [],
    cvOpleiding: cvData ? cvData.opleiding : [],
    cvVaard: cvData ? cvData.vaardigheden.map((x) => ({ label: x })) : [],
    dashSub: role === "hr"
      ? "Stichtingsbreed overzicht van vacatures, aanbiedingen en partnerprestaties"
      : role === "directeur"
        ? (dirSchool ? dirSchool.naam : "") + " · vacatures en kandidaten in één oogopslag"
        : (partner ? partner.naam : "") + " · jouw aanbiedingen, plaatsingen en pool",
    donutTotal: String(donutTotal),
    donutDash,
    donutOpenN: String(openVacs.length),
    donutGevuldN: String(gevuldVacs.length),
    showTypeSplit: role !== "directeur",
    poOpenW: poAgg.ow, poGevW: poAgg.gw, poCounts: poAgg.counts,
    voOpenW: voAgg.ow, voGevW: voAgg.gw, voCounts: voAgg.counts,
    funnelTitle: role === "partner" ? "Jouw aanbiedingen" : "Aanbiedingen van partners",
    fTot: String(fTot),
    fBehN: String(fBeh), fBehW: fW(fBeh),
    fGoedN: String(fGoed), fGoedW: fW(fGoed),
    fAfgN: String(fAfg), fAfgW: fW(fAfg),
    accLineText: "Acceptatiegraad " + accPctTot + "% · doel ≥ " + doel + "%",
    accOk: beoordeeldTot > 0 && accPctTot >= doel,
    accBad: beoordeeldTot > 0 && accPctTot < doel,
    accNone: beoordeeldTot === 0,
    showPartnerChart: role !== "partner",
    pchartRows,
    showPoolCard: role === "partner",
    poolTotal: String(pool.length),
    pbW: poolW(poolB), paW: poolW(poolA), pgW: poolW(poolG),
    pbN: String(poolB), paN: String(poolA), pgN: String(poolG),
    gotoVacatures: () => setTab("vacatures"),
    gotoPartnersTab: () => setTab("partners"),
    gotoKandidaten: () => setTab("kandidaten"),
    actieTitle: role === "partner" ? "Open vacatures zonder jouw aanbieding" : "Kandidaten wachten op beoordeling",
    actieRows,
    actieEmpty: actieRows.length === 0,
    actieEmptyText: role === "partner" ? "Je hebt op alle open vacatures al een kandidaat aangeboden." : "Geen kandidaten te beoordelen — alles is bijgewerkt.",
    navTop: false,
    navSide: true,
    pageTitle: "Vacatures",
    pageSub,
    canPost: role !== "partner",
    openModal: () => set({ modalOpen: true }),
    kpiCards,
    // filters
    search: S.search,
    onSearch: (e: InputEvent) => set({ search: e.target.value }),
    fSchool: S.fSchool,
    showSchoolFilter: role === "partner" || (role === "hr" && hrScope === "alle"),
    typeBtns: mkBtns<"fType">([["alle", "Alle"], ["PO", "PO"], ["VO", "VO"]], S.fType, "fType"),
    statusBtns: mkBtns<"fStatus">([["alle", "Alle"], ["open", "Open"], ["gevuld", "Gevuld"]], S.fStatus, "fStatus"),
    filtersActive,
    resetFilters: () => set({ search: "", fSchool: "alle", fType: "alle", fStatus: "open" }),
    resultLabel: vacRows.length + (vacRows.length === 1 ? " vacature" : " vacatures"),
    scholenCountLabel: schoolRows.length + (schoolRows.length === 1 ? " school" : " scholen"),
    plaatsingenCountLabel: plaatsingRows.length + (plaatsingRows.length === 1 ? " plaatsing" : " plaatsingen"),
    partnersCountLabel: partnerRows.length + (partnerRows.length === 1 ? " partner" : " partners"),
    kandCountLabel: kandRows.length + (kandRows.length === 1 ? " kandidaat" : " kandidaten"),
    dashVan: S.dashVan,
    dashTot: S.dashTot,
    dashPeriodeActive: !!(S.dashVan || S.dashTot),
    resetDashPeriode: () => set({ dashVan: "", dashTot: "" }),
    // custom dropdowns & kalenders
    closeDd: () => set({ ddOpen: null, ddQuery: "" }),
    ddQuery: S.ddQuery,
    onDdQuery: (e: InputEvent) => set({ ddQuery: e.target.value }),
    fSchoolDdOpen: dd === "fSchool",
    toggleFSchoolDd: openDd("fSchool"),
    fSchoolLabel: S.fSchool === "alle" ? "Alle scholen" : (schoolById[S.fSchool] ? schoolById[S.fSchool].naam : "Alle scholen"),
    fSchoolOpts,
    nvSchoolDdOpen: dd === "nvSchool",
    toggleNvSchoolDd: openDd("nvSchool"),
    nvSchoolLabel: S.nv.schoolId && schoolById[S.nv.schoolId] ? schoolById[S.nv.schoolId].naam : "Kies een school…",
    nvSchoolOpts,
    loginSchoolDdOpen: dd === "loginSchool",
    toggleLoginSchoolDd: openDd("loginSchool"),
    loginSchoolLabel: schoolById[S.dirSchoolId] ? schoolById[S.dirSchoolId].naam : "Kies je school",
    loginSchoolOpts,
    loginPartnerDdOpen: dd === "loginPartner",
    toggleLoginPartnerDd: openDd("loginPartner"),
    loginPartnerLabel: partnerById[S.partnerId] ? partnerById[S.partnerId].naam : "Kies je organisatie",
    loginPartnerOpts,
    nvFteDdOpen: dd === "nvFte",
    toggleNvFteDd: openDd("nvFte"),
    nvFteOpts,
    nvSchaalDdOpen: dd === "nvSchaal",
    toggleNvSchaalDd: openDd("nvSchaal"),
    nvSchaalOpts,
    nvTijdDdOpen: dd === "nvTijd",
    toggleNvTijdDd: openDd("nvTijd"),
    nvTijdOpts,
    calTitle, calDays,
    calPrev: () => calShift(-1),
    calNext: () => calShift(1),
    calNvBeginOpen: dd === "calNvBegin",
    toggleNvBeginCal: () => (S.ddOpen === "calNvBegin" ? set({ ddOpen: null }) : openCal("calNvBegin", S.nv.begin)),
    nvBeginLabel: S.nv.begin ? fmtDatum(S.nv.begin) : "Kies datum",
    calNvEindOpen: dd === "calNvEind",
    toggleNvEindCal: () => (S.ddOpen === "calNvEind" ? set({ ddOpen: null }) : openCal("calNvEind", S.nv.eind)),
    nvEindLabel: S.nv.eind ? fmtDatum(S.nv.eind) : "Kies datum",
    calNvSluitOpen: dd === "calNvSluit",
    toggleNvSluitCal: () => (S.ddOpen === "calNvSluit" ? set({ ddOpen: null }) : openCal("calNvSluit", S.nv.sluitDatum)),
    nvSluitLabel: S.nv.sluitDatum ? fmtDatum(S.nv.sluitDatum) : "Kies datum",
    calDashVanOpen: dd === "calDashVan",
    toggleDashVanCal: () => (S.ddOpen === "calDashVan" ? set({ ddOpen: null }) : openCal("calDashVan", S.dashVan)),
    dashVanLabel: S.dashVan ? fmtDatum(S.dashVan) : "Begindatum",
    calDashTotOpen: dd === "calDashTot",
    toggleDashTotCal: () => (S.ddOpen === "calDashTot" ? set({ ddOpen: null }) : openCal("calDashTot", S.dashTot)),
    dashTotLabel: S.dashTot ? fmtDatum(S.dashTot) : "Einddatum",
    alleDagenLabel: alleDagenSel ? "Wis alle" : "Selecteer alle",
    toggleAlleDagen: () => setNv("dagen", alleDagenSel ? [] : ["ma", "di", "wo", "do", "vr"]),
    vacRows,
    noResults: vacRows.length === 0,
    // scholen
    schoolRows,
    schoolNoResults: schoolRows.length === 0,
    // partners
    partnersSub,
    partnerRows,
    partnersEmpty: partnerRows.length === 0,
    // kandidaten
    kandSub: (partner ? partner.naam : "") + " · beheer je pool en volg de status van aanbiedingen",
    kandCards,
    kandRows,
    // drawer
    drawerOpen: !!dv,
    closeDrawer: () => set({ drawerVacId: null, offerSel: null, offerNote: "" }),
    stopProp: (e: React.MouseEvent) => e.stopPropagation(),
    dvIsPO: dv ? dv.school.type === "PO" : false,
    dvIsVO: dv ? dv.school.type === "VO" : false,
    dvIsOpen: dv ? dv.v.status === "open" : false,
    dvIsGevuld: dv ? dv.v.status === "gevuld" : false,
    dvFunctie: dv ? dv.v.functie : "",
    dvSchoolLine: dv ? dv.school.naam + " · " + dv.school.plaats : "",
    dvFte: dv ? dv.v.fte : "",
    dvSchaal: dv ? dv.v.schaal : "",
    dvIngang: dv ? dv.v.ingang : "",
    dvGeplaatst: dv ? doorOf(dv.v) + " · " + dv.v.geplaatstOp : "",
    dvOmschrijving: dv ? dv.v.omschrijving : "",
    dvShowOms: !!(dv && dv.v.omschrijving),
    dvConcept: dv ? conceptOf(dv.v.schoolId) : "",
    dvShowReden: !!(dv && dv.v.reden), dvReden: dv ? (dv.v.reden || "") : "",
    dvShowPeriode: !!(dv && dv.v.periode), dvPeriode: dv ? (dv.v.periode || "") : "",
    dvShowDagen: !!(dv && dv.v.dagen), dvDagen: dv ? (dv.v.dagen || "") : "",
    dvShowVereist: !!(dv && dv.v.vereist), dvVereist: dv ? (dv.v.vereist || "") : "",
    dvShowPre: !!(dv && dv.v.pre), dvPre: dv ? (dv.v.pre || "") : "",
    dvShowGroep: !!(dv && dv.v.leerlinggroep), dvGroep: dv ? (dv.v.leerlinggroep || "") : "",
    dvShowSluit: !!(dv && dv.v.sluit), dvSluit: dv ? (dv.v.sluit || "") : "",
    dvShowExtra: !!(dv && dv.v.extra), dvExtra: dv ? (dv.v.extra || "") : "",
    dvShowBanner: !!(dv && dv.v.status === "gevuld" && dvPlaatsing),
    dvBanner: dvPlaatsing ? "Gevuld door " + (kandById[dvPlaatsing.kandId] ? kandById[dvPlaatsing.kandId].naam : "") + " (" + (partnerById[dvPlaatsing.partnerId] ? partnerById[dvPlaatsing.partnerId].naam : "") + ") · goedgekeurd op " + (dvPlaatsing.beoordeeldOp || dvPlaatsing.datum) : "",
    dvOffersTitle: role === "partner" ? "Jouw aanbiedingen" : "Aangeboden kandidaten",
    dvDetailsOpen: !!S.dvDetailsOpen,
    toggleDvDetails: () => set({ dvDetailsOpen: !S.dvDetailsOpen }),
    dvDetailsLabel: S.dvDetailsOpen ? "Verberg details ▴" : "Meer details ▾",
    dvKandBtns: mkBtns<"dvKandFilter">([["alle", "Alle"], ["open", "Open"]], S.dvKandFilter, "dvKandFilter"),
    dvOffersCount: String(dvOffers.length),
    dvNoOffers: dvOffers.length === 0,
    dvOffers,
    showOtherOffers,
    otherOffersLabel,
    showOfferForm: !!(dv && role === "partner" && dv.v.status === "open"),
    hasAvailable,
    noAvailable: !hasAvailable,
    offerCandidates,
    offerNote: S.offerNote,
    onOfferNote: (e: InputEvent) => set({ offerNote: e.target.value }),
    canSubmitOffer: !!S.offerSel,
    offerHint: !S.offerSel,
    submitOffer: () => submitOffer(),
    // modal
    modalOpen: S.modalOpen,
    closeModal: () => set({ modalOpen: false }),
    modalSub: role === "directeur" ? "Wordt geplaatst namens jouw school" : "Plaats een vacature namens een school (PO via stafbureau)",
    isHRModal: role !== "directeur",
    isDirModal: role === "directeur",
    dirSchoolNaam: dirSchool ? dirSchool.naam + " · " + dirSchool.plaats : "",
    nvFunctie: S.nv.functie,
    onNvFunctie: (e: InputEvent) => setNv("functie", e.target.value),
    nvReden: S.nv.reden,
    onNvReden: (e: InputEvent) => setNv("reden", e.target.value),
    dagChips: ["ma", "di", "wo", "do", "vr"].map((d) => ({
      label: d,
      active: S.nv.dagen.includes(d),
      inactive: !S.nv.dagen.includes(d),
      toggle: () => toggleDag(d),
    })),
    nvVereist: S.nv.vereist,
    onNvVereist: (e: InputEvent) => setNv("vereist", e.target.value),
    nvPre: S.nv.pre,
    onNvPre: (e: InputEvent) => setNv("pre", e.target.value),
    nvGroep: S.nv.leerlinggroep,
    onNvGroep: (e: InputEvent) => setNv("leerlinggroep", e.target.value),
    nvExtra: S.nv.extra,
    onNvExtra: (e: InputEvent) => setNv("extra", e.target.value),
    nvFte: S.nv.fte,
    nvSchaal: S.nv.schaal,
    nvSluitTijd: S.nv.sluitTijd,
    modalConcept: (role === "directeur" ? S.dirSchoolId : S.nv.schoolId) ? conceptOf(role === "directeur" ? S.dirSchoolId : S.nv.schoolId) : "—",
    canSubmitVac,
    cannotSubmitVac: !canSubmitVac,
    submitVac: () => submitVac(),
    // toast
    toastVisible: !!S.toast,
    toastMsg: S.toast || "",
  };
}

export type PortalVals = ReturnType<typeof usePortal>;
