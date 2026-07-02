import type { Aanbieding, CvData, Kandidaat, NieuweVacature, Partner, School, Vacature } from "./types";

export const scholen: School[] = [
  { id: "s1", naam: "SBO Belle van Zuylen", plaats: "Utrecht", type: "PO" },
  { id: "s2", naam: "STIP VSO Utrecht", plaats: "Utrecht", type: "VO" },
  { id: "s3", naam: "Amadeus Lyceum", plaats: "Vleuten", type: "VO" },
  { id: "s4", naam: "2e Marnixschool", plaats: "Utrecht", type: "PO" },
  { id: "s5", naam: "Koningin Beatrixschool", plaats: "De Meern", type: "PO" },
  { id: "s6", naam: "Rafael", plaats: "Utrecht", type: "PO" },
  { id: "s7", naam: "Blauwe Aventurijn", plaats: "Utrecht", type: "PO" },
  { id: "s8", naam: "Torenpleinschool", plaats: "Vleuten", type: "PO" },
  { id: "s9", naam: "Broeckland College", plaats: "Breukelen", type: "VO" },
  { id: "s10", naam: "Christelijk Gymnasium", plaats: "Utrecht", type: "VO" },
  { id: "s11", naam: "De Schakel", plaats: "Utrecht", type: "PO" },
  { id: "s12", naam: "Gerrit Rietveld College", plaats: "Utrecht", type: "VO" },
  { id: "s13", naam: "De Fakkel", plaats: "Utrecht", type: "PO" },
  { id: "s14", naam: "De Oase", plaats: "Utrecht", type: "PO" },
  { id: "s15", naam: "Globe College", plaats: "Utrecht", type: "VO" },
  { id: "s16", naam: "Kranenburg Praktijkonderwijs", plaats: "Utrecht", type: "VO" },
  { id: "s17", naam: "Da Costaschool Hoograven", plaats: "Utrecht", type: "PO" },
  { id: "s18", naam: "De Olijfboom", plaats: "Utrecht", type: "PO" },
  { id: "s19", naam: "Limus College", plaats: "Vleuten", type: "VO" },
  { id: "s20", naam: "Op Avontuur", plaats: "Utrecht", type: "PO" },
  { id: "s21", naam: "Niftarlake College", plaats: "Maarssen", type: "VO" },
  { id: "s22", naam: "De Boemerang", plaats: "Utrecht", type: "PO" },
  { id: "s23", naam: "Oosterlicht College", plaats: "Nieuwegein", type: "VO" },
  { id: "s24", naam: "Lekpoort College", plaats: "Vianen", type: "VO" },
  { id: "s25", naam: "De Boomgaard", plaats: "Utrecht", type: "PO" },
  { id: "s26", naam: "St. Bonifatiuscollege", plaats: "Utrecht", type: "VO" },
  { id: "s27", naam: "De Krullevaar", plaats: "De Meern", type: "PO" },
  { id: "s28", naam: "Waldorf Utrecht", plaats: "Utrecht", type: "PO" },
  { id: "s29", naam: "De Odyssee", plaats: "Utrecht", type: "PO" },
  { id: "s30", naam: "Descart", plaats: "Utrecht", type: "VO" },
  { id: "s31", naam: "De Piramide", plaats: "Utrecht", type: "PO" },
  { id: "s32", naam: "Praktijkschool de Baanbreker", plaats: "IJsselstein", type: "VO" },
  { id: "s33", naam: "De Kleine Vliegenier", plaats: "Utrecht", type: "PO" },
  { id: "s34", naam: "De Regenboog (Regentesselaan)", plaats: "Utrecht", type: "PO" },
  { id: "s35", naam: "De Regenboog (Wevelaan)", plaats: "Utrecht", type: "PO" },
  { id: "s36", naam: "De Ridderhof", plaats: "Utrecht", type: "PO" },
  { id: "s37", naam: "Jenaplanschool De Brug (De Kade)", plaats: "Utrecht", type: "PO" },
  { id: "s38", naam: "Jenaplanschool De Brug (De Laan)", plaats: "Utrecht", type: "PO" },
  { id: "s39", naam: "Buurtschool Hart van Noord", plaats: "Utrecht", type: "PO" },
  { id: "s40", naam: "Op Dreef", plaats: "Utrecht", type: "PO" },
  { id: "s41", naam: "Kindercampus Molenpark", plaats: "Utrecht", type: "PO" },
  { id: "s42", naam: "Taalschool Utrecht", plaats: "Utrecht", type: "PO" },
  { id: "s43", naam: "Taalschool Utrecht (locatie Leidsche Rijn)", plaats: "Utrecht", type: "PO" },
  { id: "s44", naam: "Van Asch van Wijckschool", plaats: "Utrecht", type: "PO" },
  { id: "s45", naam: "De Wereldwijzer", plaats: "Utrecht", type: "PO" },
  { id: "s46", naam: "Jenaplanschool Zonnewereld", plaats: "Vleuten", type: "PO" },
  { id: "s47", naam: "Kindcentrum Leeuwesteyn", plaats: "Utrecht", type: "PO" },
];

