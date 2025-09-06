# ABHA Healthcare Login Demo

## Overview

This is a full-stack healthcare authentication demo application that simulates ABHA (Ayushman Bharat Health Account) login functionality. The system provides a secure healthcare provider portal with multi-step authentication using credentials (ABHA number, email, or phone) followed by OTP verification. Built with React frontend and Express.js backend, it demonstrates modern healthcare authentication patterns while maintaining a clean, accessible user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Routing**: Wouter for lightweight client-side routing with programmatic navigation
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessibility-first design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints and middleware
- **Development Server**: Custom Vite integration for seamless full-stack development
- **Session Management**: In-memory storage interface with extensible design for future database integration
- **Error Handling**: Centralized error middleware with structured JSON responses
- **Request Logging**: Custom middleware for API request timing and response logging

### Authentication Flow
- **Multi-step Process**: Credential input → OTP verification → Dashboard access
- **Credential Support**: ABHA numbers (14 digits), email addresses, and phone numbers
- **Mock OTP System**: Simulated authentication with hardcoded OTP (123456) for demo purposes
- **Session Storage**: Browser localStorage for session persistence across page refreshes
- **Route Protection**: Client-side route guards to prevent unauthorized access

### Data Layer
- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Schema Management**: Shared schema definitions between client and server using Zod validation
- **Migration System**: Drizzle Kit for database schema migrations and version control
- **Connection**: Neon Database serverless PostgreSQL integration ready for production deployment

### Development Environment
- **Monorepo Structure**: Single repository with clearly separated client, server, and shared code
- **TypeScript Configuration**: Strict type checking with path aliases for clean imports
- **Code Organization**: Feature-based component structure with reusable UI primitives
- **Development Tools**: Hot module replacement, error overlays, and Replit integration for cloud development

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database with connection pooling and auto-scaling
- **Drizzle ORM**: Type-safe database toolkit with migration support and schema validation

### UI and Styling
- **Radix UI**: Headless component library providing accessible primitives for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework with custom design system integration
- **Lucide React**: Consistent icon library with tree-shaking support for optimal bundle size

### Development and Build Tools
- **Vite**: Modern build tool with fast HMR and optimized production bundling
- **esbuild**: Fast JavaScript bundler for server-side code compilation
- **PostCSS**: CSS processing pipeline with Tailwind and autoprefixer plugins

### Validation and Forms
- **Zod**: Runtime type validation with TypeScript integration for schema definitions
- **React Hook Form**: Performant form library with minimal re-renders and validation integration

### State Management
- **TanStack Query**: Server state management with caching, background updates, and error handling
- **React Router (Wouter)**: Lightweight routing solution with hooks-based navigation

### Authentication Infrastructure
- **Custom Session Management**: Browser-based session storage with structured data models
- **Mock Authentication Service**: Simulated ABHA authentication flow for demonstration purposes