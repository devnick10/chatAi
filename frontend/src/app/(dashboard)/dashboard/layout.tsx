'use client';

import { SpinnerCustom } from '@/components/ui/spinner';
import useToken from '@/hooks/useToken';
import useAuth from '@/hooks/useUser';
import { logout } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useMyInfoQuery } from '@/redux/service/service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const { getToken } = useToken()
  const token = getToken();
  const { data, isLoading, isError } = useMyInfoQuery(token!, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      router.replace('/signin');
      return;
    }

    if (isError) {
      router.replace('/signin');
      return;
    }
  }, [token, isError, data, dispatch, router]);

  if (isLoading) return <p><SpinnerCustom />Checking authentication...</p>;

  if (!user && !isLoading) return null; // avoid flicker before redirect
  return <>{children}</>;
}
