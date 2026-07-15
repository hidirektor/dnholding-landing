"use client";

import React from "react";
import Image from "next/image";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";

interface ProductionStep {
  title: string;
  description: string;
  image: string;
}

interface ProductionProcessProps {
  title: string;
  subtitle: string;
  steps: ProductionStep[];
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
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[var(--shadow-large)] group">
                      <Image 
                        src={step.image} 
                        alt={step.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Step Number Badge */}
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold shadow-lg z-10">
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
