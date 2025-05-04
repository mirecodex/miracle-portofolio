// Personal Data
export const personalData = {
  name: "Christian Miracle Rumawung",
  role: "AI & Frontend Developer",
  bio: "I craft intelligent, responsive web applications that combine cutting-edge AI technology with beautiful user interfaces.",
  email: "christianmiracle@example.com",
  phone: "+62 812-3456-7890",
  location: "Indonesia",
  aboutMe: "I started my journey as a developer building simple websites with HTML, CSS, and jQuery. As the web evolved, so did my skillset. I've been an early adopter of React and have been working with NextJS since its early versions.\n\nMy passion lies in AI integration and automation, finding innovative ways to combine traditional software development with artificial intelligence to create intelligent, responsive applications. I specialize in developing AI-driven solutions that solve complex business challenges while maintaining a focus on user experience and accessibility.",
  profileImage: "/images/profile.png", // Updated to use .png extension
  socials: {
    github: "https://github.com/christianmiracle",
    twitter: "https://twitter.com/christianmiracle",
    linkedin: "https://www.linkedin.com/in/christian-miracle-rumawung-8845b2207/",
    instagram: "https://instagram.com/christianmiracle",
    dribbble: "https://dribbble.com/christianmiracle"
  }
};

// Experience Data
export const experienceData = [
  {
    company: "AI Solutions Global",
    position: "Lead AI Engineer",
    period: "2019 - Present",
    description: "Leading a team of AI engineers in developing machine learning solutions for enterprise clients. Architected and implemented AI automation pipelines that reduced manual processes by 70%. Specialized in natural language processing and computer vision applications integrated with web platforms.",
    technologies: ["TensorFlow", "PyTorch", "Python", "React", "NextJS", "MLOps"]
  },
  {
    company: "TechInnovate Inc",
    position: "Senior Software Engineer",
    period: "2015 - 2019",
    description: "Developed full-stack applications with a focus on AI integration. Created an intelligent customer service platform that utilized NLP to handle 60% of customer inquiries without human intervention. Implemented React-based frontends for multiple AI-powered applications.",
    technologies: ["React", "Node.js", "NLP", "Machine Learning", "TypeScript", "Express"]
  },
  {
    company: "DataVision Systems",
    position: "AI Developer",
    period: "2012 - 2015",
    description: "Built computer vision solutions for retail analytics. Developed algorithms for customer tracking and behavior analysis. Created dashboards for visualizing AI-generated insights using modern frontend technologies.",
    technologies: ["Computer Vision", "Python", "JavaScript", "Data Visualization", "MongoDB", "REST APIs"]
  },
  {
    company: "Web Intelligence Labs",
    position: "Software Developer",
    period: "2008 - 2012",
    description: "Started as a web developer and transitioned to integrating early machine learning solutions. Worked on recommendation engines and predictive analytics tools that improved user engagement by 40% for client applications.",
    technologies: ["JavaScript", "PHP", "MySQL", "HTML5", "CSS3", "Machine Learning"]
  }
];

// Skills Data - Flatten structure
export const skillsData = [
  {
    category: "Languages & Frameworks",
    items: [
      { name: "React", icon: "react", level: 95 },
      { name: "Next.js", icon: "nextjs", level: 90 },
      { name: "TypeScript", icon: "typescript", level: 92 },
      { name: "JavaScript", icon: "javascript", level: 95 },
      { name: "Python", icon: "python", level: 85 },
      { name: "Node.js", icon: "nodejs", level: 88 },
      { name: "GraphQL", icon: "graphql", level: 80 },
      { name: "Tailwind", icon: "tailwind", level: 92 },
      { name: "SASS", icon: "sass", level: 85 },
      { name: "Docker", icon: "docker", level: 75 },
      { name: "Git", icon: "git", level: 90 },
      { name: "REST API", icon: "api", level: 95 },
      { name: "PostgreSQL", icon: "database", level: 82 },
      { name: "MongoDB", icon: "database", level: 85 },
      { name: "Redis", icon: "database", level: 78 },
      { name: "TensorFlow", icon: "tensorflow", level: 80 },
      { name: "PyTorch", icon: "pytorch", level: 75 },
      { name: "NLP", icon: "nlp", level: 85 },
      { name: "Computer Vision", icon: "vision", level: 80 },
      { name: "CI/CD", icon: "jenkins", level: 84 }
    ]
  }
];

