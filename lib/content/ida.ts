// Présentation officielle d'IDA (Initiative pour le Développement de l'Afrique)
// — reprise telle quelle de l'ancienne plateforme (modèle CMS blog.presentation).
// Texte disponible en FR / EN / IT ; coquille « promet » corrigée en « promeut ».

export const IDA = {
  title: "Présentation d'IDA",
  expansion: "Initiative pour le Développement de l'Afrique",
  phone: "+221 33 856 42 98",
  email: "info@idainternational.org",
  description: {
    fr: [
      "L'IDA (Initiative pour le Développement de l'Afrique) est une ONG qui promeut, à travers des activités commerciales et culturelles, les principes d'un monde meilleur et contribue, par la coopération internationale, au développement du continent africain.",
      "IDA met en relation ses membres, leur offre des services de qualité et constitue un réseau permettant aux hommes d'affaires d'Afrique et du reste du monde de travailler ensemble. IDA International est porte-parole de l'ADA (Académie Diplomatique Africaine) et des hautes relations en général, et représente leurs préoccupations et intérêts dans le débat public et auprès des partenaires extérieurs.",
      "En encourageant ses membres à travailler ensemble, l'IDA facilite l'échange d'expériences et d'apprentissages ; réaffirme et défend les valeurs qui déterminent le bon fonctionnement du développement des projets en Afrique. L'IDA fait partie du registre de transparence des ONG de l'Union européenne et est dotée du statut consultatif spécial auprès du Conseil économique et social des Nations Unies (ECOSOC).",
    ],
    en: [
      "IDA (Initiative for African Development) is an NGO that promotes, through commercial and cultural activities, the principles of a better world and contributes, through international cooperation, to the development of the African continent.",
      "IDA connects its members, offers them quality services and constitutes a network allowing businessmen from Africa and the rest of the world to work together. IDA International is the spokesperson for the ADA (African Diplomatic Academy) and high relations in general, and represents their concerns and interests in the public debate and with external partners.",
      "By encouraging its members to work together, IDA facilitates the exchange of experiences and learning; reaffirms and defends the values that determine the successful functioning of project development in Africa. IDA is part of the European Union's NGO Transparency Register and holds special consultative status with the United Nations Economic and Social Council (ECOSOC).",
    ],
    it: [
      "L'IDA (Iniziativa per lo Sviluppo Africano) è una ONG che promuove, attraverso attività commerciali e culturali, i principi di un mondo migliore e contribuisce, attraverso la cooperazione internazionale, allo sviluppo del continente africano.",
      "IDA mette in contatto i suoi membri, offre loro servizi di qualità e costituisce una rete che consente agli imprenditori africani e del resto del mondo di lavorare insieme. IDA International è portavoce dell'ADA (Accademia Diplomatica Africana) e delle alte relazioni in generale, e rappresenta le loro preoccupazioni e i loro interessi nel dibattito pubblico e con i partner esterni.",
      "Incoraggiando i suoi membri a lavorare insieme, l'IDA facilita lo scambio di esperienze e di apprendimento; riafferma e difende i valori che determinano il buon funzionamento dello sviluppo dei progetti in Africa. L'IDA fa parte del Registro per la trasparenza delle ONG dell'Unione Europea ed è un'organizzazione con status consultivo speciale presso il Consiglio economico e sociale delle Nazioni Unite (ECOSOC).",
    ],
  } as Record<string, string[]>,

  // Partenaires (CMS blog.partenaire) — nom + logo repris de l'ancienne plateforme.
  partners: [
    { name: "ANOPACI", logo: "/images/partenaires/Logo_Partenaire_ANOPACI.png" },
    { name: "Arproma", logo: "/images/partenaires/Logo_Partenaire_APROMA.png" },
    { name: "CCAFI-CI", logo: "/images/partenaires/Logo_Partenaire_CCAFI_CI.png" },
    { name: "Fundation", logo: "/images/partenaires/Logo_Partenaire_FUNDATION.png" },
    { name: "Cosem", logo: "/images/partenaires/Logo_Partenaire_COSEM.png" },
    { name: "Dom Terry", logo: "/images/partenaires/Logo_Partenaire_DOM_TERRY.png" },
    { name: "AIIC-CI", logo: "/images/partenaires/Logo_Partenaire-AIIC_CI.png" },
    { name: "Fundus Verdone", logo: "/images/partenaires/Logo_Partenaire_FUNDUS.png" },
    { name: "Foreste Holding", logo: "/images/partenaires/FOREST_HOLDIGN.png" },
    { name: "MAD", logo: "/images/partenaires/Logo_Partenaire_MAD.png" },
    { name: "NourDign", logo: "/images/partenaires/Logo_Partenaire_NOURDIGN.png" },
  ],

  // Sponsors (CMS blog.sponsor) — nom + logo.
  sponsors: [
    { name: "Meccanica Fantini", logo: "/images/sponsors/Logo_Sponsor_MECCANICA.png" },
    { name: "Sancassiano", logo: "/images/sponsors/Logo_Sponsor_SANCASSIANO.png" },
    { name: "Air Dynamic", logo: "/images/sponsors/Logo_Sponsor_AIR_DYNAMIC.png" },
    { name: "IBL Industrie", logo: "/images/sponsors/Logo_Sponsor_IBL_Industrie.png" },
    { name: "SIDE", logo: "/images/sponsors/Logo_Sponsor_SIDE.png" },
    { name: "Delfin", logo: "/images/sponsors/Logo_Sponsor_DELFIN.png" },
    { name: "Technosilo", logo: "/images/sponsors/Logo_Sponsor_TECHNO.png" },
    { name: "Dastor", logo: "/images/sponsors/Logo_Sponsor_DASTOR.png" },
    { name: "Dell'Oro", logo: "/images/sponsors/Logo_Sponsor_DEEL_ORO.png" },
    { name: "NE & A Print", logo: "/images/sponsors/Logo_Sponsor_NEA.png" },
    { name: "Vastola", logo: "/images/sponsors/Logo_Sponsor_VASTOLA.png" },
    { name: "Gami", logo: "/images/sponsors/Logo_Sponsor_GAMI.png" },
    { name: "Real Forni", logo: "/images/sponsors/Logo_Sponsor_REAL_FORNI.png" },
    { name: "I Feel Gold", logo: "/images/sponsors/Logo_Sponsor_I_FEEL_GOLD.png" },
    { name: "A.Bre.Mar", logo: "/images/sponsors/Logo_Sponsor_A_BRE_MAR.png" },
    { name: "Cosem", logo: "/images/sponsors/Logo_Sponsor_COSEM.png" },
    { name: "Coproget", logo: "/images/sponsors/Logo_Partenaire_2-01.png" },
    { name: "Destination", logo: "/images/sponsors/Logo_Partenaire_2-02.png" },
    { name: "Torinio", logo: "/images/sponsors/Logo_Partenaire_2-03.png" },
    { name: "Renewabe", logo: "/images/sponsors/Logo_Partenaire_2-04.png" },
    { name: "Sala", logo: "/images/sponsors/Logo_Partenaire_2-05.png" },
    { name: "TechnoFood", logo: "/images/sponsors/Logo_Partenaire_2-06.png" },
  ],
};
