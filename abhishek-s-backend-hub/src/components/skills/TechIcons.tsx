import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// 1. Python Icon
export const PythonIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M11.91 2C6.96 2 7.27 4.14 7.27 4.14L7.28 6.36H12.06V7.07H5.29S2 6.7 2 11.66C2 16.61 4.88 16.4 4.88 16.4H6.55V14.07S6.46 11.28 9.3 11.28H14.06S16.8 11.37 16.8 8.65V4.24S17.07 2 11.91 2ZM9.3 3.42C9.8 3.42 10.2 3.82 10.2 4.32C10.2 4.82 9.8 5.23 9.3 5.23C8.8 5.23 8.39 4.82 8.39 4.32C8.39 3.82 8.8 3.42 9.3 3.42Z"
      fill="hsl(173, 80%, 42%)"
    />
    <path
      d="M12.09 22C17.04 22 16.73 19.86 16.73 19.86L16.72 17.64H11.94V16.93H18.71S22 17.3 22 12.34C22 7.39 19.12 7.6 19.12 7.6H17.45V9.93S17.54 12.72 14.7 12.72H9.94S7.2 12.63 7.2 15.35V19.76S6.93 22 12.09 22ZM14.7 20.58C14.2 20.58 13.8 20.18 13.8 19.68C13.8 19.18 14.2 18.77 14.7 18.77C15.2 18.77 15.61 19.18 15.61 19.68C15.61 20.18 15.2 20.58 14.7 20.58Z"
      fill="hsl(78, 72%, 52%)"
    />
  </svg>
);

// 2. Django Icon
export const DjangoIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect width="24" height="24" rx="5" fill="hsl(220, 18%, 10%)" stroke="hsl(173, 80%, 35%)" strokeWidth="1.5" />
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      fontSize="12"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fill="hsl(173, 80%, 45%)"
      letterSpacing="-0.5"
    >
      dj
    </text>
  </svg>
);

// 3. Django REST Framework Icon
export const DRFIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M12 2L3 6V12C3 17.5 6.8 22.2 12 23.5C17.2 22.2 21 17.5 21 12V6L12 2Z"
      stroke="hsl(173, 80%, 45%)"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="hsl(220, 18%, 12%)"
    />
    <text
      x="12"
      y="15"
      textAnchor="middle"
      fontSize="8.5"
      fontFamily="monospace"
      fontWeight="800"
      fill="hsl(78, 72%, 55%)"
    >
      REST
    </text>
  </svg>
);

// 4. FastAPI Icon
export const FastAPIIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="12" r="10" stroke="hsl(173, 80%, 40%)" strokeWidth="1.75" fill="hsl(173, 80%, 40% / 0.12)" />
    <path
      d="M13 3L6 13H12L11 21L18 11H12L13 3Z"
      fill="hsl(173, 80%, 48%)"
      stroke="hsl(78, 72%, 52%)"
      strokeWidth="0.75"
      strokeLinejoin="round"
    />
  </svg>
);

// 5. REST APIs Icon
export const RestAPIIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="5" cy="12" r="3" stroke="hsl(173, 80%, 45%)" strokeWidth="1.75" fill="hsl(173, 80%, 45% / 0.2)" />
    <circle cx="19" cy="6" r="3" stroke="hsl(78, 72%, 52%)" strokeWidth="1.75" fill="hsl(78, 72%, 52% / 0.2)" />
    <circle cx="19" cy="18" r="3" stroke="hsl(78, 72%, 52%)" strokeWidth="1.75" fill="hsl(78, 72%, 52% / 0.2)" />
    <path d="M8 12H13M13 12L16 6M13 12L16 18" stroke="hsl(210, 20%, 80%)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 6. MySQL Icon
export const MySQLIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <ellipse cx="12" cy="6" rx="8" ry="3.2" stroke="hsl(173, 80%, 45%)" strokeWidth="1.5" fill="hsl(173, 80%, 45% / 0.15)" />
    <path
      d="M4 6V12C4 13.8 7.6 15.2 12 15.2C16.4 15.2 20 13.8 20 12V6"
      stroke="hsl(173, 80%, 45%)"
      strokeWidth="1.5"
    />
    <path
      d="M4 12V18C4 19.8 7.6 21.2 12 21.2C16.4 21.2 20 19.8 20 18V12"
      stroke="hsl(78, 72%, 52%)"
      strokeWidth="1.5"
    />
    <path d="M12 9V15" stroke="hsl(210, 20%, 90%)" strokeWidth="1" strokeDasharray="1.5 1.5" />
  </svg>
);

