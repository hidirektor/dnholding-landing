import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {ProductsClient} from "./ProductsClient";

export async function generateMetadata() {
  const lang = await getCurrentLocale();
  const isTR = lang === "tr";
  return {
    title: isTR ? "Ürünler ve Hizmetler" : "Products & Services",
    description: isTR
      ? "DN Holding grup şirketlerinin sunduğu ürün ve hizmetler."
      : "Products and services offered by DN Holding group companies.",
  };
}

export default async function ProductsPage() {
  const dict = await getDictionary();

  // If there's an error loading dictionary, provide fallbacks
  const products = dict?.data?.products || [];
  const companies = dict?.data?.companies || [];

  return (
    <main>
      <ProductsClient
        products={products}
        companies={companies}
        dict={dict}
      />
    </main>
  );
}
