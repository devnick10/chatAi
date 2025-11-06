'use client';
import Sidebar from '@/app/_components/sidebar';
import useSidebar from '@/hooks/useSidebar';
import { cn } from '@sglara/cn';
import { IconDots, IconShare2 } from '@tabler/icons-react';

import useToken from '@/hooks/useToken';
import useAuth from '@/hooks/useAuth';
import { logout } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useMyInfoQuery } from '@/redux/service/service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '../_components/loader';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isSidebarOpen = useSidebar();
  // const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { user } = useAuth();

  // const { getToken } = useToken()
  // const token = getToken();
  // const { data, isLoading, isError } = useMyInfoQuery(token!, {
  //   skip: !token,
  // });

  // useEffect(() => {
  //   if (!token) {
  //     dispatch(logout());
  //     router.replace('/signin');
  //     return;
  //   }

  //   if (isError) {
  //     router.replace('/signin');
  //     return;
  //   }
  // }, [token, isError, data, dispatch, router]);

  // if (isLoading) return <Loader />;
  // if (!user && !isLoading) return null; // avoid flicker before redirect
  return <>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-neutral-900 transition-all duration-300 overflow-hidden",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <Sidebar />
      </div>
      <div className="flex-1 bg-neutral-800 overflow-y-auto">
        {children}
      </div>
    </div>
  </>
}
