import type { NextApiRequest, NextApiResponse } from 'next';

import { responseAPIHandler } from '@/utils/responseHandler';

import firebase from '@/src/firebase/config';
import 'firebase/compat/firestore';

export default async function updatePassword(req: NextApiRequest, res: NextApiResponse) {

    try {

        const { email, docId, password } = req.body;

        const docRef = firebase.firestore().collection('users').doc(email);
        const docData = (await docRef.get()).data();

        const updatedFiles = docData?.allFiles.map((fileObject: any) => {
            if (fileObject.fileId === docId) {
                return { ...fileObject, password: password };
            }
            return fileObject;
        });

        await docRef.update({
            allFiles: updatedFiles
        })

        responseAPIHandler(res, 200, "Success", "Password changed Successfully");

    } catch (e) {
        console.log(e);

        responseAPIHandler(res, 200, "Failed", "Internal server error");
    }

}