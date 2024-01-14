"use client"

import React from "react";
import { useRouter } from 'next/navigation';
import { ToastEmoji } from "@/utils/toats";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useAuth() {
    const router = useRouter();
    const [user, setUser] = React.useState<any>({
        email: ""
    });

    React.useEffect(() => {

        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setUser(user);
            } else {
                router.replace('/');
                ToastEmoji('Login first','🥹');
            }
        });

    }, []);

    return user;
};  