import { Subscription } from "src/app/subscriptions/models/subscription";

export interface LoginResponse{
    id: number;
    message: string;
    token: string;
    userName: string;
    subscription: Subscription;
}