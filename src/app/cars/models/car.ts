import { Extras } from "./extras";
import { LocationDTO } from "./location";
import { Make } from "./make";
import { Model } from "./model";
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
    priorityId: number;
    extras: Extras[];
    contactId: number;
    categoryId: number;
    price: number;
    status: number;
    discount: number;
    isSale: boolean;
    fotos: FileList;
    locationId: number;
    location: LocationDTO;
    errorMessage: string;
}

export interface CarRequest {
    id: number;
    description: string;
    plate: string;
    transmision: Transmisions;
    makeId: number;
    modelId: number;
    year: number;
    priorityId: number;
    extras: Extras[];
    contactId: number;
    categoryId: number;
    price: number;
    status: number;
    discount: number;
    isSale: boolean;
    fotos: FileList;
    locationId: number;
    errorMessage: string;
}