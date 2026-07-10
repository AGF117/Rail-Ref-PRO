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
            categoria: item.categoria ?? "",
            locomotora: item.locomotora ?? "",
            pagina: item.pagina ?? "",
            lamina: item.lamina ?? "",
            manual: item.manual ?? "",

            raw: item

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

                item.categoria.toLowerCase().includes(text) ||

                item.locomotora.toLowerCase().includes(text)

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
