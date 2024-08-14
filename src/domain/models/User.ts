export interface User {
    id: string;
    lastName: string;
    firstName: string;
    email: string;
}

export interface UserWithRole extends User {
    role: string;
}