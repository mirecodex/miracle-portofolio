export const SITE_CONFIG = {
  title: "Christian Miracle Rumawung - AI & Software Engineer",
  description: "Portfolio showcasing expertise in AI Engineering, Software Development and AI Automation",
  url: "https://christianmiracle.dev",
  ogImage: "/images/og-image.jpg",
  links: {
    github: "https://github.com/christianmiracle",
    twitter: "https://twitter.com/christianmiracle",
    linkedin: "https://linkedin.com/in/christianmiracle",
  },
};

export const NAV_LINKS = [
  { name: 'Home', href: '#hero', icon: 'home' },
  { name: 'About', href: '#about', icon: 'user' },
  { name: 'Skills', href: '#skills', icon: 'code' },
  { name: 'Experience', href: '#experience', icon: 'briefcase' },
  { name: 'Projects', href: '#projects', icon: 'folder' },
  { name: 'Contact', href: '#contact', icon: 'mail' },
];

export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }
};
