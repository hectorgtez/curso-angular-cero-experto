interface Direccion {
    calle: string;
    pais: string;
    ciudad: string;
}

interface Superheroe {
    nombre: string;
    edad: number;
    direccion: Direccion;
    mostrarDireccion: () => string;
}

const superheroe: Superheroe = {
    nombre: "Spiderman",
    edad: 30,
    direccion: {
        calle: "Main St",
        pais: "USA",
        ciudad: "NY"
    },
    mostrarDireccion() {
        return this.nombre + ", " + this.direccion.ciudad + ", " + this.direccion.pais;
    }
}

const direccion = superheroe.mostrarDireccion();
console.log(direccion);