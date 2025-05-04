# Portfolio Next.js

This is a professional portfolio project built using Next.js and styled with Tailwind CSS. The design features a luxurious and modern aesthetic, utilizing a color palette of orange and dark grey.

## Project Structure

The project is organized as follows:

```
portfolio-nextjs
├── src
│   ├── app
│   │   ├── layout.tsx         # Main layout of the application
│   │   ├── page.tsx           # Homepage showcasing an introduction
│   │   ├── about               # About section detailing background and experience
│   │   │   └── page.tsx
│   │   ├── projects            # Projects section listing user projects
│   │   │   └── page.tsx
│   │   ├── contact             # Contact section with form or information
│   │   │   └── page.tsx
│   │   └── blog                # Blog section listing posts
│   │       ├── page.tsx
│   │       └── [slug]          # Dynamic blog post rendering
│   │           └── page.tsx
│   ├── components
│   │   ├── ui
│   │   │   ├── Button.tsx      # Customizable button component
│   │   │   ├── Card.tsx        # Component for displaying project or blog summaries
│   │   │   └── Navbar.tsx      # Navigation bar component
│   │   ├── layout
│   │   │   ├── Footer.tsx      # Footer component with copyright and links
│   │   │   └── Header.tsx      # Header component with site title and navigation
│   │   └── sections
│   │       ├── Hero.tsx        # Introductory section of the homepage
│   │       ├── ProjectShowcase.tsx # Highlights selected projects
│   │       └── Contact.tsx      # Contact form or details
│   ├── lib
│   │   ├── utils.ts            # Utility functions for the application
│   │   └── constants.ts        # Constants used throughout the application
│   └── styles
│       └── globals.css         # Global CSS styles including Tailwind imports
├── public
│   └── assets                  # Static assets such as images or icons
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration settings
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd portfolio-nextjs
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the portfolio.

## Features

- Modern and luxurious design
- Responsive layout
- Dynamic blog post rendering
- Customizable components using Tailwind CSS

## Technologies Used

- Next.js
- Tailwind CSS
- TypeScript
- React

## License

This project is licensed under the MIT License.