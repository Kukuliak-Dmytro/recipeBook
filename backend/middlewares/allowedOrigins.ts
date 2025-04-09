import cors from 'cors';
import masterConfig from '../utils/masterConfig';

const corsOptions = {
  origin: masterConfig.server.allowedOrigins,
  credentials: true,
  exposedHeaders: ['Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
