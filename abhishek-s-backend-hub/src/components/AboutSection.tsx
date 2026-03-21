import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Server } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-4">
              I am a B.Tech student in Artificial Intelligence and Data Science at Rajasthan Technical University and currently working as a Python Developer Trainee.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I specialize in backend development using Python, Django, Django REST Framework, and MySQL. I enjoy designing scalable backend architectures, developing secure REST APIs, and optimizing database performance.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I am passionate about solving real-world problems using clean code, efficient algorithms, and modern backend technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { icon: Server, label: "Backend Architecture", desc: "Django & REST APIs" },
              { icon: Database, label: "Database Design", desc: "MySQL & SQL optimization" },
              { icon: Code2, label: "Clean Code", desc: "Scalable & maintainable systems" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-4 flex items-center gap-4 hover:border-primary/30 transition-colors group">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:animate-pulse-glow transition-all">
                  <item.icon size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
