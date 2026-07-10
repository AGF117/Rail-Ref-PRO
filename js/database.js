/*
=========================================
 RailRef PRO
 database.js
=========================================
*/

class RailDatabase {

    constructor() {
        this.items = [];
        this.loaded = false;
    }

    async load() {

        try {

            const response = await fetch("Data/railref_database_app_v2.json");

            if (!response.ok) {
                throw new Error("No se pudo cargar la base de datos");
            }

            this.items = await response.json();

            this.normalize();

            this.loaded = true;

            console.log(`RailRef: ${this.items.length} referencias cargadas`);

            return this.items;

        } catch (error) {

            console.error(error);

            return [];

        }

    }

   normalize() {

    this.items = this.items.map(item => ({

        referencia: item.referencia ?? "",
        descripcion: item.descripcion ?? "",
        fabricante: item.fabricante ?? "",

        cantidad: item.cantidad_instalada ?? 0,

        lamina: item.lamina ?? "",

        conjunto: item.conjunto ?? "",

        pagina: item.pagina ?? "",

        compatible: item.compatible_con ?? [],

        foto: item.foto ?? "",

        plano: item.plano_imagen ?? "",

        notas: item.notas ?? ""

    }));

   
     
    }

    search(text) {

        text = text.toLowerCase().trim();

        if (text === "") return [];

        return this.items.filter(item => {

            return (

                item.referencia.toLowerCase().includes(text) ||

                item.descripcion.toLowerCase().includes(text) ||

                item.fabricante.toLowerCase().includes(text) ||

                item.conjunto.toLowerCase().includes(text) ||
              
                item.compatible.join(" ")

             

            );

        });

    }

    getReference(reference) {

        return this.items.find(item =>
            item.referencia === reference
        );

    }

}

const DB = new RailDatabase();
