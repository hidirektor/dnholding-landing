import Image from "next/image";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {Heading} from "@/components/ui/Heading";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative max-w-4xl mx-auto py-12">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2" />

      <div className="space-y-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <ScrollReveal key={item.year} direction={isLeft ? "left" : "right"}>
              <div className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${isLeft ? "md:flex-row-reverse" : ""}`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent -translate-x-[7px] md:-translate-x-1/2 mt-1.5 md:mt-0 ring-4 ring-white shadow-sm" />

                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"}`}>
                  <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-bold mb-4">
                    {item.year}
                  </span>
                  <Heading level="h4" className="mb-3">{item.title}</Heading>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">{item.description}</p>
                  {item.image && (
                    <div className="relative aspect-video rounded-[var(--radius-lg)] overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 hover:scale-105" 
                      />
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
