import React from 'react';
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  limit,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  onLimitChange,
}) => {
  const limitOptions = [5, 10, 20, 50];
  
  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];
    
    // First page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => onPageChange(1)}
          isActive={page === 1}
          size={"sm"}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Ellipsis if needed
    if (page > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Pages around current
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're handled separately
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => onPageChange(i)}
            isActive={page === i}
            size={"sm"}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Ellipsis if needed
    if (page < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Last page if not the same as first
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => onPageChange(totalPages)}
            isActive={page === totalPages}
            size={"sm"}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {Math.min((page - 1) * limit + 1, total)} - {Math.min(page * limit, total)} of {total} results
        </p>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="per-page" className="text-sm">Items per page</Label>
          <Select
            value={limit.toString()}
            onValueChange={(value) => onLimitChange(Number(value))}
          >
            <SelectTrigger id="per-page" className="w-[80px]">
              <SelectValue placeholder={limit.toString()} />
            </SelectTrigger>
            <SelectContent>
              {limitOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <PaginationRoot>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(page - 1)}
              aria-disabled={!hasPrevious}
              className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
              size={"sm"}
            />
          </PaginationItem>
          
          {getPaginationItems()}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(page + 1)}
              aria-disabled={!hasNext}
              className={!hasNext ? "pointer-events-none opacity-50" : ""}
              size={"sm"}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    </div>
  );
};

export default Pagination;
