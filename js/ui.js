/*
===========================================
RailRef PRO
ui.js
===========================================
*/

const detailPanel = document.getElementById("detailPanel");
const detailContent = document.getElementById("detailContent");
const closeDetail = document.getElementById("closeDetail");

closeDetail.addEventListener("click", closePanel);

function showDetail(item){

    detailContent.innerHTML = `

        <div class="detail-header">

            <h2>${item.referencia ?? "-"}</h2>

            <span class="badge">
                ${item.fabricante ?? "Sin fabricante"}
            </span>

        </div>

        <div class="detail-section">

            <h3>Descripción</h3>

            <p>${item.descripcion ?? "-"}</p>

        </div>

        <div class="detail-grid">

            <div>

                <label>Categoría</label>

                <strong>${item.categoria ?? "-"}</strong>

            </div>

            <div>

                <label>Locomotora</label>

                <strong>${item.locomotora ?? "-"}</strong>

            </div>

            <div>

                <label>Lámina</label>

                <strong>${item.lamina ?? "-"}</strong>

            </div>

            <div>

                <label>Página</label>

                <strong>${item.pagina ?? "-"}</strong>

            </div>

        </div>

        <div class="detail-actions">

            <button id="copyRef">

                📋 Copiar referencia

            </button>

            <button id="favButton">

                ⭐ Favorito

            </button>

            <button id="manualButton">

                📚 Abrir manual

            </button>

        </div>

    `;

    detailPanel.classList.add("open");

    document
        .getElementById("copyRef")
        .addEventListener("click",()=>{

            navigator.clipboard.writeText(item.referencia);

        });

}

function closePanel(){

    detailPanel.classList.remove("open");

}
