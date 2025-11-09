import { useAppSelector } from "@/redux/hooks";

export default function useAuth() {
  return useAppSelector((state) => state.auth);
}
