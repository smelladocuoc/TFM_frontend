import { CollectionDTO } from "src/app/Collections/models/collection.dto";

export class ElementDTO {
    elementId!: string;
    nombre: string;
    imagen: string;
    fecha_publicacion: Date;
    comentario!: string;

    constructor(
        nombre: string,
        imagen: string,
        fecha_publicacion: Date,
        comentario: string,
    ) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.fecha_publicacion = fecha_publicacion;
        this.comentario = comentario;
    }
}