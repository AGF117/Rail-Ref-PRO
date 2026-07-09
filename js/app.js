/*
===========================================
 RailRef PRO
 app.js v0.2 Alpha
===========================================
*/

const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

document.addEventListener("DOMContentLoaded", async () => {

    // Cargar la base de datos
    await DB.load();

    // Activar buscador
    searchInput.addEventListener("input", handleSearch);

    // Mensaje inicial
    resultsContainer.innerHTML = `
        <div class="empty">
            Introduce una referencia para comenzar.
        </div>
    `;

});

function handleSearch() {

    const resultados = DB.search(searchInput.value);

    renderResults(resultados);

}

function renderResults(lista) {

    if (lista.length === 0) {

        resultsContainer.innerHTML = `
            <div class="empty">
                No se encontraron resultados.
            </div>
        `;

        return;
    }

    resultsContainer.innerHTML = "";

    lista.forEach(item => {

        const card = document.createElement("div");

        card.className = "result-card";

        card.innerHTML = `
            <h3>${item.referencia}</h3>

            <p>${item.descripcion}</p>

            <small>🏭 ${item.fabricante}</small><br>

            <small>🚂 ${item.compatible.join(", ")}</small><br>

            <small>📄 ${item.lamina}</small>
        `;

        card.addEventListener("click", () => {

            showDetail(item);

        });

        resultsContainer.appendChild(card);

    });

}