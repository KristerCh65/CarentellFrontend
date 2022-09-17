import { Address } from "./address";
import { SocialMedia } from "./social-media";

export interface Contact{
    id: number;
    birthDate: Date;
    correo: string;
    dni: string;
    name: string;
    lastName: string;
    phone: string;
    photoURL: string;
    address: Address;
    socialMedia: SocialMedia[];
}