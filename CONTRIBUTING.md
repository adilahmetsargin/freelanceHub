# Contributing to freelancehub

Thank you for your interest in contributing to freelancehub! We welcome all kinds of contributions to make this project better.

## How to Contribute

1. **Fork the repository**
2. **Clone your fork**
3. **Create a new branch** for your feature or bugfix
4. **Make your changes**
5. **Test your changes**
6. **Commit and push** your branch
7. **Open a Pull Request**

## Guidelines

- Use clear and descriptive commit messages.
- Keep your code clean and follow the existing style.
- For major changes, please open an issue first to discuss what you would like to change.
- Make sure your code builds and runs without errors.
- If you add or change UI, try to keep the design simple and user-friendly.

## Project Setup

- This project uses React, TypeScript, and Vite.
- Install dependencies with `npm install`.
- Start the development server with `npm run dev`.
- **Mock API:** Start the mock API server with `npm run api`. The API is served from `db.json` on http://localhost:5001.
- The layout is modular: see `src/components/Layout.tsx`, `Sidebar.tsx`, `Navbar.tsx`.
- Calendar events are managed via the `/calendarEvents` endpoint in the mock API.
- **Dashboard Add Modal:** You can add customers, tasks, projects, and calendar events from the Dashboard. Select options are managed in `src/services/options.ts` for easy extension or backend integration.
- If you add or change API endpoints or the structure of `db.json`, please update the documentation and provide example data.

## Code of Conduct

Be respectful and inclusive. Harassment or inappropriate behavior will not be tolerated.

---

Happy coding!
