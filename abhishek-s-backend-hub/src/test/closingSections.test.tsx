import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

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

describe("EducationSection - Academic Core Upgrade", () => {
  it("renders the Academic Core header and verified facts", () => {
    render(<EducationSection />);

    expect(screen.getByText("ACADEMIC CORE")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(
      screen.getByText("Where the engineering foundation began.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("B.Tech — Artificial Intelligence & Data Science")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Rajasthan Technical University")
    ).toBeInTheDocument();
    expect(screen.getByText("8.0")).toBeInTheDocument();
    expect(screen.getByText("GRADUATED")).toBeInTheDocument();
    expect(screen.getByText("8TH SEMESTER COMPLETED")).toBeInTheDocument();
    expect(screen.getByText(/B.TECH COMPLETED/i)).toBeInTheDocument();
  });
});

describe("CertificationsSection - Credential Vault Upgrade", () => {
  it("renders the Credential Vault header and all 3 certificates", () => {
    render(<CertificationsSection />);

    expect(screen.getByText("CREDENTIAL VAULT")).toBeInTheDocument();
    expect(screen.getByText("Certifications")).toBeInTheDocument();
    expect(
      screen.getByText("Verified milestones across my learning journey.")
    ).toBeInTheDocument();

    // 1. Geekster DSA
    expect(
      screen.getByText("Advanced Data Structures and Algorithms")
    ).toBeInTheDocument();
    expect(screen.getByText("Geekster")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();

    // 2. Ice Hut Technologies AI/ML
    expect(
      screen.getByText("Artificial Intelligence & Machine Learning")
    ).toBeInTheDocument();
    expect(screen.getByText("Ice Hut Technologies")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();

    // 3. Learn and Build Python
    expect(
      screen.getByText("Python Programming Certification")
    ).toBeInTheDocument();
    expect(screen.getByText("Learn and Build")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });
});

describe("ContactSection - Open Channel Upgrade", () => {
  it("renders the Open Channel header, communication nodes, and form inputs", () => {
    render(<ContactSection />);

    expect(screen.getByText("OPEN CHANNEL")).toBeInTheDocument();
    expect(
      screen.getByText("Have a project, opportunity, or idea? Start a conversation.")
    ).toBeInTheDocument();

    // Communication Nodes
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Direct Email")).toBeInTheDocument();

    // Transmission Console
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument();
    expect(screen.getByText("Send Message")).toBeInTheDocument();
  });
});
