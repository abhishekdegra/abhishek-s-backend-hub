import { motion, useInView } from "framer-motion";
import { type FormEvent, useRef, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
import Magnetic from "@/components/animations/Magnetic";

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
    e.preventDefault(); // no redirect

    if (loading) return;

    // Basic client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // Use env-configured API base if provided (Vite env var: VITE_API_BASE)
    const apiBase = import.meta.env.VITE_API_BASE || "https://backend-web-portfolio.onrender.com";
    const endpoint = `${apiBase.replace(/\/$/, "")}/api/contact/send/`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Message sent successfully 🔥");
        setForm({ name: "", email: "", message: "" });
      } else {
        const err = data?.error || "Failed to send message";
        toast.error(err);
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
              <Magnetic strength={0.12}>
                <motion.a
                  href="https://www.linkedin.com/in/abhishek-degra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex items-center gap-4 glass-card p-4 hover:border-primary/40 transition-all"
                >
                  <Linkedin size={20} /> LinkedIn
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.12}>
                <motion.a
                  href="https://github.com/abhishekdegra"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex items-center gap-4 glass-card p-4 hover:border-primary/40 transition-all"
                >
                  <Github size={20} /> GitHub
                </motion.a>
              </Magnetic>

              <Magnetic strength={0.12}>
                <motion.a
                  href="mailto:degraabhishek@gmail.com"
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex items-center gap-4 glass-card p-4 hover:border-primary/40 transition-all"
                >
                  <Mail size={20} /> Email
                </motion.a>
              </Magnetic>
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
<label htmlFor="contact-name" className="sr-only">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your Name"
            aria-label="Your name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          />

          <label htmlFor="contact-email" className="sr-only">
            Your Email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="Your Email"
            aria-label="Your email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          />

          <label htmlFor="contact-message" className="sr-only">
            Your Message
          </label>
          <textarea
            id="contact-message"
            placeholder="Your Message"
            aria-label="Your message"
            rows={4}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 resize-none"
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2"
            >
              {loading ? "⏳ Sending..." : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;