"use client";

import React, {useState} from "react";
import {cn} from "@/lib/utils";

interface Doc {
  id: string;
  title: string;
  content: React.ReactNode;
}

const docs: Doc[] = [
  {
    id: "privacy",
    title: "Gizlilik Politikası",
    content: (
      <>
        <h2>1. Giriş</h2>
        <p>
          DN Holding ("biz", "bizim" veya "şirket") olarak gizliliğinize saygı duyuyoruz ve 
          kişisel verilerinizi korumaya kararlıyız. Bu gizlilik politikası, web sitemizi ziyaret 
          ettiğinizde (nereden ziyaret ettiğinizden bağımsız olarak) kişisel verilerinize nasıl 
          bakacağımızı size bildirecek ve gizlilik haklarınız ile yasanın sizi nasıl koruduğu 
          hakkında bilgi verecektir.
        </p>
        <h2>2. Topladığımız Veriler</h2>
        <p>
          Kişisel veri veya kişisel bilgi, kimliği belirlenebilen bir birey hakkındaki herhangi 
          bir bilgi anlamına gelir. Kimliğin kaldırıldığı verileri (anonim veriler) kapsamaz. 
          Sizin hakkınızda farklı türde kişisel verileri toplayabilir, kullanabilir, 
          saklayabilir ve aktarabiliriz:
        </p>
        <ul>
          <li><strong>Kimlik Verileri:</strong> Ad, soyadı, kullanıcı adı veya benzeri tanımlayıcılar.</li>
          <li><strong>İletişim Verileri:</strong> Fatura adresi, teslimat adresi, e-posta adresi ve telefon numaraları.</li>
          <li><strong>Teknik Veriler:</strong> İnternet protokolü (IP) adresi, oturum açma verileriniz, tarayıcı türü ve sürümü.</li>
        </ul>
        <h2>3. Verilerinizin Kullanımı</h2>
        <p>
          Kişisel verilerinizi yalnızca yasanın izin verdiği durumlarda kullanacağız. 
          En yaygın olarak, kişisel verilerinizi aşağıdaki durumlarda kullanacağız:
        </p>
        <p>
          Hizmet sağlamak, kullanıcı deneyimini iyileştirmek ve yasal yükümlülüklerimizi yerine getirmek amacıyla.
        </p>
      </>
    )
  },
  {
    id: "terms",
    title: "Kullanım Koşulları",
    content: (
      <>
        <h2>1. Şartların Kabulü</h2>
        <p>
          Bu web sitesine erişerek ve web sitesini kullanarak, bu kullanım şartları ve koşullarına, 
          tüm geçerli yasalara ve düzenlemelere bağlı kalmayı kabul etmiş olursunuz.
        </p>
        <h2>2. Kullanım Lisansı</h2>
        <p>
          DN Holding'in web sitesindeki materyallerin (bilgi veya yazılım) bir kopyasını yalnızca 
          kişisel, ticari olmayan geçici görüntüleme için geçici olarak indirme izni verilir. 
          Bu, bir mülkiyet devri değil, bir lisans verilmesidir.
        </p>
        <h2>3. Sorumluluk Reddi</h2>
        <p>
          DN Holding'in web sitesindeki materyaller "olduğu gibi" sağlanmaktadır. 
          DN Holding, zımni garantiler veya satılabilirlik, belirli bir amaca uygunluk 
          veya fikri mülkiyet haklarının ihlal edilmemesi dahil olmak üzere hiçbir garanti vermez.
        </p>
      </>
    )
  },
  {
    id: "cookies",
    title: "Çerez Politikası",
    content: (
      <>
        <h2>1. Çerez Nedir?</h2>
        <p>
          Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza 
          veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitesinin 
          daha verimli çalışmasını sağlamak ve ziyaretinizle ilgili bilgileri (örneğin tercih 
          ettiğiniz dil ve diğer ayarlar) hatırlamak için kullanılır.
        </p>
        <h2>2. Kullandığımız Çerez Türleri</h2>
        <ul>
          <li><strong>Zorunlu Çerezler:</strong> Web sitemizin düzgün çalışması için gereklidir.</li>
          <li><strong>Performans Çerezleri:</strong> Ziyaretçilerin web sitemizi nasıl kullandığı hakkında bilgi toplar.</li>
          <li><strong>İşlevsellik Çerezleri:</strong> Ziyaretiniz sırasındaki tercihlerinizi hatırlamamızı sağlar.</li>
        </ul>
        <h2>3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
        <p>
          Çerezleri dilediğiniz gibi kontrol edebilir veya silebilirsiniz. Tarayıcı ayarlarınızı, 
          tüm çerezleri veya belirli çerezleri reddedecek şekilde değiştirebilirsiniz.
        </p>
      </>
    )
  },
  {
    id: "kvkk",
    title: "KVKK Aydınlatma Metni",
    content: (
      <>
        <h2>1. Veri Sorumlusunun Kimliği</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; 
          veri sorumlusu olarak DN Holding tarafından aşağıda açıklanan kapsamda toplanacak ve işlenebilecektir.
        </p>
        <h2>2. Kişisel Verilerin İşlenme Amacı</h2>
        <p>
          Toplanan kişisel verileriniz, Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak 
          için gerekli çalışmaların iş birimlerimiz tarafından yapılması, Şirketimizin hukuki ve ticari güvenliğinin 
          temini amaçlarıyla işlenmektedir.
        </p>
        <h2>3. İşlenen Kişisel Verilerin Kimlere Aktarılabileceği</h2>
        <p>
          İşlenen kişisel verileriniz, yasal zorunluluklar dahilinde yetkili kamu kurum ve kuruluşları ile 
          Şirketimizin faaliyetlerini yürütmek üzere hizmet aldığı üçüncü taraflarla paylaşılabilecektir.
        </p>
      </>
    )
  }
];

export function LegalDocsViewer() {
  const [activeDoc, setActiveDoc] = useState(docs[0].id);

  const content = docs.find((d) => d.id === activeDoc)?.content;

  return (
    <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative min-h-[60vh]">
      {/* Sidebar Navigation */}
      <div className="md:w-64 shrink-0">
        <div className="sticky top-32 flex flex-col gap-2 border-l-2 border-gray-100 dark:border-white/10">
          {docs.map((doc) => {
            const isActive = activeDoc === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => setActiveDoc(doc.id)}
                className={cn(
                  "text-left px-6 py-3 text-sm font-medium transition-all duration-200 border-l-2 -ml-[2px]",
                  isActive 
                    ? "border-accent text-accent dark:text-accent-light" 
                    : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {doc.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl">
        <div className="text-[var(--color-text-secondary)] dark:text-white/80 leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-medium [&>h2]:text-[var(--color-text-heading)] [&>h2]:dark:text-white [&>h2]:mt-12 [&>h2:first-child]:mt-0 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>strong]:font-semibold [&>strong]:text-[var(--color-text-heading)] [&>strong]:dark:text-white [&>p]:mb-4">
          {content}
        </div>
      </div>
    </div>
  );
}
