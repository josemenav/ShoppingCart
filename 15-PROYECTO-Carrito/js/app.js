// Variables
const carrito = document.querySelector('#carrito'); 
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const listaCursos = document.querySelector('#lista-cursos'); 
let articulosCarrito = []; 

cargarEventListeners(); 
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso); 
    carrito.addEventListener('click', eliminarCurso); 
    vaciarCarritoBtn.addEventListener('click', () => {
        console.log('vaciando carrito'); 
        articulosCarrito = []; 
        limpiarHTML();  
    }); 
}

function agregarCurso(event){
    event.preventDefault(); 
    if(event.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = event.target.parentElement.parentElement; 
        leerDatosCurso(cursoSeleccionado); 
    }
}

function eliminarCurso(event){
    console.log('eliminando curso'); 
    console.log(event.target.classList); 
    if(event.target.contains('borrar-curso')){
        console.log(event.target); 
        const cursoID = (event.target.getAttribute('data-id')); 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID); 
        carritoHTML(); 
    }
}


function leerDatosCurso(curso){
    console.log(curso); 

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); 

    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++; 
                return curso; //Retorna el objeto actualizado
            }else{
                return curso; // Retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos]; 
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]; 
    }
    console.log(articulosCarrito); 
    carritoHTML();    
}

function carritoHTML(){

    limpiarHTML(); 

    articulosCarrito.forEach( curso => {
        console.log(curso); 
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `; 

        contenedorCarrito.appendChild(row); 
    })
}

function limpiarHTML(){
    //contenedorCarrito.innerHTML = ''; 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild); 
    }
}