// 7. SQL Icon
export const SQLIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="3" stroke="hsl(173, 80%, 45%)" strokeWidth="1.75" fill="hsl(220, 18%, 10%)" />
    <path d="M3 10H21M9 10V20M15 10V20" stroke="hsl(173, 80%, 35%)" strokeWidth="1.25" />
    <circle cx="6" cy="7" r="1" fill="hsl(78, 72%, 52%)" />
    <circle cx="10" cy="7" r="1" fill="hsl(173, 80%, 45%)" />
  </svg>
);

// 8. Cursor AI Icon
export const CursorAIIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M5 3L19 12L12 14L9 21L5 3Z"
      fill="hsl(173, 80%, 45% / 0.2)"
      stroke="hsl(173, 80%, 45%)"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="14" r="1.5" fill="hsl(78, 72%, 55%)" />
  </svg>
);

// 9. Claude AI Icon
export const ClaudeAIIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <g transform="translate(12, 12)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1="0"
          y1={i % 2 === 0 ? "-9" : "-6.5"}
          x2="0"
          y2="0"
          stroke={i % 2 === 0 ? "hsl(78, 72%, 55%)" : "hsl(173, 80%, 45%)"}
          strokeWidth={i % 2 === 0 ? "2.2" : "1.6"}
          strokeLinecap="round"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="2.5" fill="hsl(210, 20%, 95%)" />
    </g>
  </svg>
);

// 10. Postman Icon
export const PostmanIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="12" r="10" stroke="hsl(25, 95%, 55%)" strokeWidth="1.5" fill="hsl(25, 95%, 55% / 0.12)" />
    <path
      d="M6 12L18 7L13 18L11 13L6 12Z"
      stroke="hsl(25, 95%, 55%)"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="hsl(25, 95%, 55% / 0.3)"
    />
  </svg>
);

// 11. Git Icon
export const GitIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="6" cy="6" r="2.5" stroke="hsl(12, 90%, 60%)" strokeWidth="1.75" fill="hsl(12, 90%, 60% / 0.2)" />
    <circle cx="6" cy="18" r="2.5" stroke="hsl(12, 90%, 60%)" strokeWidth="1.75" fill="hsl(12, 90%, 60% / 0.2)" />
    <circle cx="18" cy="9" r="2.5" stroke="hsl(78, 72%, 52%)" strokeWidth="1.75" fill="hsl(78, 72%, 52% / 0.2)" />
    <path d="M6 8.5V15.5M6 8.5C6 11 12 11 12 11C12 11 15.5 11 15.5 9" stroke="hsl(210, 20%, 80%)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 12. GitHub Icon
export const GitHubIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.844 21.524C9.344 21.617 9.526 21.306 9.526 21.042C9.526 20.806 9.516 20.024 9.512 19.201C6.73 19.808 6.142 17.854 6.142 17.854C5.688 16.7 5.034 16.393 5.034 16.393C4.126 15.772 5.102 15.785 5.102 15.785C6.106 15.856 6.634 16.818 6.634 16.818C7.526 18.349 8.972 17.906 9.542 17.65C9.632 17.001 9.892 16.559 10.18 16.307C7.96 16.054 5.626 15.192 5.626 11.352C5.626 10.258 6.016 9.364 6.654 8.665C6.55 8.411 6.208 7.391 6.752 6.027C6.752 6.027 7.592 5.758 9.5 7.054C10.3 6.831 11.154 6.72 12.008 6.716C12.862 6.72 13.716 6.831 14.518 7.054C16.424 5.758 17.262 6.027 17.262 6.027C17.808 7.391 17.466 8.411 17.362 8.665C18.002 9.364 18.388 10.258 18.388 11.352C18.388 15.204 16.05 16.05 13.822 16.297C14.18 16.607 14.5 17.22 14.5 18.156C14.5 19.494 14.488 20.573 14.488 20.902C14.488 21.17 14.668 21.485 15.178 21.385C19.146 20.052 22 16.305 22 11.874C22 6.484 17.522 2 12 2Z"
      fill="hsl(210, 20%, 92%)"
    />
  </svg>
);

// 13. Java Icon
export const JavaIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path
      d="M8.5 18.5C8.5 18.5 10 19 12 19C14.5 19 16 18 16 18M7.5 21C7.5 21 10 22 12.5 22C15.5 22 18 20.5 18 20.5"
      stroke="hsl(173, 80%, 45%)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13.5 3C13.5 3 15 4.5 13 6.5C11 8.5 12 9.5 13 10.5M10.5 5C10.5 5 12 6.5 10 8.5C8.5 10 9.5 11.5 10.5 12.5"
      stroke="hsl(78, 72%, 52%)"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

