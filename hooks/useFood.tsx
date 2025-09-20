import { useToast } from "@/app/Toast/ToastContext";
import useAuth from "./useAuth";

export default function useFood() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { showError, showSuccess } = useToast();
  const { getToken } = useAuth();
 
  
  return {};
}
