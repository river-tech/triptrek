import { useToast } from "@/app/Toast/ToastContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function useAuth() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { showError, showSuccess } = useToast();
    const router = useRouter();
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            if (response.ok && data.token) {
                Cookies.set("token", data.token, { expires: 7 }); // lưu token vào cookies 7 ngày
                router.push("/");
                showSuccess("Đăng nhập thành công");
            }
            else{
                showError(data?.message);
                return null;
            }

    
            return data;
        } catch (error) {
            showError("Đăng nhập thất bại");
        }
       
    };

    const register = async (email: string,username: string, password: string) => {
        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password }),
            });
            const data = await response.json();
    
            if (response.ok) {
                showSuccess("Đăng ký thành công");
                router.push("/authen/signIn");
            }
            else{
                showError(data?.message);
                return null;
            }
            return data;
        } catch (error) {
            showError("Đăng ký thất bại");
        }
       
    };

    const getToken = () => {
        if (typeof window === "undefined") return null; // đảm bảo chỉ chạy ở client
        return Cookies.get("token") || null;
      };

    const handleLogout = () => {
        showSuccess("Đăng xuất thành công");
        Cookies.remove("token");
        router.push("/");
    }

    return { login, register, getToken, handleLogout };
}