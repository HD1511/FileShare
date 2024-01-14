import type { NextApiRequest, NextApiResponse } from 'next';

import { responseAPIHandler } from '@/utils/responseHandler';

import firebase from '@/src/firebase/config';
import 'firebase/compat/firestore';

export default async function previewFile(req: NextApiRequest, res: NextApiResponse) {

    try {

        let data;
        const { email, docId } = req.body;

        const docRef = firebase.firestore().collection('users').doc(email);
        const docData = (await docRef.get()).data();

        docData?.allFiles.map((fileObject: any) => {
            if (fileObject.fileId === docId) {
                data = fileObject;
            }
        });

        responseAPIHandler(res, 200, "Success", "File preview Successfully", data);

    } catch (e) {
        console.log(e);

        responseAPIHandler(res, 200, "Failed", "Internal server error");
    }

}