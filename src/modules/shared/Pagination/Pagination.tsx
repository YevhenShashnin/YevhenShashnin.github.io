import React, { useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
    refetch: (page: number) => void;
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const MyPagination: React.FC<PaginationProps> = ({ refetch, pagination }) => {
    const { totalPages, page } = pagination;
    const renderPageNumbers = () => {
        const pages = [];

        // Always show the first page
        pages.push(
            <PaginationItem key={1}>
                <PaginationLink
                    isActive={page === 1}
                    onClick={() => refetch({ page: 1 })}
                >
                    1
                </PaginationLink>
            </PaginationItem>,
        );

        // Ellipsis after the first page, if needed
        if (page > 3) {
            pages.push(<PaginationEllipsis key="start-ellipsis" />);
        }

        // Show current page and pages around it
        for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, totalPages - 1); i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={i === page}
                        onClick={() => refetch({ page: i })}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        // Ellipsis before the last page, if needed
        if (page < totalPages - 2) {
            pages.push(<PaginationEllipsis key="end-ellipsis" />);
        }

        // Always show the last page if it's more than one page
        if (totalPages > 1) {
            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        isActive={page === totalPages}
                        onClick={() => refetch(totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return pages;
    };
    if (totalPages === 0 || totalPages === 1) return null;
    return (
        <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious isActive={page === 1} onClick={() => page > 1 && refetch({ page: page - 1 })} />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext isActive={page === totalPages}
                                    onClick={() => page < totalPages && refetch({ page: page + 1 })} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

