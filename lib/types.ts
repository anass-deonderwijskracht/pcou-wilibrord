export type Rol = "hr" | "directeur" | "partner";
export type SchoolType = "PO" | "VO";
export type VacStatus = "open" | "gevuld";
export type OfferStatus = "in behandeling" | "goedgekeurd" | "afgewezen";

export interface School {
  id: string;
  naam: string;
  plaats: string;
  type: SchoolType;
}

export interface Partner {
  id: string;
  naam: string;
}

export interface Kandidaat {
  id: string;
  partnerId: string;
  naam: string;
  profiel: string;
  fte: string;
  ervaring: string;
}

export interface Vacature {
  id: string;
  schoolId: string;
  functie: string;
  fte: string;
  schaal: string;
  ingang: string;
  geplaatstOp: string;
  status: VacStatus;
  omschrijving: string;
  door?: string;
  reden?: string;
  periode?: string;
  dagen?: string;
  vereist?: string;
  pre?: string;
  leerlinggroep?: string;
  extra?: string;
  sluit?: string;
}

export interface Aanbieding {
  id: string;
  vacId: string;
  kandId: string;
  partnerId: string;
  status: OfferStatus;
  datum: string;
  beoordeeldOp?: string;
  beoordeeldDoor?: string;
  motivatie?: string;
  reactie?: string;
}

export interface NieuweVacature {
  functie: string;
  schoolId: string;
  reden: string;
  begin: string;
  eind: string;
  dagen: string[];
  vereist: string;
  pre: string;
  leerlinggroep: string;
  extra: string;
  sluitDatum: string;
  sluitTijd: string;
  fte: string;
  schaal: string;
}

export interface CvData {
  meta: string;
  samenvatting: string;
  werk: { periode: string; rol: string; org: string }[];
  opleiding: { periode: string; titel: string }[];
  vaardigheden: string[];
}
