import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutSection from "@/components/AboutSection";
import { ABOUT_PARAGRAPHS, PROFILE_METADATA } from "@/components/about/aboutData";

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

describe("AboutSection - AI Engineer Profile Upgrade", () => {
  it("renders the AI ENGINEER PROFILE header and About Me title", () => {
    render(<AboutSection />);

    expect(screen.getByText(/AI ENGINEER PROFILE/i)).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Me")).toBeInTheDocument();
  });

  it("renders Abhishek Degra and Python Backend & AI Developer on the profile card", () => {
    render(<AboutSection />);

    expect(screen.getByText("Abhishek Degra")).toBeInTheDocument();
    expect(screen.getByText("Python Backend & AI Developer")).toBeInTheDocument();
  });

  it("renders all required technical metadata chips", () => {
    render(<AboutSection />);

    PROFILE_METADATA.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("contains all three factual professional paragraphs verbatim", () => {
    expect(ABOUT_PARAGRAPHS).toHaveLength(3);

    // Paragraph 1
    expect(ABOUT_PARAGRAPHS[0]).toContain(
      "I am a Python Backend Developer specializing in building scalable backend systems, REST APIs, and AI-powered applications."
    );
    expect(ABOUT_PARAGRAPHS[0]).toContain(
      "With hands-on experience in Django, Django REST Framework, FastAPI, MySQL, and modern AI technologies"
    );

    // Paragraph 2
    expect(ABOUT_PARAGRAPHS[1]).toContain(
      "building custom AI agents using RAG, vector embeddings, semantic search, multilingual query understanding, and dynamic tool routing."
    );

    // Paragraph 3
    expect(ABOUT_PARAGRAPHS[2]).toContain(
      "I am passionate about solving real-world problems, exploring modern AI technologies, and continuously improving my skills"
    );
  });

  it("renders the photorealistic portrait image with correct alt text and dimensions", () => {
    render(<AboutSection />);

    const img = screen.getByAltText("Abhishek Degra - Python Backend & AI Developer");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("width", "1127");
    expect(img).toHaveAttribute("height", "1396");
  });
});