export const partners: Partner[] = [
  { id: "p1", naam: "De Onderwijskracht" },
  { id: "p2", naam: "DeRec" },
  { id: "p3", naam: "Edulance" },
  { id: "p4", naam: "Daan" },
  { id: "p5", naam: "Maandag" },
  { id: "p6", naam: "Matchpartner" },
  { id: "p7", naam: "Randstad" },
  { id: "p8", naam: "Upwijs Recruitment" },
];

export const directeuren: Record<string, string> = {
  s1: "Ingrid Vos", s3: "Bart Hendriks", s5: "Petra de Lange", s7: "Joost van Es",
  s10: "Annemieke Brouwer", s12: "Frank Peeters", s15: "Said Achahbar", s16: "Carla Smeets",
  s17: "Renske Molenaar", s23: "Dirk-Jan Kok", s25: "Hanneke Vermeer", s27: "Tom Egberts",
  s30: "Caroline Verlee", s32: "Sandra Louwers", s34: "Els van der Steen", s42: "Mounia Karimi",
  s46: "Wouter Blom",
};

export const partnerContacts: Record<string, string> = {
  p1: "Zakaria", p2: "Annemarie", p3: "Hidde Kollenburg", p4: "Nadine van der Valk",
  p5: "Capri Fisscher", p6: "Irene Kammers", p7: "Carla Jagers", p8: "Guus Veldhuijzen",
};

export const partnerEmails: Record<string, string> = {
  p1: "zakaria@deonderwijskracht.nl", p2: "annemarie@derec.nl", p3: "hidde@edulance.nl",
  p4: "nadinevandervalk@daan.eu", p5: "capri.fisscher@maandag.com", p6: "irene@matchpartner.nl",
  p7: "carla.jagers@nl.randstad.com", p8: "guus.veldhuijzen@upwijs.nl",
};

export const hrNaam = "Jaap van Lambalgen";

export function dirNaam(id: string): string {
  return directeuren[id] || "Schooldirectie";
}

export const concepten: Record<string, string> = {
  s1: "Speciaal basisonderwijs (SBO)", s2: "Voortgezet speciaal onderwijs", s10: "Gymnasium",
  s14: "Montessori", s16: "Praktijkonderwijs", s28: "Vrijeschool", s29: "Montessori",
  s32: "Praktijkonderwijs", s37: "Jenaplan", s38: "Jenaplan", s42: "Nieuwkomersonderwijs",
  s43: "Nieuwkomersonderwijs", s46: "Jenaplan",
};

export function conceptOf(id: string): string {
  return concepten[id] || "Regulier";
}

export function fmtDatum(iso: string): string {
  if (!iso) return "";
  const p = String(iso).split("-");
  const mnd = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  if (p.length !== 3) return iso;
  return parseInt(p[2], 10) + " " + (mnd[parseInt(p[1], 10) - 1] || "") + " " + p[0];
}

export function parseDatum(s: string): number {
  if (!s) return 0;
  const mnd: Record<string, number> = { jan: 1, feb: 2, mrt: 3, apr: 4, mei: 5, jun: 6, jul: 7, aug: 8, sep: 9, okt: 10, nov: 11, dec: 12 };
  const p = String(s).trim().split(" ");
  const d = parseInt(p[0], 10);
  const m = mnd[p[1]];
  if (!d || !m) return 0;
  return m * 100 + d;
}

export function parseIso(iso: string): number {
  const p = String(iso).split("-");
  if (p.length < 3) return 0;
  return parseInt(p[1], 10) * 100 + parseInt(p[2], 10);
}

export function nvLeeg(): NieuweVacature {
  return { functie: "", schoolId: "", reden: "", begin: "", eind: "", dagen: [], vereist: "", pre: "", leerlinggroep: "", extra: "", sluitDatum: "", sluitTijd: "12:00", fte: "1,0", schaal: "L10" };
}

