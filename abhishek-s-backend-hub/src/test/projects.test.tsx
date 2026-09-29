import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectsSection from "@/components/ProjectsSection";
import { ALL_PROJECTS } from "@/components/projects/projectsData";

// Mock IntersectionObserver
window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
}));

// Mock matchMedia
window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

describe("ProjectsSection - Project Lab Redesign", () => {
  it("renders the Project Lab header, eyebrow, and subtitle correctly", () => {
    render(<ProjectsSection />);

    expect(screen.getByText(/ENGINEERING PROJECTS/i)).toBeInTheDocument();
    expect(screen.getByText("Things I've")).toBeInTheDocument();
    expect(screen.getByText("Built")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Backend systems, AI agents and intelligent applications built to solve real-world problems."
      )
    ).toBeInTheDocument();
  });

  it("renders the Featured AI Case Study for AI-Powered Customer Support Agent", () => {
    render(<ProjectsSection />);

    expect(screen.getByText("FEATURED AI CASE STUDY")).toBeInTheDocument();
    expect(
      screen.getByText("AI-Powered E-Commerce Customer Support Agent")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Built a custom AI-powered customer support agent for an e-commerce platform/i)
    ).toBeInTheDocument();

    // Verify architecture flow nodes
    expect(screen.getByText("USER QUERY")).toBeInTheDocument();
    expect(screen.getByText("INTENT & ENTITY")).toBeInTheDocument();
    expect(screen.getByText("RAG / VECTOR SEARCH")).toBeInTheDocument();
    expect(screen.getByText("AI / LLM ORCHESTRATION")).toBeInTheDocument();
    expect(screen.getByText("DYNAMIC TOOL ROUTING")).toBeInTheDocument();
  });

  it("preserves every existing project verbatim with factual details and links", () => {
    render(<ProjectsSection />);

    expect(ALL_PROJECTS).toHaveLength(4);

    const expectedProjects = [
      {
        title: "AI-Powered E-Commerce Customer Support Agent",
        github: "https://github.com/abhishekdegra/ai-agent-for-welfog.git",
      },
      {
        title: "CRM Backend System",
        github: "https://github.com/abhishekdegra/crm-backend-django.git",
      },
      {
        title: "Hotel Management System Backend",
        github: "https://github.com/akshmat243/HMS.git",
      },
      {
        title: "Learning Management System (LMS) Backend",
        github: "https://github.com/abhishekdegra/lms-backend-django.git",
      },
    ];

    expectedProjects.forEach((proj) => {
      expect(screen.getByText(proj.title)).toBeInTheDocument();
      const link = screen.getAllByRole("link").find((el) => el.getAttribute("href") === proj.github);
      expect(link).toBeDefined();
    });
  });

  it("supports category filtering", () => {
    render(<ProjectsSection />);

    // Click on "DATABASE" filter
    const dbFilter = screen.getByRole("button", { name: /DATABASE/i });
    fireEvent.click(dbFilter);

    // In DATABASE, CRM, Hotel, and LMS should be visible
    expect(screen.getByText("CRM Backend System")).toBeInTheDocument();
    expect(screen.getByText("Hotel Management System Backend")).toBeInTheDocument();
    expect(screen.getByText("Learning Management System (LMS) Backend")).toBeInTheDocument();

    // Click on "AI / RAG" filter
    const aiFilter = screen.getByRole("button", { name: /AI \/ RAG/i });
    fireEvent.click(aiFilter);

    // AI agent should be visible
    expect(
      screen.getByText("AI-Powered E-Commerce Customer Support Agent")
    ).toBeInTheDocument();
  });
});
