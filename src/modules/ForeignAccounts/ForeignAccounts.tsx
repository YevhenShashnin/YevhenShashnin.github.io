// import React from "react";
// import useFetch from "@/hooks/useFetch";
// import { apiRoutes, ROUTES } from "@/constants/routing";
// import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { ArrowUpDown, CircleX, Settings } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { DataTable } from "@/components/DataTable/DataTable";
// import { useNavigate } from "react-router-dom";
// import { useModalStore } from "@/store/modalStore";
// import axiosInstance from "@/utils/axiosInstance";
// import { MyPagination } from "@/modules/shared/Pagination/Pagination";
//
// const ForeignAccounts = () => {
//     const { t } = useTranslation();
//     const navigate = useNavigate();
//     const [rowSelection, setRowSelection] = React.useState({});
//
//     const { data, loading, error, refetch, pagination } = useFetch<{}[]>(apiRoutes.getContentGroup);
//     const columns: ColumnDef<{}>[] = [
//
//         {
//             accessorKey: "text",
//             header: ({ column }) => {
//                 return (
//                     <Button
//                         variant="ghost"
//                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                     >
//                         {t("content.text")}
//                         <ArrowUpDown className="ml-2 h-4 w-4" />
//                     </Button>
//                 );
//             },
//             cell: ({ row }) => (
//                 <div className="capitalize pl-4">{row.getValue("text")}</div>
//             ),
//             meta: {
//                 width: "40%",  // Percentage width for name column
//             },
//         },
//         {
//             accessorKey: "gif",
//             header: ({ column }) => {
//                 return (
//
//                     t("content.gif")
//                 );
//             },
//             cell: ({ row }) =>
//                 <img src={row.getValue("gif")} alt="gif" className="max-w-[200px] " />,
//             meta: {
//                 width: "20%",  // Percentage width for maxGroupsCount column
//             },
//         },
//
//         {
//             accessorKey: "contentGroup",
//             header: ({ column }) => {
//                 return (
//
//                     t("content.contentGroup")
//
//                 );
//             },
//             cell: ({ row }) =>
//                 <div className="lowercase pl-4">{row.getValue("contentGroup")}</div>,
//             meta: {
//                 width: "20%",  // Percentage width for cooldown column
//             },
//         },
//
//
//         {
//             id: "actions",
//             enableHiding: false,
//             header:  ({ column }) => {
//                 return (
//                     <div className='pl-4'>{t("common.actions")}</div>
//                 );
//             },
//             cell: ({ row }) => {
//                 const content = row.original;
//
//                 return (
//                     <div className="flex">
//                         <Button variant="ghost"
//                                 onClick={() => navigate(`/content-edit/${content.id}`)}
//                         >
//                             <Settings />
//                         </Button>
//                         <Button variant="ghost"
//                                 onClick={() => deleteHandler(null, content.id)}
//                         >
//                             <CircleX color="#D2686E" />
//                         </Button>
//                     </div>
//
//                 );
//             },
//             meta: {
//                 width: "10%",
//             },
//         },
//     ];
//     const { setDeleteModal, setDeleteModalAction, setDeleteModalText, setCancelModalAction } = useModalStore();
//     const deleteHandler = (e, id) => {
//         setDeleteModal(true);
//         setDeleteModalText(t("content.delete", { selected: id ? 1 : Object.keys(rowSelection).length })); // pass variables
//         setDeleteModalAction(() => {
//             if (id) {
//                 try {
//                     axiosInstance({
//                         method: apiRoutes.deleteContentById.method,
//                         url: apiRoutes.deleteContentById.url(id),
//                     });
//                 } catch (err) {
//                     console.error("Delete failed", err);
//                 }
//                 setTimeout(() => {
//                     refetch();
//                 }, 1000);
//                 setDeleteModal(false);
//                 setRowSelection({});
//             } else {
//                 Object.keys(rowSelection).forEach(async (count) => {
//                     try {
//                         await axiosInstance({
//                             method: apiRoutes.deleteContentById.method,
//                             url: apiRoutes.deleteContentById.url(data[count].id),
//                         });
//                     } catch (err) {
//                         console.error("Delete failed", err);
//                     }
//                 });
//                 setTimeout(() => {
//                     refetch();
//                 }, 1000);
//                 setDeleteModal(false);
//                 setRowSelection({});
//             }
//
//         });
//         setCancelModalAction(() => {
//             setDeleteModal(false);
//             setRowSelection({});
//         });
//     };
//     return (
//         <div>
//             <h1 className="mb-4 mt-2 text-xl text-blue">{t("content.content")}</h1>
//             <div className="absolute right-[20px]">
//
//                 {Object.keys(rowSelection).length > 0 &&
//                     <Button variant="destructive" onClick={deleteHandler}
//                             className="mr-2"
//                     >
//                         {t("common.delete")}
//                     </Button>}
//                 <Button onClick={() => navigate(ROUTES.CONTENT_CREATE)}
//                 >
//                     {t("common.create")}
//                 </Button>
//             </div>
//             <DataTable columns={columns} data={data || []} rowSelection={rowSelection} setRowSelection={setRowSelection}
//                        loading={loading} filterPlaceholder={t("content.filter")} filterColumnName="text" />
//             {pagination && <MyPagination refetch={refetch} pagination={pagination} />}
//         </div>
//     );
// };
//
// export default ForeignAccounts;
