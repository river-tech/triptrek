export interface IFood {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string[];
    destination_id: number;
}

export interface IFoodByDes {
    id: number;
    name: string;
    images: string[];
    description: string;
}
