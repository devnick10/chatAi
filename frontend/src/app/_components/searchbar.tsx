import { IconSoundWave } from "@/components/ui/icons";
import { IconMicrophone, IconPlus } from "@tabler/icons-react";
import SearchbarInput from "./searchbarInput";

export default function Searchbar() {
  return (
    <div className="w-full bg-neutral-700 shadow-sm shadow-neutral-900 rounded-3xl flex items-center justify-between py-2 px-3">
      <button className="p-2 hover:bg-neutral-600 mr-2 rounded-full">
        <IconPlus />
      </button>
      <SearchbarInput />
      <div className="flex gap-2">
        <button className="p-2 hover:bg-neutral-600 rounded-full">
          <IconMicrophone />
        </button>
        <button className="p-2 w-10 h-10  flex items-center justify-center bg-neutral-600 rounded-full">
          <IconSoundWave size="4" classNames="text-white" />
        </button>
      </div>
    </div>
  );
}
