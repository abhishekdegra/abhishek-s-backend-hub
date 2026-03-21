import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded mb-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 md:p-8 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                B.Tech – Artificial Intelligence & Data Science
              </h3>
              <p className="text-primary mt-1">Rajasthan Technical University</p>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="text-sm text-muted-foreground font-mono">
                  CGPA: <span className="text-accent font-bold">8.0</span>
                </span>
                <span className="text-sm text-muted-foreground font-mono">
                  Expected Graduation: <span className="text-foreground">2026</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