export function buildCv(k: Kandidaat): CvData {
  const idx = parseInt(String(k.id).slice(1), 10) || 1;
  const jaren = parseInt(k.ervaring, 10) || 3;
  const steden = ["Utrecht", "Amersfoort", "Nieuwegein", "Houten", "Zeist", "Maarssen", "Woerden", "IJsselstein"];
  const stad = steden[idx % steden.length];
  const laag = k.profiel.toLowerCase();
  const isVO = laag.includes("docent") || laag.includes("teamleider") || laag.includes("instructeur") || laag.includes("techniek");
  const vorigeRol = laag.includes("intern begeleider") ? "Leerkracht bovenbouw"
    : laag.includes("teamleider") ? "Docent maatschappijleer"
      : laag.includes("onderwijsassistent") ? "Pedagogisch medewerker"
        : isVO ? "Docent (startbekwaam)" : "Leerkracht (startbekwaam)";
  const orgNu = isVO
    ? ["Via Nova College", "SG Het Kompas", "College De Opmaat", "Lyceum De Linie"][idx % 4]
    : ["Basisschool De Meander", "KC Het Palet", "Basisschool De Vuurtoren", "Daltonschool De Kring"][idx % 4];
  const orgVorig = isVO ? "Scholengroep Eemland" : "Basisschool De Windroos";
  const startNu = 2026 - Math.min(jaren, 5);
  const startLoopbaan = 2026 - jaren;
  const opl = isVO
    ? (laag.includes("1e gr") ? "Eerstegraads lerarenopleiding — Universiteit Utrecht" : "Tweedegraads lerarenopleiding — Hogeschool Utrecht")
    : "PABO — Marnix Academie, Utrecht";
  const vaardig = [
    ["Klassenmanagement", "Differentiëren", "Ouderbetrokkenheid", "EDI"],
    ["Formatief evalueren", "ICT in de les", "Mentoraat", "Coachen van collega’s"],
    ["NT2", "Spelend leren", "Zorgstructuur", "Rekenverbetertraject"],
  ][idx % 3];
  return {
    meta: k.fte + " fte beschikbaar · " + k.ervaring + " ervaring · woonachtig in " + stad,
    samenvatting: k.naam.split(" ")[0] + " is een ervaren " + (isVO ? "docent" : "onderwijsprofessional") + " (" + k.ervaring + ") en zoekt een rol als " + k.profiel.split(" (")[0].toLowerCase() + " in de regio Utrecht. Direct beschikbaar via detachering.",
    werk: [
      { periode: startNu + " – heden", rol: k.profiel, org: orgNu + ", " + stad },
      { periode: startLoopbaan + " – " + startNu, rol: vorigeRol, org: orgVorig + ", Utrecht" },
    ],
    opleiding: [
      { periode: (startLoopbaan - 4) + " – " + startLoopbaan, titel: opl },
    ],
    vaardigheden: vaardig,
  };
}

