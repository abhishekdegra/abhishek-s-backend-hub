import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import TiltCard from "@/components/animations/TiltCard";
import SectionReveal from "@/components/animations/SectionReveal";

const projects = [
  {
    title: "AI-Powered E-Commerce Customer Support Agent",
    description: "Built a custom AI-powered customer support agent for an e-commerce platform with intelligent query understanding, multilingual support, real-time API integration, and dynamic tool routing.",
    features: [
      "Intelligent intent detection and entity extraction",
      "RAG-based knowledge retrieval for policies and FAQs",
      "Vector embeddings and semantic search",
      "Dynamic tool routing for products, orders, refunds, tracking, invoices, and user queries",
      "Multilingual and Hinglish query understanding",
      "Real-time integration with e-commerce backend APIs",
      "Multi-LLM integration and fallback support",
      "Optimized AI workflow to reduce unnecessary LLM calls and response time",
    ],
    tech: ["Python", "Django REST Framework", "RAG", "Vector Embeddings", "LLM APIs", "REST APIs"],
    github: "https://github.com/abhishekdegra/ai-agent-for-welfog.git",
  },
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
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded mb-10" />
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <TiltCard key={project.title} intensity={10} className="glass-card p-6 group hover:border-primary/40 transition-all duration-300">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
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
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
