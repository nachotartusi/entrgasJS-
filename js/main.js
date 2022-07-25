class Persona {
    constructor (nombre,edad,telefono,tipoConsulta,nroCliente) {
        this.nombre = nombre.toUpperCase();
        this.edad = edad;
        this.telefono = telefono;
        this.tipoConsulta= tipoConsulta;
        this.nroCliente=nroCliente;
    }
} 

function setPacientes(){
    if (localStorage.getItem("pacientes")!= null){
        pacientes = JSON.parse(localStorage.getItem("pacientes"));   
    }
}

function listaPacienteDOM (arrayLista) {
    let formulario = document.getElementById ("form");
    formulario.reset();
    let html1 = `
    <div id="main2" class="card" style="width: 18rem>
    </div>`;
    document.getElementById("main2").innerHTML = html1; 
    if(arrayLista!=null){
        for (let i=0; i < arrayLista.length; i++){
            let nuevoDiv = document.getElementById("main2");
            let nuevoPaciente = document.createElement ("div");
            let html = `
            <div class="card d-flex flex-row " id="" style="width: 18rem>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre </li>
                    <li class="list-group-item">${arrayLista[i].nombre}</li>
                    <li class="list-group-item">Edad</li>
                    <li class="list-group-item">${arrayLista[i].edad} </li>
                    <li class="list-group-item">Telefono</li>
                    <li class="list-group-item">${arrayLista[i].telefono} </li>
                    <li class="list-group-item"> Precio </li>
                    <li class="list-group-item"> ${arrayLista[i].tipoConsulta} </li>
                    <li class="list-group-item"> Paciente Numero </li>
                    <li class="list-group-item">${arrayLista[i].nroCliente} </li>
                    <button id="botonEliminar" onclick ="pacienteEliminado(${arrayLista[i].nroCliente})"> Eliminar Paciente </button>
                </ul>
            </div>`;
            nuevoPaciente.className = "card1";
            nuevoPaciente.setAttribute("id","esto");
            nuevoPaciente.innerHTML = html;
            nuevoDiv.append(nuevoPaciente);
        }
    }
}

function pacienteEliminado(id) {
    Swal.fire({
        title: 'Desea eliminar a este paciente?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Paciente Eliminado!', '', 'success',eliminarPaciente(id))
        } else if (result.isDenied) {
          Swal.fire('Los cambios no han sido guardados', '', 'info')
        }
      })
}

function eliminarPaciente(id) {
    //document.getElementById("esto").innerHTML = ""; 
    for (var i = 0; i<pacientes.length; i++){
        if(pacientes[i].nroCliente===id){
            pacientes.splice(i,1);
            localStorage.removeItem("pacientes");
            localStorage.setItem("pacientes", JSON.stringify(pacientes));
            listaPacienteDOM (pacientes);
        }
    }
}

function cargarPaciente() {
    let nombre = document.getElementById("nombre").value; 
    let edad = document.getElementById("edad").value;
    let telefono = document.getElementById("tel").value;
    let tipoConsulta = document.getElementById("select").value;
    if( nombre.length>0 && edad.length>0 && telefono.length>0) {
        pacienteAgregadoAlert();
        let paciente = new Persona(nombre,edad,telefono,tipoConsulta,nroCliente++);
        pacientes.push(paciente);
        localStorage.removeItem("pacientes");
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
        listaPacienteDOM (pacientes);
    }
    else{
        errorCampo();
        return false;
    }
}

function pacienteAgregadoAlert() { 
    Swal.fire({
        icon: 'success',
        title: 'El paciente ha sido registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

}

function errorCampo () {
    Swal.fire({
        icon: 'error',
        title: 'Complete todos los campos',
    })
}


nroCliente=0;
const precio = 1700;
let pacientes = [];
setPacientes();
listaPacienteDOM (pacientes);
let botonIngresar = document.getElementById ("botonIngresar");
botonIngresar.addEventListener("click", cargarPaciente);
let enter = document.getElementById("select");
enter.addEventListener("keypress", cargarPaciente);
let input = document.getElementById("select");