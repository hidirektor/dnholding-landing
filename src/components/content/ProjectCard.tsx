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
    <Link href={`/projects/${slug}`} className="block group h-[450px] w-full rounded-3xl overflow-hidden relative shadow-lg hover:shadow-2xl transition-shadow duration-500">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-primary">
        {image ? (
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url(${image})` }} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary transition-transform duration-[1500ms] group-hover:scale-110" />
        )}
      </div>
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent z-10" />
      
      {/* Floating Glassmorphism Text Card */}
      <div className="absolute inset-x-4 bottom-4 p-6 z-20 flex flex-col justify-end bg-white/70 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[var(--ease-premium)]">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="accent" className="bg-accent text-white border-none shadow-sm">{category}</Badge>
          <Badge variant="outline" className="text-primary dark:text-white/90 border-primary/20 dark:border-white/20 bg-white/50 dark:bg-white/5">{company}</Badge>
        </div>
        
        <h3 className="text-xl font-bold text-primary dark:text-white mb-2 font-display group-hover:text-accent transition-colors">{title}</h3>
        
        <div className="overflow-hidden">
          <p className="text-text-secondary dark:text-white/70 line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
