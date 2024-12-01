"use client";

import {
    ColumnDef, ColumnFiltersState,
    flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState,
    useReactTable, VisibilityState, OnChangeFn, RowSelectionState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    rowSelection: Record<number, boolean>;
    setRowSelection: OnChangeFn<RowSelectionState>;
    loading?: boolean;
    filterPlaceholder: string;
    filterColumnName: string;
    refetch: (query: string) => void;
    noFilter?: boolean;
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             rowSelection,
                                             setRowSelection,
                                             loading,
                                             filterPlaceholder,
                                             filterColumnName,
                                             refetch,
                                             noFilter,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    const { t } = useTranslation();
    const debouncedRefetch = React.useMemo(() => debounce(refetch, 500), [refetch]);
    return (<>
            {!noFilter ? <Input
                placeholder={t(filterPlaceholder)}
                onChange={(event) => {
                    table.getColumn(filterColumnName)?.setFilterValue(event.target.value);
                    debouncedRefetch({ query: filterColumnName, searchString: event.target.value });
                }}
                className="max-w-sm mb-4"
            /> : <div className="mb-4 h-10"></div>}
            <div className="relative rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const width = header.column.columnDef.meta?.width || "auto";
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width }}
                                            className="py-2 "
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index} className="h-[72px]">
                                    {table.getHeaderGroups()[0].headers.map((header, headerIndex) => (
                                        <TableCell key={headerIndex}>
                                            <Skeleton className="h-6" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}

                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {t("common.noData")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/*<div className="absolute top-0 w-full h-full backdrop-blur-sm flex items-center justify-center ">*/}
                {/*    <Button>*/}
                {/*        subscriptions*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        </>
    );
}
