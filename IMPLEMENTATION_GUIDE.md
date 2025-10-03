# Expense Tracker - Implementation Guide

## 📁 Project Structure

```
expense-tracker/
├── client/                          # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                # Shadcn UI components (auto-generated)
│   │   │   ├── AddExpenseDialog.tsx    # Dialog to add new expenses
│   │   │   ├── CategoryBadge.tsx       # Category display badges
│   │   │   ├── ExpenseChart.tsx        # Pie chart for spending
│   │   │   ├── ExpenseTable.tsx        # Table showing expenses
│   │   │   ├── StatCard.tsx            # Dashboard stat cards
│   │   │   └── ThemeToggle.tsx         # Dark/Light mode toggle
│   │   ├── pages/                 # Page components
│   │   │   ├── Dashboard.tsx          # Main dashboard page
│   │   │   ├── Login.tsx              # Login page
│   │   │   └── Signup.tsx             # Signup page
│   │   ├── lib/                   # Utilities
│   │   │   ├── queryClient.ts        # TanStack Query setup
│   │   │   └── utils.ts              # Helper functions
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── App.tsx                # Main app component with routing
│   │   ├── main.tsx               # React entry point
│   │   └── index.css              # Global styles & theme
│   └── index.html                 # HTML entry point
│
├── server/                          # Backend (Express + TypeScript)
│   ├── db.ts                       # PostgreSQL connection (Drizzle ORM)
│   ├── routes.ts                   # API route handlers
│   ├── storage.ts                  # Storage interface & implementation
│   ├── index.ts                    # Server entry point
│   └── vite.ts                     # Vite middleware for dev
│
├── shared/                          # Shared between client & server
│   └── schema.ts                   # Database schema & types
│
├── drizzle.config.ts               # Drizzle ORM configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
└── package.json                    # Dependencies & scripts
```

---

## 🗄️ Database Schema

### Tables (PostgreSQL)

**1. users table**
```typescript
{
  id: varchar (UUID, primary key)
  username: text (unique)
  email: text (unique)
  password: text (hashed)
}
```

**2. expenses table**
```typescript
{
  id: varchar (UUID, primary key)
  userId: varchar (foreign key → users.id)
  amount: decimal (10,2)
  category: text (food, transport, utilities, etc.)
  description: text
  date: timestamp
  createdAt: timestamp
}
```

---

## 🔄 Data Flow

### 1. Authentication Flow
```
Login/Signup Page → API Request → Server validates → Returns user session → Redirect to Dashboard
```

### 2. Expense Creation Flow
```
User clicks "Add Expense" → Opens Dialog → Fills form → Submit → 
POST /api/expenses → Validates with Zod → Saves to DB → Returns new expense → 
Invalidates cache → Updates UI
```

### 3. Expense Display Flow
```
Dashboard loads → GET /api/expenses → Fetch user's expenses → 
Display in table & charts → User can edit/delete
```

---

## 🔧 Key Files Explained

### **Frontend**

#### `client/src/App.tsx`
- Main application component
- Handles routing with wouter
- Manages authentication state (currently mock)
- Shows Login/Signup or Dashboard based on auth

#### `client/src/pages/Dashboard.tsx`
- Main dashboard page
- Displays stats, chart, and expense table
- Manages expense state (currently with mock data)
- Handles add/edit/delete operations

#### `client/src/components/AddExpenseDialog.tsx`
- Modal dialog for adding expenses
- Form with amount, category, description, date
- Uses controlled inputs with state

#### `client/src/components/ExpenseTable.tsx`
- Displays expenses in a table
- Shows date, description, category badge, amount
- Edit/delete actions for each row

#### `client/src/components/ExpenseChart.tsx`
- Pie chart showing spending by category
- Uses Recharts library
- Color-coded by category

#### `client/src/index.css`
- Global styles
- CSS variables for theming (light/dark mode)
- Tailwind directives
- Custom elevation utilities

---

### **Backend**

#### `server/routes.ts`
- Defines all API endpoints
- Example routes to implement:
  ```
  POST   /api/auth/signup
  POST   /api/auth/login
  POST   /api/auth/logout
  GET    /api/expenses
  POST   /api/expenses
  PUT    /api/expenses/:id
  DELETE /api/expenses/:id
  ```

#### `server/storage.ts`
- Storage interface (IStorage)
- Methods for CRUD operations
- Currently has MemStorage (in-memory)
- Will need PostgreSQL implementation

