'use client';

import { SpinnerCustom } from '@/components/ui/spinner';
import useToken from '@/hooks/useToken';
import { useMyInfoQuery } from '@/redux/service/service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { getToken } = useToken()
    const token = getToken();
    const { data, isSuccess, isLoading } = useMyInfoQuery(token!, {
        skip: !token,
    });

    useEffect(() => {
        if (isSuccess && data.success) {
            router.replace('/dashboard');
            return;
        }
    }, [data, isSuccess, router]);

    if (isLoading) return <p><SpinnerCustom />Checking authentication...</p>;
    return <>{children}</>;
}
