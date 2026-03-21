import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "CRM Backend System",
    description: "Built a CRM backend system using Django REST Framework and MySQL.",
    features: ["CRUD APIs for leads, customers, tickets and services", "Filtering, pagination and search", "JWT authentication", "Role-based access control", "Postman tested APIs"],
    tech: ["Python", "Django REST Framework", "MySQL", "JWT"],
    github: "https://github.com/abhishekdegra/crm-backend-django.git",
  },
  {
    title: "Hotel Management System Backend",
    description: "Developed a scalable backend system for hotel operations.",
    features: ["Booking management", "Check-in / check-out system", "Billing and payment management", "Role-based authentication", "Optimized database queries"],
    tech: ["Python", "Django", "Django REST Framework", "MySQL"],
    github: "https://github.com/akshmat243/HMS.git",
  },
  // {
  //   title: "Carify – Car Garage Management Backend",
  //   description: "Backend system for managing car service garages.",
  //   features: ["Manage vehicles, services and customers", "Service booking management", "Role-based authentication", "Secure REST APIs", "Database optimization"],
  //   tech: ["Python", "Django REST Framework", "MySQL"],
  //   github: "#",
  // },
  {
    title: "Learning Management System (LMS) Backend",
    description: "Backend for an online learning platform.",
    features: ["Course management APIs", "Student enrollment system", "Authentication and authorization", "Filtering, pagination and search", "Clean scalable architecture"],
    tech: ["Python", "Django REST Framework", "MySQL"],
    github: "https://github.com/abhishekdegra/lms-backend-django.git",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card p-6 group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

              <ul className="space-y-1 mb-5">
                {project.features.map((f, fi) => (
                  <li key={fi} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">▹</span> {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-primary transition-colors"
              >
                <ExternalLink size={14} /> GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
