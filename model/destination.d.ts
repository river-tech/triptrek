export interface IDestination {
    id: number;
    name: string;
    description: string;
    image: string[];
}

export interface IFamousDestination {
   id: number;
   name: string;
   description: string;
   imageURL: string;
}

export interface IDestinationDetail {
    id: number;
    name: string;
    description: string;
    imageURL: string;
    galleryURL: string[];
}

