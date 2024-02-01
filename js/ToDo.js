//contador de id, es una variable global
let idCounter = 0;
//seleccionamos el input type = "text"
const input = document.querySelector('input[type="text"]')
//capturamos el evento
userInput.addEventListener('submit', (event) => {
    event.preventDefault();//para que no se nos borre el mensaje de consola
    console.log('el usuario ha escrito una tarea');
    addTask(); //llamamos a la tarea, suple a la función
});

/*con la función addtask() insertamos la función flecha. usamos ${} para añadir valores dentro de un string*/
let addTask = () => {
    idCounter++;
    let newvalue = input.value;
    if (input.value != '') {
        console.log('evento desde función flecha addTaask');//log
        //list.innerHTML += '<h2>Nueva tarea</h2>';---->¡prueba!
        //seleccionamos y le añadimos contenido al div con id=list:
        list.innerHTML += `
    <div class="task-container" id='${idCounter}'> 
        <label>
            <input type="checkbox">
            ${newvalue}
        </label>
        <img src="./img/cubo-de-basura.png" class="close-btn">
    </div> `
        //dejamos el input sin contenido:
        input.value = '';
        actualizarStats();
    }

};
/*Hay que escuchar al evento para añadir una tarea y  "escuchar" la acción check. Cuando imprimimos el evento podemos ver 
  la acción "check".
  Dentro del div list nos devuelve tres eventos:
  1.click en el div
  2.click en input checkbox
  3.click en la imagen del trash.*/
list.addEventListener('click', (event) => {
    // console.log('Se ha hecho click en la lista');
    // console.log(event);
    // console.log(event.srcElement.nodeName);
    if (event.srcElement.nodeName == 'INPUT') {
        actualizarStats();
    } else if (event.srcElement.nodeName == 'IMG') {
        // console.log('borramos una tarea');
        //console.log(event);
        //console.log(event.srcElement.parentNode.id);
        deleteTarea(event.srcElement.parentNode.id);
    }
});
//para borrar una tarea necesitamos saber el id del elemento 
//Función que actualiza la estadística:
let actualizarStats = () => {
    
    let elementList = list.querySelectorAll('div');
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked');//m mostrarará todos los elementos input checkbox seleccionados(checked)
    let tareasPendientes = elementList.length - checkbox.length;
    stats.innerHTML = `<p>Tareas pendientes: ${tareasPendientes} Tareas completadas: ${checkbox.length}<p>`
};

//Función para borrar las tareas:
let deleteTarea = (id) => {
    let tareaBorrada = document.getElementById(id);
    list.removeChild(tareaBorrada);
    actualizarStats();
};