"use client";
import useToken from "@/hooks/useToken";
import { useMyInfoQuery } from "@/redux/service/service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../_components/loader";
import NavBar from "@/components/landing/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { getToken } = useToken();
  const token = getToken();

  // Only check user if token exists
  const { data, isSuccess, isLoading } = useMyInfoQuery(token!, {
    skip: !token,
  });

  useEffect(() => {
    // If user logged in → redirect to dashboard
    if (token && isSuccess && data?.success) {
      router.replace("/dashboard");
    }
  }, [token, isSuccess, data, router]);

  if (token && isLoading) return <Loader />;

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
