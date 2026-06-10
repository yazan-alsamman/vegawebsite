const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=800&fit=crop&auto=format&q=80`;

export const pageImages = {
  home: {
    hero: u("1451187580459-43490279c0fa"),
    coding: u("1498050108023-c5249f4df085"),
    marketing: u("1557804506-669a67965ba0"),
    showcase: [
      u("1460925895917-afdab827c52f"),
      u("1551288049-bebda4e38f71"),
      u("1552664730-d307ca884978"),
    ],
  },
  about: {
    hero: u("1522071820081-009f0129c71c"),
    team: u("1522071820081-009f0129c71c"),
    office: u("1497366216548-37526070297c"),
    strategy: u("1552664730-d307ca884978"),
    analytics: u("1460925895917-afdab827c52f"),
    global: u("1451187580459-43490279c0fa"),
    damascus: "/images/about/umayyad-square.jpg",
    umayyadSquare: "/images/about/umayyad-square.jpg",
  },
  services: {
    hero: u("1504384308090-c894fdcc538d"),
    coding: u("1498050108023-c5249f4df085"),
    marketing: u("1557804506-669a67965ba0"),
    photography: u("1452587925146-c601767ba02b"),
    video: u("1574717024652-61fd2cf4d44d"),
    process: u("1553877522-43269d4ea984"),
  },
  portfolio: {
    hero: u("1555066935-0506c4e4e3a0"),
    banner: u("1551288049-bebda4e38f71"),
  },
  contact: {
    hero: u("1423666634761-43bcad5782fa"),
    office: u("1497366216548-37526070297c"),
    meeting: u("1600880292203-757bb62b4baf"),
  },
};

export const projectImages = {
  touchee: "/images/logos/touchee.jpg",
  newlook: "/images/logos/newlook.png",
  estore: "/images/logos/estore.png",
  elias: "/images/logos/elias.png",
};