export const kandidaten: Kandidaat[] = [
  { id: "k1", partnerId: "p1", naam: "Sanne de Vries", profiel: "Onderwijsassistent", fte: "1,0", ervaring: "4 jr" },
  { id: "k2", partnerId: "p1", naam: "Jeroen Bakker", profiel: "Docent Engels (2e gr.)", fte: "0,6", ervaring: "9 jr" },
  { id: "k3", partnerId: "p1", naam: "Fatima el Amrani", profiel: "Leerkracht PO", fte: "0,8", ervaring: "6 jr" },
  { id: "k4", partnerId: "p1", naam: "Mark Visser", profiel: "Docent Wiskunde (2e gr.)", fte: "0,8", ervaring: "11 jr" },
  { id: "k5", partnerId: "p1", naam: "Lotte Jansen", profiel: "Leerkracht PO (onderbouw)", fte: "0,6", ervaring: "3 jr" },
  { id: "k6", partnerId: "p1", naam: "Ruben Smit", profiel: "Docent Nederlands (1e gr.)", fte: "1,0", ervaring: "13 jr" },
  { id: "k7", partnerId: "p2", naam: "Emma van Dijk", profiel: "Leerkracht PO (bovenbouw)", fte: "1,0", ervaring: "8 jr" },
  { id: "k8", partnerId: "p2", naam: "Thijs Mulder", profiel: "Leerkracht PO", fte: "0,8", ervaring: "2 jr" },
  { id: "k9", partnerId: "p2", naam: "Nadia Yilmaz", profiel: "Intern begeleider", fte: "0,8", ervaring: "10 jr" },
  { id: "k10", partnerId: "p2", naam: "Pieter de Groot", profiel: "Docent Biologie (2e gr.)", fte: "0,7", ervaring: "5 jr" },
  { id: "k11", partnerId: "p2", naam: "Iris Hoekstra", profiel: "Leerkracht PO", fte: "1,0", ervaring: "7 jr" },
  { id: "k12", partnerId: "p3", naam: "Daan Vermeulen", profiel: "Docent Wiskunde (2e gr.)", fte: "1,0", ervaring: "4 jr" },
  { id: "k13", partnerId: "p3", naam: "Sophie Willems", profiel: "Leerkracht PO (onderbouw)", fte: "0,6", ervaring: "6 jr" },
  { id: "k14", partnerId: "p3", naam: "Bram Kuiper", profiel: "Vakleerkracht bewegingsonderwijs", fte: "0,4", ervaring: "5 jr" },
  { id: "k15", partnerId: "p3", naam: "Anouk Peters", profiel: "Docent Engels (2e gr.)", fte: "0,8", ervaring: "7 jr" },
  { id: "k16", partnerId: "p4", naam: "Hugo van Leeuwen", profiel: "Leerkracht PO (bovenbouw)", fte: "1,0", ervaring: "12 jr" },
  { id: "k17", partnerId: "p4", naam: "Merel Dijkstra", profiel: "Leerkracht PO", fte: "0,8", ervaring: "5 jr" },
  { id: "k18", partnerId: "p4", naam: "Karim Bouali", profiel: "Docent Frans (2e gr.)", fte: "0,5", ervaring: "8 jr" },
  { id: "k19", partnerId: "p4", naam: "Femke Bos", profiel: "Intern begeleider", fte: "0,6", ervaring: "9 jr" },
  { id: "k20", partnerId: "p5", naam: "Julia Meijer", profiel: "Leerkracht PO (onderbouw)", fte: "0,8", ervaring: "4 jr" },
  { id: "k21", partnerId: "p5", naam: "Sem de Boer", profiel: "Docent Nederlands (1e gr.)", fte: "1,0", ervaring: "6 jr" },
  { id: "k22", partnerId: "p5", naam: "Tess van den Berg", profiel: "Onderwijsassistent", fte: "0,8", ervaring: "3 jr" },
  { id: "k23", partnerId: "p5", naam: "Youssef Hassan", profiel: "Teamleider VO", fte: "1,0", ervaring: "14 jr" },
  { id: "k24", partnerId: "p6", naam: "Lars Prins", profiel: "Docent Natuurkunde (1e gr.)", fte: "1,0", ervaring: "10 jr" },
  { id: "k25", partnerId: "p6", naam: "Eva Schouten", profiel: "Leerkracht PO (onderbouw)", fte: "0,8", ervaring: "6 jr" },
  { id: "k26", partnerId: "p6", naam: "Tim Groenewegen", profiel: "Docent Wiskunde (2e gr.)", fte: "0,6", ervaring: "3 jr" },
  { id: "k27", partnerId: "p6", naam: "Roos Verhoeven", profiel: "Instructeur techniek", fte: "0,8", ervaring: "7 jr" },
  { id: "k28", partnerId: "p7", naam: "Nina Kramer", profiel: "Leerkracht PO", fte: "1,0", ervaring: "5 jr" },
  { id: "k29", partnerId: "p7", naam: "Bas Timmermans", profiel: "Leerkracht PO (bovenbouw)", fte: "1,0", ervaring: "4 jr" },
  { id: "k30", partnerId: "p7", naam: "Amber de Wit", profiel: "Docent Engels (2e gr.)", fte: "0,6", ervaring: "6 jr" },
  { id: "k31", partnerId: "p7", naam: "Omar Farouk", profiel: "Docent techniek / PIE", fte: "0,8", ervaring: "9 jr" },
  { id: "k32", partnerId: "p8", naam: "Sven Hofman", profiel: "Vakleerkracht bewegingsonderwijs", fte: "0,4", ervaring: "5 jr" },
  { id: "k33", partnerId: "p8", naam: "Maartje Kok", profiel: "Leerkracht PO", fte: "0,8", ervaring: "6 jr" },
  { id: "k34", partnerId: "p8", naam: "Dennis Vrolijk", profiel: "Docent Wiskunde (2e gr.)", fte: "1,0", ervaring: "7 jr" },
];

