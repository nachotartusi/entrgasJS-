class Persona {
    constructor (nombre,edad,telefono,tipoConsulta,nroCliente,mail) {
        this.nombre = nombre.toUpperCase();
        this.edad = edad;
        this.telefono = telefono;
        this.tipoConsulta = tipoConsulta;
        this.nroCliente = nroCliente;
        this.mail = mail;
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
    let html1 = `<div id="main2"></div>`;
    document.getElementById("main2").innerHTML = html1; 
    if(arrayLista!=null){
        for (let i=0; i < arrayLista.length; i++){
            let nuevoDiv = document.getElementById("main2");
            let nuevoPaciente = document.createElement ("div");
            let html = `
            <div class="card d-flex flex-row " id="${arrayLista[i].nombre}" style="width: 18rem>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre: ${arrayLista[i].nombre}</li>
                    <li class="list-group-item">Edad: ${arrayLista[i].edad}</li>
                    <li class="list-group-item">Telefono: ${arrayLista[i].telefono}</li>
                    <li class="list-group-item">Precio: ${arrayLista[i].tipoConsulta} </li>
                    <li class="list-group-item">Paciente Numero: ${arrayLista[i].nroCliente}</li>
                    <li class="list-group-item">Mail: ${arrayLista[i].mail}</li>
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
    let mail = document.getElementById("correo").value;
    let consultaType = document.getElementById("select").value;
    let consulta;
    let emailConsulta;
    switch(consultaType){
        case '1': 
            consulta = precio/2;
            emailConsulta = "Primera Visita";
            break;
        case '2': 
            consulta = precio;
            emailConsulta = "Consulta Unica";
            break;
        case '3': 
            consulta = precio*6;
            emailConsulta = "Promo Mensual"; 
            break;      
    }
    if( nombre.length>0 && edad.length>0 && telefono.length>0) {
        pacienteAgregadoAlert();
        let paciente = new Persona(nombre,edad,telefono,consulta,nroCliente++,mail);
        pacientes.push(paciente);
        localStorage.removeItem("pacientes");
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
        listaPacienteDOM (pacientes);
        let params = {
            user_id: 'EmsKI95M8poLOO417',
            service_id: 'service_xncp93c',
            template_id: 'template_cvxgrhv',
            template_params: {
              'name': nombre,
              'email': mail,
              'consultas': emailConsulta,
            }
        };
        let headers = {
            'Content-type': 'application/json'
        };
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        });    
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
let botonIngresar = document.getElementById ("button");
botonIngresar.addEventListener("click", cargarPaciente);
let enter = document.getElementById("select");
enter.addEventListener("keypress", cargarPaciente);
let input = document.getElementById("select");