import React, { useEffect } from "react";
import { Button } from "@/components/ui/fanat/button";
import { DataTable } from "@/components/DataTable/DataTable";
import { MyPagination } from "../Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/useFetch";
import { ApiRoute } from "@/constants/apiRoutes";
import { useModalStore } from "@/store/modalStore";
import axiosInstance from "@/utils/axiosInstance";
import { Settings, CircleX, Eye, ArrowRightLeft, CirclePause, CirclePlay, UserCog } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserStore } from "@/store/userStore";

interface PageWithTableProps {
    title: string | null;
    columns: any[];
    createRoute?: string;
    filterPlaceholder: string;
    filterColumnName: string;
    getRoute: ApiRoute;
    deleteText: string;
    deleteRoute: string | ((id: string) => string);
    showRoute?: string;
    editRoute?: string;
    noAction?: boolean;
    createCallback?: () => void;
    shouldRefetch?: any;
    userId?: string;
    editAcc?: boolean;
    switchHandler?: (id: string) => void;
    dontAllowSelection?: boolean;
    selectFunction?: (selected: string[]) => void;
    pauseHandler?: (id: string) => void;
    startHandler?: (id: string) => void;
    noFilter?: boolean;
    dontShowSettings?: boolean;
    dontShowDelete?: boolean;
    editUserCallback?: (id: string) => void;
    freeTrial?: boolean | null;
}