export const vacData: Vacature[] = [
  { id: "v1", schoolId: "s5", functie: "Leerkracht groep 5", fte: "0,8–1,0", schaal: "L10", ingang: "24 aug 2026", geplaatstOp: "10 jun", status: "open", omschrijving: "Enthousiaste leerkracht voor een fijne middenbouwgroep. Ervaring met EDI is een pre." },
  { id: "v2", schoolId: "s25", functie: "Leerkracht groep 3", fte: "0,6", schaal: "L10", ingang: "24 aug 2026", geplaatstOp: "12 jun", status: "open", omschrijving: "Leerkracht met hart voor het jonge kind en aanvankelijk lezen." },
  { id: "v3", schoolId: "s34", functie: "Intern begeleider", fte: "0,8", schaal: "L11", ingang: "1 sep 2026", geplaatstOp: "15 jun", status: "open", omschrijving: "IB-er met ervaring in het opzetten van een stevige ondersteuningsstructuur." },
  { id: "v4", schoolId: "s42", functie: "Onderwijsassistent", fte: "1,0", schaal: "Schaal 6", ingang: "24 aug 2026", geplaatstOp: "2 jun", status: "gevuld", omschrijving: "Ondersteuning van nieuwkomersgroepen, affiniteit met NT2 gevraagd." },
  { id: "v5", schoolId: "s46", functie: "Leerkracht bovenbouw", fte: "1,0", schaal: "L10", ingang: "24 aug 2026", geplaatstOp: "28 mei", status: "gevuld", omschrijving: "Jenaplan-ervaring of de bereidheid je hierin te scholen." },
  { id: "v6", schoolId: "s17", functie: "Vakleerkracht bewegingsonderwijs", fte: "0,4", schaal: "L10", ingang: "1 okt 2026", geplaatstOp: "26 jun", status: "open", omschrijving: "ALO-opgeleid, twee vaste lesdagen per week." },
  { id: "v7", schoolId: "s7", functie: "Leerkracht groep 1/2", fte: "0,8", schaal: "L10", ingang: "24 aug 2026", geplaatstOp: "18 jun", status: "open", omschrijving: "Kleuterleerkracht met oog voor spelend leren." },
  { id: "v8", schoolId: "s1", functie: "Intern begeleider SBO", fte: "0,6", schaal: "L11", ingang: "1 sep 2026", geplaatstOp: "8 jun", status: "open", omschrijving: "Ervaring in het speciaal (basis)onderwijs is vereist." },
  { id: "v9", schoolId: "s3", functie: "Docent Wiskunde (2e graads)", fte: "0,8", schaal: "LB", ingang: "24 aug 2026", geplaatstOp: "11 jun", status: "open", omschrijving: "Lessen in onder- en bovenbouw havo/vwo, sectie van zes collega's." },
  { id: "v10", schoolId: "s10", functie: "Docent Nederlands (1e graads)", fte: "1,0", schaal: "LD", ingang: "24 aug 2026", geplaatstOp: "14 jun", status: "open", omschrijving: "Bovenbouwlessen en examenklassen op ons gymnasium." },
  { id: "v11", schoolId: "s3", functie: "Docent Engels (2e graads)", fte: "0,6", schaal: "LB", ingang: "24 aug 2026", geplaatstOp: "20 mei", status: "gevuld", omschrijving: "Tijdelijke vervanging wegens zwangerschapsverlof." },
  { id: "v12", schoolId: "s15", functie: "Teamleider onderbouw", fte: "1,0", schaal: "LD", ingang: "1 okt 2026", geplaatstOp: "17 jun", status: "open", omschrijving: "Leidinggevende met visie op kansengelijkheid." },
  { id: "v13", schoolId: "s12", functie: "Docent Biologie (2e graads)", fte: "0,7", schaal: "LB", ingang: "24 aug 2026", geplaatstOp: "22 jun", status: "open", omschrijving: "Moderne betavleugel met eigen practicumlokalen." },
  { id: "v14", schoolId: "s16", functie: "Instructeur Techniek", fte: "0,8", schaal: "Schaal 7", ingang: "1 sep 2026", geplaatstOp: "13 jun", status: "open", omschrijving: "Praktijkonderwijs, profiel techniek en wonen." },
  { id: "v15", schoolId: "s23", functie: "Docent Natuurkunde (1e graads)", fte: "1,0", schaal: "LC", ingang: "24 aug 2026", geplaatstOp: "25 mei", status: "gevuld", omschrijving: "Bovenbouw havo/vwo, TTO-ervaring is een pre." },
  { id: "v16", schoolId: "s27", functie: "Leerkracht groep 7", fte: "1,0", schaal: "L10", ingang: "24 aug 2026", geplaatstOp: "30 mei", status: "gevuld", omschrijving: "Stevige bovenbouwleerkracht met humor." },
  { id: "v17", schoolId: "s3", functie: "Docent Frans (2e graads)", fte: "0,5", schaal: "LB", ingang: "1 sep 2026", geplaatstOp: "19 jun", status: "open", omschrijving: "Onderbouwklassen havo/vwo." },
  { id: "v18", schoolId: "s32", functie: "Docent PIE / mentor", fte: "0,6", schaal: "LB", ingang: "1 sep 2026", geplaatstOp: "23 jun", status: "open", omschrijving: "Praktijkschool, profiel produceren, installeren en energie." },
];

