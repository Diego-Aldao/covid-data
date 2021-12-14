//PRIMER FETCH AL CARGAR LA PAGINA
let primerFetch = document.querySelector(".contenedor").dataset.pais;

fetch(`https://disease.sh/v3/covid-19/countries/${primerFetch}?strict=true`)
  .then((response) => response.json())
  .then((data) => mostrarDatos(data))
  .catch((err) => {
    console.error(err);
  });

//FETCH AL HACER CLICK A ALGUN PAIS
const fetchAlClickear = (code) => {
  fetch(`https://disease.sh/v3/covid-19/countries/${code}?strict=true`)
    .then((response) => response.json())
    .then((data) => mostrarDatos(data));
};

//RELLENAR LOS ELEMENTOS SELECCIONADOS CON LA INFORMACION DE LA API
const mostrarDatos = (datos) => {
  let bandera = document.querySelector(".bandera");
  bandera.src = datos.countryInfo.flag;
  let nombrePais = document.querySelector(".titulo-bandera");
  nombrePais.innerHTML = datos.country;
  let poblacion = document.querySelector(".poblacion");
  poblacion.innerHTML = datos.population.toLocaleString("es-AR");

  let confirmados = document.querySelector(".confirmados");
  confirmados.innerHTML = datos.cases.toLocaleString("es-AR");

  let activos = document.querySelector(".activos");
  activos.innerHTML = datos.active.toLocaleString("es-AR");

  let recuperados = document.querySelector(".recuperados");
  recuperados.innerHTML = datos.recovered.toLocaleString("es-AR");

  let muertes = document.querySelector(".muertes");
  muertes.innerHTML = datos.deaths.toLocaleString("es-AR");

  let criticos = document.querySelector(".criticos");
  criticos.innerHTML = datos.critical.toLocaleString("es-AR");

  let ultimoUpdate = document.querySelector(".ultimo-update");
  ultimoUpdate.innerHTML = buscarFecha(datos);
};

//FORMATEAR FECHA
const buscarFecha = (data) => {
  let fecha = new Date(data.updated);
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
};

//CAMBIAR EL ICONO Y TEXTO DEL BOTON MODO NOCTURNO AL CAMBIAR EL MODO
const cambiarContenidoBtn = () => {
  if (btnModoNocturno.classList.contains("text-white")) {
    btnModoNocturno.innerHTML = `<i class="fas fa-sun mr-3" aria-hidden="true"></i>
    <p class="textos-hovers m-0">modo claro</p>`;
  } else {
    btnModoNocturno.innerHTML = `<i class="fas fa-moon mr-3" aria-hidden="true"></i>
    <p class="textos-hovers m-0">modo oscuro</p>`;
  }
};

//CAMBIAR A MODO OSCURO O CLARO A TRAVES DE UN TOGGLE DE CLASES
const cambiarModo = () => {
  let bg = document.querySelectorAll(".fondo-light-dark");
  let bgSecundario = document.querySelector(".fondo-light-dark-secundario");
  let textos = document.querySelectorAll(".text-light-dark");

  bg.forEach((elemento) => {
    elemento.classList.toggle("bg-oscuro");
    elemento.classList.toggle("bg-white");
  });

  bgSecundario.classList.toggle("bg-oscuro-secundario");
  bgSecundario.classList.toggle("bg-white-secundario");

  textos.forEach((texto) => {
    texto.classList.toggle("text-white");
    texto.classList.toggle("text-dark");
  });
  cambiarContenidoBtn();
};

let btnModoNocturno = document.querySelector(".modo-oscuro");

btnModoNocturno.addEventListener("click", cambiarModo);
