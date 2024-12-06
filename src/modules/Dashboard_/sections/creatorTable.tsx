import React from "react";
import {
    ColumnDef,
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/fanat/table";
import { Card } from "@/components/ui/fanat/card";
import { Button } from "@/components/ui/fanat/button";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";

// Mock data for creators
const creators = [
    {
        creator: "NATA 3",
        subscription: "$8,435.54",
        tips: "$1,347.90",
        message: "$8,036.55",
        totalEarnings: "$17,819.99",
        totalEarningsChange: "1324.18%",
        totalActiveFans: "866",
        totalActiveFansChange: "77.82%",
        expired: "-8",
    },
    {
        creator: "CRYSTAL PAID",
        subscription: "$2,128.76",
        tips: "$347.36",
        message: "$1,573.84",
        totalEarnings: "$4,049.96",
        totalEarningsChange: "-",
        totalActiveFans: "272",
        totalActiveFansChange: "30.77%",
        expired: "0",
    },
    {
        creator: "CRYSTAL TRANS ...",
        subscription: "$0.00",
        tips: "$0.00",
        message: "$0.00",
        totalEarnings: "$0.00",
        totalEarningsChange: "0.00%",
        totalActiveFans: "0",
        totalActiveFansChange: "0.00%",
        expired: "0",
    },
    {
        creator: "RHEA PAID",
        subscription: "$1,909.36",
        tips: "$196.00",
        message: "$1,424.45",
        totalEarnings: "$3,529.81",
        totalEarningsChange: "-",
        totalActiveFans: "208",
        totalActiveFansChange: "46.48%",
        expired: "0",
    },
];

export const CreatorStats = () => {
    const { t } = useTranslation();

    // State to track sorting
    const [sorting, setSorting] = React.useState<SortingState>([]);

    // Define columns for the table
    const columns: ColumnDef<typeof creators[0]>[] = [
        {
            accessorKey: "creator",
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("accounts.creator")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "subscription",
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("accounts.subscription")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "tips",
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("accounts.tips")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "message",
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("accounts.message")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "totalEarnings",
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("accounts.totalEarnings")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => {
                const row = info.row.original;
                return (
                    <>
                        {info.getValue()} <span>({row.totalEarningsChange})</span>
                    </>
                );
            },
        },
        {
            accessorKey: "totalActiveFans",
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("accounts.totalActiveFans")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => {
                const row = info.row.original;
                return (
                    <>
                        {info.getValue()} <span>({row.totalActiveFansChange})</span>
                    </>
                );
            },
        },
        {
            accessorKey: "expired",
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("accounts.expired")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
    ];

    const table = useReactTable({
        data: creators,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Card className="px-5 py-5 col-span-4 flex gap-2">
            <Table>
                <TableHeader className="bg-background">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};
