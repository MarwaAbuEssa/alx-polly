---
description: This document defines the rules, guidelines, and best practices for contributing to and working on the **the Polling App with QR Code Sharing project**.
globs:
alwaysApply: true
---
## 1. Project Overview: Polling App with QR Code Sharing
- Code must be **readable, maintainable, and testable**.  
- Follow the **“leave it better than you found it”** principle.  
- No direct commits to `main` or `release` branches. Always use **feature branches + pull requests**.  
- All features must include **tests, documentation, and Storybook stories** (if UI-related).  
- Security and performance must always be considered before merging.

---

## 2. Branching Strategy
We use **GitHub Flow with release branches**:

- **main** → Always production-ready.  
- **develop** → Integration branch for features.  
- **feature/** → For new features (`feature/termination-form`).  
- **bugfix/** → For bug fixes (`bugfix/missing-validation`).  
- **release/** → For preparing a release (`release/1.2.0`).  
- **hotfix/** → For urgent fixes to production (`hotfix/login-issue`).  

✅ Always branch from `develop` unless fixing production.  
✅ PRs must target `develop` (except hotfixes → `main`).

---

## 3. Commit Rules
We follow **Conventional Commits**:

- `feat:` → New feature  
- `fix:` → Bug fix  
- `docs:` → Documentation changes  
- `refactor:` → Code changes without behavior change  
- `test:` → Adding or updating tests  
- `chore:` → Tooling, configs, maintenance  

## 4. Architecture & Code Style
- Directory Structure: Follow the standard Next.js App Router structure.
    - `/app` for routes and pages.
    - `/app/api` for API endpoint.
    - `/app/polls` for feature modules and routing.
    - `/app/dashboard` for charts and analytics polls results display.

## 5. UI and Styling Component Libraries:
- **React Hook Form**: For form handling and validation with built-in performance optimization.
- **Next.js**: For server-side rendering and routing.
- **Tailwind CSS**: For utility-first styling.
- **Shadcn UI**: For pre-designed components.

## 6. Database & Authentication

### Supabase Integration
- Use **Supabase** as the primary database and authentication provider
- Follow these guidelines for Supabase usage:

#### Database:
- Use Postgres tables with proper relationships and constraints
- Implement Row Level Security (RLS) policies for data access control
- Follow naming conventions:
  - Tables: plural, snake_case (e.g., `user_profiles`)
  - Columns: singular, snake_case (e.g., `created_at`)
- Utilize Supabase's realtime features where appropriate

#### Authentication:
- Implement Supabase Auth for user management
- Use built-in providers (Email, OAuth) as needed
- Follow security best practices:
  - Proper session handling
  - JWT token management
  - Role-based access control (RBAC)

#### API Access:
- Use Supabase client libraries for frontend integration
- Implement proper error handling and loading states
- Cache responses where appropriate
- Use TypeScript for better type safety with Supabase
