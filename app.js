const recetasUl = document.querySelector('.recetas');
const btnTodas = document.querySelector('#btnTodas');
const btnRapidas = document.querySelector('#btnRapidas');
const btnLentas = document.querySelector('#btnLentas');

// filtra las recetas por categorías
const filtrarRecetas = (categoria) => {

    const rapidas = Array.from(document.querySelectorAll('.receta--rapida'));
    const lentas = Array.from(document.querySelectorAll('.receta--lenta'));

    switch(categoria) {
        case "btnRapidas": {
            // recetas
            rapidas.forEach(rapida => rapida.classList.add('mostrada'));
            lentas.forEach(lenta => lenta.classList.remove('mostrada'));

            // botones
            btnTodas.classList.remove('selected');
            btnLentas.classList.remove('selected');
            btnRapidas.classList.add('selected');
        }; break;
        case "btnLentas": {
            // recetas
            rapidas.forEach(rapida => rapida.classList.remove('mostrada'));
            lentas.forEach(lenta => lenta.classList.add('mostrada'));

            // botones
            btnTodas.classList.remove('selected');
            btnLentas.classList.add('selected');
            btnRapidas.classList.remove('selected');
        }; break;
        default: {
            // recetas
            rapidas.forEach(rapida => rapida.classList.add('mostrada'));
            lentas.forEach(lenta => lenta.classList.add('mostrada'));

            // botones
            btnTodas.classList.add('selected');
            btnLentas.classList.remove('selected');
            btnRapidas.classList.remove('selected');
        }; break;
    }
};

// muestra la lista de recetas
const mostrarRecetas = async () => {
    // archivo json --> array en variable
    const listaRecetas = await fetch("./recetas.json").then(response => response.json()).then(data => data);

    listaRecetas.forEach(receta => {

        // toda la info sobre la receta
        const categoria = receta.category.name;
        const nombre = receta.name;
        const cantidadIngredientes = receta.ingredients.length;
        const tiempo = receta.time;
        const imagen = receta.url;
        const precio = receta.cartlines
            .map(producto => parseFloat(producto.price.replace(",",".")))
            .reduce((precio, total) => total += precio).toFixed(2);

        // creación de elemento HTML li ('.receta')
        const recetaCoste = document.createElement('div'); /* ('.receta__coste') */
        recetaCoste.classList.add('receta__coste');

        const recetaTiempo = document.createElement('p');
        recetaTiempo.appendChild(document.createTextNode(tiempo));
        recetaTiempo.classList.add('receta__tiempo');

        const recetaPrecio = document.createElement('p');
        recetaPrecio.appendChild(document.createTextNode(precio + " €"));
        recetaPrecio.classList.add('receta__precio');

        recetaCoste.appendChild(recetaTiempo);
        recetaCoste.appendChild(recetaPrecio);

        const recetaInfo = document.createElement('section'); /* ('.receta__info') */
        recetaInfo.classList.add('receta__info');

        const recetaNombre = document.createElement('h2');
        recetaNombre.appendChild(document.createTextNode(nombre));
        recetaNombre.classList.add('receta__nombre');

        const recetaIngredientes = document.createElement('p');
        recetaIngredientes.appendChild(document.createTextNode("con " + cantidadIngredientes + " ingredientes"));
        recetaIngredientes.classList.add('receta__ingredientes');

        recetaInfo.appendChild(recetaNombre);
        recetaInfo.appendChild(recetaIngredientes);
        recetaInfo.appendChild(recetaCoste);

        const recetaLi = document.createElement('li'); /* ('.receta') */
        recetaLi.style.backgroundImage = `url(${imagen})`;
        recetaLi.classList = 'receta mostrada';

        if (categoria === "Cocina rápida") {
            recetaLi.classList.add('receta--rapida');
        } else {
            recetaLi.classList.add('receta--lenta');
        }

        const recetaCategoria = document.createElement('span');
        recetaCategoria.appendChild(document.createTextNode(categoria));
        recetaCategoria.classList.add('receta__categoria');

        recetaLi.appendChild(recetaCategoria);
        recetaLi.appendChild(recetaInfo);

        recetasUl.appendChild(recetaLi);

    })

    // event listeners
    btnTodas.addEventListener('click', () => filtrarRecetas(btnTodas.id));
    btnRapidas.addEventListener('click', () => filtrarRecetas(btnRapidas.id));
    btnLentas.addEventListener('click', () => filtrarRecetas(btnLentas.id));
}

mostrarRecetas();
/*
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './recetas.json', true); // Replace 'appDataServices' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            console.log(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 loadJSON();*/