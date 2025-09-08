export default function useData() {
    const getPopularDestinations = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/destinations/popular`);
        const data = await response.json();
        return data;
    }

    const getPopularTours = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/tours/popular`);
        const data = await response.json();
        return data;
    }

    const getAllDestinations = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/destinations`);
        const data = await response.json();
        return data;
    }
    
    const getAllTours = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/tours/all`);
        const data = await response.json();
        return data;
    }
    
    return {
        getPopularDestinations,
        getPopularTours
    };
}