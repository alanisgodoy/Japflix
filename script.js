// Variable para almacenar los datos de las películas
let peliculas = [];

// Función que se ejecuta cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    // Fetch para obtener los datos de la API
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            // Guardar los datos en la variable "peliculas"
            peliculas = data;
            console.log('Películas cargadas:', peliculas);
        })
        .catch(error => console.error('Error al cargar las películas:', error));
});

// Función para mostrar estrellas según la calificación
function mostrarEstrellas(vote_average) {
    const stars = Math.round(vote_average / 2);
    let estrellas = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= stars) {
            estrellas += '<i class="fa fa-star"></i>'; 
        } else {
            estrellas += '<i class="fa fa-star-o"></i>'; 
        }
    }
    return estrellas;
}

// Función para mostrar detalles de la película seleccionada
function mostrarDetalles(pelicula) {
    document.getElementById('detalles-titulo').textContent = pelicula.title;
    document.getElementById('detalles-overview').textContent = pelicula.overview;

    const nombresGeneros = pelicula.genres.map(genre => genre.name).join(', ');
    document.getElementById('detalles-genres').textContent = nombresGeneros || 'No hay géneros disponibles';

    // Detalles adicionales
    document.getElementById('detalles-anio').textContent = new Date(pelicula.release_date).getFullYear();
    document.getElementById('detalles-duracion').textContent = pelicula.runtime || 'No disponible';
    document.getElementById('detalles-presupuesto').textContent = pelicula.budget ? pelicula.budget.toLocaleString() : 'No disponible';
    document.getElementById('detalles-ganancias').textContent = pelicula.revenue ? pelicula.revenue.toLocaleString() : 'No disponible';

    // Mostrar la sección de detalles
    document.getElementById('detalles').style.display = 'block';
}

// Función para filtrar y mostrar las películas
document.getElementById('btnBuscar').addEventListener('click', () => {
    const inputBuscar = document.getElementById('inputBuscar').value.toLowerCase();
    const lista = document.getElementById('lista');

    lista.innerHTML = ''; // Limpiar la lista de resultados anteriores

    const resultados = peliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(inputBuscar)
    );

    if (resultados.length > 0) {
        resultados.forEach(pelicula => {
            const item = document.createElement('li');
            item.classList.add('list-group-item', 'bg-dark', 'text-white', 'd-flex', 'justify-content-between', 'align-items-center');

            item.innerHTML = `
                <div>
                    <strong class="cursor-pointer">${pelicula.title}</strong><br>
                    <span class="cursor-pointer">${pelicula.tagline}</span>
                </div>
                <span class="cursor-pointer">${mostrarEstrellas(pelicula.vote_average)}</span>
            `;

            item.querySelector('strong').addEventListener('click', function() {
                mostrarDetalles(pelicula);
            });

            lista.appendChild(item);
        });
    } else {
        const item = document.createElement('li');
        item.classList.add('list-group-item', 'bg-dark', 'text-white');
        item.textContent = 'No se encontraron películas.';
        lista.appendChild(item);
    }
});
