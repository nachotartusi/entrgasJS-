//cass "Persona"
class Persona {
    constructor (nombre,edad,telefono,nroCliente,tipoConsulta) {
        this.nombre = nombre.toUpperCase();
        this.edad = edad;
        this.telefono = telefono;
        this.tipoConsulta= tipoConsulta;
        this.nroCliente=nroCliente;
        this.impreso=false;
    }
} 
//array
const arrayPersonas = [];

//funciones
function cargarPaciente() {
    let nombre = document.getElementById("nombre").value; 
    let edad = document.getElementById("edad").value;
    let telefono = document.getElementById("tel").value;
    let tipoConsulta = document.getElementById("select").value;
    let paciente = new Persona(nombre,edad,telefono,tipoConsulta,nroCliente++);
    sessionStorage.setItem("paciente", JSON.stringify(paciente));
    arrayPersonas.push(paciente);
    console.log(paciente);
    guardarPaciente(arrayPersonas);
    listaPacienteDOM (JSON.parse(localStorage.getItem("paciente")));
}

function listaPacienteDOM (arrayLista) {
    console.log(arrayLista);
    let formulario = document.getElementById ("form");
    formulario.reset();

    for (let i=0; i < arrayLista.length; i++) {
        console.log(arrayLista[i].impreso);
        if(arrayLista[i].impreso == false){
            let nuevoDiv = document.getElementById("main");
            let nuevoPaciente = document.createElement ("html");
            let html = `
            <div class="card d-flex flex-row" style="width: 18rem>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre </li>
                    <li class="list-group-item">${arrayLista[i].nombre}</li>
                    <li class="list-group-item">Edad</li>
                    <li class="list-group-item">${arrayLista[i].edad} </li>
                    <li class="list-group-item">Telefono</li>
                    <li class="list-group-item">${arrayLista[i].telefono} </li>
                    <li class="list-group-item"> Precio </li>
                    <li class="list-group-item"> ${arrayLista[i].nroCliente} </li>
                    <li class="list-group-item"> Paciente Numero </li>
                    <li class="list-group-item">${arrayLista[i].tipoConsulta} </li>
                    <button id="botonEliminar"> Eliminar Paciente </button>
                    
                </ul>
            </div>`;
            nuevoPaciente.innerHTML = html;
            nuevoPaciente.className = "card1";
            nuevoDiv.append(nuevoPaciente);
            arrayPersonas[i].impreso=true;
        }
    }
    
    
    
}


 
// guardar en el local storage 

const pacienteAgregado = (clave, valor) => { localStorage.setItem(clave,valor)};

function guardarPaciente (arrayPersonas) {
    pacienteAgregado("paciente", JSON.stringify(arrayPersonas));
}
// obtener local storage
function obtenerPaciente() {
 return JSON.parse(localStorage.getItem("paciente"));
}

function renderPacientes () {
    let pacientes = obtenerPaciente();
}

renderPacientes();

// variables 
const precio = 1700;
let nroCliente = 1;

// eventos 

let botonIngresar = document.getElementById ("botonIngresar");
botonIngresar.addEventListener("click", cargarPaciente);

let enter = document.getElementById("select");
enter.onkeydown = () => console.log("keydown");
enter.onkeyup = () => console.log("keyup");

let input = document.getElementById("select");
input.addEventListener(`input`,() => console.log (input.value));


