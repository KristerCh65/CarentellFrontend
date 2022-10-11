import { Category } from "./category";
import { Extras } from "./extras";
import { LocationDTO } from "./location";
import { Make } from "./make";
import { Model } from "./model";
import { Photo } from "./photo";
import { Transmisions } from "./transmisions.enum";

export interface Car {
    id: number;
    description: string;
    plate: string;
    transmision: Transmisions;
    makeId: number;
    make: Make;
    modelId: number;
    model: Model;
    year: number;
    color: string;
    engine: string;
    fuel: string;
    kilometers: number;
    direction: string;
    priorityId: number;
    extras: Extras[];
    photos: Photo[];
    contactId: number;
    categoryId: number;
    category: Category;
    price: number;
    status: number;
    discount: number;
    isSale: boolean;
    fotos: FileList;
    locationId: number;
    location: LocationDTO;
    errorMessage: string;
}

export interface CarList {
    id: number;
    description: string;
    plate: string;
    transmision: Transmisions;
    makeId: number;
    make: Make;
    modelId: number;
    model: Model;
    year: number;
    color: string;
    engine: string;
    fuel: string;
    kilometers: number;
    direction: string;
    priorityId: number;
    extras: Extras[];
    contactId: number;
    categoryId: number;
    price: number;
    status: number;
    discount: number;
    isSale: boolean;
    fotos: Photo[];
    locationId: number;
    createdDate: Date;
    errorMessage: string;
}