"use client"

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Input } from "@nextui-org/react";

import Loading from '@/app/loading';
import { PreviewFile } from '@/utils/apiHandler';
import { ToastFailed } from '@/utils/toats';

import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';
import Link from 'next/link';

import 'primeicons/primeicons.css';

export default function Download({ params }: { params: any }) {
    const [ownerFileData, setOwnerFileData] = React.useState({
        fileName: "",
        fileType: "",
        fileUrl: "",
        password: "",
        fileSize: 0
    });
    const [password, setPassword] = React.useState<string>("");

    const { getAllParams } = params;
    const decodedEmail = AES.decrypt(decodeURIComponent(getAllParams[0].toString()), 'secretPassphrase').toString(enc.Utf8);

    React.useEffect(() => {

        const getData = async () => {
            const data = await PreviewFile(decodedEmail, getAllParams[1]);

            if(data.status === "Success"){
                setOwnerFileData(data.data); 
            }else{
                ToastFailed("Internal server error");
            }

        }

        getData();

    }, []);

    const checkForPassword = (): boolean => {
        if ((ownerFileData.password === "") || (ownerFileData.password === password)) {
            return false;
        }
        return true;
    }

    return (
        <>
            {
                ownerFileData.fileName !== "" ?
                    <div className='flex flex-wrap h-[calc(90vh-4rem)] content-center justify-center m-5'>
                        <Card className="p-5 sm:p-14 md:p-14 bg-primary-50">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col">
                                <h4 className="font-bold text-large text-primary-600">{decodedEmail}</h4>
                                <div className='mt-1'>Shared the file with You</div>
                            </CardHeader>
                            <CardBody className="overflow-visible pt-8 items-center">
                                <Image
                                    className="animate-bounce object-cover rounded-xl"
                                    src="/file_download.png"
                                    width={80}
                                />
                            </CardBody>
                            <CardFooter className='overflow-visible grid justify-items-center break-all'>
                                <div className='text-[15px] mb-3'>{ownerFileData.fileName}</div>
                                <div className='text-[15px]'><i className='pi pi-file mr-2' />File Type: {ownerFileData.fileType}</div>
                                <div className='text-[15px] mt-3'><i className='pi pi-bolt mr-2' />File Size: {(ownerFileData.fileSize / 1000000).toFixed(2)} MB</div>
                                {
                                    ownerFileData.password !== "" ?
                                        <Input
                                            type="text"
                                            placeholder="Enter password to access"
                                            className='mt-4'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        /> : <></>
                                }
                                <Button isDisabled={checkForPassword()} className='w-full mt-5' radius='full' startContent={<i className='pi pi-download' />} color="primary" variant="shadow">
                                    <Link href={ownerFileData.fileUrl} className='' target="_blank">
                                        Download
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div> : <Loading />
            }
        </>
    )
};
