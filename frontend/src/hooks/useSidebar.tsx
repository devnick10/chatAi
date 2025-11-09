import { useAppSelector } from "@/redux/hooks";

export default function useSidebar() {
  return useAppSelector((state) => state.modles.sidbar);
}
