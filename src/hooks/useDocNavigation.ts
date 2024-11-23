"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Section {
  title: string;
  href: string;
}

export function useDocNavigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Handle initial hash navigation on page load
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(window.location.hash);
      }
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          // Adjust this value based on your header height
          currentSection = `#${section.id}`;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      // Update URL without triggering navigation
      window.history.pushState({}, "", sectionId);
    }
  };

  return {
    activeSection,
    scrollToSection,
    currentPath: pathname,
  };
}