// 14. C++ Icon
export const CppIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <polygon
      points="12,2 21,7.2 21,16.8 12,22 3,16.8 3,7.2"
      stroke="hsl(173, 80%, 45%)"
      strokeWidth="1.6"
      fill="hsl(220, 18%, 10%)"
    />
    <text
      x="12"
      y="15.5"
      textAnchor="middle"
      fontSize="9"
      fontFamily="monospace"
      fontWeight="900"
      fill="hsl(78, 72%, 55%)"
      letterSpacing="-0.5"
    >
      C++
    </text>
  </svg>
);

// 15. DSA (Data Structures & Algorithms) Icon
export const DSAIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="5" r="2.5" stroke="hsl(78, 72%, 52%)" strokeWidth="1.75" fill="hsl(78, 72%, 52% / 0.2)" />
    <circle cx="6" cy="17" r="2.5" stroke="hsl(173, 80%, 45%)" strokeWidth="1.75" fill="hsl(173, 80%, 45% / 0.2)" />
    <circle cx="18" cy="17" r="2.5" stroke="hsl(173, 80%, 45%)" strokeWidth="1.75" fill="hsl(173, 80%, 45% / 0.2)" />
    <path d="M10.5 7L7.5 15M13.5 7L16.5 15" stroke="hsl(210, 20%, 80%)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 16. RAG Icon (Retrieval-Augmented Generation)
export const RAGIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="3" y="4" width="11" height="14" rx="2" stroke="hsl(173, 80%, 45%)" strokeWidth="1.5" fill="hsl(173, 80%, 45% / 0.12)" />
    <path d="M6 8H11M6 11H11M6 14H9" stroke="hsl(210, 20%, 85%)" strokeWidth="1.25" strokeLinecap="round" />
    <circle cx="17" cy="15" r="4.5" stroke="hsl(78, 72%, 52%)" strokeWidth="1.75" fill="hsl(220, 18%, 10%)" />
    <path d="M20 18.5L22 20.5" stroke="hsl(78, 72%, 52%)" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M15.5 15H18.5M17 13.5V16.5" stroke="hsl(78, 72%, 52%)" strokeWidth="1.25" />
  </svg>
);

// 17. Vector Embeddings Icon
export const VectorEmbeddingsIcon = ({ className = "w-5 h-5", ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="6" cy="7" r="2" fill="hsl(173, 80%, 45%)" />
    <circle cx="18" cy="6" r="2" fill="hsl(78, 72%, 52%)" />
    <circle cx="12" cy="13" r="2.5" fill="hsl(210, 20%, 95%)" />
    <circle cx="5" cy="18" r="2" fill="hsl(78, 72%, 52%)" />
    <circle cx="19" cy="17" r="2" fill="hsl(173, 80%, 45%)" />
    <path
      d="M6 7L12 13M18 6L12 13M12 13L5 18M12 13L19 17M6 7L18 6M5 18L19 17"
      stroke="hsl(173, 80%, 40% / 0.35)"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
  </svg>
);

// Helper function to resolve the icon by skill name
export const getTechIcon = (name: string, className?: string) => {
  switch (name) {
    case "Python":
      return <PythonIcon className={className} />;
    case "Django":
      return <DjangoIcon className={className} />;
    case "Django REST Framework":
      return <DRFIcon className={className} />;
    case "FastAPI":
      return <FastAPIIcon className={className} />;
    case "REST APIs":
      return <RestAPIIcon className={className} />;
    case "MySQL":
      return <MySQLIcon className={className} />;
    case "SQL":
      return <SQLIcon className={className} />;
    case "Cursor AI":
      return <CursorAIIcon className={className} />;
    case "Claude AI":
      return <ClaudeAIIcon className={className} />;
    case "Postman":
      return <PostmanIcon className={className} />;
    case "Git":
      return <GitIcon className={className} />;
    case "GitHub":
      return <GitHubIcon className={className} />;
    case "Java":
      return <JavaIcon className={className} />;
    case "C++":
      return <CppIcon className={className} />;
    case "DSA":
      return <DSAIcon className={className} />;
    case "RAG":
      return <RAGIcon className={className} />;
    case "Vector Embeddings":
      return <VectorEmbeddingsIcon className={className} />;
    default:
      return <PythonIcon className={className} />;
  }
};
