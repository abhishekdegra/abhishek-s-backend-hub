import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SkillsSection from "@/components/SkillsSection";
import { ALL_SKILLS } from "@/components/skills/skillsData";

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

describe("SkillsSection - Tech Arsenal Redesign", () => {
  it("renders the Tech Arsenal header and subtitle correctly", () => {
    render(<SkillsSection />);

    expect(screen.getByText("TECH ARSENAL")).toBeInTheDocument();
    expect(screen.getByText("Tools I")).toBeInTheDocument();
    expect(screen.getByText("Build With")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Technologies I use to design, build, integrate and scale real-world systems."
      )
    ).toBeInTheDocument();
  });

  it("renders the Central Engineering Core 'PYTHON BACKEND + AI'", () => {
    render(<SkillsSection />);

    expect(screen.getByText("ENGINEERING CORE")).toBeInTheDocument();
    expect(screen.getByText(/PYTHON BACKEND/i)).toBeInTheDocument();
  });

  it("preserves and renders all 17 original skills", () => {
    render(<SkillsSection />);

    expect(ALL_SKILLS).toHaveLength(17);

    const expectedSkillNames = [
      "Python",
      "Java",
      "C++",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "REST APIs",
      "MySQL",
      "SQL",
      "Cursor AI",
      "Claude AI",
      "Postman",
      "Git",
      "GitHub",
      "DSA",
      "RAG",
      "Vector Embeddings",
    ];

    expectedSkillNames.forEach((name) => {
      const elements = screen.getAllByText(name);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("renders the STACK SIGNAL operational telemetry area", () => {
    render(<SkillsSection />);

    expect(
      screen.getByText(/STACK PILLARS & ARCHITECTURE/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Backend Core")).toBeInTheDocument();
    expect(screen.getByText("AI / RAG Pipeline")).toBeInTheDocument();
    expect(screen.getByText("API Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Databases & Storage")).toBeInTheDocument();
  });
});
