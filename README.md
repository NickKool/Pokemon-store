# Pokemon Store — API Querying, State Management & FSD

An interactive frontend application built using **Feature-Sliced Design (FSD)** architecture. The project is designed to search, browse, and manage a collection of Pokémon, featuring efficient data fetching, client-side state management, client-side CSV export, and a custom UI built completely from scratch without relying on heavy external component libraries.

## Live Demo

[View Live Project on Netlify](https://pokemon-store-project.netlify.app/)

---

## Tech Stack & Architecture

- **Architecture:** Feature-Sliced Design (FSD) for scalable and maintainable codebase structure.
- **Core & Routing:** React 19, React Router DOM v7
- **Language:** TypeScript (Strict type checking, zero `any` or `ts-ignore` flags)
- **State Management:** Zustand v5 (Lightweight global state management)
- **Data Fetching & Caching:** TanStack Query v5 (React Query)
- **Styling & Theme:** Tailwind CSS v4 + React Context API (Custom Dark/Light mode engine)
- **Testing Suite:** Vitest, React Testing Library, JSDOM, v8 Coverage

---

## Features Implemented

### 1. Feature-Sliced Design (FSD) Architecture
- Fully organized around FSD layers (`app`, `pages`, `widgets`, `features`, `entities`, `shared`).
- Strict separation of concerns, highly maintainable module structure, and clean public APIs via index files.

### 2. Advanced API Integration & Caching
- Seamless integration of **TanStack Query v5** for handling asynchronous Pokémon API calls.
- Automated client-side caching to ensure instantaneous navigation between pages and detailed views.
- **Manual Cache Invalidation:** A dedicated refresh button allows users to explicitly clear TanStack Query caches, forcing an immediate background refetch to synchronize with the latest data.
- **Configurable Cache TTL:** The cache validity times are dynamically configurable via environment variables (`VITE_CACHE_TTL`).

### 3. Pokémon Selection & Client-Side CSV Export
- **Pokémon Cart:** Users can select multiple Pokémon, which are added to a sticky bottom panel (cart interface).
- **Data Export:** Integrated client-side export functionality allowing users to download their selected Pokémon collection as a **CSV file** with properly formatted spreadsheet columns (ID, Name, Stats, Types, etc.).

### 4. Custom Theme Switching
- Fully custom **Light / Dark mode** theme engine implemented via **React Context API** and styled with Tailwind CSS variables (no external theme libraries used).

### 5. Loading, Error States & Test Coverage
- User-friendly loading indicators (spinners/skeletons) displayed during async background syncs.
- Robust human-readable error messages for handling API failures.
- Comprehensive test suite covering **loading cycles, error manifestations, and internal query caching logic** maintaining **>80% statement coverage** via `@vitest/coverage-v8`.

---

## Quick Start

### Prerequisites
- **Node.js** 18+
- **npm** 9+

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/NickKool/Pokemon-store.git
cd Pokemon-store

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Spin up local development server
npm run dev
```
The application will launch locally at `http://localhost:5173/` (or your configured Vite port).

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the local development server (Vite) |
| `npm run build` | Compiles TypeScript and builds production-ready bundle |
| `npm run lint` | Evaluates code quality using ESLint |
| `npm run format` | Enforces unified styling via Prettier |
| `npm run test:run` | Executes the Vitest automated test suite |
| `npm run test:coverage` | Runs tests and prints the statement/branch coverage report |

---

## Environment Variables

To manage cache parameters globally, create a `.env` file in the root directory and specify the cache Time-To-Live (TTL) in milliseconds:

```env
VITE_CACHE_TTL=300000
```
*(Where `300000` represents 5 minutes of cache validity. Defaults are declared inside `.env.example`).*
