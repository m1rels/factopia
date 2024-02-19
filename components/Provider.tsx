"use client";

import { SessionProvider } from "next-auth/react";

function Provider(props: { children: any }) {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    );
}

export default Provider;