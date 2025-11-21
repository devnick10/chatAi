"use client";

import Loader from "@/app/_components/loader";
import { useEffect, useState } from "react";

export default function ClientGuard({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <Loader />;

    return <>{children}</>;
}
