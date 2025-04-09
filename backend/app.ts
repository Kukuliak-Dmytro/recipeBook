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
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe API!');
});
app.use('/api/', recipeRoutes);
app.use('/api/filters', filterRoutes);

// Error handling middleware
app.use((err:any, req:any, res:any, next:any) => {
  errorHandler(err, req, res).catch(next);
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;