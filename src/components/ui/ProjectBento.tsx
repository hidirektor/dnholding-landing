"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectBentoProps {
  projects: any[];
  lang: string;
  dict: any;
}

export function ProjectBento({ projects, lang, dict }: ProjectBentoProps) {
  // We need 5 projects for the 5 image tiles
  const p1 = projects[0];
  const p2 = projects[1];
  const p3 = projects[2];
  const p4 = projects[3];
  const p5 = projects[4];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-8">
      
      {/* ─── TILE 1 (Left Tall): cols 1-4, rows 1-2 ─── */}
      <div className="relative lg:col-span-4 lg:row-span-2 min-h-[500px] lg:min-h-full rounded-[2rem] overflow-hidden group bg-black shadow-lg">
        {p1 && (
          <>
            <Image
              src={p1.image || p1.images?.[0] || "/images/placeholder.jpg"}
              alt={p1.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
            />
            {/* Top Left Label */}
            <div className="absolute top-6 left-6 z-10 bg-black/40 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10">
              1 / {projects.length}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 text-white z-10">
              <p className="text-white/60 text-[10px] uppercase tracking-widest font-semibold mb-2">
                {p1.category}
              </p>
              <div className="flex justify-between items-end gap-4 mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold leading-tight max-w-[80%]">
                  {p1.title}
                </h3>
                <div className="text-right shrink-0">
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">{dict.projects?.bento?.year}</p>
                  <p className="font-bold text-lg">{p1.year}</p>
                </div>
              </div>
              
              <div className="h-px w-full bg-white/20 mb-6"></div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">{dict.projects?.bento?.location}</p>
                    <p className="text-sm font-semibold">{p1.location}</p>
                  </div>
                </div>
                <Link
                  href={`/projects/${p1.slug}`}
                  className="group/link flex items-center gap-2 text-xs font-semibold hover:text-accent transition-colors"
                >
                  <span className="border-b border-white/30 group-hover/link:border-accent pb-0.5">
                    {dict.projects?.bento?.details}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:translate-x-1 transition-transform">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ─── TILE 2 (Top Mid Wide): cols 5-12, row 1 ─── */}
      <div className="relative lg:col-span-8 min-h-[250px] lg:min-h-0 rounded-[2rem] overflow-hidden group bg-[#0a0a0a] shadow-lg p-6 lg:p-10 flex flex-col justify-between">
        <Link href={`/projects/${p2?.slug}`} className="absolute inset-0 z-20" aria-label={p2?.title} />
        {p2 && (
          <>
            <Image
              src={p2.image || p2.images?.[0] || "/images/placeholder.jpg"}
              alt={p2.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="relative z-10 flex justify-between items-start gap-4">
              <h3 className="text-white font-bold text-lg lg:text-2xl leading-snug max-w-[70%] tracking-wider">
                {p2.title}
              </h3>
              <div className="text-right shrink-0 flex flex-col items-end">
                <span className="text-blue-600 font-bold text-lg lg:text-xl">{p2.year}</span>
                <span className="text-white/60 text-xs lg:text-sm uppercase tracking-widest mt-1">{p2.location}</span>
              </div>
            </div>
            
            <p className="relative z-10 text-white/40 text-xs lg:text-sm tracking-widest mt-8 line-clamp-2 w-full">
              {p2.title}
            </p>
            
            <div className="relative z-10 flex justify-end w-full mt-auto pt-8">
              <span className="text-blue-600 text-xs lg:text-sm uppercase tracking-widest font-bold">
                {dict.projects?.bento?.explore}
              </span>
            </div>
          </>
        )}
      </div>

      {/* ─── TILE 4 (Mid Tall Silo): cols 5-7, row 2 ─── */}
      <div className="relative lg:col-span-3 min-h-[300px] lg:min-h-[320px] rounded-[2rem] overflow-hidden group shadow-lg">
        {p3 && (
          <>
            <Image
              src={p3.image || p3.images?.[0] || "/images/placeholder.jpg"}
              alt={p3.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <Link href={`/projects/${p3.slug}`} className="absolute inset-0 z-10" />
            <div className="absolute bottom-6 left-6 text-white z-20">
              <p className="text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-1">{p3.category}</p>
              <h4 className="font-bold text-base leading-tight w-[90%] line-clamp-2">{p3.title}</h4>
            </div>
          </>
        )}
      </div>

      {/* ─── TILE 5 (Mid Portrait): cols 8-12, row 2 ─── */}
      <div className="relative lg:col-span-5 min-h-[300px] lg:min-h-[320px] rounded-[2rem] overflow-hidden group bg-black shadow-lg">
        {p4 && (
          <>
            <Image
              src={p4.image || p4.images?.[0] || "/images/placeholder.jpg"}
              alt={p4.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />
            <Link href={`/projects/${p4.slug}`} className="absolute inset-0 z-10" />
            

            
            <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
              <span className="text-white text-xs font-bold w-16 text-right leading-tight">
                {dict.projects?.bento?.diveInto}
              </span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-accent group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 z-20">
               <h4 className="text-white font-bold text-lg max-w-[80%] line-clamp-2">{p4.title}</h4>
            </div>
          </>
        )}
      </div>

      {/* ─── TILE 6 (Bottom Factory): cols 1-7, row 3 ─── */}
      <div className="relative lg:col-span-7 min-h-[250px] lg:min-h-[280px] rounded-[2rem] overflow-hidden group shadow-lg">
        {p5 && (
          <>
            <Image
              src={p5.image || p5.images?.[0] || "/images/placeholder.jpg"}
              alt={p5.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-8 left-8 z-20 text-white max-w-sm">
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
                {dict.projects?.bento?.balancing}
              </h3>
              <Link
                href={`/projects/${p5.slug}`}
                className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-colors"
              >
                <span>dnholding.com</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ─── TILE 7 (Bottom Text): cols 8-12, row 3 ─── */}
      <div className="relative lg:col-span-5 min-h-[250px] lg:min-h-[280px] rounded-[2rem] overflow-hidden bg-[#f4f4f4] dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-lg p-8 sm:p-10 flex flex-col justify-center">
        <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white leading-tight mb-4">
          {dict.projects?.bento?.tagline1} <span className="text-[#ca8a2a]">{dict.projects?.bento?.taglineHighlight}</span> {dict.projects?.bento?.tagline2}
        </h3>
        <p className="text-black/60 dark:text-white/60 text-[11px] sm:text-xs leading-relaxed mb-6 line-clamp-4">
          {dict.home?.about?.description || ""}
        </p>
        <div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#ca8a2a] hover:text-white dark:hover:bg-[#ca8a2a] transition-colors"
          >
            <span>{dict.projects?.bento?.timeline}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>


    </div>
  );
}

export default ProjectBento;
