# Next99 Desktop App

A fully functional cross-platform desktop application built with **Electron**, **React**, and **TypeScript**, implementing a **Canvas + Widget system**.


- **Electron** - Cross-platform desktop framework
- **React** - Frontend UI components
- **TypeScript** - Static typing
- **Vite** - Lightning-fast development server and bundler
- **@hello-pangea/dnd** - Drag-and-drop support
- **uuid** - Unique IDs for widgets
- **react-quill** - Rich text editor
- **CSS (Optional)** custom CSS

## Project Structure

📁 src/
│  ├── components/
│  │   ├── canvas/
│  │   │   ├── CanvasApp.tsx
│  │   │   ├── CanvasList.tsx
│  │   │   ├── CanvasToolbar.tsx
│  │   │   └── CanvasArea.tsx
│  │   ├── widgets/
│  │   │   ├── TextWidget.tsx
│  │   │   ├── ImageWidget.tsx
│  │   │   └── TableWidget.tsx
│  │   └── common/
│  │       └── PromptModal.tsx
│  ├── types/index.ts
│  └── App.tsx
📁 electron/
│  ├── main.cjs
│  └── preload.ts
📄 index.html
📄 package.json
📄 vite.config.ts
📄 tsconfig.json


## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Siva0574/Next99_Desktop_app.git
cd next99-desktop-app


## Install All Dependencies

# Electron for building desktop apps
npm install electron

# React library for building UI
npm install react react-dom

# UUID for generating unique IDs for widgets
npm install uuid

# Rich text editor used in TextWidget
npm install react-quill

# Drag-and-drop support for widgets
npm install @hello-pangea/dnd

# TypeScript support for static typing
npm install -D typescript

# Vite is used as the fast frontend bundler/dev server
npm install -D vite

# Run multiple commands in parallel (like Vite + Electron)
npm install -D concurrently

Thank you for this opportunity.
I'm truly grateful for the chance to demonstrate my skills through this take-home test. It’s been a valuable experience, and I’m excited about the possibility of contributing to the Next99 team.