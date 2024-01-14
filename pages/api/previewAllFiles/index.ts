import type { NextApiRequest, NextApiResponse } from 'next';

import { responseAPIHandler } from '@/utils/responseHandler';

import firebase from '@/src/firebase/config';
import 'firebase/compat/firestore';

export default async function previewAllFiles(req: NextApiRequest, res: NextApiResponse) {

    try {

        const { email } = req.body;

        const docRef = firebase.firestore().collection('users').doc(email);
        const docData = (await docRef.get()).data();

        const newDocData = docData?.allFiles.map((fileObject: any, key: number) => {
            return { ...fileObject, index: key + 1 };
        });

        responseAPIHandler(res, 200, "Success", "All files preview Successfully", newDocData);

    } catch (e) {
        console.log(e);

        responseAPIHandler(res, 200, "Failed", "Internal server error");
    }

}