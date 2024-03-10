import { AuthUser } from "src/app/auth/models/auth-user";
import { TypeSubscription } from "./type-subscription";

export interface Subscription {
    id: number;
    typeSubscriptionId: number;
    typeSubscription: TypeSubscription;
    userId: number;
    user: AuthUser;
    activationDate: Date;
    terminationDate: Date;
    active: boolean;
    messageError: string;
}