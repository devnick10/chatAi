"use client";
import { cn } from "@sglara/cn";
import React from "react";
import { toast } from "sonner";

export default function SearchbarInput() {
  return (
    <input
      className={cn("w-full  outline-none")}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          toast.success("Enter key pressed");
        }
      }}
      placeholder="Ask anything"
      type="text"
    />
  );
}
