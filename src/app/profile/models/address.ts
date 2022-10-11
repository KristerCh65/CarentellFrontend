export interface Address{
    id: number;
    departmentId: number;
    townshipId: number;
    neighborhood: string;
    references: string;
}

export interface Department{
    id: number;
    name: string;
}

export interface Township{
    townshipID: number;
    townCode: number;
    name: string;
    departmentId: number;
}