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
```

### Using Docker (Recommended)

The easiest way to run the application is using Docker:

```bash
# Start the application
npm start

# Stop the application
npm stop

# Restart with clean images (useful for dependency changes)
npm restart
```

This will:
- Build and start the frontend container on port 5173
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

The backend server will start on http://localhost:3000.

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

### Base URL: `/api`

### Recipe Endpoints

#### `GET /recipes`
Get paginated list of recipes

**Query Parameters:**
- `search`: Search recipes by name
- `ingredient`: Filter recipes by ingredient
- `area`: Filter recipes by area
- `category`: Filter recipes by category
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 20,
  "data": [/* recipe objects */],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 10,
    "totalPages": 2,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

#### `GET /recipes/:id`
Get a specific recipe by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "12345",
    "name": "Recipe Name",
    "thumbnail": "image-url",
    "tags": ["tag1", "tag2"],
    "youtubeUrl": "youtube-url",
    "category": "Category",
    "area": "Area",
    "instructions": "Instructions...",
    "ingredients": [
      { "name": "Ingredient1", "measure": "1 cup" }
    ]
  }
}
```

### Filter Endpoints

#### `GET /filters/categories`
Get all available categories

**Response:**
```json
{
  "success": true,
  "data": [
    { "strCategory": "Category1" },
    { "strCategory": "Category2" }
  ]
}
```

#### `GET /filters/areas`
Get all available areas

**Response:**
```json
{
  "success": true,
  "data": [
    { "strArea": "Area1" },
    { "strArea": "Area2" }
  ]
}
```

#### `GET /filters/ingredients`
Get all available ingredients

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "idIngredient": "1",
      "strIngredient": "Ingredient1",
      "strDescription": "Description"
    }
  ]
}
```

## Technologies

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Express 5, TypeScript, Node.js
- **Development**: ESLint, Docker, Nodemon

## License

