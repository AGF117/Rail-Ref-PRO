/*
===========================================
 RailRef PRO
 app.js v0.2 Alpha
===========================================
*/

let database = [];
let filteredResults = [];

const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

document.addEventListener("DOMContentLoaded", async () => {

    await loadDatabase();

    searchInput.addEventListener("input", handleSearch);

});

async function loadDatabase(){

    try{

        const response = await fetch("data/railref_database_app_v2.json");

        database = await response.json();

        console.log("Base de datos cargada:", database.length);

    }
    catch(error){

        console.error(error);

        resultsContainer.innerHTML=`
            <div class="error">
                No se pudo cargar la base de datos.
            </div>
        `;

    }

}

function handleSearch(){

    const text = searchInput.value
        .trim()
        .toLowerCase();

    if(text===""){

        resultsContainer.innerHTML=`
            <div class="empty">
                Introduce una referencia...
            </div>
        `;

        return;

    }

    filteredResults = database.filter(item=>{

        return (

            (item.referencia || "")
            .toLowerCase()
            .includes(text)

            ||

            (item.descripcion || "")
            .toLowerCase()
            .includes(text)

            ||

            (item.fabricante || "")
            .toLowerCase()
            .includes(text)

        );

    });

    renderResults(filteredResults);

}

function renderResults(list){

    if(list.length===0){

        resultsContainer.innerHTML=`
            <div class="empty">
                No se encontraron resultados.
            </div>
        `;

        return;

    }

    resultsContainer.innerHTML="";

    list.forEach(item=>{

        const card=document.createElement("div");

        card.className="result-card";

        card.innerHTML=`

            <h3>${item.referencia ?? "-"}</h3>

            <p>${item.descripcion ?? ""}</p>

            <small>${item.fabricante ?? ""}</small>

        `;

        card.addEventListener("click",()=>{

            showDetail(item);

        });

        resultsContainer.appendChild(card);

    });

}

function showDetail(item){

}
