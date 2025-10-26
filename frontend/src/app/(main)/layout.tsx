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

  if (isLoading) return <Loader />;
  if (!user && !isLoading) return null; // avoid flicker before redirect
  return <>
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-neutral-900 transition-all duration-300 overflow-hidden",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <Sidebar />
      </div>

      <div className="flex-1 bg-neutral-800">
        {/* Nav */}
        <div className='p-4 flex justify-between'>
          <div>
            <h2 className='text-xl font-medium '>ChatAI</h2>
          </div>
          {/* <div className='flex gap-4 items-center'>
            <button className='flex gap-1 items-center justify-center'><IconShare2 />Share</button>
            <button><IconDots /></button>
          </div> */}
        </div>
        {/* Main content */}
        <div className=''>
          {children}
        </div>
      </div>
    </div>
  </>
}
