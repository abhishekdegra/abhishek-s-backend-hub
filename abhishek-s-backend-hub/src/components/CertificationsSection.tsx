import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const certs = [
  { title: "Advanced Data Structures and Algorithms", org: "Geekster", year: "2024" },
  { title: "Artificial Intelligence & Machine Learning", org: "Ice Hut Technologies", year: "2025" },
  { title: "Python Programming Certification", org: "Learn and Build", year: "2023" },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding gradient-bg" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card p-6 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:animate-pulse-glow transition-all">
                <Award size={26} />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-sm leading-tight">{cert.title}</h3>
              <p className="text-xs text-primary mb-1">{cert.org}</p>
              <p className="text-xs text-muted-foreground font-mono">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
