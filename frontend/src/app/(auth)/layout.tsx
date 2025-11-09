"use client";

import NavBar from "@/components/landing/NavBar";
import useToken from "@/hooks/useToken";
import { useMyInfoQuery } from "@/redux/service/service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../_components/loader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { getToken } = useToken();
  const token = getToken();
  const { data, isSuccess, isLoading } = useMyInfoQuery(token!, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess && data.success) {
      router.replace("/dashboard");
      return;
    }
  }, [data, isSuccess, router]);

  if (isLoading) return <Loader />;
  if (!token && !isLoading) return null;
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
