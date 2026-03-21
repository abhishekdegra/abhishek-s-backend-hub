import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Python Developer Trainee",
    company: "ATS Global Tech",
    period: "Oct 2025 – Present",
    responsibilities: [
      "Built backend applications using Django",
      "Developed REST APIs using Django REST Framework",
      "Implemented authentication and authorization systems",
      "Integrated MySQL database with backend services",
    ],
  },
  {
    role: "AI / ML Trainee",
    company: "Ice Hut Technologies",
    period: "June 2025 – Aug 2025",
    responsibilities: [
      "Learned machine learning fundamentals",
      "Worked with Python libraries",
      "Built simple ML models",
    ],
  },
  {
    role: "Salesforce Trainee",
    company: "Au Ignite Future Skills – Ambuja Foundation",
    period: "3 Months",
    responsibilities: [
      "Learned Salesforce CRM fundamentals",
      "learned java , apex , MySQL fundamentals",
      "Worked with CRM workflows",
      "Understood business automation using Salesforce",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding gradient-bg" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded mb-10" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-4 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                <div className="glass-card p-5 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase size={16} className="text-primary" />
                    <h3 className="font-bold text-foreground">{exp.role}</h3>
                  </div>
                  <p className="text-sm text-primary mb-1">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">{exp.period}</p>
                  <ul className="space-y-1">
                    {exp.responsibilities.map((r, ri) => (
                      <li key={ri} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-0.5">▹</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
