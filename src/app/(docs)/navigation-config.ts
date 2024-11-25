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
        title: "Self Hosting",
        href: "/docs/self-host",
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
      {
        title: "Managed Hosting",
        href: "/docs/managed",
        sections: [
          { title: "Features", href: "#features" },
          { title: "Getting Started", href: "#getting-started" },
          { title: "Domain Setup", href: "#domain-setup" },
          { title: "Pricing", href: "#pricing" },
          { title: "FAQ", href: "#faq" },
        ],
      },
    ],
  },
  // ... other navigation sections
];
