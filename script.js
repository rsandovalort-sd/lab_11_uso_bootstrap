document.getElementById("agregar").addEventListener('click', function(event){
    event.preventDefault();
    const input = document.getElementById("nueva-tarea");
    const texto = input.value.trim();

    if(texto){
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-1';
        checkbox.addEventListener('change', function() {
        if(checkbox.checked) {
            actualizarConteo();
        }
        });
        const label = document.createElement('label');
        label.textContent = texto;
        label.className = 'flex-grow-1';
        const btnBorrar = document.createElement('button');
        btnBorrar.className = 'btn btn-danger btn-sm ms-2';
        btnBorrar.textContent = 'Eliminar';
        btnBorrar.addEventListener('click', function(){
            li.remove();
            actualizarConteo();
        });
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(btnBorrar);        
        document.getElementById('lista-tarea').appendChild(li);
        input.value = ""; 
        mostrarToast("Tarea agregada exitosamente"); 
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
    document.getElementById("mensajeToast").textContent = mensaje;
    toast.show();
}