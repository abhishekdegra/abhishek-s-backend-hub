import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 65 },
      { name: "C++", level: 60 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Django", level: 85 },
      { name: "Django REST Framework", level: 85 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MySQL", level: 80 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    title: "Other",
    skills: [
      { name: "Git / GitHub", level: 75 },
      { name: "DSA", level: 70 },
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding gradient-bg" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold mb-5 text-primary">{cat.title}</h3>
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent skill-bar-fill"
                        style={{
                          width: inView ? `${skill.level}%` : "0%",
                          animationDelay: `${ci * 0.2}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
