import Link from "next/link";
import {Badge} from "@/components/ui/Badge";

interface ProjectCardProps {
  title: string;
  description: string;
  company: string;
  category: string;
  image?: string;
  slug: string;
  lang: string;
}

export function ProjectCard({ title, description, company, category, image, slug, lang }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block group h-[400px] w-full rounded-[var(--radius-xl)] overflow-hidden relative">
      <div className="absolute inset-0 bg-surface-dark z-0">
        {image ? (
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${image})` }} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary transition-transform duration-700 group-hover:scale-110" />
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent z-10 transition-opacity duration-300" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 z-20 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[var(--ease-premium)]">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="accent" className="bg-accent/90 text-white backdrop-blur-sm border-none">{category}</Badge>
          <Badge variant="outline" className="text-white/80 border-white/20 backdrop-blur-sm">{company}</Badge>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 font-display">{title}</h3>
        
        <div className="overflow-hidden">
          <p className="text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
