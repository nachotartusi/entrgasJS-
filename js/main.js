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
    if ( nombre.length == 0, edad.length==0, telefono.length==0) {
        errorCampo();
        return false;
    }
    else if( nombre.length>0, edad.length>0, telefono.length>0) {
        pacienteAgregadoAlert();
        let paciente = new Persona(nombre,edad,telefono,tipoConsulta,nroCliente++);
        arrayPersonas.push(paciente);
        sessionStorage.setItem("paciente", JSON.stringify(paciente));
        console.log(paciente);
        guardarPaciente(arrayPersonas);
        listaPacienteDOM (JSON.parse(localStorage.getItem("paciente")));
    }
}

function listaPacienteDOM (arrayLista) {
    let formulario = document.getElementById ("form");
    formulario.reset();

    for (let i=0; i < arrayLista.length; i++) {
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
                    <button id="botonEliminar"  > Eliminar Paciente </button>
                    
                </ul>
            </div>`;
            nuevoPaciente.innerHTML = html;
            nuevoPaciente.className = "card1";
            nuevoDiv.append(nuevoPaciente);
            arrayPersonas[i].impreso=true;
        }
    }
    
    
    
}

function eliminarPaciente(id) {
    localStorage.removeItem("paciente", id);
    console.log("el paciente ha sido eliminado");
}
//sweet alerts
function errorCampo () {
    Swal.fire({
        icon: 'error',
        title: 'Complete todos los campos',
    })
}
function pacienteAgregadoAlert() { 
    Swal.fire({
        icon: 'success',
        title: 'El paciente ha sido registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
}

function pacienteEliminado() {
    Swal.fire({
        title: 'Desea eliminar a este paciente?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Paciente Eliminado!', '', 'success',eliminarPaciente)
        } else if (result.isDenied) {
          Swal.fire('Los cambios no han sido guardados', '', 'info')
        }
      })
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

listaPacienteDOM (JSON.parse(localStorage.getItem("paciente")));
let botonIngresar = document.getElementById ("botonIngresar");
botonIngresar.addEventListener("click", cargarPaciente());

let enter = document.getElementById("select");
enter.onkeydown = () => console.log("keydown");
enter.onkeyup = () => console.log("keyup");
enter.addEventListener("keypress", cargarPaciente);

let input = document.getElementById("select");
input.addEventListener(`input`,() => console.log (input.value));

let botonEliminar = document.getElementById("botonEliminar");
botonEliminar.addEventListener("click", pacienteEliminado);


