<div align="center">

<img src="./public/images/logo/logo-icon.svg" height="100px" width="auto" />

# Visualizar Admin Dashboard - by Matias Santillan

[About](#-about) ✦ [Tech Stack](#-tech-stack) ✦ [Getting Started](#-getting-started) ✦ [Commands](#-commands) ✦ [How it Works](#-how-it-works) ✦ [License](#-license)

</div>

## 📖 About

**Visualizar Admin Dashboard** is the back-office web application for the [Visualizar](https://github.com/Matisantillan11/visualizar) mobile app. Built as part of the same university thesis project, this dashboard gives administrators full control over the platform's data — managing users, books, authors, categories, courses, and institutions from a single, centralized interface.

While the mobile app focuses on delivering an immersive reading experience for students and teachers, this dashboard ensures that the content and user base behind it are properly organized and maintained.

## 🛠 Tech Stack

| Technology                                                                                                | Purpose                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/) (v15) + [React](https://react.dev/) (v19)                                  | Full-stack React framework. Next.js 15 with the App Router provides file-based routing, server components, and API routes — ideal for building a fast, SEO-friendly admin panel. |
| [TypeScript](https://www.typescriptlang.org/) (v5)                                                        | Static type checking across the entire codebase, ensuring type safety from API calls to UI components.                                                                           |
| [Tailwind CSS](https://tailwindcss.com/) (v3) + [next-themes](https://github.com/pacocoursey/next-themes) | Utility-first CSS framework with dark/light mode support. Provides a consistent, customizable design system with minimal CSS overhead.                                           |
| [TanStack React Query](https://tanstack.com/query) (v5)                                                   | Server state management. Handles caching, background refetching, and request deduplication — keeping the dashboard responsive and in sync with the backend.                      |
| [TanStack React Table](https://tanstack.com/table) (v8)                                                   | Headless table library for building powerful, fully customizable data tables with sorting, filtering, and pagination.                                                            |
| [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/)                                 | Form handling and validation. Provides performant, uncontrolled form management with schema-based validation for type safety at runtime.                                         |
| [Supabase](https://supabase.com/)                                                                         | Authentication via email OTP and file storage. Supabase handles both the passwordless login flow and the storage of book covers and 3D model files.                              |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Matisantillan11/visualizar-next-dashboard.git
   cd visualizar-next-dashboard
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory with the required variables:

   ```bash
   NEXT_PUBLIC_API_URL=<your_api_base_url>
   NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧞 Commands

| Command      | Action                                    |
| ------------ | ----------------------------------------- |
| `pnpm dev`   | Start the Next.js development server      |
| `pnpm build` | Build the application for production      |
| `pnpm start` | Start the production server               |
| `pnpm lint`  | Run the linter with Next.js ESLint config |

## 📝 How it Works

### Authentication

The dashboard uses a **passwordless email OTP** flow powered by Supabase — the same authentication system used by the mobile app. Administrators enter their email, receive a 6-digit verification code, and gain access to the dashboard.

### Entity Management

The dashboard provides full CRUD operations for every entity in the Visualizar ecosystem:

- **Users** — Create, edit, and manage users across all roles (Admin, Student, Teacher, Institution). Includes fuzzy text search and role-based filtering.
- **Books** — Manage the book catalog, upload covers and 3D model files, and review book requests submitted by teachers from the mobile app.
- **Authors** — Maintain the author registry linked to books.
- **Categories** — Organize books into categories for easier discovery.
- **Courses** — Manage courses and assign books to specific courses.
- **Institutions** — Administer the institutions that participate in the platform.

### Data Architecture

The dashboard uses a layered data-fetching architecture:

1. **Fetcher Layer** — A base HTTP client that automatically injects authentication headers and handles token refresh on 401/403 responses.
2. **React Query Factories** — Generic factory functions that generate type-safe query and mutation hooks for each entity, reducing boilerplate.
3. **Per-Entity Modules** — Organized query keys, queries, and mutations for each domain entity.

### File Uploads

Book covers and 3D model files (FBX, GLTF/GLB, OBJ) are uploaded through an Uppy-powered interface with drag-and-drop support. Files are stored in Supabase Storage via an internal Next.js API route.

## 🔑 License

Created by [Matias Santillan](https://github.com/Matisantillan11) as a university thesis project.
