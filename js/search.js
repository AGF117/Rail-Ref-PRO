/*
=========================================
 RailRef PRO
 search.js
=========================================
*/

class SearchEngine {

    constructor(database) {
        this.database = database;
    }

    search(text) {

        text = text.trim().toLowerCase();

        if (!text) return [];

        const words = text.split(/\s+/);

        const results = this.database.items
            .map(item => {

                let score = 0;

                words.forEach(word => {

                    // Referencia (máxima prioridad)
                    if (item.referencia.toLowerCase() === word)
                        score += 100;

                    if (item.referencia.toLowerCase().includes(word))
                        score += 60;

                    // Descripción
                    if (item.descripcion.toLowerCase().includes(word))
                        score += 30;

                    // Fabricante
                    if (item.fabricante.toLowerCase().includes(word))
                        score += 20;

                    // Compatibilidad
                    if (item.compatible.join(" ").toLowerCase().includes(word))
                        score += 15;

                    // Conjunto
                    if (item.conjunto.toLowerCase().includes(word))
                        score += 10;

                });

                return {
                    item,
                    score
                };

            })
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(r => r.item);

        return results;

    }

}

const Search = new SearchEngine(DB);