# Expense Tracker - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Productivity-Focused)

**Justification:** As a financial productivity tool, the expense tracker prioritizes clarity, efficiency, and data visualization over visual flair. Users need quick expense entry, clear spending insights, and reliable data management.

**Reference Inspiration:** Drawing from modern fintech and productivity tools (Notion for organization, Linear for typography, modern banking apps for trust signals).

**Core Principles:**
- Data clarity over decoration
- Efficient workflows for expense entry
- Trust through clean, professional design
- Visual hierarchy for financial insights

---

## Color Palette

### Light Mode
- **Background:** 0 0% 100% (white)
- **Surface:** 0 0% 98% (cards, panels)
- **Border:** 0 0% 90%
- **Text Primary:** 0 0% 10%
- **Text Secondary:** 0 0% 45%

### Dark Mode (Primary)
- **Background:** 222 20% 8%
- **Surface:** 222 18% 12% (cards, panels)
- **Border:** 222 15% 20%
- **Text Primary:** 0 0% 95%
- **Text Secondary:** 0 0% 65%

### Accent Colors
- **Primary:** 142 76% 36% (green - positive, savings)
- **Secondary:** 217 91% 60% (blue - informational)
- **Warning:** 38 92% 50% (amber - alerts)
- **Danger:** 0 84% 60% (red - overspending, delete)
- **Success:** 142 76% 36% (green - confirmations)

### Category Colors (for expense tags/chips)
- **Food:** 25 95% 53%
- **Transport:** 217 91% 60%
- **Utilities:** 271 81% 56%
- **Entertainment:** 330 81% 60%
- **Shopping:** 142 76% 36%
- **Healthcare:** 0 84% 60%
- **Other:** 0 0% 60%

---

## Typography

**Font Family:**
- Primary: 'Inter', system-ui, sans-serif (via Google Fonts)
- Monospace: 'JetBrains Mono', monospace (for amounts)

**Scale:**
- **Display (Dashboard Title):** text-4xl, font-bold (36px)
- **Heading 1 (Section Headers):** text-2xl, font-semibold (24px)
- **Heading 2 (Card Titles):** text-xl, font-semibold (20px)
- **Heading 3 (Subsections):** text-lg, font-medium (18px)
- **Body:** text-base, font-normal (16px)
- **Small:** text-sm, font-normal (14px)
- **Caption:** text-xs, font-normal (12px)
- **Amounts:** text-2xl, font-mono, font-bold (24px for large amounts)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, and 16 consistently.
- Component padding: p-4 or p-6
- Section margins: mb-8 or mb-12
- Card spacing: space-y-4
- Form fields: space-y-6

**Container Widths:**
- Dashboard: max-w-7xl mx-auto
- Modals: max-w-md or max-w-lg
- Forms: max-w-xl

**Grid System:**
- Main dashboard: 12-column grid
- Stats overview: 3-4 columns on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Recent expenses list: Single column full width
- Charts: 2-column on desktop (grid-cols-1 lg:grid-cols-2)

---

## Component Library

### Navigation
- **Top Bar:** Fixed header with app logo/name, user profile dropdown, logout button
- **Sidebar (Optional):** Collapsible navigation for Dashboard, Expenses, Reports, Settings
- **Mobile:** Hamburger menu with slide-out drawer

### Dashboard Overview Cards
- **Total Expenses Card:** Large amount display with month-over-month comparison
- **Category Breakdown:** Small cards showing top 3 categories with mini bar graphs
- **Budget Status:** Progress bar showing spent vs. budget with color indicators
- **Recent Transactions:** Compact list (last 5) with quick view

### Forms
- **Add Expense Modal:**
  - Amount input (large, prominent, monospace font)
  - Category dropdown with color-coded options
  - Description text field
  - Date picker (defaults to today)
  - Submit button (primary green)
  - Cancel button (ghost/outline)

- **Edit Expense:** Same as add, pre-filled with existing data

- **Filter Panel:**
  - Date range picker (from/to)
  - Category multi-select checkboxes
  - Amount range slider
  - Apply/Clear buttons

### Data Displays
- **Expense Table:**
  - Columns: Date, Description, Category (with colored chip), Amount
  - Sortable headers
  - Row hover state with edit/delete actions
  - Pagination at bottom
  - Empty state with illustration and "Add your first expense" CTA

- **Charts:**
  - Pie chart for category distribution
  - Line chart for spending over time
  - Bar chart for monthly comparisons
  - Use Chart.js or Recharts library with theme-aware colors

### Buttons & Actions
- **Primary Button:** Green background, white text, rounded-lg, px-6 py-3
- **Secondary Button:** Blue background, white text
- **Danger Button:** Red background (for delete confirmations)
- **Ghost Button:** Transparent with border, text matches context
- **Icon Buttons:** Rounded, hover:bg-surface, for edit/delete actions

### Overlays
- **Modal:** Centered, max-w-md, shadow-2xl, rounded-xl, backdrop blur
- **Confirmation Dialog:** Small modal for delete actions with warning icon
- **Toast Notifications:** Top-right corner, auto-dismiss, color-coded by type

---

## Key Interactions

- **Quick Add:** Floating action button (bottom-right, mobile) or prominent "+ Add Expense" button (desktop header)
- **Inline Editing:** Click on expense row to edit in modal
- **Category Selection:** Visual chips/tags, not just dropdown text
- **Amount Input:** Auto-format with currency symbol, two decimal places
- **Loading States:** Skeleton screens for data loading, spinners for actions
- **Error States:** Red border on invalid inputs, inline error messages

---

## Visual Hierarchy

1. **Dashboard Priority:**
   - Current month total (largest, top)
   - Category breakdown (medium, grid)
   - Charts (visual, prominent)
   - Recent transactions list (compact, scrollable)

2. **Expense Entry Priority:**
   - Amount field (largest input)
   - Category (visual, second)
   - Date and description (supporting details)

3. **Data Table Priority:**
   - Amount column (bold, monospace, right-aligned)
   - Category (colored chip, visual)
   - Date and description (secondary weight)

---

## Animations

**Minimal & Purposeful:**
- Modal entrance: scale and fade (duration-200)
- Toast notifications: slide-in from top (duration-300)
- Button hover: subtle scale (scale-105, duration-150)
- Chart rendering: smooth data transition (built-in library animations)

**Avoid:** Page transitions, elaborate scroll animations, excessive micro-interactions

---

## Responsive Behavior

- **Desktop (lg+):** Full sidebar, multi-column grids, side-by-side charts
- **Tablet (md):** Collapsible sidebar, 2-column grids, stacked charts
- **Mobile (base):** Bottom navigation or hamburger menu, single column, card-based layout, floating action button for quick add

---

## Images

**No hero images needed** - this is a utility app focused on data and functionality. Use iconography throughout:
- Dashboard cards: Icons from Heroicons (chart-bar, wallet, calendar, tag)
- Category icons: Food (utensils), Transport (car), etc.
- Empty states: Simple illustration or large icon with helpful text