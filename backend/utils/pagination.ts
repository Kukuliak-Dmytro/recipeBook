import { PaginatedResult, PaginationOptions } from "../types/pagiantionTypes";

export const validatePaginationParams = (
    page?: any,
    limit?: any
): { page: number; limit: number } => {
    // Check if page contains non-numeric characters
    if (page !== undefined && isNaN(Number(page))) {
        throw new Error("Invalid page parameter: must be a number.");
    }

    // Convert to numbers and apply defaults if needed
    const parsedPage = page !== undefined ? parseInt(String(page), 10) : 1;
    const parsedLimit = limit !== undefined ? parseInt(String(limit), 10) : 10;

    const validPage = parsedPage < 1 ? 1 : parsedPage;
    const validLimit =
        Number.isNaN(parsedLimit) || parsedLimit < 1
            ? 10
            : parsedLimit > 100
            ? 100
            : parsedLimit; // Add max limit of 100

    return { page: validPage, limit: validLimit };
};

export const paginateResults = <T>(
    items: T[],
    options: PaginationOptions = {}
): PaginatedResult<T> => {
    // Validate pagination parameters
    const { page, limit } = validatePaginationParams(options.page, options.limit);

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
            hasPrevious: page > 1,
        },
    };
};

export const getPaginationFromQuery = (query: any): PaginationOptions => {
    const { page, limit } = validatePaginationParams(query.page, query.limit);
    return { page, limit };
};