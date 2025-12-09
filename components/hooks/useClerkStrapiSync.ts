"use client"

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const STRAPI_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const useClerkStrapiSync = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();

    const syncUser = async () => {
        if (!user || !user.id || !user.primaryEmailAddress) return;

        try {
            const response = await fetch(`${STRAPI_URL}/api/sync-clerk-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clerkId: user.id,
                    email: user.primaryEmailAddress.emailAddress,
                }),
            })
            const data = await response.json();

            if (response.ok) {
                console.log("✅ Sincronizacion Exitosa.JWT de Strapi obtenido");
                localStorage.setItem("strapi-jwt", data.jwt)
            } else {
                console.log("❌ Fallo la sincronizacion con Strapi", data);
            }
        } catch (error) {
            console.error("Error de red durante la sincronizacion", error);
        }
    };
    useEffect(() => {
        if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress && STRAPI_URL)
            syncUser();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [isLoaded, isSignedIn, user, STRAPI_URL])

};
export default useClerkStrapiSync