const PageWithTable: React.FC<PageWithTableProps> = ({
                                                         title,
                                                         columns,
                                                         createRoute,
                                                         filterPlaceholder,
                                                         filterColumnName,
                                                         createCallback,
                                                         getRoute,
                                                         deleteText,
                                                         noAction,
                                                         deleteRoute,
                                                         showRoute,
                                                         editRoute,
                                                         shouldRefetch,
                                                         editAcc,
                                                         switchHandler,
                                                         dontAllowSelection,
                                                         selectFunction,
                                                         pauseHandler,
                                                         startHandler,
                                                         noFilter,
                                                         dontShowSettings,
                                                         dontShowDelete,
                                                         editUserCallback,
                                                         freeTrial,
                                                     }) => {
    const { userId } = useParams();
    const [columnsWithAction, setColumnsWithAction] = React.useState<any[]>([]);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, loading, error, refetch, pagination } = useFetch(getRoute);
    const [rowSelection, setRowSelection] = React.useState({});
    const { setDeleteModal, setDeleteModalAction, setDeleteModalText, setCancelModalAction } = useModalStore();
    const { plans } = useUserStore();
    useEffect(() => {
        let col = [...columns];
        if (!dontAllowSelection && !editAcc) {
            col = [
                {
                    accessorKey: "select",
                    header: ({ table }) => (
                        <Checkbox
                            checked={
                                table.getIsAllPageRowsSelected() ||
                                (table.getIsSomePageRowsSelected() && "indeterminate")
                            }
                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                            aria-label="Select all"
                        />
                    ),
                    cell: ({ row }) => (
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    ),
                    enableSorting: false,
                    enableHiding: false,
                    meta: {
                        width: "5%",  // Percentage width for selection column
                    },
                },
                ...columns];
        }
        if (!noAction) {
            col = [...col, {
                accessorKey: "action",
                header: () => <div className="flex justify-center">{t("common.actions")}</div>,
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        {showRoute && <Button
                            variant="ghost"
                            onClick={() => navigate(`/${showRoute}/${row.original.id}`)}
                            className="mr-2"
                        >
                            <Eye />
                        </Button>}
                        {switchHandler && <Button
                            variant="ghost"
                            onClick={() => switchHandler(row.original.id)}
                            className="mr-2"
                        >
                            <ArrowRightLeft />
                        </Button>}
                        {pauseHandler && <Button
                            variant="ghost"
                            onClick={() => pauseHandler(row.original.id)}
                            className="mr-2"
                        >
                            <CirclePause color="#ffd343" />
                        </Button>
                        }
                        {startHandler && <Button
                            variant="ghost"
                            onClick={() => startHandler(row.original.id)}
                            className="mr-2"
                        >

                            <CirclePlay color="#248bda" />
                        </Button>
                        }
                        {!dontShowSettings && <Button variant="ghost"
                                                      onClick={() => navigate(`/${editRoute}/${row.original.id}`)}
                        >
                            <Settings />
                        </Button>}
                        {editUserCallback &&
                            <Button variant="ghost"
                                    onClick={() => editUserCallback(row.original.id)}
                            >
                                <UserCog />
                            </Button>
                        }
                        {!dontShowDelete && <Button
                            variant="ghost"
                            onClick={(e) => deleteHandler(e, row.original.id)}
                        >
                            <CircleX color="#D2686E" />
                        </Button>}
                    </div>
                ),
                meta: {
                    width: "15%",
                },
            }];
        }
        if (editAcc) {
            col = [...col, {
                accessorKey: "action",
                header: "Action",
                cell: ({ row }) => (
                    <Button
                        onClick={(e) => {
                            selectFunction(row.original);
                        }}
                    >
                        {t("common.select")}
                    </Button>
                ),
                meta: {
                    width: "5%",
                },
            }];
        }

        setColumnsWithAction(col);
    }, [columns, dontAllowSelection, noAction, editAcc, selectFunction, switchHandler, dontShowSettings, dontShowDelete]);
    useEffect(() => {
        if (shouldRefetch) {
            refetch();
        }
    }, [shouldRefetch, refetch]); // Re-run refetch when `shouldRefetch` changes

    const deleteHandler = (e: React.SyntheticEvent, id: string) => {
        setDeleteModal(true);
        setDeleteModalText(t(deleteText, { selected: id ? 1 : Object.keys(rowSelection).length }));
        setDeleteModalAction(() => {
            if (id) {
                try {
                    axiosInstance({
                        method: "DELETE",
                        url: userId ? deleteRoute({ userId, id }) : deleteRoute(id),
                    });
                } catch (err) {
                    console.error("Delete failed", err);
                }
                setTimeout(() => {
                    refetch();
                }, 1000);
                setDeleteModal(false);
                setRowSelection({});
            } else {
                Object.keys(rowSelection).forEach(async (count) => {
                    const deleteUrl = userId ? deleteRoute({
                        userId,
                        id: data[count].id,
                    }) : deleteRoute(data[count].id);
                    try {
                        await axiosInstance({
                            method: "DELETE",
                            url: deleteUrl,
                        });
                    } catch (err) {
                        console.error("Delete failed", err);
                    }
                });
                setTimeout(() => {
                    refetch();
                }, 1000);
                setDeleteModal(false);
                setRowSelection({});
            }
        });
        setCancelModalAction(() => {
            setDeleteModal(false);
            setRowSelection({});
        });
    };
    const massPauseHandler = () => {
        Object.keys(rowSelection).forEach(async (count) => {
            pauseHandler && pauseHandler(data[count].id);
            setTimeout(() => {
                refetch();
            }, 1000);
            setRowSelection({});
        });
    };
    const massRestartHandler = () => {
        Object.keys(rowSelection).forEach(async (count) => {
            startHandler && startHandler(data[count].id);
            setTimeout(() => {
                refetch();
            }, 1000);
            setRowSelection({});
        });
    };
    const createHandler = () => {
        if (createCallback) {
            createCallback();
        } else if (createRoute) {
            navigate(createRoute);
        }
    };
    return (
        <div>
            <h1 className="mb-4 mt-2 text-xl text-blue">{t(title)}</h1>
            <div className="absolute right-[20px]">
                {!dontShowDelete && Object.keys(rowSelection).length > 0 && (
                    <Button variant="destructive" onClick={deleteHandler} className="mr-2">
                        {t("common.delete")}
                    </Button>
                )}
                {!!pauseHandler && Object.keys(rowSelection).length > 0 && (
                    <Button variant="yellow" onClick={massPauseHandler} className="mr-2">
                        {t("common.pause")}
                    </Button>
                )}
                {!!startHandler && Object.keys(rowSelection).length > 0 && (
                    <Button
                        onClick={massRestartHandler} className="mr-2">
                        {t("common.restart")}
                    </Button>
                )}
                {(createRoute || createCallback) && !editAcc && <Button
                    disabled={freeTrial || plans?.length === 0 || plans === null}
                    onClick={createHandler}>
                    {t("common.create")}
                </Button>}
            </div>
            <DataTable
                columns={columnsWithAction}
                data={data || []}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                loading={loading}
                filterPlaceholder={filterPlaceholder}
                filterColumnName={filterColumnName}
                refetch={refetch}
                noFilter={noFilter}
            />
            {pagination && <MyPagination refetch={refetch} pagination={pagination} />}
        </div>
    );
};

export default PageWithTable;
