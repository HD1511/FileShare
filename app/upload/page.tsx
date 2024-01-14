"use client"

import React from "react";
import { useRouter } from "next/navigation";

import Loading from "../loading";
import useAuth from "@/hooks/useAuth";

import { FileUpload } from "primereact/fileupload";
import { Badge } from 'primereact/badge';
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import 'primeicons/primeicons.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { storage } from "@/src/firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import randomstring from 'randomstring';
import AES from 'crypto-js/aes';

import './style.css';


export default function Upload() {
    let user = useAuth();
    const router = useRouter();
    const [progresspercent, setProgresspercent] = React.useState<number>(0);
    const fileUploadRef = React.useRef(null);

    const uploadFile = async ({ files }: { files: any }) => {
        const [file] = files;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDocument(downloadURL, file);
                });
            }
        );
    }

    const setDocument = async (downloadURL: any, file: any) => {

        const docId = randomstring.generate({
            length: 6,
            charset: 'alphanumeric'
        });

        const encodedEmail = AES.encrypt(user.email, 'secretPassphrase');
        const encodedURIEmail = encodeURIComponent(encodedEmail.toString());

        const newObject = {
            fileName: file?.name,
            fileSize: file?.size,
            fileType: file?.type,
            fileUrl: downloadURL,
            fileId: docId,
            password: "",
            shortUrl: process.env.NEXT_PUBLIC_URI + `/download/${encodedURIEmail}/` + docId,
        };

        const docRef = firebase.firestore().collection('users').doc(user.email);

        await docRef
            .set({
                allFiles: firebase.firestore.FieldValue.arrayUnion(newObject)
            }, {
                merge: true
            })

        router.push(`/file/${docId}`);

    }

    const progressBarTemplate = () => {
        return <ProgressBar value={progresspercent} showValue={false} style={{ width: '100%', height: '0.3rem', borderRadius: '0px' }}></ProgressBar>
    }

    const onTemplateRemove = (callback: any) => {
        callback();
    }

    const itemTemplate = (file: any, props: any) => {
        return <div>
            <div className="p-fileupload-row flex" data-pc-section="file">
                <img role="presentation" className="p-fileupload-file-thumbnail" src={file.objectURL} width="50" data-pc-section="thumbnail" alt={file.name} />
                <div data-pc-section="details" className="flex flex-col gap-1">
                    <div className="p-fileupload-filename self-start text-sm sm:text-medium" data-pc-section="filename ">
                        {file.name}
                    </div>
                    <span data-pc-section="filesize" className="self-start text-sm sm:text-medium">
                        {props.formatSize}
                    </span>
                    <span className="self-start">
                        {
                            progresspercent == 100 ? <Badge value="Completed" severity="success" /> :
                                <Badge value="Pending" severity="warning" />
                        }
                    </span>
                </div>
                <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" onClick={() => onTemplateRemove(props.onRemove)} />
            </div>
        </div>
    }

    return (
        <>
            {
                user.email === "" ?
                    <Loading /> :
                    <div className='h-[calc(100vh-4rem)] grid place-items-center'>
                        <FileUpload
                            name="files"
                            customUpload={true}
                            ref={fileUploadRef}
                            uploadHandler={uploadFile}
                            progressBarTemplate={progressBarTemplate}
                            itemTemplate={itemTemplate}
                            accept="image/*"
                            maxFileSize={2097152}
                            pt={{
                                content: { className: 'surface-ground' },
                                message: {
                                    root: {
                                        className: "w-1rem"
                                    }
                                }
                            }}
                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                        />
                    </div>
            }
        </>
    )

}
