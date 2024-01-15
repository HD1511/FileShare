"use client"

import React from "react";
import { Button, Card, CardBody, CardHeader, Checkbox } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

import Loading from "../../loading";
import useAuth from "@/hooks/useAuth";
import { ToastFailed, ToastSuccess } from "@/utils/toats";
import { PreviewFile, UpdatePassword } from "@/utils/apiHandler";

import 'primeicons/primeicons.css';

export default function Upload({ params }: { params: any }) {
    const user = useAuth();
    const inputRef = React.useRef<any>(null);
    const { docId } = params;
    const [fileData, setFileData] = React.useState({
        fileUrl: "",
        shortUrl: "",
        fileName: "",
        fileType: ""
    });
    const [isSelected, setIsSelected] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState<string>("");

    React.useEffect(() => {

        const getData = async () => {
            const data = await PreviewFile(user.email, docId);

            if (data.status === "Success") {
                setFileData(data.data);
            } else {
                ToastFailed("Internal server error");
            }
        }

        if (user.email !== "") {
            getData();
        }

    }, [user]);

    const copyToClipBoard = () => {
        inputRef.current?.select();
        document.execCommand("copy");
        ToastSuccess("Copied Successfully");
    }

    const updatePassword = async () => {

        const data = await UpdatePassword(user.email, docId, password);

        if (data.status === "Success") {
            setPassword("");
            ToastSuccess("Password Saved");
        } else {
            ToastFailed("Internal Server Error");
        }

    }

    return (
        <>
            {
                user.email === "" ?
                    <Loading /> :
                    <div className="flex flex-wrap h-[calc(90vh-4rem)] content-center justify-center">
                        <Card className="p-3 m-3 bg-gray-200">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold"></p>
                                <h4 className="font-bold text-large break-all">{fileData.fileName}</h4>
                                <small className="text-default-500">{fileData.fileType}</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-4 px-5">
                                <Image
                                    className="w-[350px] md:w-[400px]"
                                    isBlurred
                                    src={fileData.fileUrl}
                                    height={250}
                                    style={
                                        {
                                            height: "300px"
                                        }
                                    }
                                />
                            </CardBody>
                        </Card>
                        <div className="flex flex-col w-full sm:w-[340px] md:w-[340px] mt-2 md:mt-0">
                            <div className="bg-gray-200 p-3 rounded-lg mx-5 md:m-3 flex">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    readOnly={true}
                                    placeholder="Your Short URL"
                                    className="border-none outline-none bg-gray-200 text-primary-700 w-[90%]"
                                    defaultValue={fileData.shortUrl}
                                />
                                <i className="pi pi-copy text-xl text-primary-700 hover:cursor-pointer ml-auto" onClick={copyToClipBoard}></i>
                            </div>
                            <Checkbox isSelected={isSelected} onValueChange={setIsSelected} className="m-2 md:m-4 ml-3" size="md">Enable password?</Checkbox>
                            {
                                isSelected ?
                                    <div className="mx-4 md:m-3 flex">
                                        <div className="inline-block bg-gray-200 p-2 rounded-lg w-[90%]">
                                            <input
                                                type="text"
                                                placeholder="Enter password"
                                                className="border-none outline-none bg-gray-200 text-primary-700 "
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <Button className="ml-2" color="primary" onClick={updatePassword}>Save</Button>
                                    </div> : <></>
                            }
                        </div>
                    </div>
            }
        </>
    )

}
