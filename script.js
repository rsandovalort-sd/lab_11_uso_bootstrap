document.getElementById("agregar").addEventListener('click', function(event){
    event.preventDefault();
    const input = document.getElementById("nueva-tarea");
    const texto = input.value.trim();
    
    if (!texto) {
        alertaFormulario("El campo no puede estar vacío", "danger");
        input.focus();
        return;
    }
    if (texto.length <= 6) {
        alertaFormulario("La tarea debe tener al menos 6 caracteres", "danger");
        input.focus();
        return;
    }
    if (texto.length > 21) {
        alertaFormulario("La tarea debe tener máximo 20 caracteres", "danger");
        input.focus();
        return;
    }
    if(texto){
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-1 checkbox_personalizado';
        checkbox.addEventListener('change', function() {
        if(checkbox.checked) {
            actualizarConteo();
        }
        });
        const label = document.createElement('label');
        label.textContent = texto;
        label.className = 'flex-grow-1';
        const btnBorrar = document.createElement('button');
        btnBorrar.className = 'btn btn-primary btn-sm ms-2';
        btnBorrar.textContent = 'Eliminar';
        btnBorrar.addEventListener('click', function(){
            li.remove();
            actualizarConteo();
        });
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(btnBorrar);        
        document.getElementById('lista-tarea').appendChild(li);
        mostrarToast("Tarea agregada exitosamente") 
        input.value = ""; 
        actualizarConteo();
    }

}) 
function contarTareas(){
    let tareas_pendientes = 0;
    let tareas_realizadas = 0;
    const lista_tareas = document.getElementById("lista-tarea")
    const tareas = Array.from(lista_tareas.getElementsByTagName('li'));
    tareas.forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        if(checkbox.checked){
            tareas_realizadas +=1;
        }else{
            tareas_pendientes +=1;
        }
    });
    return `Las tareas realizadas son ${tareas_realizadas} y las tareas pendientes son ${tareas_pendientes}`
}

function actualizarConteo(){
    const resultado = document.getElementById("conteo");
    resultado.innerHTML = contarTareas();
}

const elemento_toast = document.getElementById("liveToast");
const toast = new bootstrap.Toast(elemento_toast);
function mostrarToast(mensaje){
    document.getElementById("mensaje").textContent = mensaje;
    toast.show();
}

function alertaFormulario(mensaje, tipo ="success"){
    const alerta = document.getElementById("alert-container");
    alerta.innerHTML= `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

function alertaFormulario(mensaje, tipo ="success"){
    const alerta = document.getElementById("alert-container");
    alerta.innerHTML= `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}
