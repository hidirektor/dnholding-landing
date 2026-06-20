"use client";

import React, {useState} from "react";
import Image from "next/image";
import {Container} from "@/components/layout/Container";
import {Section} from "@/components/layout/Section";
import {Heading} from "@/components/ui/Heading";
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  description: string;
  companySlug: string;
  image: string;
  category: string;
}

interface Company {
  slug: string;
  name: string;
}

export function ProductsClient({
  products,
  companies,
  dict,
}: {
  products: Product[];
  companies: Company[];
  dict: any;
}) {
  const [activeCompany, setActiveCompany] = useState<string>("all");

  const filteredProducts =
    activeCompany === "all"
      ? products
      : products.filter((p) => p.companySlug === activeCompany);

  return (
    <>
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              {dict.nav?.products || "Ürünler / Hizmetler"}
            </p>
            <Heading level="h1" display className="text-white max-w-3xl">
              {dict.nav?.products || "Ürünler ve Hizmetler"}
            </Heading>
          </Container>
        </div>
      </Section>

      <Section variant="default" padding="default">
        <Container>
          <div className="mb-12 flex flex-wrap gap-2">
            <Button
              variant={activeCompany === "all" ? "primary" : "secondary"}
              onClick={() => setActiveCompany("all")}
            >
              {dict.common?.viewAll || "Tümünü Gör"}
            </Button>
            {companies.map((company) => (
              <Button
                key={company.slug}
                variant={activeCompany === company.slug ? "primary" : "secondary"}
                onClick={() => setActiveCompany(company.slug)}
              >
                {company.name}
              </Button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Bu şirkete ait ürün bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const company = companies.find(
                  (c) => c.slug === product.companySlug
                );
                return (
                  <Card key={product.id} className="flex flex-col group">
                    <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/logo_dnholding.png";
                          target.style.objectFit = "contain";
                          target.style.padding = "2rem";
                        }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                        {product.category}
                      </div>
                      <Heading level="h3" className="mb-3">
                        {product.name}
                      </Heading>
                      <p className="text-foreground/70 mb-6 flex-1">
                        {product.description}
                      </p>
                      {company && (
                        <div className="mt-auto pt-4 border-t border-border/50 text-sm font-medium text-foreground/50">
                          {company.name}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
