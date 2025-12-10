# Project Overview Command

## Trigger This Command

To use this command, ask Claude:
- "Give me the project overview"
- "Explain this project using the project-overview command"
- "Run @project-overview"
- Or simply reference this file in your question

---

## 📋 Project Overview: Vue.js 3 Modern Todo App

### Quick Summary

A **full-stack todo application** with Vue.js 3 frontend and Express.js backend, featuring SQLite database persistence, modern UI with glass morphism design, and automated development tooling.

🌐 **Live Demo:** https://vuejs-aidd-todo-app.onrender.com/

---

## 🏗️ Architecture

### Frontend Stack
```
Vue 3 (Composition API)
  ↓
TypeScript (Type-safe)
  ↓
Vite (Fast dev server & build)
  ↓
Tailwind CSS (Utility-first styling)
  ↓
Iconify (Icon library)
```

### Backend Stack
```
Express.js 5 (Web framework)
  ↓
SQLite (Embedded database)
  ↓
better-sqlite3 (Sync SQLite client)
  ↓
CORS (Cross-origin support)
```

### API Architecture
```
Client (Browser)
  ↓ HTTP Requests
  ↓ (api.ts service layer)
  ↓
Vite Dev Proxy → Express Server
  ↓
Route Handlers (routes/todos.js)
  ↓
Database Layer (db/init.js)
  ↓
SQLite Database (todos.db)
```

---

## 📁 Project Structure

```
Intro to AI for Web Developers/
│
├── src/                          # Frontend application
│   ├── App.vue                   # Main app component with state management
│   ├── main.ts                   # Application entry point
│   ├── style.css                 # Global styles and animations
│   │
│   ├── components/               # Vue components
│   │   ├── TodoInput.vue         # Add new todos
│   │   ├── TodoItem.vue          # Individual todo with edit/delete
│   │   ├── TodoList.vue          # Scrollable todo container
│   │   └── TodoFilters.vue       # Filter by All/Completed
│   │
│   ├── services/
│   │   └── api.ts                # API service layer (fetch wrapper)
│   │
│   └── types/
│       └── todo.ts               # TypeScript type definitions
│
├── server/                       # Backend API
│   ├── index.js                  # Express server setup
│   ├── routes/
│   │   └── todos.js              # RESTful CRUD endpoints
│   └── db/
│       ├── init.js               # Database initialization
│       ├── schema.sql            # Database schema
│       └── todos.db              # SQLite database file
│
├── .claude/commands/             # Claude AI documentation
│   ├── prettier.md               # Code formatting setup
│   ├── eslint.md                 # Linting setup
│   ├── commits.md                # Commit conventions guide
│   ├── changelog-architecture.md # System architecture
│   └── project-overview.md       # This file
│
├── .husky/                       # Git hooks (at repo root)
│   ├── commit-msg                # Validate commits
│   ├── post-commit               # Auto-update changelog
│   └── prepare-commit-msg        # Commit template
│
├── Configuration Files
│   ├── .commitlintrc.json        # Commit validation rules
│   ├── .prettierrc               # Code formatting rules
│   ├── .prettierignore           # Format exclusions
│   ├── eslint.config.js          # Linting rules
│   ├── vite.config.ts            # Vite configuration
│   ├── tailwind.config.js        # Tailwind CSS config
│   └── tsconfig.json             # TypeScript config
│
└── Documentation
    ├── README.md                 # Main documentation
    ├── CHANGELOG.md              # Auto-generated changelog
    ├── DEPLOYMENT.md             # Deployment guide
    └── QUICKSTART.md             # Quick start guide
```

---

## 🚀 Key Features

### User-Facing Features
1. **Add Todos** - Create new tasks with intuitive input
2. **Toggle Complete** - Mark tasks as done/undone
3. **Delete Todos** - Remove tasks with animation
4. **Filter Todos** - View all or completed only
5. **Persistent Storage** - All data saved to SQLite database
6. **Real-time Updates** - Optimistic UI with background sync
7. **Beautiful UI** - Glass morphism design with smooth animations

### Developer Features
1. **Auto-formatting** - Prettier formats on save
2. **Auto-linting** - ESLint fixes issues on save
3. **Commit Validation** - Conventional commits enforced
4. **Auto-changelog** - Changelog updated on every commit
5. **Type Safety** - Full TypeScript support
6. **Hot Reload** - Instant feedback during development
7. **Concurrent Servers** - Frontend & backend run together

