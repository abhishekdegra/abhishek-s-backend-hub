import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import toast from "react-hot-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ FIXED SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 🔥 IMPORTANT (no redirect)

    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact/send/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Message sent successfully 🔥");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message ❌");
      }
    } catch (error) {
      toast.error("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground mb-6">
              Feel free to reach out for collaborations, projects or just a chat about backend development!
            </p>

            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/abhishek-degra/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-4 hover:border-primary/40 transition-all"
              >
                <Linkedin size={20} /> LinkedIn
              </a>

              <a
                href="https://github.com/abhishekdegra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-4 hover:border-primary/40 transition-all"
              >
                <Github size={20} /> GitHub
              </a>

              <a
                href="mailto:degraabhishek@gmail.com"
                className="flex items-center gap-4 glass-card p-4 hover:border-primary/40 transition-all"
              >
                <Mail size={20} /> Email
              </a>
            </div>
          </motion.div>

          {/* ✅ FIXED FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2"
            >
              {loading ? "⏳ Sending..." : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;