import { PROJECT_CATEGORIES, ProjectCategory } from "./projectsData";

interface ProjectFilterProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      {PROJECT_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`relative px-4 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                : "bg-secondary/60 text-muted-foreground border-border/80 hover:border-primary/40 hover:text-foreground"
            }`}
          >
            <span>{category}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProjectFilter;
