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

        <div className="grid md:grid-cols-[1fr_380px] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-4">
              I am a Python Backend Developer specializing in building scalable backend systems, REST APIs, and AI-powered applications. With hands-on experience in Django, Django REST Framework, FastAPI, MySQL, and modern AI technologies, I enjoy transforming complex requirements into efficient and practical solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              My experience includes developing backend systems, integrating third-party APIs, and building custom AI agents using RAG, vector embeddings, semantic search, multilingual query understanding, and dynamic tool routing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I am passionate about solving real-world problems, exploring modern AI technologies, and continuously improving my skills in backend engineering, intelligent systems, and scalable application development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-4 border border-border/50 shadow-xl overflow-hidden"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/10 to-accent/10">
              <img
                src="/profile.jpg"
                alt="Abhishek Degra"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/placeholder.svg";
                }}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-1">Abhishek Degra</h3>
              <p className="text-sm text-muted-foreground">
                Python Backend & AI Developer
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