#### `server/db.ts`
- PostgreSQL connection setup
- Drizzle ORM initialization
- Connection pool management

---

### **Shared**

#### `shared/schema.ts`
- Database schema using Drizzle ORM
- Zod schemas for validation
- TypeScript types (User, Expense, etc.)
- Shared between frontend & backend

---

## 🚀 Implementation Steps

### Phase 1: Setup Database ✅
1. PostgreSQL database already provisioned
2. Schema defined in `shared/schema.ts`
3. Run migrations:
   ```bash
   npm run db:push
   ```

### Phase 2: Implement Backend API
1. **Update `server/storage.ts`**
   - Replace MemStorage with PostgreSQL
   - Implement expense CRUD methods
   
2. **Update `server/routes.ts`**
   - Add authentication endpoints
   - Add expense CRUD endpoints
   - Add validation with Zod schemas

3. **Example Route (POST /api/expenses)**
   ```typescript
   app.post('/api/expenses', async (req, res) => {
     const result = insertExpenseSchema.safeParse(req.body);
     if (!result.success) {
       return res.status(400).json({ error: result.error });
     }
     
     const expense = await storage.createExpense({
       ...result.data,
       userId: req.user.id // from session
     });
     
     res.json(expense);
   });
   ```

### Phase 3: Connect Frontend to Backend
1. **Remove mock data from Dashboard.tsx**
   - Replace useState with useQuery
   - Connect to real API endpoints

2. **Example (Fetch expenses)**
   ```typescript
   const { data: expenses, isLoading } = useQuery({
     queryKey: ['/api/expenses'],
   });
   ```

3. **Example (Add expense mutation)**
   ```typescript
   const addExpense = useMutation({
     mutationFn: (data) => apiRequest('/api/expenses', {
       method: 'POST',
       body: data
     }),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['/api/expenses'] });
     }
   });
   ```

### Phase 4: Implement Authentication
1. **Setup Replit Auth** (recommended)
   - Use the javascript_log_in_with_replit blueprint
   - Handles OAuth (Google, GitHub, etc.)

2. **Or implement custom auth**
   - Hash passwords with bcrypt
   - Use express-session for sessions
   - Add auth middleware to protect routes

### Phase 5: Add Features
1. Expense filtering by date range
2. Budget tracking and alerts
3. Export to CSV/PDF
4. Recurring expenses
5. Multi-currency support

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server (frontend + backend)
npm run dev

# Push database schema
npm run db:push

# Generate database migrations
npm run db:generate

# Build for production
npm run build
```

---

## 🔑 Key Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter (lightweight)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Styling**: Tailwind CSS with custom design system

---

## 📊 Category Configuration

Categories are defined in `CategoryBadge.tsx`:
- **Food**: Orange (Utensils icon)
- **Transport**: Blue (Car icon)
- **Utilities**: Purple (Zap icon)
- **Entertainment**: Pink (Gamepad2 icon)
- **Shopping**: Green (ShoppingBag icon)
- **Healthcare**: Red (Heart icon)
- **Other**: Gray (MoreHorizontal icon)

---

## 🎨 Theming

The app supports dark/light mode:
- Colors defined in `client/src/index.css`
- Toggle in header using `ThemeToggle` component
- Persists to localStorage
- Uses Tailwind's dark mode classes

---

## 🔐 Security Considerations

1. **Passwords**: Hash with bcrypt before storing
2. **Sessions**: Use secure session cookies
3. **Validation**: Always validate with Zod on backend
4. **SQL Injection**: Using Drizzle ORM prevents this
5. **XSS**: React escapes by default
6. **CSRF**: Implement CSRF tokens for production

---

## 📝 Next Steps (TODOs)

Current prototype has mock data. To complete:

1. Remove all `// TODO: remove mock functionality` comments
2. Implement real PostgreSQL storage
3. Add authentication (Replit Auth recommended)
4. Connect frontend to backend APIs
5. Add error handling and loading states
6. Implement expense editing functionality
7. Add filtering and search features
8. Deploy to production

---

## 🐛 Troubleshooting

**Database connection issues**
```bash
# Check if DATABASE_URL is set
echo $DATABASE_URL

# Re-push schema
npm run db:push --force
```

**Frontend not loading**
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

**Type errors**
```bash
# Regenerate types from database
npm run db:generate
```

---

## 📚 Resources

- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Shadcn UI Docs](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

**Current Status**: ✅ Frontend prototype complete with mock data  
**Next**: Implement backend API and connect to PostgreSQL database
