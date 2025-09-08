import useAuth from "./useAuth";

export default function useProfile() {
    const { getToken } = useAuth();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const getProfile = async () => {
        const response = await fetch(`${apiUrl}/profile`,{
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });
        const data = await response.json();
        return data;
    }
    const updateProfile = async (data: any) => {
        const response = await fetch(`${apiUrl}/profile`,{
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        });
    }
    return { getProfile, updateProfile };
}