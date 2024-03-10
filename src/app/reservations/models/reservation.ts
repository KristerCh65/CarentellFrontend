export interface Reservation {
    id: number;
    userId: number;
    visitDate: Date;
    carId: number;
    comments: string;
    errorMessage: string;
    
}