"use client";
import { ChatAiIcon } from "@/components/ui/icons";
import useSettingsModel from "@/hooks/models/useSettigsModel";
import useSidebar from "@/hooks/models/useSidebar";
import useAuth from "@/hooks/useAuth";
import {
  setSidebar,
  toggleSettingsMenu,
  toggleSidebar,
} from "@/redux/features/models/modelsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { cn } from "@sglara/cn";
import {
  IconLayoutSidebarRight,
  IconMessage2,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { SettingsOptionsModel } from "./settingsOptionsModel";
import Link from "next/link";

const sidebarFeatures = [
  { title: "New chat", icon: IconMessage2, hrf: "/dashboard" },
  { title: "Search chats", icon: IconSearch },
];

export default function Sidebar() {
  const isOpen = useSidebar();
  const isSettingsModelOpen = useSettingsModel();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(toggleSidebar());
  const toggleSettings = () => dispatch(toggleSettingsMenu());
  const { user } = useAuth();
  const userName = user?.email.split("@")[0] || "Guest";
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      {/* Top Section */}
      <div
        className={cn(
          "group flex items-center justify-between p-4 border-b border-neutral-800",
          !isOpen && "justify-center",
          "transition-all ",
        )}
      >
        {isOpen && <ChatAiIcon />}
        {isOpen && (
          <button onClick={toggle}>
            <IconLayoutSidebarRight />
          </button>
        )}
        {!isOpen && (
          <button onClick={toggle}>
            <ChatAiIcon className="shrink-0 group-hover:hidden transition-all text-blue-500 " />
            <IconLayoutSidebarRight className="hidden group-hover:inline  transition-all" />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2 mt-4">
        {sidebarFeatures.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 px-4 py-2 hover:bg-neutral-800 cursor-pointer transition-colors",
                !isOpen && "justify-center",
              )}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("svg")) return;
                if (feat.hrf) router.push(feat.hrf);
              }}
            >
              <Icon
                className="shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setSidebar(false));
                  router.push(feat.hrf || "/dashboard");
                }}
              />
              {isOpen && (
                <span className="text-sm font-medium">{feat.title}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Chats */}
      {isOpen && <ChatTitleContainer />}

      <div className="h-full flex flex-col justify-end py-4 px-1 ">
        {isOpen && isSettingsModelOpen && (
          <SettingsOptionsModel isSidebarOpen={isOpen} toggleSidebar={toggle} />
        )}
        <div
          onClick={toggleSettings}
          className="hover:bg-neutral-800 px-1 rounded-lg"
        >
          <div className="relative flex justify-between items-center ">
            <div className="flex gap-2 items-center ">
              <div
                className="rounded-full bg-gray-600 w-8 h-8 flex justify-center items-center "
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
              >
                {<IconUser className="size-4" />}
              </div>
              {isOpen && (
                <div>
                  <h4 className="font-medium">{userName}</h4>{" "}
                  <p className="text-foreground/50 text-sm">plan-free</p>
                </div>
              )}
            </div>
            {isOpen && (
              <Link href={"/plans"} onClick={(e) => e.stopPropagation()}>
                <button className="text-[13px] bg-nuetral-800 font-semibold text-foreground border border-neutral-300/80 rounded-2xl px-2 py-1">
                  Upgrade
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatTitleContainer() {
  return (
    <div className="p-4">
      <h1 className="border-b border-neutral-700 mb-2 font-semibold">Chats</h1>
      <p className="py-1 font-medium">Title</p>
    </div>
  );
}
