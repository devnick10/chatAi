"use client";
import { UpgradePlanIcon } from "@/components/ui/icons";
import useAuth from "@/hooks/useAuth";
import useToken from "@/hooks/useToken";
import { logout } from "@/redux/features/auth/authSlice";
import { setSettingsMenu } from "@/redux/features/models/modelsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IconLogout, IconSettings2 } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface SettingsOptionsModelProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const SettingsOptionsModel: React.FC<SettingsOptionsModelProps> = ({
  toggleSidebar,
  isSidebarOpen,
}: SettingsOptionsModelProps) => {
  const user = useAuth().user;
  const { removeToken } = useToken();

  const userName = user?.email.split("@")[0] || "Guest";
  const email = user?.email || "guest@gmail.com";
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const setSettings = (val: boolean) => dispatch(setSettingsMenu(val));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setSettings(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function handleLogout() {
    removeToken();
    dispatch(logout());
  }

  return (
    <div
      ref={menuRef}
      className="flex flex-col divide-y divide-neutral-600 gap-2 bg-neutral-700 p-4 rounded-lg mb-4"
    >
      <div className="pb-1">
        <div className="flex gap-2 items-center  hover:bg-neutral-800  rounded-lg">
          <div
            className="rounded-full bg-gray-600 w-8 h-8 flex justify-center items-center "
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar();
            }}
          >
            {userName.charAt(0)}
          </div>
          {isSidebarOpen && (
            <div>
              <h4 className="font-medium">{userName}</h4>{" "}
              <p className="text-foreground/50 text-sm">{email}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Link href={"/plans"}>
          <button className=" hover:bg-neutral-800  rounded-lg ">
            <div className="flex items-center gap-2">
              <UpgradePlanIcon size="6" />
              Upgrade plan
            </div>
          </button>
        </Link>
        <Link href={"/settings"}>
          <button className=" hover:bg-neutral-800  rounded-lg ">
            <div className="flex items-center gap-2">
              <IconSettings2 className="6" />
              Settings
            </div>
          </button>
        </Link>
      </div>
      <div className="mt-1  hover:bg-neutral-800  rounded-lg px-0.5 py-1 ">
        <button onClick={handleLogout}>
          <div className="flex items-center gap-2">
            <IconLogout className="6" />
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};
