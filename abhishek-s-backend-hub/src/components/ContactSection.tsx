import { useState, useRef, type FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Send, Radio, CheckCircle2, ArrowUpRight, Terminal, Shield, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import SectionReveal from "@/components/animations/SectionReveal";
import Magnetic from "@/components/animations/Magnetic";

const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Exact preserved submit functionality
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

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
        setSubmitted(true);
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

  const commNodes = [
    {
      id: "linkedin",
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/abhishek-degra/",
      icon: Linkedin,
      label: "Professional Network",
      descriptor: "Direct professional outreach, career discussions & networking",
      signal: "ACTIVE",
      accent: "hover:border-primary/60",
    },
    {
      id: "github",
      title: "GitHub",
      href: "https://github.com/abhishekdegra",
      icon: Github,
      label: "Code Repositories",
      descriptor: "Backend architecture codebases, AI repos & commits",
      signal: "PUBLIC REPOS",
      accent: "hover:border-primary/60",
    },
    {
      id: "email",
      title: "Direct Email",
      href: "mailto:degraabhishek@gmail.com",
      icon: Mail,
      label: "Primary Inbox",
      descriptor: "degraabhishek@gmail.com — Priority technical channel",
      signal: "FAST RESPONSE",
      accent: "hover:border-accent/60",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative overflow-hidden bg-background"
    >
      {/* Background technical communication grid and atmospheric glow */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -left-48 bottom-0 w-96 h-96 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -right-48 top-1/3 w-96 h-96 rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10 md:space-y-14">
        {/* ── Section Header ── */}
        <div className="text-center md:text-left">
          <SectionReveal>
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-primary/30 text-primary bg-primary/5 mb-3.5">
              <Radio className="w-3.5 h-3.5 text-accent" />
              <span>OPEN CHANNEL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Let&apos;s Build <span className="gradient-text">Something Intelligent.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Have a project, opportunity, or idea? Start a conversation.
            </p>
          </SectionReveal>
        </div>

        {/* ── Communication Command Center Grid ── */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-start">
          {/* Left: Communication Transmission Nodes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-xl bg-card/40 border border-border/70 backdrop-blur-md mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span className="font-semibold uppercase tracking-wider">
                  DIRECT CHANNEL DISPATCH
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect directly across established developer channels or transmit an encrypted message through the console.
              </p>
            </div>

            {commNodes.map((node, i) => {
              const Icon = node.icon;

              return (
                <Magnetic key={node.id} strength={0.08}>
                  <motion.a
                    href={node.href}
                    target="_blank"
                    rel={node.id !== "email" ? "noopener noreferrer me" : "noopener noreferrer"}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`block p-5 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl transition-all duration-300 shadow-md hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] group ${node.accent}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-secondary/80 border border-border/80 group-hover:border-primary/50 group-hover:bg-primary/10 flex items-center justify-center p-2.5 text-primary transition-all duration-300">
                          <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base">
                              {node.title}
                            </h3>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground">
                            {node.label}
                          </span>
                        </div>
                      </div>

                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-secondary/80 border border-border/60 text-accent hidden sm:inline-block">
                        {node.signal}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-3 pl-1 leading-relaxed">
                      {node.descriptor}
                    </p>
                  </motion.a>
                </Magnetic>
              );
            })}
          </motion.div>

          {/* Right: Transmission Console Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden">
              {/* Internal tech grid */}
              <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />

              {/* Console Top Header Bar */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-6 border-b border-border/60 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-foreground font-semibold uppercase tracking-wider text-xs">
                    TRANSMISSION CONSOLE
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-muted-foreground/80 text-[10px]">
                  <Shield className="w-3.5 h-3.5 text-accent/80" />
                  <span className="tracking-wide">ENCRYPTED ENDPOINT</span>
                </div>
              </div>

              {/* Form Content or Success State */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-10 text-center space-y-4 relative z-10"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/40 flex items-center justify-center mx-auto text-accent shadow-[0_0_30px_rgba(20,184,166,0.25)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-foreground">
                        Transmission Dispatched
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                        Your payload was securely routed to Abhishek. You will receive a direct reply shortly.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-xs font-mono text-foreground transition-colors"
                    >
                      Transmit Another Message &rarr;
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    {/* Field 1: Name */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <label htmlFor="contact-name" className="text-foreground font-medium tracking-wide">
                          Your Name
                        </label>
                        <span className="text-[10px] font-mono text-muted-foreground/70 tracking-wider">
                          REQUIRED
                        </span>
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Linus Torvalds"
                        aria-label="Your Name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/70 text-foreground text-base sm:text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 focus:bg-secondary/70 transition-all duration-200"
                      />
                    </div>

                    {/* Field 2: Email */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <label htmlFor="contact-email" className="text-foreground font-medium tracking-wide">
                          Email Address
                        </label>
                        <span className="text-[10px] font-mono text-muted-foreground/70 tracking-wider">
                          REQUIRED
                        </span>
                      </div>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. linus@kernel.org"
                        aria-label="Email Address"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/70 text-foreground text-base sm:text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 focus:bg-secondary/70 transition-all duration-200"
                      />
                    </div>

                    {/* Field 3: Message */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <label htmlFor="contact-message" className="text-foreground font-medium tracking-wide">
                          Message
                        </label>
                        <span className="text-[10px] font-mono text-muted-foreground/70 tracking-wider">
                          MESSAGE
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        placeholder="Outline project objectives, backend architecture scope, or collaboration inquiry..."
                        aria-label="Message"
                        rows={4}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/70 text-foreground text-base sm:text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 focus:bg-secondary/70 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_6px_24px_rgba(20,184,166,0.3)] hover:shadow-[0_8px_32px_rgba(20,184,166,0.45)] transition-all cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;