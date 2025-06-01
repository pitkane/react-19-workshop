# React 19 Workshop

Interactive workshop exploring React 19's new features including Server Components, Server Actions, and enhanced Context API. Built with Next.js 15 and TypeScript.

## 🎯 Learning Objectives

This workshop teaches experienced React/TypeScript developers about:

- **React Server Components (RSC)**: Server-side rendering for faster loads and smaller bundles
- **Client/Server Directives**: Proper usage of 'use client' and 'use server'
- **Server Actions**: Handle form submissions directly on the server without API routes
- **React 19 Improvements**: Enhanced Context API with use() hook for simplified Context consumption

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Experience with React, TypeScript, and Next.js
- Basic understanding of server-side rendering concepts

### Installation

```bash
# Clone the repository
git clone git@github.com:pitkane/react-19-workshop.git
cd react-19-workshop

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the workshop.

## 📚 Workshop Structure

### Presentation

- **Route**: `/presentation`
- **Content**: Comprehensive slides covering React 19 features
- **Sections**: Introduction, Server Components, Actions, Hooks, Compiler, and more

### Tasks

Each task focuses on a specific React 19 feature:

1. **Task 1**: Server Components - Data fetching with React Server Components
2. **Task 2**: Client Components - Adding interactivity with client-side components
3. **Task 3**: Server Actions - Form submission without API routes
4. **Task 4**: React 19 Improvements - Enhanced Context API with use() hook

### Task Structure

Each task includes:

- **Instructions** (`/tasks/[n]`): Learning objectives and implementation guidance
- **Work Area** (`/tasks/[n]/work`): Starting point with TODO comments
- **Solution** (`/tasks/[n]/solution`): Complete implementation with explanations

## 🛠 Development

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

## 📁 Key Files

```
app/
├── page.tsx                 # Workshop homepage
├── layout.tsx              # Root layout with metadata
├── presentation/           # Presentation slides
│   └── _components/        # Slide components
└── tasks/                  # Workshop tasks
    ├── [1-4]/
    │   ├── page.tsx        # Task instructions
    │   ├── work/page.tsx   # Work area
    │   └── solution/page.tsx # Complete solution
    └── layout.tsx          # Tasks layout with sidebar

components/
├── app-sidebar.tsx         # Navigation sidebar
├── dynamic-breadcrumb.tsx  # Dynamic breadcrumbs
└── ui/                     # Shadcn UI components

types.ts                    # TypeScript definitions
```

## 🎨 Features

- **Modern UI**: Built with Shadcn UI and Tailwind CSS
- **Navigation**: Sidebar with task navigation and breadcrumbs
- **Rick & Morty API**: Real data for practical examples
- **Type Safety**: Full TypeScript coverage
- **Responsive**: Works on desktop and mobile
- **Accessibility**: Proper ARIA labels and alt attributes

## 🧪 Technologies

- **Next.js 15**: App Router, Server Components, Server Actions
- **React 19**: Latest features and improvements
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Shadcn UI**: Modern component library
- **Rick & Morty API**: External data source for examples

## 📖 Learning Path

1. Start with the **Presentation** to understand React 19 concepts
2. Work through **Tasks 1-5** in order
3. Begin each task in the **Work Area**
4. Reference the **Solution** when needed
5. Use the sidebar to navigate between tasks and presentation

## 🔧 Troubleshooting

- **Build errors**: Run `npm run lint` to check for issues
- **Server errors**: Check the console for detailed error messages
- **API issues**: Rick & Morty API calls may occasionally fail; refresh to retry

## 📄 License

This workshop is for educational purposes. Built with love for the React community.

---

Happy learning! 🚀 Explore React 19's powerful new features through hands-on coding.
