import { useAppSelector } from "@/redux/hooks";

export default function useSettigsModel() {
  return useAppSelector((state) => state.modles.settingsMenu);
}
