// ──────────────────────────────────────────────────────────────
// DN Holding — Showcase Projects Data
// ──────────────────────────────────────────────────────────────

export type ProjectCategory =
  | 'construction'
  | 'energy'
  | 'mining'
  | 'food'
  | 'technology'
  | 'real-estate';

export interface Project {
  slug: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  companySlug: string;
  category: ProjectCategory;
  year: number;
  location: { tr: string; en: string };
  image: string;
  featured: boolean;
  status: 'completed' | 'ongoing' | 'planned';
  value?: string;
}

export const projects: Project[] = [
  {
    slug: 'istanbul-metro-hatti',
    title: {
      tr: 'İstanbul Yeni Metro Hattı',
      en: 'Istanbul New Metro Line',
    },
    description: {
      tr: 'İstanbul\'un Avrupa ve Anadolu yakalarını birleştiren 28 km uzunluğundaki yeni metro hattı projesi. 19 istasyon ve günlük 1.5 milyon yolcu kapasitesiyle şehrin ulaşım altyapısını güçlendirmektedir.',
      en: 'A 28 km new metro line project connecting the European and Asian sides of Istanbul. With 19 stations and a daily capacity of 1.5 million passengers, it strengthens the city\'s transportation infrastructure.',
    },
    companySlug: 'dn-insaat',
    category: 'construction',
    year: 2024,
    location: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey' },
    image: '/images/projects/istanbul-metro.jpg',
    featured: true,
    status: 'ongoing',
    value: '₺12.5 Milyar',
  },
  {
    slug: 'kapadokya-ruzgar-santrali',
    title: {
      tr: 'Kapadokya Rüzgâr Enerji Santrali',
      en: 'Cappadocia Wind Energy Plant',
    },
    description: {
      tr: '120 MW kurulu güce sahip rüzgâr enerji santrali, yılda 380 GWh temiz enerji üreterek 150.000 haneyi aydınlatmaktadır. Çevresel etki değerlendirmesi kapsamında bölgenin doğal dokusuna uyumlu bir tasarım benimsenmiştir.',
      en: 'The wind energy plant with 120 MW installed capacity produces 380 GWh of clean energy annually, powering 150,000 households. An environmentally harmonious design has been adopted as part of the environmental impact assessment.',
    },
    companySlug: 'dn-enerji',
    category: 'energy',
    year: 2023,
    location: { tr: 'Nevşehir, Türkiye', en: 'Nevşehir, Turkey' },
    image: '/images/projects/kapadokya-ruzgar.jpg',
    featured: true,
    status: 'completed',
    value: '€185 Milyon',
  },
  {
    slug: 'ankara-smart-city',
    title: {
      tr: 'Ankara Akıllı Şehir Platformu',
      en: 'Ankara Smart City Platform',
    },
    description: {
      tr: 'Ankara Büyükşehir Belediyesi ile birlikte geliştirilen IoT tabanlı akıllı şehir yönetim platformu. Trafik, enerji, atık yönetimi ve güvenlik sistemlerini tek bir merkezden yönetmektedir.',
      en: 'An IoT-based smart city management platform developed in partnership with Ankara Metropolitan Municipality. It manages traffic, energy, waste management, and security systems from a single center.',
    },
    companySlug: 'dn-teknoloji',
    category: 'technology',
    year: 2024,
    location: { tr: 'Ankara, Türkiye', en: 'Ankara, Turkey' },
    image: '/images/projects/ankara-smart-city.jpg',
    featured: true,
    status: 'ongoing',
    value: '₺850 Milyon',
  },
  {
    slug: 'izmir-konut-projesi',
    title: {
      tr: 'DN Yaşam İzmir',
      en: 'DN Living Izmir',
    },
    description: {
      tr: '1.200 konut, ticari alanlar ve sosyal donatılardan oluşan karma kullanım projesi. LEED Gold sertifikalı sürdürülebilir yaşam alanları ve akıllı ev teknolojileriyle donatılmıştır.',
      en: 'A mixed-use project comprising 1,200 residences, commercial spaces, and social amenities. Equipped with LEED Gold certified sustainable living spaces and smart home technologies.',
    },
    companySlug: 'dn-gayrimenkul',
    category: 'real-estate',
    year: 2025,
    location: { tr: 'İzmir, Türkiye', en: 'Izmir, Turkey' },
    image: '/images/projects/izmir-konut.jpg',
    featured: true,
    status: 'ongoing',
    value: '₺3.2 Milyar',
  },
  {
    slug: 'erzincan-altin-madeni',
    title: {
      tr: 'Erzincan Altın Madeni Modernizasyonu',
      en: 'Erzincan Gold Mine Modernization',
    },
    description: {
      tr: 'Mevcut altın madeninin modern teknolojilerle yenilenmesi projesi. Çevresel standartların yükseltilmesi, üretim verimliliğinin artırılması ve iş güvenliği altyapısının güçlendirilmesi hedeflenmektedir.',
      en: 'A modernization project for the existing gold mine with modern technologies. The objectives include elevating environmental standards, increasing production efficiency, and strengthening occupational safety infrastructure.',
    },
    companySlug: 'dn-madencilik',
    category: 'mining',
    year: 2023,
    location: { tr: 'Erzincan, Türkiye', en: 'Erzincan, Turkey' },
    image: '/images/projects/erzincan-maden.jpg',
    featured: false,
    status: 'completed',
    value: '₺1.1 Milyar',
  },
  {
    slug: 'gunes-enerjisi-konya',
    title: {
      tr: 'Konya Güneş Enerjisi Çiftliği',
      en: 'Konya Solar Energy Farm',
    },
    description: {
      tr: '200 MW kapasiteli güneş enerjisi çiftliği, 5.000 dönümlük alana yayılmaktadır. Yılda 340 GWh enerji üreterek bölgenin enerji ihtiyacının %15\'ini karşılamayı hedeflemektedir.',
      en: 'A 200 MW capacity solar energy farm spanning 5,000 acres. It aims to generate 340 GWh of energy annually, meeting 15% of the region\'s energy needs.',
    },
    companySlug: 'dn-enerji',
    category: 'energy',
    year: 2025,
    location: { tr: 'Konya, Türkiye', en: 'Konya, Turkey' },
    image: '/images/projects/konya-gunes.jpg',
    featured: false,
    status: 'planned',
    value: '€220 Milyon',
  },
  {
    slug: 'organik-gida-tesisi',
    title: {
      tr: 'Antalya Organik Gıda İşleme Tesisi',
      en: 'Antalya Organic Food Processing Facility',
    },
    description: {
      tr: 'Yıllık 50.000 ton kapasiteli organik gıda işleme tesisi. AB standartlarında üretim yaparak 35 ülkeye ihracat gerçekleştirmekte ve bölgedeki 2.000\'den fazla çiftçiye pazar imkânı sağlamaktadır.',
      en: 'An organic food processing facility with an annual capacity of 50,000 tons. Producing to EU standards and exporting to 35 countries, it provides market access to over 2,000 farmers in the region.',
    },
    companySlug: 'dn-gida',
    category: 'food',
    year: 2022,
    location: { tr: 'Antalya, Türkiye', en: 'Antalya, Turkey' },
    image: '/images/projects/antalya-gida.jpg',
    featured: false,
    status: 'completed',
    value: '₺780 Milyon',
  },
  {
    slug: 'istanbul-finans-merkezi',
    title: {
      tr: 'İstanbul Finans Merkezi Ofis Kulesi',
      en: 'Istanbul Finance Center Office Tower',
    },
    description: {
      tr: '52 katlı A+ ofis kulesi, İstanbul Finans Merkezi\'nin kalbinde yer almaktadır. Akıllı bina sistemleri, yeşil çatı teknolojisi ve BREEAM Excellent sertifikasıyla inşa edilmiştir.',
      en: 'A 52-story A+ office tower located in the heart of the Istanbul Finance Center. Built with smart building systems, green roof technology, and BREEAM Excellent certification.',
    },
    companySlug: 'dn-insaat',
    category: 'construction',
    year: 2024,
    location: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Turkey' },
    image: '/images/projects/istanbul-finans.jpg',
    featured: true,
    status: 'ongoing',
    value: '₺5.6 Milyar',
  },
] as const satisfies readonly Project[];

/**
 * Look up a project by its URL slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Get featured projects (for homepage display).
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Filter projects by company slug.
 */
export function getProjectsByCompany(companySlug: string): Project[] {
  return projects.filter((p) => p.companySlug === companySlug);
}

/**
 * Filter projects by category.
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}
