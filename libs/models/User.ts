interface UserStruct {
    user_id?: number;
    fullname?: string;
    email?: string;
    password?: string;
    details?: string;
    created_at?: Date;
    updated_at?: Date;
    is_superuser?: boolean;
}

export const emptyUser: UserStruct = {
    user_id: -1,
    fullname: '',
    email: '',
    password: '',
    details: '',
    created_at: new Date(),
    updated_at: new Date(),
    is_superuser: false
}

export class User {
    user_id: number;
    fullname: string;
    email: string;
    password: string;
    details: string;
    created_at: Date;
    updated_at: Date;
    is_superuser: boolean;

    constructor(user: UserStruct = emptyUser) {
        this.user_id = user.user_id;
        this.fullname = user.fullname;
        this.email = user.email;
        this.password = user.password;
        this.details = user.details;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
        this.is_superuser = user.is_superuser;
    }
}