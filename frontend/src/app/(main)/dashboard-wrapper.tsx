"use client";

import Sidebar from "@/app/_components/sidebar";
import useSidebar from "@/hooks/useSidebar";
import { cn } from "@sglara/cn";

import useAuth from "@/hooks/useAuth";
import useToken from "@/hooks/useToken";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useMyInfoQuery } from "@/redux/service/service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/app/_components/loader";
import { setSidebar } from "@/redux/features/sidebar/sidebarSlice";
import { IconMenu2 } from "@tabler/icons-react";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSidebarOpen = useSidebar();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const { getToken } = useToken();
  const token = getToken();
  const { data, isLoading, isError } = useMyInfoQuery(token!, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      router.replace("/signin");
      return;
    }

    if (isError) {
      router.replace("/signin");
      return;
    }
  }, [token, isError, data, dispatch, router]);

  //  Automatically close sidebar when resizing to large screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) dispatch(setSidebar(false));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (!user && !isLoading) return null;
  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => dispatch(setSidebar(false))}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static z-50 bg-neutral-900 transition-all duration-300 overflow-hidden h-full",
          "lg:translate-x-0 lg:w-64", // desktop
          isSidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full w-64 lg:w-16", // hidden on mobile, collapsed on desktop
        )}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-neutral-800 overflow-y-auto w-full">
        {/* Header bar for mobile */}
        <div className="flex items-center lg:hidden p-3 border-b border-neutral-700 bg-neutral-900">
          <button onClick={() => dispatch(setSidebar(true))}>
            <IconMenu2 className="text-white w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold ml-3">Dashboard</h1>
        </div>

        {/* Page content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
