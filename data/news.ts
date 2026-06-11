// ──────────────────────────────────────────────────────────────
// DN Holding — News & Media Data
// ──────────────────────────────────────────────────────────────

export type NewsCategory = 'corporate' | 'project' | 'award' | 'sustainability' | 'press';

export interface NewsArticle {
  slug: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  content: { tr: string; en: string };
  date: string; // ISO format
  category: NewsCategory;
  image: string;
  featured: boolean;
  companySlug?: string;
}

export const news: NewsArticle[] = [
  {
    slug: 'dn-holding-2025-surdurulebilirlik-raporu',
    title: {
      tr: 'DN Holding 2025 Sürdürülebilirlik Raporu Yayımlandı',
      en: 'DN Holding 2025 Sustainability Report Published',
    },
    excerpt: {
      tr: 'Holding genelinde karbon ayak izinin %30 azaltıldığı, yenilenebilir enerji yatırımlarının iki katına çıkarıldığı 2025 sürdürülebilirlik raporu kamuoyuyla paylaşıldı.',
      en: 'The 2025 sustainability report was shared with the public, highlighting a 30% reduction in carbon footprint and doubling of renewable energy investments across the holding.',
    },
    content: {
      tr: 'DN Holding, 2025 yılı Sürdürülebilirlik Raporu\'nu yayımladı. Rapor, holdingin çevresel, sosyal ve yönetişim (ESG) alanlarındaki performansını detaylı bir şekilde ortaya koymaktadır.\n\nRapora göre, DN Holding 2025 yılında karbon ayak izini bir önceki yıla göre %30 oranında azaltmayı başarmıştır. Yenilenebilir enerji yatırımları iki katına çıkarılmış, atık geri dönüşüm oranı %85\'e ulaşmıştır.\n\nDN Holding CEO\'su rapor hakkında şunları söyledi: "Sürdürülebilirlik, iş stratejimizin merkezinde yer almaktadır. Gelecek nesillere daha yaşanabilir bir dünya bırakma sorumluluğumuzun bilinciyle çalışıyoruz."',
      en: 'DN Holding has published its 2025 Sustainability Report. The report presents a detailed view of the holding\'s performance in environmental, social, and governance (ESG) areas.\n\nAccording to the report, DN Holding has managed to reduce its carbon footprint by 30% compared to the previous year. Renewable energy investments were doubled, and the waste recycling rate reached 85%.\n\nThe CEO of DN Holding stated: "Sustainability is at the core of our business strategy. We work with the awareness of our responsibility to leave a more livable world for future generations."',
    },
    date: '2025-12-15',
    category: 'sustainability',
    image: '/images/news/surdurulebilirlik-raporu.jpg',
    featured: true,
  },
  {
    slug: 'istanbul-metro-ilk-kazik',
    title: {
      tr: 'İstanbul Yeni Metro Hattı\'nda İlk Kazık Çakıldı',
      en: 'First Piling Ceremony for Istanbul New Metro Line',
    },
    excerpt: {
      tr: 'İstanbul\'un iki yakasını birleştirecek yeni metro hattı projesinde ilk kazık töreni, Cumhurbaşkanı\'nın katılımıyla gerçekleştirildi.',
      en: 'The first piling ceremony for the new metro line project connecting the two sides of Istanbul was held with the attendance of the President.',
    },
    content: {
      tr: 'DN İnşaat tarafından üstlenilen İstanbul Yeni Metro Hattı projesinde ilk kazık çakma töreni düzenlendi. Törene Cumhurbaşkanı, İstanbul Büyükşehir Belediye Başkanı ve DN Holding üst yönetimi katıldı.\n\n28 km uzunluğundaki hat, 19 istasyonla İstanbul\'un ulaşım altyapısına önemli bir katkı sağlayacak. Projenin 2027 yılında tamamlanması hedeflenmektedir.\n\nDN İnşaat Genel Müdürü, projenin Türk mühendisliğinin gücünü dünyaya göstereceğini belirtti.',
      en: 'The first piling ceremony was held for the Istanbul New Metro Line project undertaken by DN İnşaat. The ceremony was attended by the President, the Mayor of Istanbul Metropolitan Municipality, and DN Holding senior management.\n\nThe 28 km long line with 19 stations will make a significant contribution to Istanbul\'s transportation infrastructure. The project is targeted for completion in 2027.\n\nThe General Manager of DN İnşaat stated that the project will showcase the power of Turkish engineering to the world.',
    },
    date: '2025-11-03',
    category: 'project',
    image: '/images/news/metro-ilk-kazik.jpg',
    featured: true,
    companySlug: 'dn-insaat',
  },
  {
    slug: 'dn-teknoloji-yapay-zeka-odulu',
    title: {
      tr: 'DN Teknoloji\'ye Avrupa Yapay Zekâ İnovasyon Ödülü',
      en: 'DN Teknoloji Receives European AI Innovation Award',
    },
    excerpt: {
      tr: 'DN Teknoloji, endüstriyel IoT ve yapay zekâ alanındaki çalışmalarıyla Avrupa Teknoloji Ödülleri\'nde "Yılın İnovasyon Şirketi" seçildi.',
      en: 'DN Teknoloji was named "Innovation Company of the Year" at the European Technology Awards for its work in industrial IoT and artificial intelligence.',
    },
    content: {
      tr: 'DN Teknoloji, Berlin\'de düzenlenen Avrupa Teknoloji Ödülleri\'nde "Yılın İnovasyon Şirketi" ödülünü kazandı. Şirket, endüstriyel IoT platformu ve yapay zekâ tabanlı tahminsel bakım çözümleriyle jüriyi etkileyen performans sergiledi.\n\nÖdül töreninde konuşan DN Teknoloji CEO\'su, "Bu ödül, Türkiye\'den çıkan teknolojilerin küresel ölçekte rekabet edebileceğinin kanıtıdır" dedi.\n\nDN Teknoloji\'nin geliştirdiği platform, şu anda 12 ülkede 200\'den fazla endüstriyel tesiste kullanılmaktadır.',
      en: 'DN Teknoloji won the "Innovation Company of the Year" award at the European Technology Awards held in Berlin. The company impressed the jury with its industrial IoT platform and AI-based predictive maintenance solutions.\n\nSpeaking at the ceremony, the CEO of DN Teknoloji said: "This award is proof that technologies from Turkey can compete on a global scale."\n\nThe platform developed by DN Teknoloji is currently used in over 200 industrial facilities across 12 countries.',
    },
    date: '2025-10-18',
    category: 'award',
    image: '/images/news/teknoloji-odul.jpg',
    featured: true,
    companySlug: 'dn-teknoloji',
  },
  {
    slug: 'dn-enerji-karbon-notr-hedef',
    title: {
      tr: 'DN Enerji 2030 Karbon-Nötr Hedefini Açıkladı',
      en: 'DN Enerji Announces 2030 Carbon-Neutral Target',
    },
    excerpt: {
      tr: 'DN Enerji, tüm operasyonlarında 2030 yılına kadar karbon-nötr olma hedefini açıklayarak sektörde öncü bir adım attı.',
      en: 'DN Enerji took a pioneering step in the industry by announcing its target of becoming carbon-neutral across all operations by 2030.',
    },
    content: {
      tr: 'DN Enerji, 2030 yılına kadar tüm operasyonlarında karbon-nötr olmayı hedefleyen kapsamlı bir yol haritasını kamuoyuyla paylaştı. Bu hedef doğrultusunda yenilenebilir enerji kapasitesinin 1.500 MW\'a çıkarılması, tüm tesislerde enerji verimliliği iyileştirmeleri yapılması ve karbon yakalama teknolojilerine yatırım yapılması planlanmaktadır.\n\nDN Enerji, bu hedefle Türkiye enerji sektöründe karbon-nötr taahhüdünde bulunan ilk özel sektör şirketi olma özelliğini taşımaktadır.',
      en: 'DN Enerji shared a comprehensive roadmap targeting carbon neutrality across all operations by 2030. In line with this goal, the plans include increasing renewable energy capacity to 1,500 MW, implementing energy efficiency improvements across all facilities, and investing in carbon capture technologies.\n\nWith this target, DN Enerji becomes the first private sector company in Turkey\'s energy industry to commit to carbon neutrality.',
    },
    date: '2025-09-22',
    category: 'sustainability',
    image: '/images/news/karbon-notr.jpg',
    featured: false,
    companySlug: 'dn-enerji',
  },
  {
    slug: 'dn-gida-organik-sertifika',
    title: {
      tr: 'DN Gıda\'nın Tüm Ürün Yelpazesi AB Organik Sertifikası Aldı',
      en: 'DN Gıda\'s Entire Product Range Receives EU Organic Certification',
    },
    excerpt: {
      tr: 'DN Gıda, tüm ürün yelpazesinde AB Organik sertifikasını alarak uluslararası pazarlardaki konumunu güçlendirdi.',
      en: 'DN Gıda strengthened its position in international markets by obtaining EU Organic certification across its entire product range.',
    },
    content: {
      tr: 'DN Gıda, tüm ürün yelpazesinde Avrupa Birliği Organik Sertifikası almaya hak kazandı. Bu başarı, şirketin çiftlikten sofraya uzanan üretim zincirindeki kalite standartlarının uluslararası alanda tescillenmesi anlamına gelmektedir.\n\nSertifikasyon süreci iki yıl sürmüş olup, üretim süreçleri, ham madde tedariki ve ambalajlama dahil tüm aşamalar denetlenmiştir. DN Gıda, bu sertifika ile Avrupa, Ortadoğu ve Kuzey Afrika pazarlarında daha güçlü bir konuma gelmektedir.',
      en: 'DN Gıda has qualified to receive EU Organic Certification across its entire product range. This achievement represents the international certification of quality standards across the company\'s farm-to-table production chain.\n\nThe certification process took two years, with all stages including production processes, raw material procurement, and packaging being audited. With this certification, DN Gıda gains a stronger position in European, Middle Eastern, and North African markets.',
    },
    date: '2025-08-10',
    category: 'corporate',
    image: '/images/news/organik-sertifika.jpg',
    featured: false,
    companySlug: 'dn-gida',
  },
  {
    slug: 'dn-holding-yili-degerlendirme',
    title: {
      tr: 'DN Holding 2025 Yılını Rekor Büyümeyle Kapattı',
      en: 'DN Holding Closes 2025 with Record Growth',
    },
    excerpt: {
      tr: 'DN Holding, 2025 yılında konsolide cirosunu %28 artırarak tarihinin en yüksek büyüme oranına ulaştı. Grup genelinde 500\'den fazla yeni istihdam oluşturuldu.',
      en: 'DN Holding increased its consolidated revenue by 28% in 2025, reaching its highest growth rate in history. Over 500 new jobs were created across the group.',
    },
    content: {
      tr: 'DN Holding, 2025 mali yılını rekor büyüme rakamlarıyla kapattı. Konsolide ciro bir önceki yıla göre %28 artış gösterirken, FAVÖK marjı %22 seviyesinde gerçekleşti.\n\nHolding genelinde 500\'den fazla yeni istihdam oluşturulmuş, toplam çalışan sayısı 3.000\'i aşmıştır. Özellikle DN Teknoloji ve DN Enerji\'deki büyüme, grubun genel performansına önemli katkı sağlamıştır.\n\nYönetim Kurulu Başkanı, 2026 yılı için de benzer bir büyüme ivmesinin sürdürülmesinin hedeflendiğini açıkladı.',
      en: 'DN Holding closed the 2025 fiscal year with record growth figures. Consolidated revenue increased by 28% compared to the previous year, while the EBITDA margin reached 22%.\n\nOver 500 new jobs were created across the holding, bringing the total workforce to over 3,000. Growth in DN Teknoloji and DN Enerji particularly contributed significantly to the group\'s overall performance.\n\nThe Chairman announced that a similar growth momentum is targeted for 2026.',
    },
    date: '2026-01-15',
    category: 'corporate',
    image: '/images/news/yili-degerlendirme.jpg',
    featured: true,
  },
] as const satisfies readonly NewsArticle[];

/**
 * Look up a news article by its URL slug.
 */
export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}

/**
 * Get featured news articles.
 */
export function getFeaturedNews(): NewsArticle[] {
  return news.filter((n) => n.featured);
}

/**
 * Filter news by category.
 */
export function getNewsByCategory(category: NewsCategory): NewsArticle[] {
  return news.filter((n) => n.category === category);
}

/**
 * Get the latest N news articles, sorted by date (newest first).
 */
export function getLatestNews(count: number = 3): NewsArticle[] {
  return [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
