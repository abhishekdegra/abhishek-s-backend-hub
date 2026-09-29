import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperienceSection from "@/components/ExperienceSection";
import { EXPERIENCES } from "@/components/experience/experienceData";

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

describe("ExperienceSection - 3D Tech Serpent Experience Upgrade", () => {
  it("renders the Work Experience header and subtitle", () => {
    render(<ExperienceSection />);

    expect(screen.getByText("CAREER JOURNEY")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(
      screen.getByText(/Engineering journey descending through scalable architectures/i)
    ).toBeInTheDocument();
  });

  it("preserves every existing role and company verbatim", () => {
    render(<ExperienceSection />);

    expect(EXPERIENCES).toHaveLength(4);

    // 1. Welfog
    expect(screen.getByText("Python & AI Backend Developer")).toBeInTheDocument();
    expect(screen.getByText("Welfog")).toBeInTheDocument();
    expect(screen.getByText("May 2026 - Present")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Developing an AI-powered customer support agent for an e-commerce platform"
      )
    ).toBeInTheDocument();

    // 2. ATS Global Tech
    expect(screen.getByText("Python Developer")).toBeInTheDocument();
    expect(screen.getByText("ATS Global Tech")).toBeInTheDocument();
    expect(screen.getByText("Oct 2025 – Apr 2026")).toBeInTheDocument();
    expect(
      screen.getByText("Built backend applications using Django")
    ).toBeInTheDocument();

    // 3. Ice Hut Technologies
    expect(screen.getByText("AI / ML Trainee")).toBeInTheDocument();
    expect(screen.getByText("Ice Hut Technologies")).toBeInTheDocument();
    expect(screen.getByText("June 2025 – Aug 2025")).toBeInTheDocument();
    expect(
      screen.getByText("Learned machine learning fundamentals")
    ).toBeInTheDocument();

    // 4. Au Ignite Future Skills – Ambuja Foundation
    expect(screen.getByText("Salesforce Trainee")).toBeInTheDocument();
    expect(
      screen.getByText("Au Ignite Future Skills – Ambuja Foundation")
    ).toBeInTheDocument();
    expect(screen.getByText("3 Months")).toBeInTheDocument();
    expect(
      screen.getByText("Learned Salesforce CRM fundamentals")
    ).toBeInTheDocument();
  });

  it("renders career signals and milestone telemetry", () => {
    render(<ExperienceSection />);

    expect(screen.getByText("CURRENT ROLE")).toBeInTheDocument();
    expect(screen.getByText("BACKEND MILESTONE")).toBeInTheDocument();
    expect(screen.getByText("AI SYSTEMS")).toBeInTheDocument();
    expect(screen.getByText("ENGINEERING MILESTONE")).toBeInTheDocument();
  });
});