export const offerData: Aanbieding[] = [
  { id: "a1", vacId: "v1", kandId: "k3", partnerId: "p1", status: "in behandeling", datum: "24 jun", motivatie: "Fatima draait al twee jaar sterke middenbouwgroepen in Utrecht-West." },
  { id: "a2", vacId: "v1", kandId: "k8", partnerId: "p2", status: "afgewezen", datum: "18 jun", beoordeeldOp: "23 jun", motivatie: "Thijs is leergierig en per direct beschikbaar.", reactie: "Te weinig ervaring met zelfstandig een groep draaien." },
  { id: "a3", vacId: "v1", kandId: "k28", partnerId: "p7", status: "in behandeling", datum: "29 jun", motivatie: "Nina is per direct beschikbaar en woont in Leidsche Rijn." },
  { id: "a4", vacId: "v2", kandId: "k13", partnerId: "p3", status: "in behandeling", datum: "26 jun", motivatie: "Sophie is gespecialiseerd in aanvankelijk lezen." },
  { id: "a5", vacId: "v2", kandId: "k17", partnerId: "p4", status: "in behandeling", datum: "27 jun", motivatie: "Merel heeft ervaring in groep 3 en groep 4." },
  { id: "a6", vacId: "v3", kandId: "k9", partnerId: "p2", status: "in behandeling", datum: "25 jun", motivatie: "Nadia bouwde de ondersteuningsstructuur op bij haar huidige school." },
  { id: "a7", vacId: "v4", kandId: "k1", partnerId: "p1", status: "goedgekeurd", datum: "12 jun", beoordeeldOp: "22 jun", motivatie: "Sanne heeft NT2-ervaring op een taalschool in Amersfoort." },
  { id: "a8", vacId: "v5", kandId: "k7", partnerId: "p2", status: "goedgekeurd", datum: "8 jun", beoordeeldOp: "16 jun", motivatie: "Emma werkte vijf jaar op een jenaplanschool." },
  { id: "a9", vacId: "v5", kandId: "k29", partnerId: "p7", status: "afgewezen", datum: "5 jun", beoordeeldOp: "12 jun", motivatie: "Bas is een stevige bovenbouwleerkracht.", reactie: "Jenaplan-achtergrond ontbreekt." },
  { id: "a10", vacId: "v7", kandId: "k20", partnerId: "p5", status: "in behandeling", datum: "28 jun", motivatie: "Julia koos bewust voor het jonge kind." },
  { id: "a11", vacId: "v7", kandId: "k25", partnerId: "p6", status: "in behandeling", datum: "30 jun", motivatie: "Eva heeft ruime kleuterervaring." },
  { id: "a12", vacId: "v8", kandId: "k19", partnerId: "p4", status: "afgewezen", datum: "15 jun", beoordeeldOp: "20 jun", motivatie: "Femke wil de overstap naar het SBO maken.", reactie: "SBO-ervaring is voor deze rol een harde eis." },
  { id: "a13", vacId: "v9", kandId: "k4", partnerId: "p1", status: "in behandeling", datum: "23 jun", motivatie: "Mark geeft nu wiskunde op een lyceum in Amersfoort." },
  { id: "a14", vacId: "v9", kandId: "k12", partnerId: "p3", status: "in behandeling", datum: "25 jun", motivatie: "Daan is tweedegraads bevoegd en direct inzetbaar." },
  { id: "a15", vacId: "v9", kandId: "k26", partnerId: "p6", status: "afgewezen", datum: "16 jun", beoordeeldOp: "21 jun", motivatie: "Tim rondt zijn bevoegdheid deze zomer af.", reactie: "Bevoegdheid is nog niet afgerond." },
  { id: "a16", vacId: "v10", kandId: "k6", partnerId: "p1", status: "in behandeling", datum: "27 jun", motivatie: "Ruben heeft tien jaar examenervaring." },
  { id: "a17", vacId: "v10", kandId: "k21", partnerId: "p5", status: "in behandeling", datum: "29 jun", motivatie: "Sem publiceerde lesmateriaal voor de bovenbouw." },
  { id: "a18", vacId: "v11", kandId: "k2", partnerId: "p1", status: "goedgekeurd", datum: "2 jun", beoordeeldOp: "10 jun", motivatie: "Jeroen kan de volledige vervanging invullen." },
  { id: "a19", vacId: "v11", kandId: "k15", partnerId: "p3", status: "afgewezen", datum: "30 mei", beoordeeldOp: "3 jun", motivatie: "Anouk zoekt een tijdelijke opdracht.", reactie: "De vacature is ingevuld met een andere kandidaat." },
  { id: "a20", vacId: "v12", kandId: "k23", partnerId: "p5", status: "in behandeling", datum: "26 jun", motivatie: "Youssef leidde drie jaar een onderbouwteam." },
  { id: "a21", vacId: "v13", kandId: "k10", partnerId: "p2", status: "in behandeling", datum: "30 jun", motivatie: "Pieter komt uit het laboratoriumonderwijs en is didactisch sterk." },
  { id: "a22", vacId: "v14", kandId: "k27", partnerId: "p6", status: "in behandeling", datum: "24 jun", motivatie: "Roos begeleidde eerder praktijkklassen techniek." },
  { id: "a23", vacId: "v15", kandId: "k24", partnerId: "p6", status: "goedgekeurd", datum: "10 jun", beoordeeldOp: "18 jun", motivatie: "Lars is eerstegraads en heeft TTO-certificering." },
  { id: "a24", vacId: "v16", kandId: "k16", partnerId: "p4", status: "goedgekeurd", datum: "15 jun", beoordeeldOp: "23 jun", motivatie: "Hugo zoekt een vaste bovenbouwgroep." },
  { id: "a25", vacId: "v17", kandId: "k18", partnerId: "p4", status: "in behandeling", datum: "29 jun", motivatie: "Karim is native speaker met tweedegraads bevoegdheid." },
  { id: "a26", vacId: "v18", kandId: "k31", partnerId: "p7", status: "in behandeling", datum: "1 jul", motivatie: "Omar werkte in het vmbo-techniekonderwijs." },
  { id: "a27", vacId: "v6", kandId: "k32", partnerId: "p8", status: "in behandeling", datum: "1 jul", motivatie: "Sven is ALO-opgeleid en per direct beschikbaar." },
];

