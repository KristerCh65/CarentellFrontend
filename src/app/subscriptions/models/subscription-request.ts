export interface SubscriptionRequest {
    id: number;
    typeSubscriptionId: number;
    userId: number;
    activationDate: Date;
    terminationDate: Date;
    active: boolean;
}