// ──────────────────────────────────────────────────────────────
// DN Holding — Subsidiary Companies Data
// ──────────────────────────────────────────────────────────────

export interface CompanyStat {
  label: { tr: string; en: string };
  value: string;
}

export interface Company {
  slug: string;
  name: string;
  sector: { tr: string; en: string };
  description: { tr: string; en: string };
  longDescription: { tr: string; en: string };
  accentColor: string;
  logo: string;
  heroImage: string;
  founded: number;
  stats: CompanyStat[];
  featured: boolean;
}

export const companies: Company[] = [
  {
    slug: 'dn-insaat',
    name: 'DN İnşaat',
    sector: { tr: 'İnşaat & Altyapı', en: 'Construction & Infrastructure' },
    description: {
      tr: 'Büyük ölçekli altyapı projeleri, konut kompleksleri ve ticari yapılarla Türkiye\'nin çehresini değiştiren DN İnşaat, uluslararası standartlarda mühendislik çözümleri sunmaktadır.',
      en: 'DN İnşaat is transforming Turkey\'s landscape through large-scale infrastructure projects, residential complexes, and commercial buildings, delivering engineering solutions that meet international standards.',
    },
    longDescription: {
      tr: 'DN İnşaat, 2001 yılından bu yana Türkiye ve çevre ülkelerde üst düzey inşaat ve altyapı projeleri gerçekleştirmektedir. Otoyol, köprü, tünel, havalimanı ve konut projeleri başta olmak üzere geniş bir yelpazede faaliyet gösteren şirketimiz, kalite ve güvenlik odaklı yaklaşımıyla sektörde öncü konumdadır.',
      en: 'Since 2001, DN İnşaat has been delivering premium construction and infrastructure projects across Turkey and neighboring countries. Operating across a wide spectrum — including highways, bridges, tunnels, airports, and residential developments — our company leads the industry with its quality and safety-focused approach.',
    },
    accentColor: '#2563eb',
    logo: '/images/companies/dn-insaat-logo.svg',
    heroImage: '/images/companies/dn-insaat-hero.jpg',
    founded: 2001,
    stats: [
      { label: { tr: 'Tamamlanan Proje', en: 'Completed Projects' }, value: '180+' },
      { label: { tr: 'Çalışan Sayısı', en: 'Employees' }, value: '1.200+' },
      { label: { tr: 'Faaliyet Ülkesi', en: 'Countries' }, value: '8' },
      { label: { tr: 'Toplam İnşaat Alanı', en: 'Total Built Area' }, value: '2.5M m²' },
    ],
    featured: true,
  },
  {
    slug: 'dn-enerji',
    name: 'DN Enerji',
    sector: { tr: 'Enerji & Yenilenebilir Kaynaklar', en: 'Energy & Renewables' },
    description: {
      tr: 'Rüzgâr, güneş ve hidroelektrik alanlarında yatırımlarıyla sürdürülebilir enerji üretimine katkıda bulunan DN Enerji, Türkiye\'nin temiz enerji dönüşümünün öncü güçlerinden biridir.',
      en: 'Contributing to sustainable energy production through investments in wind, solar, and hydroelectric power, DN Enerji is one of the pioneering forces behind Turkey\'s clean energy transition.',
    },
    longDescription: {
      tr: 'DN Enerji, yenilenebilir enerji kaynaklarına yaptığı stratejik yatırımlarla Türkiye\'nin enerji geleceğini şekillendirmektedir. Toplam 850 MW kurulu güce sahip tesisleriyle rüzgâr, güneş ve hidroelektrik enerji üretimi gerçekleştiren şirketimiz, karbon-nötr hedefler doğrultusunda çalışmalarını sürdürmektedir.',
      en: 'DN Enerji is shaping Turkey\'s energy future through strategic investments in renewable energy sources. With a total installed capacity of 850 MW across wind, solar, and hydroelectric power generation facilities, our company continues its operations toward carbon-neutral objectives.',
    },
    accentColor: '#059669',
    logo: '/images/companies/dn-enerji-logo.svg',
    heroImage: '/images/companies/dn-enerji-hero.jpg',
    founded: 2005,
    stats: [
      { label: { tr: 'Kurulu Güç', en: 'Installed Capacity' }, value: '850 MW' },
      { label: { tr: 'Çalışan Sayısı', en: 'Employees' }, value: '320+' },
      { label: { tr: 'Enerji Santrali', en: 'Power Plants' }, value: '12' },
      { label: { tr: 'Yıllık Üretim', en: 'Annual Output' }, value: '2.8 TWh' },
    ],
    featured: true,
  },
  {
    slug: 'dn-madencilik',
    name: 'DN Madencilik',
    sector: { tr: 'Madencilik & Doğal Kaynaklar', en: 'Mining & Natural Resources' },
    description: {
      tr: 'Doğal kaynakların sorumlu ve sürdürülebilir bir şekilde değerlendirilmesi misyonuyla hareket eden DN Madencilik, modern madencilik teknolojileri ve çevreye duyarlı operasyonlarıyla sektörde fark yaratmaktadır.',
      en: 'Operating with the mission of responsible and sustainable utilization of natural resources, DN Madencilik makes a difference in the industry through modern mining technologies and environmentally conscious operations.',
    },
    longDescription: {
      tr: 'DN Madencilik, Türkiye\'nin zengin maden yataklarını çevreye duyarlı yöntemlerle işletmektedir. Bakır, krom ve altın madenciliği alanlarında faaliyet gösteren şirketimiz, uluslararası çevre standartlarına tam uyum sağlayarak sürdürülebilir madencilik modelini benimsemektedir.',
      en: 'DN Madencilik operates Turkey\'s rich mineral deposits using environmentally responsible methods. Active in copper, chrome, and gold mining, our company has adopted a sustainable mining model in full compliance with international environmental standards.',
    },
    accentColor: '#d97706',
    logo: '/images/companies/dn-madencilik-logo.svg',
    heroImage: '/images/companies/dn-madencilik-hero.jpg',
    founded: 2003,
    stats: [
      { label: { tr: 'Maden Sahası', en: 'Mining Sites' }, value: '7' },
      { label: { tr: 'Çalışan Sayısı', en: 'Employees' }, value: '580+' },
      { label: { tr: 'Yıllık Üretim', en: 'Annual Production' }, value: '1.2M ton' },
      { label: { tr: 'Ruhsat Alanı', en: 'License Area' }, value: '45.000 ha' },
    ],
    featured: false,
  },
  {
    slug: 'dn-gida',
    name: 'DN Gıda',
    sector: { tr: 'Gıda & Tarım', en: 'Food & Agriculture' },
    description: {
      tr: 'Tarımdan sofraya entegre bir üretim zincirine sahip DN Gıda, kaliteli ve güvenilir gıda ürünleriyle hem yurt içi hem de uluslararası pazarlarda söz sahibidir.',
      en: 'With an integrated production chain from farm to table, DN Gıda commands a significant presence in both domestic and international markets through its high-quality and reliable food products.',
    },
    longDescription: {
      tr: 'DN Gıda, çiftlikten sofraya uzanan entegre üretim zinciriyle Türkiye\'nin önde gelen gıda şirketlerinden biridir. Organik tarım, modern işleme tesisleri ve geniş dağıtım ağıyla sağlıklı ve lezzetli ürünler sunmaktadır. İhracat ağı 35\'ten fazla ülkeye ulaşmaktadır.',
      en: 'DN Gıda is one of Turkey\'s leading food companies with its farm-to-table integrated production chain. It offers healthy and delicious products through organic farming, modern processing facilities, and an extensive distribution network. Its export network reaches over 35 countries.',
    },
    accentColor: '#dc2626',
    logo: '/images/companies/dn-gida-logo.svg',
    heroImage: '/images/companies/dn-gida-hero.jpg',
    founded: 2007,
    stats: [
      { label: { tr: 'Ürün Çeşidi', en: 'Product Lines' }, value: '200+' },
      { label: { tr: 'Çalışan Sayısı', en: 'Employees' }, value: '450+' },
      { label: { tr: 'İhracat Ülkesi', en: 'Export Countries' }, value: '35+' },
      { label: { tr: 'Üretim Tesisi', en: 'Production Facilities' }, value: '4' },
    ],
    featured: false,
  },
  {
    slug: 'dn-teknoloji',
    name: 'DN Teknoloji',
    sector: { tr: 'Teknoloji & Dijital Çözümler', en: 'Technology & Digital Solutions' },
    description: {
      tr: 'Yapay zekâ, bulut bilişim ve IoT alanlarında yenilikçi çözümler geliştiren DN Teknoloji, grubun dijital dönüşüm süreçlerini yönetmenin yanı sıra dış müşterilere de ileri teknoloji hizmetleri sunmaktadır.',
      en: 'Developing innovative solutions in AI, cloud computing, and IoT, DN Teknoloji manages the group\'s digital transformation processes while also providing advanced technology services to external clients.',
    },
    longDescription: {
      tr: 'DN Teknoloji, holding bünyesindeki tüm şirketlerin dijital dönüşüm süreçlerini yöneten ve aynı zamanda dış müşterilere kurumsal yazılım çözümleri sunan bir teknoloji şirketidir. Yapay zekâ, nesnelerin interneti (IoT), büyük veri ve bulut bilişim alanlarında uzmanlaşmış ekibiyle geleceğin teknolojilerini bugünden inşa etmektedir.',
      en: 'DN Teknoloji is a technology company that manages digital transformation processes for all companies within the holding while also providing enterprise software solutions to external clients. With a team specialized in AI, IoT, big data, and cloud computing, it builds tomorrow\'s technologies today.',
    },
    accentColor: '#7c3aed',
    logo: '/images/companies/dn-teknoloji-logo.svg',
    heroImage: '/images/companies/dn-teknoloji-hero.jpg',
    founded: 2015,
    stats: [
      { label: { tr: 'Yazılım Projesi', en: 'Software Projects' }, value: '120+' },
      { label: { tr: 'Çalışan Sayısı', en: 'Employees' }, value: '180+' },
      { label: { tr: 'Aktif Müşteri', en: 'Active Clients' }, value: '75+' },
      { label: { tr: 'Patent', en: 'Patents' }, value: '8' },
    ],
    featured: true,
  },
  {
    slug: 'dn-gayrimenkul',
    name: 'DN Gayrimenkul',
    sector: { tr: 'Gayrimenkul & Yatırım', en: 'Real Estate & Investment' },
    description: {
      tr: 'Konut, ticari ve karma kullanım projeleriyle şehirlere değer katan DN Gayrimenkul, sürdürülebilir yaşam alanları tasarlayarak sektörde yenilikçi bir yaklaşım sergilemektedir.',
      en: 'Adding value to cities through residential, commercial, and mixed-use projects, DN Gayrimenkul showcases an innovative approach in the industry by designing sustainable living spaces.',
    },
    longDescription: {
      tr: 'DN Gayrimenkul, İstanbul, Ankara, İzmir ve Antalya başta olmak üzere Türkiye\'nin önde gelen şehirlerinde premium konut, ofis ve AVM projeleri geliştirmektedir. Sürdürülebilir mimari ve akıllı bina teknolojilerini bir araya getiren projeleriyle yaşam standartlarını yükseltmektedir.',
      en: 'DN Gayrimenkul develops premium residential, office, and shopping mall projects in Turkey\'s leading cities, primarily Istanbul, Ankara, Izmir, and Antalya. Its projects that combine sustainable architecture with smart building technologies elevate living standards.',
    },
    accentColor: '#0891b2',
    logo: '/images/companies/dn-gayrimenkul-logo.svg',
    heroImage: '/images/companies/dn-gayrimenkul-hero.jpg',
    founded: 2009,
    stats: [
      { label: { tr: 'Teslim Edilen Konut', en: 'Homes Delivered' }, value: '8.500+' },
      { label: { tr: 'Çalışan Sayısı', en: 'Employees' }, value: '270+' },
      { label: { tr: 'Aktif Proje', en: 'Active Projects' }, value: '12' },
      { label: { tr: 'Toplam Alan', en: 'Total Area' }, value: '1.8M m²' },
    ],
    featured: true,
  },
] as const satisfies readonly Company[];

/**
 * Look up a company by its URL slug.
 */
export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

/**
 * Get only the featured companies (for homepage display).
 */
export function getFeaturedCompanies(): Company[] {
  return companies.filter((c) => c.featured);
}
