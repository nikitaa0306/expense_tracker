# Agent Instructions & Project Guidelines

## Project Stack & Tooling
- **Framework:** React 19 + Vite 8
- **Linter:** Oxlint (`oxlint`)
- **Styling:** Vanilla CSS with CSS Variables / Custom Properties

## Directory Layout
```text
expense_tracker/
├── public/             # Static public assets
├── src/
│   ├── assets/         # App assets (images, SVGs)
│   ├── components/     # React components (ExpenseForm, ExpenseList, ExpenseFilter)
│   ├── constants/      # App constants & configuration (expenseCategories.js)
│   ├── App.css         # App layout and component styles
│   ├── App.jsx         # Main application component & state holder
│   ├── index.css       # Global styles & theme variable definitions
│   └── main.jsx        # App entry point
├── .gitignore
├── .oxlintrc           # Oxlint configuration
├── AGENTS.md           # Instructions for AI agents
├── index.html          # HTML entry point
├── package.json        # Dependencies & NPM scripts
├── package-lock.json
├── prompts.md          # Project prompt templates
├── README.md           # Template documentation
└── vite.config.js      # Vite build configuration
```

## Development Commands
- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Lint code:** `npm run lint`
- **Preview production build:** `npm run preview`

## Architectural Conventions
1. **One Component per File:** Each React component must live in its own separate `.jsx` file inside `src/components/`.
2. **State Management:** Keep primary application state (expenses list, filter selections) centralized in `App.jsx` and pass state down via props.
3. **Constants:** Store static values (such as categories) in `src/constants/` rather than hardcoding them in component files.

## Project Rules
- **No New Dependencies:** Do not add external packages or libraries without explicit user confirmation.
- **Branching Workflow:** Always work on a separate git branch for new features or refactorings.
- **PR Summaries:** Always provide a clear, concise summary of changes made when submitting a PR or concluding a task.