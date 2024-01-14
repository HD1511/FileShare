"use client"

import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { GoDash } from "react-icons/go";

import Link from "next/link";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";

import Loading from "../loading";
import useAuth from "@/hooks/useAuth";
import { ToastFailed, ToastSuccess } from "@/utils/toats";
import { DeleteFile, PreviewAllFiles } from "@/utils/apiHandler";

import 'primeicons/primeicons.css';

export default function Upload() {
    const user = useAuth();
    const [totalFiles, setTotalFiles] = React.useState([]);
    const [click, setClick] = React.useState<boolean>(false);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {

        const getData = async () => {
            const data = await PreviewAllFiles(user.email);

            if(data.status === "Success"){
                setTotalFiles(data.data);
            }else{
                ToastFailed("Internal server error");
            }

        }

        if (user.email !== "") {
            getData();
        }

    }, [user, click]);

    const rowsPerPage = 8;
    const pages = Math.ceil(totalFiles?.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return totalFiles.slice(start, end);
    }, [page, totalFiles]);

    const deleteItem = async (item: any) => {

        const data = await DeleteFile(user.email, item.fileId);

        if(data.status === "Success"){
            setClick(!click);
            ToastSuccess("File Deleted");
        }else{
            ToastFailed("Internal server error");
        }
        

    }

    return (
        <>
            {
                user.email === "" || totalFiles.length === 0 ?
                    <Loading /> :
                    <div className="flex flex-wrap h-[calc(85vh-4rem)] content-center justify-center m-5">
                        <div className="m-5">
                            <h1 className="text-xl font-bold text-primary-600 tracking-wider">Your Uploaded Files</h1>
                        </div>
                        <Table
                            aria-label="Example table with client side pagination"
                            bottomContent={
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="primary"
                                        page={page}
                                        total={pages}
                                        onChange={(page) => setPage(page)}
                                    />
                                </div>
                            }
                            classNames={{
                                wrapper: "min-h-[222px]",
                            }}
                        >
                            <TableHeader>
                                <TableColumn>index</TableColumn>
                                <TableColumn>FILE NAME</TableColumn>
                                <TableColumn>TYPE</TableColumn>
                                <TableColumn>SIZE</TableColumn>
                                <TableColumn>PASSWORD</TableColumn>
                                <TableColumn>VIEW</TableColumn>
                                <TableColumn>DELETE</TableColumn>
                            </TableHeader>
                            <TableBody items={items}>
                                {(item: any) => (
                                    <TableRow key={item?.index}>
                                        <TableCell>{item?.index}</TableCell>
                                        <TableCell>{item?.fileName}</TableCell>
                                        <TableCell>{item?.fileType}</TableCell>
                                        <TableCell>{((item?.fileSize) / 1000000).toFixed(2)}MB</TableCell>
                                        <TableCell>
                                            {item?.password === "" ?
                                                <GoDash className="text-2xl text-primary-400" /> :
                                                item?.password}
                                        </TableCell>
                                        <TableCell className="hover:cursor-pointer">
                                            <Link href={item?.shortUrl} target="_blank">
                                                <i className="pi pi-eye text-2xl text-secondary-300" />
                                            </Link>
                                        </TableCell>
                                        <TableCell className="hover:cursor-pointer" onClick={() => deleteItem(item)}>
                                            <MdDeleteForever className="text-3xl text-red-500" />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

            }
        </>
    )

}
