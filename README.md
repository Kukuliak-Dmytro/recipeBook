
# Recipe Book Application

This is a full-stack recipe book application with a React frontend and Express backend.

## Project Structure

- `/frontend`: React application built with Vite and TypeScript
- `/backend`: Express.js server written in TypeScript
- Docker setup for containerized development

## Prerequisites

- [Node.js](https://nodejs.org/) (>= 18.x)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd recipeBook
```

### Using Docker (Recommended)

The easiest way to run the application is using Docker:

```bash
# Start the application
npm start

# Stop the application
npm run stop

# Restart with clean images (useful for dependency changes)
npm run restart
```

This will:
- Build and start the frontend container on port 80
- Build and start the backend container on port 3000
- Mount volumes for real-time code changes

### Manual Setup (Without Docker)

If you prefer to run the application without Docker:

#### Backend

```bash
cd backend
npm install
npm start
```

The backend server will start on http://localhost:4000.

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will start on http://localhost:5173.

## Development

### Linting

The project is configured with ESLint for code quality:

```bash
# Lint backend code
cd backend
npm run lint

# Lint frontend code
cd frontend
npm run lint
```

### Building for Production

#### Frontend

```bash
cd frontend
npm run build
```

This will compile TypeScript and build the production-ready assets in the `dist` directory.

## Environment Variables

- Create a `.env` file in the backend directory for environment-specific configuration
- The application uses `dotenv` to load these variables

## API Endpoints

- `GET /`: Welcome message and environment test

## Technologies

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Express 5, TypeScript, Node.js
- **Development**: ESLint, Docker, Nodemon

## License

[Your License Here]