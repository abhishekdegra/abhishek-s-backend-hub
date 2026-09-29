export type SkillCategory =
  | "Programming"
  | "Backend"
  | "Database"
  | "AI / Intelligent Systems"
  | "Developer Tools"
  | "Other";

export interface SkillItem {
  id: string;
  name: string;
  level: number; // Exact original proficiency value preserved internally
  category: SkillCategory;
  originalCategory: "Programming" | "Backend" | "Database" | "Tools" | "Other";
  role: string;
  signalTag: string;
  tier: "Core Architecture" | "Production Engine" | "Advanced Tooling" | "Core Logic";
  connectedTo: string[]; // Node IDs this skill connects with in the architecture
  coords: { x: number; y: number }; // 0 - 100 percentage in the Engineering Core map
  latencyOrPerf?: string;
}

// Preserve ALL 17 original skills with their exact names and levels
export const ALL_SKILLS: SkillItem[] = [
  // ── Backend Cluster ──
  {
    id: "python",
    name: "Python",
    level: 90,
    category: "Programming",
    originalCategory: "Programming",
    role: "Primary backend runtime & AI workflow orchestration engine",
    signalTag: "Core Architecture",
    tier: "Core Architecture",
    connectedTo: ["core", "django", "fastapi", "rag", "dsa"],
    coords: { x: 30, y: 22 },
    latencyOrPerf: "Python 3.12+ ASGI",
  },
  {
    id: "django",
    name: "Django",
    level: 90,
    category: "Backend",
    originalCategory: "Backend",
    role: "High-scale enterprise web framework with batteries-included ORM",
    signalTag: "Production Core",
    tier: "Production Engine",
    connectedTo: ["core", "python", "drf", "mysql"],
    coords: { x: 14, y: 16 },
    latencyOrPerf: "Enterprise MVC",
  },
  {
    id: "drf",
    name: "Django REST Framework",
    level: 90,
    category: "Backend",
    originalCategory: "Backend",
    role: "Robust serializer architecture, auth pipelines & RESTful API suites",
    signalTag: "Enterprise APIs",
    tier: "Production Engine",
    connectedTo: ["core", "django", "rest-apis", "postman"],
    coords: { x: 10, y: 38 },
    latencyOrPerf: "Token & JWT Auth",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    level: 80,
    category: "Backend",
    originalCategory: "Backend",
    role: "High-throughput asynchronous ASGI microservices & Pydantic schemas",
    signalTag: "High Concurrency",
    tier: "Production Engine",
    connectedTo: ["core", "python", "rest-apis"],
    coords: { x: 15, y: 62 },
    latencyOrPerf: "Async ASGI Engine",
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    level: 90,
    category: "Backend",
    originalCategory: "Backend",
    role: "Contract-driven, stateless interface design & third-party integrations",
    signalTag: "Contract Standards",
    tier: "Production Engine",
    connectedTo: ["core", "drf", "fastapi", "postman"],
    coords: { x: 26, y: 80 },
    latencyOrPerf: "OpenAPI 3.0",
  },

  // ── Database Cluster ──
  {
    id: "mysql",
    name: "MySQL",
    level: 85,
    category: "Database",
    originalCategory: "Database",
    role: "Relational persistence, schema indexing, ACID transactions & foreign constraints",
    signalTag: "Relational Storage",
    tier: "Production Engine",
    connectedTo: ["core", "sql", "django"],
    coords: { x: 42, y: 86 },
    latencyOrPerf: "InnoDB / ACID",
  },
  {
    id: "sql",
    name: "SQL",
    level: 85,
    category: "Database",
    originalCategory: "Database",
    role: "Complex multi-table queries, analytical aggregations & query optimization",
    signalTag: "Relational Engine",
    tier: "Production Engine",
    connectedTo: ["core", "mysql"],
    coords: { x: 58, y: 86 },
    latencyOrPerf: "Query Optimization",
  },

  // ── AI & Intelligent Systems Cluster ──
  {
    id: "rag",
    name: "RAG",
    level: 85,
    category: "AI / Intelligent Systems",
    originalCategory: "Other",
    role: "Retrieval-Augmented Generation for grounded context injection & LLM workflows",
    signalTag: "AI Architecture",
    tier: "Core Architecture",
    connectedTo: ["core", "vector-embeddings", "claude-ai", "python"],
    coords: { x: 70, y: 22 },
    latencyOrPerf: "Context Injection",
  },
  {
    id: "vector-embeddings",
    name: "Vector Embeddings",
    level: 80,
    category: "AI / Intelligent Systems",
    originalCategory: "Other",
    role: "High-dimensional semantic representation & similarity search indexing",
    signalTag: "Semantic Search",
    tier: "Core Architecture",
    connectedTo: ["core", "rag", "claude-ai"],
    coords: { x: 86, y: 16 },
    latencyOrPerf: "Cosine / Dot Product",
  },
  {
    id: "claude-ai",
    name: "Claude AI",
    level: 85,
    category: "AI / Intelligent Systems",
    originalCategory: "Tools",
    role: "Advanced LLM reasoning, code synthesis & structured agentic prompting",
    signalTag: "Cognitive Engine",
    tier: "Advanced Tooling",
    connectedTo: ["core", "rag", "cursor-ai"],
    coords: { x: 90, y: 38 },
    latencyOrPerf: "Agentic Tooling",
  },
  {
    id: "cursor-ai",
    name: "Cursor AI",
    level: 90,
    category: "Developer Tools",
    originalCategory: "Tools",
    role: "AI-native engineering environment for accelerated iteration & semantic refactoring",
    signalTag: "Dev Accelerant",
    tier: "Advanced Tooling",
    connectedTo: ["core", "claude-ai"],
    coords: { x: 85, y: 62 },
    latencyOrPerf: "AI Workspace",
  },

  // ── Developer Tools Cluster ──
  {
    id: "postman",
    name: "Postman",
    level: 85,
    category: "Developer Tools",
    originalCategory: "Tools",
    role: "Automated API contract testing, mock environments & documentation",
    signalTag: "API QA Suite",
    tier: "Advanced Tooling",
    connectedTo: ["core", "drf", "rest-apis"],
    coords: { x: 74, y: 80 },
    latencyOrPerf: "Automated Tests",
  },
  {
    id: "git",
    name: "Git",
    level: 80,
    category: "Developer Tools",
    originalCategory: "Tools",
    role: "Distributed version control, atomic commits & branch lifecycle management",
    signalTag: "VCS Pipeline",
    tier: "Advanced Tooling",
    connectedTo: ["core", "github"],
    coords: { x: 44, y: 14 },
    latencyOrPerf: "Trunk-Based / Gitflow",
  },
  {
    id: "github",
    name: "GitHub",
    level: 85,
    category: "Developer Tools",
    originalCategory: "Tools",
    role: "Collaborative code reviews, CI/CD automated deployments & release tags",
    signalTag: "CI/CD & Remote",
    tier: "Advanced Tooling",
    connectedTo: ["core", "git"],
    coords: { x: 56, y: 14 },
    latencyOrPerf: "GitHub Actions CI",
  },

  // ── Systems & Core Foundations ──
  {
    id: "dsa",
    name: "DSA",
    level: 75,
    category: "Other",
    originalCategory: "Other",
    role: "Algorithm optimization, space-time complexity analysis & graph traversal",
    signalTag: "Core Algorithms",
    tier: "Core Logic",
    connectedTo: ["core", "python", "java", "c++"],
    coords: { x: 50, y: 4 },
    latencyOrPerf: "O(log n) Optimization",
  },
  {
    id: "java",
    name: "Java",
    level: 70,
    category: "Programming",
    originalCategory: "Programming",
    role: "Robust object-oriented programming & enterprise architectural principles",
    signalTag: "Enterprise OOP",
    tier: "Core Logic",
    connectedTo: ["core", "dsa"],
    coords: { x: 8, y: 84 },
    latencyOrPerf: "JVM OOP Patterns",
  },
  {
    id: "cpp",
    name: "C++",
    level: 65,
    category: "Programming",
    originalCategory: "Programming",
    role: "Low-level memory management, systems efficiency & computational DSA",
    signalTag: "High Performance",
    tier: "Core Logic",
    connectedTo: ["core", "dsa"],
    coords: { x: 92, y: 84 },
    latencyOrPerf: "Direct Memory Control",
  },
];

// Original categories definition preserved exactly as before
export const originalSkillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 70 },
      { name: "C++", level: 65 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Django", level: 90 },
      { name: "Django REST Framework", level: 90 },
      { name: "FastAPI", level: 80 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Cursor AI", level: 90 },
      { name: "Claude AI", level: 85 },
      { name: "Postman", level: 85 },
      { name: "Git", level: 80 },
      { name: "GitHub", level: 85 },
    ],
  },
  {
    title: "Other",
    skills: [
      { name: "DSA", level: 75 },
      { name: "RAG", level: 85 },
      { name: "Vector Embeddings", level: 80 },
    ],
  },
];

export const FILTER_CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All Arsenal (17)" },
  { id: "Backend", label: "Backend" },
  { id: "AI / Intelligent Systems", label: "AI / Systems" },
  { id: "Programming", label: "Programming" },
  { id: "Database", label: "Database" },
  { id: "Developer Tools", label: "Developer Tools" },
  { id: "Other", label: "Foundations" },
];
