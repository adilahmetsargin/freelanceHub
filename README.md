# freelancehub

A modern and fast freelance job platform interface. Built with React, TypeScript, and Vite — a clean and scalable frontend starter project.

## Features
- ⚡️ Fast development with Vite
- ⚛️ Modern React (with hooks)
- 🛠️ TypeScript support
- 📦 Easy to extend and customize
- 🗄️ Mock API with [json-server](https://github.com/typicode/json-server)
- 🗂️ Modular layout with reusable Sidebar and Navbar
- 📅 Calendar page with event add/list (mock API)
- 📊 Project details with related tasks
- ➕ Add customers, tasks, projects, and calendar events directly from the Dashboard (all data is saved to db.json)

## Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/adilahmetsargin/freelancehub.git
   cd freelancehub
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Start the mock API server:
   ```sh
   npm run api
   ```
   This will serve the API at http://localhost:5001 using `db.json`.

### Example API Endpoints
- `GET /tasks` — List all tasks
- `PUT /tasks/2` — Update task with id 2
- `GET /projects/1` — Get project with id 1
- `GET /calendarEvents` — List all calendar events
- `POST /calendarEvents` — Add a new calendar event

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License
MIT
