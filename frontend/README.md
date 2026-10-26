# ⚛️ Ultron AI — React + Vite Client

This directory houses the frontend Single Page Application (SPA) for **Ultron AI**, built with **React 19**, **Vite**, and styled with custom glassmorphism and modern CSS.

> 📖 **Full Project Documentation**: For end-to-end setup instructions, backend details, and API documentation, refer to the [Root README](../README.md).

---

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Ensure `.env` contains:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Runs locally at `http://localhost:5173/`.

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📂 Key Components

- `src/context/NoteState.jsx`: Context provider orchestrating API calls, SQLite history synchronization, and connection health polling (`/api/hi/`).
- `src/pages/Home.jsx`: Main chat viewport supporting the custom Ultron LMS structured output parser (Rendering greeting, title, core content, sequential roadmap steps, duration tags, and closing messages).
- `src/components/Header.jsx`: Sticky cyberpunk header with live Django backend status indicator (`Backend 8000`) and Clerk user profile button.
