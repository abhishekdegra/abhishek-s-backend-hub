export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ("AI / RAG" | "BACKEND" | "API" | "DATABASE")[];
  description: string;
  features: string[];
  tech: string[];
  github: string;
  live?: string;
  featured?: boolean;
  systemMeta: {
    type: string;
    architecture: string;
    auth?: string;
    db?: string;
  };
}

export const ALL_PROJECTS: Project[] = [
  {
    id: "ai-support-agent",
    title: "AI-Powered E-Commerce Customer Support Agent",
    tagline: "Autonomous Agentic Support System with RAG & Tool Routing",
    category: ["AI / RAG", "BACKEND", "API"],
    featured: true,
    description:
      "Built a custom AI-powered customer support agent for an e-commerce platform with intelligent query understanding, multilingual support, real-time API integration, and dynamic tool routing.",
    features: [
      "Intelligent intent detection and entity extraction",
      "RAG-based knowledge retrieval for policies and FAQs",
      "Vector embeddings and semantic search",
      "Dynamic tool routing for products, orders, refunds, tracking, invoices, and user queries",
      "Multilingual and Hinglish query understanding",
      "Real-time integration with e-commerce backend APIs",
      "Multi-LLM integration and fallback support",
      "Optimized AI workflow to reduce unnecessary LLM calls and response time",
    ],
    tech: [
      "Python",
      "Django REST Framework",
      "RAG",
      "Vector Embeddings",
      "LLM APIs",
      "REST APIs",
    ],
    github: "https://github.com/abhishekdegra/ai-agent-for-welfog.git",
    systemMeta: {
      type: "AI AGENT & RAG PIPELINE",
      architecture: "Tool Routing + Multi-LLM",
      db: "Vector Store + E-Commerce DB",
    },
  },
  {
    id: "crm-backend",
    title: "CRM Backend System",
    tagline: "Scalable Customer Relationship Management Infrastructure",
    category: ["BACKEND", "API", "DATABASE"],
    featured: false,
    description:
      "Built a CRM backend system using Django REST Framework and MySQL.",
    features: [
      "CRUD APIs for leads, customers, tickets and services",
      "Filtering, pagination and search",
      "JWT authentication",
      "Role-based access control",
      "Postman tested APIs",
    ],
    tech: ["Python", "Django REST Framework", "MySQL", "JWT"],
    github: "https://github.com/abhishekdegra/crm-backend-django.git",
    systemMeta: {
      type: "ENTERPRISE BACKEND",
      architecture: "RESTful MVC",
      auth: "JWT + RBAC",
      db: "MySQL Relational",
    },
  },
  {
    id: "hotel-management",
    title: "Hotel Management System Backend",
    tagline: "High-Concurrency Hospitality Operations Engine",
    category: ["BACKEND", "API", "DATABASE"],
    featured: false,
    description:
      "Developed a scalable backend system for hotel operations.",
    features: [
      "Booking management",
      "Check-in / check-out system",
      "Billing and payment management",
      "Role-based authentication",
      "Optimized database queries",
    ],
    tech: ["Python", "Django", "Django REST Framework", "MySQL"],
    github: "https://github.com/akshmat243/HMS.git",
    systemMeta: {
      type: "OPERATIONAL BACKEND",
      architecture: "Django ORM Services",
      auth: "Role-Based Security",
      db: "MySQL Indexed",
    },
  },
  {
    id: "lms-backend",
    title: "Learning Management System (LMS) Backend",
    tagline: "Modular Educational Architecture & Enrollment Pipeline",
    category: ["BACKEND", "API", "DATABASE"],
    featured: false,
    description: "Backend for an online learning platform.",
    features: [
      "Course management APIs",
      "Student enrollment system",
      "Authentication and authorization",
      "Filtering, pagination and search",
      "Clean scalable architecture",
    ],
    tech: ["Python", "Django REST Framework", "MySQL"],
    github: "https://github.com/abhishekdegra/lms-backend-django.git",
    systemMeta: {
      type: "EDTECH BACKEND",
      architecture: "Modular REST Services",
      auth: "Token Authentication",
      db: "MySQL Scalable Schema",
    },
  },
];

export const PROJECT_CATEGORIES = [
  "ALL",
  "AI / RAG",
  "BACKEND",
  "API",
  "DATABASE",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
