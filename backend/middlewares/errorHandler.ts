import { Request, Response } from 'express';
import masterConfig from '../utils/masterConfig';

export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
// Global error handling middleware
export const errorHandler = (err: Error, req: Request, res: Response): Promise<any> => {
  console.error(`Error: ${err.message}`, err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: masterConfig.server.environment === 'development' ? err.message : 'An error occurred'
  });
  return Promise.resolve();
};