// Projects Data
export const projectsData = [
  {
    title: "AI-Powered Content Generator",
    description: "A sophisticated content generation platform using advanced language models. Features include multi-format content creation, style customization, and enterprise-level content management with quality assurance tools.",
    tags: ["Next.js", "React", "GPT-4", "NLP", "TensorFlow", "Python"],
    imageUrl: "/projects/ai-content-generator.jpg",
    demoUrl: "https://example-ai-content.com",
    githubUrl: "https://github.com/christianmiracle/ai-content-generator",
    category: "AI App"
  },
  {
    title: "Computer Vision Analytics",
    description: "Retail analytics platform using computer vision to track customer behavior in physical stores. Provides insights on traffic patterns, engagement with products, and demographic analysis with privacy-preserving features.",
    tags: ["PyTorch", "React", "Computer Vision", "TypeScript", "Python", "Docker"],
    imageUrl: "/projects/vision-analytics.jpg",
    demoUrl: "https://vision-analytics-example.com",
    githubUrl: "https://github.com/christianmiracle/vision-analytics",
    category: "AI App"
  },
  {
    title: "AI Automation Pipeline",
    description: "End-to-end AI automation system that streamlines business processes using intelligent document processing, automated decision making, and integration with existing business systems.",
    tags: ["TensorFlow", "MLOps", "Python", "React", "Docker", "Kubernetes"],
    imageUrl: "/projects/ai-automation.jpg",
    demoUrl: "https://ai-automation-example.com",
    githubUrl: "https://github.com/christianmiracle/ai-automation",
    category: "AI App"
  },
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product listings, search functionality, shopping cart, user authentication, and payment processing. The frontend is built with NextJS and connects to a headless CMS for content management.",
    tags: ["Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS", "Headless CMS"],
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f97316' /%3E%3C/svg%3E",
    demoUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/alexmorgan/ecommerce-platform",
    category: "Web App"
  },
  {
    title: "Analytics Dashboard",
    description: "Interactive analytics dashboard with real-time data visualization, custom reporting, and filtering capabilities. Uses D3.js for complex data visualization and WebSockets for real-time updates.",
    tags: ["React", "D3.js", "WebSockets", "Material UI", "Redux", "TypeScript"],
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23fb923c' /%3E%3C/svg%3E",
    demoUrl: "https://analytics-example.com",
    githubUrl: "https://github.com/alexmorgan/analytics-dashboard",
    category: "Web App"
  },
  {
    title: "NLP-Enhanced Social Platform",
    description: "Social media application with intelligent content moderation, sentiment analysis, and automated content categorization using natural language processing.",
    tags: ["React Native", "NLP", "Express", "MongoDB", "Socket.io", "AWS"],
    imageUrl: "/projects/nlp-social-app.jpg",
    demoUrl: "https://social-app-example.com",
    githubUrl: "https://github.com/christianmiracle/nlp-social-app",
    category: "Mobile App"
  }
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Emma Thompson",
    role: "CTO at TechCorp",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f97316' /%3E%3C/svg%3E",
    content: "Working with Alex was a game-changer for our project. Their expertise in React and NextJS took our application to a new level. The attention to performance optimization and accessibility shows their commitment to quality. We've received countless compliments on the user experience since launch."
  },
  {
    name: "Michael Johnson",
    role: "Product Manager at InnovateLabs",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23fb923c' /%3E%3C/svg%3E",
    content: "Alex is one of the most skilled developers I've worked with in my 10-year career. Their ability to translate complex requirements into elegant solutions is remarkable. Our app's performance improved by 60% after their optimizations, and they were always willing to explain technical concepts to non-technical team members."
  },
  {
    name: "Sarah Williams",
    role: "Founder at DigitalStartup",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f97316' /%3E%3C/svg%3E",
    content: "We hired Alex to rebuild our e-commerce platform that was struggling with performance issues. Not only did they deliver an incredibly fast and reliable solution, but they also added features we hadn't even considered that greatly improved the user experience. Their communication throughout the project was exceptional."
  },
  {
    name: "David Chen",
    role: "Engineering Lead at Enterprise Inc",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23fb923c' /%3E%3C/svg%3E",
    content: "The architectural decisions and code quality Alex brought to our team have set a new standard. We've been able to scale our application to millions of users without performance degradation. Perhaps most impressively, our developer onboarding time has been cut in half due to the clean, well-documented code structure."
  }
];
