export class UserDTO {
    id?: string;
    access_token?: string;
    usuario: string;
    correo: string;
    password: string;
    password_confirmation: string;

    constructor(
        usuario: string,
        correo: string,
        password: string,
        password_confirmation: string
    ) {
        this.usuario = usuario;
        this.correo = correo;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
}