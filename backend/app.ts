import express from 'express';
import recipeRoutes from './routes/recipeRoutes';
import filterRoutes from './routes/filterRoutes';
import corsMiddleware from './middlewares/allowedOrigins';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use('/api/', recipeRoutes);
app.use('/api/filters', filterRoutes);

// Error handling middleware (must be after all routes)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;