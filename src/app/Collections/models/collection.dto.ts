export class CollectionDTO {
    id!: string;
    nombre_coleccion: string;
    tipo_coleccion: string;
    imagen_coleccion: string;

    constructor(nombre_coleccion: string, tipo_coleccion: string, imagen_coleccion: string) {
        this.nombre_coleccion = nombre_coleccion;
        this.tipo_coleccion = tipo_coleccion;
        this.imagen_coleccion = imagen_coleccion;
    }
}