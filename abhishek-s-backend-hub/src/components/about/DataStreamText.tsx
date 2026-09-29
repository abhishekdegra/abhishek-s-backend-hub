import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ABOUT_PARAGRAPHS } from "./aboutData";

interface DataStreamTextProps {
  inView: boolean;
}

export const DataStreamText: React.FC<DataStreamTextProps> = ({ inView }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Stages: 'idle' | 'booting' | 'streaming' | 'complete'
  const [stage, setStage] = useState<"idle" | "booting" | "streaming" | "complete">(
    prefersReducedMotion ? "complete" : "idle"
  );
  
  // Track revealed character count for each of the 3 paragraphs
  const [streamProgress, setStreamProgress] = useState<[number, number, number]>([0, 0, 0]);
  const [activeParagraph, setActiveParagraph] = useState<number>(0);
  const [bootStatus, setBootStatus] = useState<string>("PROFILE STANDBY");
  
  // Guard so animation only runs once
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage("complete");
      setStreamProgress([
        ABOUT_PARAGRAPHS[0].length,
        ABOUT_PARAGRAPHS[1].length,
        ABOUT_PARAGRAPHS[2].length,
      ]);
      setBootStatus("PROFILE SYNCHRONIZED");
      return;
    }

    if (inView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setStage("booting");
      setBootStatus("SYSTEM INITIALIZING");

      const bootTimer = setTimeout(() => {
        setStage("streaming");
        setBootStatus("STREAMING PROFILE DATA");
      }, 160);

      return () => clearTimeout(bootTimer);
    }
  }, [inView, prefersReducedMotion]);

  useEffect(() => {
    if (stage !== "streaming") return;

    // Fast cinematic streaming: ~12 chars per 22ms (~540 chars/sec)
    // Finishes all 3 paragraphs in ~1.2s total!
    const stepInterval = 22;
    const charsPerStep = 12;

    const interval = setInterval(() => {
      setStreamProgress((prev) => {
        const next: [number, number, number] = [...prev];
        const currentP = activeParagraph;
        const targetLen = ABOUT_PARAGRAPHS[currentP].length;

        if (next[currentP] < targetLen) {
          next[currentP] = Math.min(targetLen, next[currentP] + charsPerStep);
          return next;
        } else if (currentP < 2) {
          // Advance to next paragraph
          setActiveParagraph(currentP + 1);
          return next;
        } else {
          // All 3 paragraphs finished
          clearInterval(interval);
          setStage("complete");
          setBootStatus("PROFILE SYNCHRONIZED");
          return [
            ABOUT_PARAGRAPHS[0].length,
            ABOUT_PARAGRAPHS[1].length,
            ABOUT_PARAGRAPHS[2].length,
          ];
        }
      });
    }, stepInterval);

    return () => clearInterval(interval);
  }, [stage, activeParagraph]);

  return (
    <div className="relative font-sans text-left">
      {/* Top AI System Telemetry Bar */}
      <div className="flex items-center justify-between gap-4 py-2 px-3.5 mb-5 rounded-lg border border-primary/20 bg-background/80 backdrop-blur-md shadow-[0_0_15px_rgba(20,184,166,0.06)]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                stage === "complete" ? "bg-primary" : "bg-accent"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                stage === "complete" ? "bg-primary" : "bg-accent"
              }`}
            />
          </span>
          <span className="text-[11px] font-mono tracking-wider font-semibold text-primary">
            {bootStatus}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/70">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          <span>AI ENGINEER DOSSIER</span>
        </div>
      </div>

      {/* Paragraph Stream Area */}
      <div className="relative space-y-4">
        {/* Subtle scan-line overlay only during active streaming */}
        {stage === "streaming" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-12 w-full animate-pulse"
          />
        )}

        {ABOUT_PARAGRAPHS.map((fullText, pIdx) => {
          const charCount = stage === "complete" ? fullText.length : streamProgress[pIdx];
          const isActivelyTyping = stage === "streaming" && activeParagraph === pIdx && charCount < fullText.length;
          const isFinished = stage === "complete" || charCount >= fullText.length;
          const isUpcoming = stage === "streaming" && pIdx > activeParagraph;

          if (isUpcoming && charCount === 0) {
            return (
              <p
                key={pIdx}
                className="text-muted-foreground/20 leading-relaxed font-sans select-none min-h-[1.5rem]"
              >
                <span className="opacity-0">{fullText}</span>
              </p>
            );
          }

          const revealedPortion = fullText.slice(0, charCount);
          // Highlight the most recently streamed trailing characters with subtle cyan luminescence
          const headPortion = revealedPortion.slice(0, Math.max(0, charCount - 16));
          const tailPortion = revealedPortion.slice(Math.max(0, charCount - 16));

          return (
            <p
              key={pIdx}
              className={`text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose transition-colors duration-300 ${
                stage === "complete"
                  ? "text-muted-foreground"
                  : isActivelyTyping
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {stage === "complete" ? (
                fullText
              ) : (
                <>
                  <span>{headPortion}</span>
                  {tailPortion && (
                    <span
                      className={
                        isActivelyTyping
                          ? "text-foreground font-medium drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all"
                          : ""
                      }
                    >
                      {tailPortion}
                    </span>
                  )}
                  {isActivelyTyping && (
                    <span
                      aria-hidden="true"
                      className="inline-block w-2 h-4 ml-1 -mb-0.5 bg-primary shadow-[0_0_8px_hsl(var(--primary))] animate-pulse align-middle"
                    />
                  )}
                </>
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default DataStreamText;