export const vacExtraData: Record<string, Partial<Vacature>> = {
  v1: { reden: "Vertrek van een collega", periode: "24 aug 2026 t/m 31 jul 2027", dagen: "ma · di · wo · do", vereist: "PABO-diploma", pre: "Ervaring met EDI", leerlinggroep: "Groep 5", extra: "Duobaan is bespreekbaar.", sluit: "15 jul 2026 · 12:00 uur" },
  v2: { reden: "Uitbreiding formatie", periode: "24 aug 2026 t/m 31 jul 2027", dagen: "ma · di · vr", vereist: "PABO-diploma", pre: "Specialisatie jonge kind", leerlinggroep: "Groep 3", sluit: "10 jul 2026 · 12:00 uur" },
  v3: { reden: "Pensioen huidige IB-er", periode: "1 sep 2026 t/m 31 jul 2027", dagen: "di · wo · do", vereist: "Afgeronde IB-opleiding", pre: "Ervaring met HGW", leerlinggroep: "Groep 1 t/m 8", sluit: "20 jul 2026 · 12:00 uur" },
  v4: { reden: "Groei aantal nieuwkomersgroepen", periode: "24 aug 2026 t/m 31 jul 2027", dagen: "ma · di · wo · do · vr", vereist: "MBO-4 Onderwijsassistent", pre: "NT2-ervaring", leerlinggroep: "Nieuwkomersgroepen", sluit: "15 jun 2026 · 12:00 uur" },
  v5: { reden: "Zwangerschapsverlof", periode: "24 aug 2026 t/m 1 mrt 2027", dagen: "ma · di · wo · do · vr", vereist: "PABO-diploma", pre: "Jenaplan-ervaring", leerlinggroep: "Bovenbouw", sluit: "12 jun 2026 · 12:00 uur" },
  v6: { reden: "Vertrek vakleerkracht", periode: "1 okt 2026 t/m 31 jul 2027", dagen: "di · vr", vereist: "ALO-diploma", pre: "Ervaring in het PO", leerlinggroep: "Groep 3 t/m 8", sluit: "1 sep 2026 · 12:00 uur" },
  v7: { reden: "Ouderschapsverlof van een collega", periode: "24 aug 2026 t/m 31 jan 2027", dagen: "ma · di · wo · do", vereist: "PABO-diploma", pre: "Specialisatie jonge kind", leerlinggroep: "Groep 1/2", sluit: "18 jul 2026 · 12:00 uur" },
  v8: { reden: "Vertrek IB-er", periode: "1 sep 2026 t/m 31 jul 2027", dagen: "ma · do · vr", vereist: "IB-opleiding en SBO-ervaring", pre: "Kennis van de OPP-cyclus", leerlinggroep: "SBO groep 3 t/m 8", sluit: "20 jul 2026 · 12:00 uur" },
  v9: { reden: "Vertrek van een docent", periode: "24 aug 2026 t/m 31 jul 2027", dagen: "ma · di · do · vr", vereist: "Tweedegraads bevoegdheid wiskunde", pre: "Ervaring met formatief evalueren", leerlinggroep: "Onder- en bovenbouw havo/vwo", extra: "Sectie van zes collega-docenten.", sluit: "14 jul 2026 · 12:00 uur" },
  v10: { reden: "Zwangerschapsverlof", periode: "24 aug 2026 t/m 1 feb 2027", dagen: "ma · di · wo · do · vr", vereist: "Eerstegraads bevoegdheid Nederlands", pre: "Examenervaring vwo", leerlinggroep: "Bovenbouw gymnasium", sluit: "10 jul 2026 · 12:00 uur" },
  v11: { reden: "Zwangerschapsverlof", periode: "24 aug 2026 t/m 1 mrt 2027", dagen: "di · wo · vr", vereist: "Tweedegraads bevoegdheid Engels", pre: "TTO-ervaring", leerlinggroep: "Onderbouw havo/vwo", sluit: "5 jun 2026 · 12:00 uur" },
  v12: { reden: "Doorgroei huidige teamleider", periode: "Per 1 okt 2026, vast", dagen: "ma · di · wo · do · vr", vereist: "Leidinggevende ervaring in het VO", pre: "Schoolleidersopleiding", leerlinggroep: "Onderbouw", extra: "Inclusief MT-lidmaatschap.", sluit: "1 sep 2026 · 12:00 uur" },
  v13: { reden: "Uitbreiding lesuren", periode: "24 aug 2026 t/m 31 jul 2027", dagen: "di · wo · do", vereist: "Tweedegraads bevoegdheid biologie", pre: "Practicumervaring", leerlinggroep: "Onderbouw havo/vwo", sluit: "17 jul 2026 · 12:00 uur" },
  v14: { reden: "Pensioen huidige instructeur", periode: "Per 1 sep 2026, vast", dagen: "ma · di · do · vr", vereist: "Technische achtergrond met pedagogisch-didactisch getuigschrift", pre: "Ervaring in het praktijkonderwijs", leerlinggroep: "Leerjaar 1 t/m 4", sluit: "20 jul 2026 · 12:00 uur" },
  v15: { reden: "Vertrek van een docent", periode: "Per 24 aug 2026, vast", dagen: "ma · di · wo · do · vr", vereist: "Eerstegraads bevoegdheid natuurkunde", pre: "TTO-certificering", leerlinggroep: "Bovenbouw havo/vwo", sluit: "1 jun 2026 · 12:00 uur" },
  v16: { reden: "Vertrek van een collega", periode: "Per 24 aug 2026, vast", dagen: "ma · di · wo · do · vr", vereist: "PABO-diploma", pre: "Bovenbouwervaring", leerlinggroep: "Groep 7", sluit: "8 jun 2026 · 12:00 uur" },
  v17: { reden: "Langdurig verzuim", periode: "1 sep 2026 t/m 31 jan 2027", dagen: "wo · do", vereist: "Tweedegraads bevoegdheid Frans", pre: "Native speaker", leerlinggroep: "Onderbouw havo/vwo", sluit: "20 jul 2026 · 12:00 uur" },
  v18: { reden: "Nieuw profielvak PIE", periode: "Per 1 sep 2026, vast", dagen: "ma · di · do", vereist: "Bevoegdheid PIE of techniek", pre: "Ervaring met vmbo of praktijkonderwijs", leerlinggroep: "Leerjaar 3 en 4", extra: "Inclusief mentoraat van een stamgroep.", sluit: "25 jul 2026 · 12:00 uur" },
};
