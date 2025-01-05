import React, { useEffect, useState } from 'react';
import {
    ColumnDef,
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/fanat/table';
import { Card } from '@/components/ui/fanat/card';
import { Button } from '@/components/ui/fanat/button';
import {
    ArrowUpDown,
    Link,
    Copy,
    Pencil,
    CirclePause,
    Settings,
    Share2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoTooltip } from '@/components/ui/fanat/infoTooltip';
import { MyPagination } from '@/modules/shared/Pagination';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {Checkbox} from "@/components/ui/checkbox";

// Mock data for campaigns
const campaigns = [
    {
        label: 'TAGA 021',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 022',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 023',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 024',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 025',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 026',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 027',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 028',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 029',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'TAGA 030',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '7',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'ANN 001',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '1',
        earnings: '$12.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '1',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'ANN 002',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
    {
        label: 'ANN 003',
        status: 'Active',
        revenue: '$ 1000',
        price: '$24.99',
        uses: '0',
        earnings: '$0.00',
        maxUses: '5000',
        duration: '30',
        startDate: '2024-12-04',
        countSubscribers: '0',
        url: 'https://www.google.com',
        type: '🥰 😈 Kinky Wet Sexting with me😋💦',
        profit: '$ 1000',
        costEarnings: '$ 10000',
        affiliate: 'MAX',
    },
];
export const CampaignTable = () => {
    const { t } = useTranslation();
    const [blink, setBlink] = useState(false);
    // State to track sorting
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const handleCopyClick = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 300); // Reset blink after 300ms
        });
    };
    // Define columns for the table
    const columns: ColumnDef<Campaign>[] = [
        {
            accessorKey: 'label',
            header: () => (
                <div className="flex items-center">
                    <p>{t('campaign.label')}</p>
                    <InfoTooltip tooltipText={'campaign.typeTooltip'} />
                </div>
            ),
            cell: (info) => {
                const row = info.row.original;
                return (
                    <div className="flex items-center gap-2">
                        <div className={'flex flex-col'}>
                            <p>{info.getValue()}</p>
                            <p className="text-[12px] text-gray">
                                {' '}
                                {new Date(row.startDate).toLocaleDateString()} -
                                {new Date(
                                    new Date(row.startDate).getTime() +
                                        row.duration * 24 * 60 * 60 * 1000
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <a href={row.url} target="_blank">
                            <Link color="#248BDA" className="w-4" />
                        </a>
                    </div>
                );
            },
        },
        {
            accessorKey: 'type',
            header: ({ column }) => (
                <Button
                    className="px-1 flex items-center"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.type')}
                    <InfoTooltip tooltipText={'campaign.usesTooltip'} />
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => (
                <p className="max-w-[200px] text-wrap">{info.getValue()}</p>
            ),
        },
        {
            accessorKey: 'affiliate',
            header: ({ column }) => (
                <Button
                    className="px-1 flex items-center"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.affiliate')}
                    <InfoTooltip tooltipText={'campaign.affiliateTooltip'} />
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.status')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'price',
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.price')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'costEarnings',
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.costEarnings')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'revenue',
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.revenue')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'profit',
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.profit')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'uses',
            header: ({ column }) => (
                <Button
                    className="px-1 flex items-center"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.uses')}
                    <InfoTooltip tooltipText={'campaign.usesTooltip'} />
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => {
                const row = info.row.original;
                return (
                    <p>
                        {info.getValue()}/{row.maxUses}
                    </p>
                );
            },
        },
        // {
        //     accessorKey: "countSubscribers",
        //     header: ({column}) => (
        //         <Button
        //             className="px-1 text-wrap"
        //             variant="ghost"
        //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //         >
        //             {t("campaign.countSubscribers")}
        //             <ArrowUpDown className="ml-2 h-4 w-4"/>
        //         </Button>
        //     ),
        //     cell: (info) => info.getValue(),
        // },
        {
            accessorKey: 'earnings',
            header: ({ column }) => (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    {t('campaign.earnings')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'campaignUrl',
            header: ({ column }) => <></>,
            cell: (info) => {
                const row = info.row.original;
                return (
                    <div className="flex  items-center gap-2">
                        <Button variant="ghost">
                            <Settings />
                        </Button>
                        <Button variant="ghost">
                            <CirclePause color="#ffd343" />
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost">
                                    <Share2 color="#248BDA" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="flex flex-col gap-2 ">
                                <div className="flex items-center">
                                    <a
                                        className="text-blue text-ellipsis"
                                        target="_blank"
                                        href={row.url}
                                    >
                                        {row.url}
                                    </a>
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleCopyClick(row.url)}
                                        className={`mr-4 ${blink ? 'animate-blink' : ''}`}
                                    >
                                        <Copy
                                            className=""
                                            onClick={() =>
                                                handleCopyClick(row.url)
                                            }
                                        />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-4 ">
                                    <Checkbox />
                                    <p>show revenue</p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            },
        },
        // {
        //     accessorKey: 'actions',
        //     header: ({ column }) => (<></>),
        //     cell: (info) => {
        //         const row = info.row.original;
        //         return (
        //             <div className="flex justify-center items-center gap-2">
        //
        //                 <Button variant="ghost">
        //                     <Pencil className="w-4" />
        //                 </Button>
        //             </div>
        //         );
        //     },
        // },
    ];

    const table = useReactTable({
        data: campaigns,
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
        <Card className="px-5 py-5 col-span-4 flex flex-col">
            <Input
                placeholder={t('campaign.filterPlaceholder')}
                onChange={(event) => {
                    table
                        .getColumn('label')
                        ?.setFilterValue(event.target.value);
                    // debouncedRefetch({ query: filterColumnName, searchString: event.target.value });
                }}
                className="max-w-sm mb-4"
            />
            <Table>
                <TableHeader className="bg-background">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => (
                                <TableHead
                                    className={
                                        index === 0
                                            ? 'sticky left-0 z-10 bg-background'
                                            : ''
                                    }
                                    key={header.id}
                                >
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
                            {row.getVisibleCells().map((cell, index) => (
                                <TableCell
                                    className={
                                        index === 0
                                            ? 'sticky left-0 z-10 bg-card'
                                            : ''
                                    }
                                    key={cell.id}
                                >
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
            <MyPagination
                refetch={() => {}}
                pagination={{
                    total: 10,
                    page: 1,
                    limit: 2,
                    totalPages: 10,
                }}
            />
        </Card>
    );
};
