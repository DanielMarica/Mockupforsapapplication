export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface Language {
  id: string;
  lang: string;
  level: string;
}

export interface CVData {
  photo: string | null;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  languages: Language[];
}

export const MOCK_CV_DATA: CVData = {
  photo: null,
  name: "Jean-Pierre Dubois",
  title: "SAP Functional Consultant",
  email: "jp.dubois@flexso.com",
  phone: "+32 478 12 34 56",
  location: "Bruxelles, Belgique",
  linkedin: "linkedin.com/in/jpdubois",
  website: "www.flexso.com",
  summary:
    "Consultant SAP expérimenté avec plus de 8 ans d'expertise dans les modules FI/CO et SD. Spécialiste des transformations digitales et de l'intégration des processus métier.",
  skills: ["SAP FI/CO", "SAP SD", "SAP S/4HANA", "ABAP", "Fiori", "BTP", "Agile/Scrum"],
  experiences: [
    {
      id: "exp1",
      role: "Senior SAP Consultant",
      company: "Flexso",
      period: "2019 – Présent",
      description:
        "Lead consultant sur projets S/4HANA pour clients belges et luxembourgeois.",
    },
    {
      id: "exp2",
      role: "SAP FI/CO Consultant",
      company: "Deloitte Belgium",
      period: "2016 – 2019",
      description:
        "Implémentation et support des modules financiers SAP pour secteur bancaire.",
    },
  ],
  education: [
    { id: "edu1", degree: "Master en Informatique de Gestion", school: "UCLouvain", year: "2016" },
    { id: "edu2", degree: "Bachelor Économie appliquée", school: "ULB", year: "2014" },
  ],
  languages: [
    { id: "lang1", lang: "Français", level: "Natif" },
    { id: "lang2", lang: "Néerlandais", level: "Courant" },
    { id: "lang3", lang: "Anglais", level: "Professionnel" },
  ],
};
