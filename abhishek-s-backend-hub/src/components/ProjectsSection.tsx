import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/animations/SectionReveal";
import { ALL_PROJECTS, ProjectCategory } from "./projects/projectsData";
import FeaturedProjectCard from "./projects/FeaturedProjectCard";
import ProjectCard from "./projects/ProjectCard";
import ProjectFilter from "./projects/ProjectFilter";

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("ALL");
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Filter projects according to selected category
  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (activeCategory === "ALL") return true;
    return p.category.includes(activeCategory);
  });

  // Separate the featured AI agent from secondary project cards
  const featuredInFilter = filteredProjects.find((p) => p.featured);
  const secondaryProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background ambient lighting accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-accent/8 blur-[120px]"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header: PROJECT LAB */}
        <SectionReveal>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-primary font-semibold tracking-widest uppercase">
              ENGINEERING PROJECTS
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-primary/30" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight font-heading">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
            Backend systems, AI agents and intelligent applications built to solve real-world problems.
          </p>
        </SectionReveal>

        {/* Category Filter Navigation */}
        <ProjectFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 1. Featured Hero AI Case Study (when matching filter) */}
        {featuredInFilter && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <FeaturedProjectCard />
          </motion.div>
        )}

        {/* 2. Secondary Engineering Case Studies Header (if featured is displayed) */}
        {secondaryProjects.length > 0 && (
          <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-accent" />
              <h3 className="text-sm font-mono font-bold tracking-wider text-foreground uppercase">
                BACKEND & ENTERPRISE ARCHITECTURE CASE STUDIES
              </h3>
            </div>
          </div>
        )}

        {/* 3. Secondary Project Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {secondaryProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full"
              >
                <ProjectCard project={project} index={idx} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
