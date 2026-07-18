"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";

interface ProductionStep {
  title: string;
  description: string;
  image: string;
  images?: string[];
}

interface ProductionProcessProps {
  title: string;
  subtitle: string;
  steps: ProductionStep[];
}

function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full group">
      {images.map((img, idx) => (
        <Image
          key={img}
          src={img}
          alt={`${alt} - ${idx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductionProcess({ title, subtitle, steps }: ProductionProcessProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="py-24 bg-[var(--surface-dark)] border-b border-border/40">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              DN HOLDING
            </p>
            <Heading level="h2" display>
              {title}
            </Heading>
            <p className="text-[var(--text-muted)] text-lg mt-4 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index}
                className={`flex flex-col gap-8 md:gap-16 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="w-full md:w-1/2">
                  <ScrollReveal direction={isEven ? "right" : "left"}>
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[var(--shadow-large)]">
                      {step.images && step.images.length > 0 ? (
                        <ImageSlider images={step.images} alt={step.title} />
                      ) : (
                        <Image 
                          src={step.image} 
                          alt={step.title} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      {/* Step Number Badge */}
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold shadow-lg z-30">
                        {index + 1}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
                
                <div className="w-full md:w-1/2 space-y-6">
                  <ScrollReveal direction={isEven ? "left" : "right"} delay={200}>
                    <Heading level="h3" display className="text-2xl md:text-3xl text-primary dark:text-white">
                      {step.title}
                    </Heading>
                    <p className="text-[var(--text-muted)] text-lg leading-relaxed mt-4">
                      {step.description}
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
