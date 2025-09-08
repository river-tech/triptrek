export interface ITour {
    id: number;
    name: string;
    description: string;
    image: string[];
    destination_id: number;
    guide_name: string;
    price: number;
    start_date: string;
    end_date: string;
    create_by_user_id: number;
}

