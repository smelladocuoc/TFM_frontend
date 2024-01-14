export class AuthDTO {
    id: string;
    access_token: string;
    correo: string;
    password: string;

    constructor(
        id: string,
        access_token: string,
        correo: string,
        password: string,
    ) {
        this.id = id;
        this.access_token = access_token;
        this.correo = correo;
        this.password = password;
    }
}