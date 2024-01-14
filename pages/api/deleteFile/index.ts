import type { NextApiRequest, NextApiResponse } from 'next';

import { responseAPIHandler } from '@/utils/responseHandler';

import firebase from '@/src/firebase/config';
import 'firebase/compat/firestore';

export default async function deleteFile(req: NextApiRequest, res: NextApiResponse) {

    try {

        const { email, docId } = req.body;

        const docRef = firebase.firestore().collection('users').doc(email);
        const docData = (await docRef.get()).data();

        let newDocData = docData?.allFiles.filter((fileObject: any, key: number) => {
            if (fileObject.fileId !== docId) {
                return fileObject;
            }
        });

        await docRef.update({
            allFiles: newDocData
        });

        responseAPIHandler(res, 200, "Success", "File deleted Successfully");

    } catch (e) {
        console.log(e);

        responseAPIHandler(res, 200, "Failed", "Internal server error");
    }

}