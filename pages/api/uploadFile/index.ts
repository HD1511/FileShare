import type { NextApiRequest, NextApiResponse } from 'next';

import { responseAPIHandler } from '@/utils/responseHandler';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default async function updatePassword(req: NextApiRequest, res: NextApiResponse) {

    try {

        const { email, file } = req.body;

        const docRef = firebase.firestore().collection('users').doc(email);

        await docRef
            .set({
                allFiles: firebase.firestore.FieldValue.arrayUnion(file)
            }, {
                merge: true
            })

        responseAPIHandler(res, 200, "Success", "File Uploaded Successfully");

    } catch (e) {
        console.log(e);

        responseAPIHandler(res, 200, "Failed", "Internal server error");
    }

}