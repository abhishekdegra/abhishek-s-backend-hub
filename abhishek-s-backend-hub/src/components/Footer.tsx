import { Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

const Footer = () => {
  return (
    <footer className="border-t border-border/80 bg-card/40 backdrop-blur-md pt-8 pb-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Subtle Horizontal System Status Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border/50 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-foreground font-semibold">SYSTEM ONLINE</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-[11px]">
            <span className="flex items-center gap-1.5 text-primary">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>AVAILABLE FOR OPPORTUNITIES</span>
            </span>
            <span className="hidden sm:inline-block text-muted-foreground/60">|</span>
            <span className="hidden sm:inline-block">
              JAIPUR, INDIA
            </span>
          </div>
        </div>

        {/* Lower Bar: Copyright & Social Channels */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Abhishek Degra. Built with precision for production.
          </p>

          <div className="flex items-center gap-3">
            {[
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/abhishek-degra/",
                label: "LinkedIn",
              },
              {
                icon: Github,
                href: "https://github.com/abhishekdegra",
                label: "GitHub",
              },
              {
                icon: Mail,
                href: "mailto:degraabhishek@gmail.com",
                label: "Email",
              },
            ].map((s, i) => (
              <Magnetic key={i} strength={0.15}>
                <a
                  href={s.href}
                  target="_blank"
                  rel={s.label !== "Email" ? "noopener noreferrer me" : "noopener noreferrer"}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-border/80 bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
                >
                  <s.icon size={16} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
