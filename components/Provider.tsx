"use client";

import { SessionProvider } from "next-auth/react";

function Provider(props: { children: any, session: any }) {
    return (
        <SessionProvider session={props.session}>
            {props.children}
        </SessionProvider>
    );
}

export default Provider;