---

## 🔄 Data Flow

### Creating a Todo
```
User Input (TodoInput.vue)
  ↓ emits 'add-todo'
  ↓
App.vue (addTodo method)
  ↓ Optimistic: Add to local state immediately
  ↓ API call: POST /api/todos
  ↓
api.ts (createTodo)
  ↓ fetch('http://localhost:3001/api/todos', { method: POST })
  ↓
Express Server (routes/todos.js)
  ↓ db.prepare("INSERT INTO todos...").run()
  ↓
SQLite Database (todos.db)
  ↓ Returns: { id, title, completed }
  ↓
Response flows back to client
  ↓ Update local state with server ID
  ↓
UI Updates (TodoList.vue)
  ↓ New todo appears with animation
```

### Toggling Complete
```
User Click (TodoItem.vue)
  ↓ emits 'toggle-todo'
  ↓
App.vue (toggleTodo method)
  ↓ Optimistic: Toggle local state immediately
  ↓ API call: PUT /api/todos/:id
  ↓
Express Server
  ↓ db.prepare("UPDATE todos SET completed = ?").run()
  ↓
SQLite Database
  ↓ Returns: { id, title, completed }
  ↓
UI reflects change (already updated optimistically)
```

---

## 🛠️ Development Workflow

### 1. Initial Setup
```bash
npm install                    # Install all dependencies
```

### 2. Development
```bash
npm run dev                    # Start both servers
# Backend: http://localhost:3001
# Frontend: http://localhost:5173
```

### 3. Make Changes
- Edit `.vue`, `.ts`, or `.js` files
- Prettier auto-formats on save
- ESLint auto-fixes issues on save
- Browser hot-reloads automatically

### 4. Commit Changes
```bash
git add .
git commit -m "feat(todos): add bulk delete"
# ✅ Commitlint validates format
# ✅ CHANGELOG.md auto-updates
# ✅ Commit succeeds with changelog included
```

### 5. Build & Deploy
```bash
npm run build                  # Build for production
npm start                      # Start production server
# Or deploy to Render.com automatically
```

---

## 🎨 Design System

### Color Palette
- **Primary:** Blue (400-700) - Actions & focus
- **Secondary:** Purple (400-600) - Accents
- **Success:** Green/Emerald (400-600) - Completed
- **Danger:** Red (400-600) - Delete actions
- **Neutral:** Gray (100-950) - Text & backgrounds

### Animations
- **Duration:** 300ms for most transitions
- **Easing:** ease-out for natural motion
- **Hover:** Scale 1.02-1.1 for feedback
- **Active:** Scale 0.95-0.98 for pressed
- **Entrance:** Slide + fade for new elements

