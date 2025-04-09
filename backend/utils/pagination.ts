import { PaginatedResult, PaginationOptions } from "../types/pagiantionTypes";

export const paginateResults = <T>(
  items: T[],
  options: PaginationOptions = {}
): PaginatedResult<T> => {
  // Default pagination values
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, options.limit || 10);
  
  // Calculate pagination values
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);
  
  // Get paginated data
  const paginatedData = items.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1
    }
  };
};


export const getPaginationFromQuery = (query: any): PaginationOptions => {
  const page = query.page ? parseInt(query.page as string, 10) : undefined;
  const limit = query.limit ? parseInt(query.limit as string, 10) : undefined;
  
  return { page, limit };
};