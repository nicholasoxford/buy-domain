export interface Section {
  title: string;
  href: string;
}

export interface NavigationLink {
  title: string;
  href: string;
  sections?: Section[];
}

export interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

export const navigation: NavigationSection[] = [
  {
    title: "Documentation",
    links: [
      {
        title: "Introduction",
        href: "/docs",
        sections: [
          { title: "Quick Start", href: "#quick-start" },
          { title: "Prerequisites", href: "#prerequisites" },
          { title: "Turnstile Setup", href: "#turnstile-setup" },
          { title: "CLI Options", href: "#cli-options" },
          { title: "Multiple Domains", href: "#multiple-domains" },
          { title: "Post-Deployment", href: "#post-deployment" },
          { title: "Configuration", href: "#configuration" },
        ],
      },
    ],
  },
  // ... other navigation sections
];
