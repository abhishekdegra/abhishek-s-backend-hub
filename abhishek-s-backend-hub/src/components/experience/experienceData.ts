export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
  milestoneTag: string;
  signalType: string;
  status: "CURRENT" | "MILESTONE";
  pathProgress: number; // Approximate scroll percentage where this milestone activates (0 to 1)
  keyHighlights: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "welfog",
    role: "Python & AI Backend Developer",
    company: "Welfog",
    period: "May 2026 - Present",
    responsibilities: [
      "Developing an AI-powered customer support agent for an e-commerce platform",
      "Implemented RAG, vector embeddings and semantic search for knowledge retrieval",
      "Integrated REST APIs for products, orders, refunds, tracking and invoices",
      "Built intelligent intent detection, entity extraction and dynamic tool routing",
      "Implemented multilingual query understanding and multi-LLM integrations",
      "Optimized AI workflows to reduce LLM calls and improve response time",
    ],
    milestoneTag: "AI & RAG ARCHITECTURE",
    signalType: "CURRENT ROLE",
    status: "CURRENT",
    pathProgress: 0.15,
    keyHighlights: ["RAG & Embeddings", "Multi-LLM Routing", "Production REST APIs"],
  },
  {
    id: "ats-global",
    role: "Python Developer",
    company: "ATS Global Tech",
    period: "Oct 2025 – Apr 2026",
    responsibilities: [
      "Built backend applications using Django",
      "Developed REST APIs using Django REST Framework",
      "Implemented authentication and authorization systems",
      "Integrated MySQL database with backend services",
    ],
    milestoneTag: "SCALABLE BACKEND CORE",
    signalType: "BACKEND MILESTONE",
    status: "MILESTONE",
    pathProgress: 0.45,
    keyHighlights: ["Django & DRF", "MySQL Storage", "Auth Architecture"],
  },
  {
    id: "ice-hut",
    role: "AI / ML Trainee",
    company: "Ice Hut Technologies",
    period: "June 2025 – Aug 2025",
    responsibilities: [
      "Learned machine learning fundamentals",
      "Worked with Python libraries",
      "Built simple ML models",
    ],
    milestoneTag: "MACHINE LEARNING FOUNDATION",
    signalType: "AI SYSTEMS",
    status: "MILESTONE",
    pathProgress: 0.72,
    keyHighlights: ["ML Fundamentals", "Python Data Stack", "Predictive Models"],
  },
  {
    id: "am-foundation",
    role: "Salesforce Trainee",
    company: "Au Ignite Future Skills – Ambuja Foundation",
    period: "3 Months",
    responsibilities: [
      "Learned Salesforce CRM fundamentals",
      "learned java , apex , MySQL fundamentals",
      "Worked with CRM workflows",
      "Understood business automation using Salesforce",
    ],
    milestoneTag: "SYSTEM AUTOMATION & ENTERPRISE",
    signalType: "ENGINEERING MILESTONE",
    status: "MILESTONE",
    pathProgress: 0.94,
    keyHighlights: ["Java & Apex", "MySQL Basics", "Business Automation"],
  },
];
