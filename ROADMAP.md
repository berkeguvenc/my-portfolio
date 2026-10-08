# Roadmap

This document outlines the current state and future vision for the Minimalist Developer Portfolio project. It is intended to guide the development and help open-source contributors understand where the project is heading.

## Phase 1: MVP (Current)

- [x] **Local-first JSON data source:** All portfolio content is stored in `portfolio.json`.
- [x] **Secure Admin Panel:** Development-only `/admin` route for managing content without touching the code.
- [x] **Minimalist UI:** Clean "Design Engineer" aesthetic with Framer Motion micro-interactions.
- [x] **Core Sections:** Hero, Work, Builds, Skills, Experience.
- [x] **Image & File Uploads:** UI buttons for handling uploads in the admin panel.
- [x] **Backup System:** JSON Export/Import capabilities for easy backups and migrations.

## Phase 2: Next Steps (Planned)

- [x] **Dynamic Section Management (Modular Section Builder & Drag-and-Drop):**
  - Render sections (`Hero`, `Work`, `Builds`, `Skills`, `Experience`, etc.) dynamically via a sortable `sections` array in `portfolio.json`.
  - Add drag-and-drop support in the admin panel (via `@dnd-kit` or `framer-motion (Reorder)`) to reorder sections.
  - Implement a repeater architecture allowing the community to easily add/remove custom sections (e.g., Testimonials, Contact Form, Blog).
- [x] **Item-Level Drag & Drop:** Ability to easily reorder individual items (projects, experiences, skills) within their respective tabs in the admin panel.
- [ ] **Dynamic Detail Pages:** Rich text (Markdown) support for individual Work and Builds pages (e.g., `/work/project-slug`).
- [ ] **Multi-language Admin Panel:** Expanded i18n support adding German (de), Spanish (es), French (fr), and Italian (it).

## Phase 3: Future Vision (Ideas)

- [ ] **Custom Section Builder:** An interface in the admin panel to create, edit, and manage completely new custom sections dynamically (e.g., FAQ, Custom Markdown). Includes customizable navbar icons and labels for new sections.
- [ ] **Section Grouping (Container Component):** Ability to group similar sections (e.g., Skills, Experience, Education) into a single tabbed or accordion container to prevent excessive vertical scrolling.
- [ ] **Blog / Notes Section:** A minimalist markdown-based blog for technical articles.
- [ ] **Custom Domain & Analytics Guide:** Integrated, privacy-friendly analytics plugin and instructions for open-source users.
- [ ] **Pre-set UI Themes:** Ability for the admin to select predefined UI themes (Dark, Light, Neon) that are globally applied for all visitors.