### Glass Morphism
- Backdrop blur: 10-12px
- Background: rgba with transparency
- Border: 1px subtle border
- Shadow: Multiple layered shadows for depth

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/todos` | Fetch all todos | - | `{ todos: Todo[] }` |
| POST | `/api/todos` | Create new todo | `{ title: string }` | `{ id, title, completed }` |
| PUT | `/api/todos/:id` | Update todo | `{ title?, completed? }` | `{ id, title, completed }` |
| DELETE | `/api/todos/:id` | Delete todo | - | `{ message: "deleted" }` |
| GET | `/api/health` | Health check | - | `{ status: "ok" }` |

---

## 📦 Key Dependencies

### Production
- `vue@3.5.13` - Progressive JavaScript framework
- `express@5.2.1` - Web framework
- `better-sqlite3@12.5.0` - SQLite database
- `@iconify/vue@5.0.0` - Icon library
- `cors@2.8.5` - CORS middleware

### Development
- `vite@6.0.3` - Build tool & dev server
- `typescript@5.7.2` - Type checking
- `prettier@3.7.4` - Code formatting
- `eslint@9.39.1` - Code linting
- `husky@9.1.7` - Git hooks
- `commitlint@20.2.0` - Commit validation
- `conventional-changelog-cli@5.0.0` - Changelog generation
- `tailwindcss@4.1.17` - CSS framework

---

## 🧪 Code Quality Tools

### 1. Prettier (Code Formatting)
- **Auto-formats** on save
- **Rules:** Double quotes, 2-space tabs, 100 char width
- **Command:** `npm run format`

### 2. ESLint (Code Linting)
- **Auto-fixes** on save
- **Rules:** TypeScript, Vue 3, Prettier integration
- **Command:** `npm run lint`

### 3. Commitlint (Commit Validation)
- **Validates** commit messages
- **Format:** `<type>(<scope>): <subject>`
- **Types:** feat, fix, docs, style, refactor, etc.

### 4. Conventional Changelog (Changelog Generation)
- **Auto-generates** from commits
- **Format:** Categorized by type (Features, Bug Fixes, etc.)
- **Command:** `npm run changelog`

---

## 🚢 Deployment

### Render.com (Current)
- **URL:** https://vuejs-aidd-todo-app.onrender.com/
- **Config:** `render.yaml` included
- **Database:** SQLite persists on disk
- **Build:** Automatic on push to main branch

### Local Production
```bash
npm run build      # Build frontend
npm start          # Start production server
```

---

## 📖 Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Main project documentation | All users |
| `QUICKSTART.md` | Quick start guide | New developers |
| `DEPLOYMENT.md` | Deployment instructions | DevOps |
| `CHANGELOG.md` | Version history (auto-generated) | All users |
| `server/README.md` | Backend API documentation | Backend devs |
| `.claude/commands/commits.md` | Commit conventions | Developers |
| `.claude/commands/changelog-architecture.md` | System architecture | Maintainers |
| `.claude/commands/project-overview.md` | This file | All users |

---

## 🎯 Use Cases

### For Learning
- **Vue 3 Composition API** - Modern reactive patterns
- **TypeScript** - Type-safe JavaScript
- **Full-stack development** - Frontend + Backend + Database
- **RESTful APIs** - HTTP methods & status codes
- **Git workflows** - Conventional commits & automation

### For Development
- **Template** - Start new projects from this structure
- **Reference** - See how components communicate
- **Best practices** - Code quality automation setup
- **Deployment** - Learn how to deploy full-stack apps

---

## 🔍 Common Tasks

### Add a New Feature
1. Create feature branch
2. Make code changes
3. Test locally with `npm run dev`
4. Commit with format: `feat(scope): description`
5. Push and create PR

### Fix a Bug
1. Identify the issue
2. Fix in appropriate file
3. Test the fix
4. Commit with format: `fix(scope): description`
5. Deploy

### Update Dependencies
1. Check for updates: `npm outdated`
2. Update: `npm update` or `npm install package@latest`
3. Test thoroughly
4. Commit with format: `chore(deps): update packages`

### Add a New API Endpoint
1. Add route in `server/routes/todos.js`
2. Add TypeScript types in `src/types/todo.ts`
3. Add service method in `src/services/api.ts`
4. Use in component
5. Commit with format: `feat(api): add new endpoint`

---

## 💡 Tips for Working with This Project

### Development
1. Run `npm run dev` - keeps both servers running
2. Changes auto-reload - no need to restart
3. Check console for errors - both browser and terminal
4. Use Vue DevTools extension for debugging

### Committing
1. Use conventional commit format - validated automatically
2. Changelog updates automatically - no manual editing needed
3. Run `npm run format` before committing if needed
4. Check `git log` to see commit history

### Styling
1. Use Tailwind utility classes - no custom CSS needed mostly
2. Check `style.css` for custom animations
3. Colors defined in design system - stay consistent
4. Test responsive design on mobile

### Debugging
1. **Frontend errors:** Check browser console
2. **Backend errors:** Check terminal running dev:server
3. **Database issues:** Check `server/db/todos.db` exists
4. **API issues:** Test endpoints with curl or Postman

---

## 🤔 When to Use This Command

Ask Claude to use this command when you need:
- **Project explanation** - What is this project?
- **Architecture overview** - How is it structured?
- **Getting started** - Where do I begin?
- **Feature reference** - What does it do?
- **Development workflow** - How do I work on it?
- **Documentation lookup** - Where is X documented?

## Related Commands

- **@commits** - Learn about commit conventions
- **@changelog-architecture** - Technical system deep-dive
- **@prettier** - Code formatting setup
- **@eslint** - Linting configuration

---

**Command Version:** 1.0  
**Last Updated:** 2025-12-10  
**Usage:** Reference this file when you need a comprehensive project overview

