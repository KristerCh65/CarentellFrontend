export interface Address{
    addressID: number;
    departmentId: number;
    department?: Department;
    townshipId: number;
    township?: Township;
    neighborhood: string;
    references: string;
}

export interface Department{
    id: number;
    name: string;
}

export interface Township{
    townshipId: number;
    townCode: number;
    name: string;
    departmentId: number;
}