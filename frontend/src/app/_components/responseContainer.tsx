'use client'
import { IconSoundWave } from "@/components/ui/icons";
import useToken from "@/hooks/useToken";
import { config } from "@/lib/config";
import { cn } from "@sglara/cn";
import { IconMicrophone, IconPlus } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default function ResponseContainer() {
  const [search, setSearch] = useState<string>("2+2 how much")
  const [chunks, setChunks] = useState<string>("")
  const BACKEND_URL = config.NEXT_PUBLIC_BACKEND_URL;
  const token = useToken().getToken();

  const makeRequest = async (message: string) => {
    setChunks(""); 

    const response = await fetch(`${BACKEND_URL}/ai/chat`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        model: "openai/gpt-4o",
      }),
    });

    if (!response.body) {
      toast.error("No response from server.");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Split into lines (backend usually sends: data: {...})
        const lines = buffer.split("\n");

        // Keep the last partial line in buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed || trimmed === "data: [DONE]") continue;

          if (trimmed.startsWith("data:")) {
            const jsonStr = trimmed.replace("data:", "").trim();

            try {
              const parsed = JSON.parse(jsonStr);
              const text = parsed.text || parsed.delta || "";

              setChunks((prev) => prev + text);
            } catch (err) {
              console.log("Failed to parse chunk JSON:", trimmed);
            }
          }
        }
      }
    } catch (err) {
      console.error("Stream error:", err);
    } finally {
      reader.releaseLock();
    }
  };



  return (
    <>
      <div className="w-full bg-neutral-700 shadow-sm shadow-neutral-900 rounded-3xl flex items-center justify-between py-2 px-3">
        <button className="p-2 hover:bg-neutral-600 mr-2 rounded-full">
          <IconPlus />
        </button>
        <input
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className={cn("w-full  outline-none")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              makeRequest(search)
            }
          }}
          placeholder="Ask anything"
          type="text"
        />

        <div className="flex gap-2">
          <button className="p-2 hover:bg-neutral-600 rounded-full">
            <IconMicrophone />
          </button>
          <button className="p-2 w-10 h-10  flex items-center justify-center bg-neutral-600 rounded-full">
            <IconSoundWave size="4" classNames="text-white" />
          </button>
        </div>
      </div>
      <div>
        {chunks}
      </div>
    </>
  );
}

