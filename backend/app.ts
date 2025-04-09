import express, { Request, Response } from 'express';
import masterConfig from './utils/masterConfig';
const app = express();
const port = masterConfig.server.port;
// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Recipe Book API! Here is the test env var: ' + process.env.TEST_ENV);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});