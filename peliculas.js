//variables
const peliculas = []
let carrito = []


const contenedorPeliculas = document.getElementById('contenedor-peliculas')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const vaciarCarrito = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const botonCarrito = document.getElementById('boton-carrito')
//const botonMostrarCarrito = document.getElementById('carritoMostrar')


//cargar carrito
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
  }
  actualizarCarrito()
})

//constructor peliculas
class Pelicula {
  constructor(id, nombre, con, año, img, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.año = año;
    this.con = con;
    this.img = img;
    this.precio = precio;
    this.cantidad = cantidad;
  }

}

//FUNCIONES
function cargarPeliculasAlArray() {

  peliculas.push(new Pelicula(2, "Suspicion", "Joan Fontaine", 1940, 'img/suspicion.jpg', 900, 1))
  peliculas.push(new Pelicula(3, "Cat People", "Simone Simon", 1942, 'img/catpeople.jpg', 750, 1))
  peliculas.push(new Pelicula(4, "Jane Eyre", "Orson Welles", 1943, 'img/janeeyre.jpg', 550, 1))
  peliculas.push(new Pelicula(5, "The Suspect", "Charles Laugthon", 1944, 'img/thesuspect.jpg', 580, 1))
  peliculas.push(new Pelicula(6, "Never Fear", "Ida Lupino", 1950, 'img/neverfear.jpg', 490, 1))
  peliculas.push(new Pelicula(7, "Leave To Heaven", "Gene Tierney", 1945, 'img/leaveher.jpg', 790, 1))
  peliculas.push(new Pelicula(8, "Night and City", "Richard Widmarck", 1950, 'img/nightandthecity.jpg', 690, 1))
  peliculas.push(new Pelicula(9, "Dear Murderer", "Greta Gynt", 1947, 'img/dearmurderer.jpg', 580, 1))
  peliculas.push(new Pelicula(10, "Johhny Apollo", "Tyrone Power", 1940, 'img/johnyapollo.jpg', 870, 1))
  peliculas.push(new Pelicula(11, "They Made Me a Criminal", "John Garfield", 1939, 'img/theymademeacriminal.jpg', 630, 1))
  peliculas.push(new Pelicula(12, "Woman on the Run", "Ann Sheridan", 1950, 'img/womanontherun.jpg', 790, 1))
  peliculas.push(new Pelicula(13, "Murder in the Clouds", "Lyle Talbot", 1934, 'img/murderintheclouds.jpg', 590, 1))
  peliculas.push(new Pelicula(14, "Midnight Mary", "Loretta Young", 1933, 'img/midnightmary.jpg', 590, 1))
}


const traerDatos = async () => {

  try {
    const response = await fetch('peliculas.json');
    const peliculas = await response.json();
    peliculas.forEach((peli => {
      let peliCard = document.createElement('div');
      let { id, nombre, con, año, img, precio, cantidad } = peli
      peliCard.className = ('card')
      peliCard.innerHTML = `
      <h3>${nombre} </br>(${año})</h3>
    <img id="img" src="${img}" class="card-img-top"></img>
    </br>
    <p># ${con}</br>
    Precio: $${precio}</p>
    <br/><button id="agregar${id}" class="boton-agregar">Agregar</button>`

      contenedorPeliculas.append(peliCard);
      //EL boton carrito
      const boton = document.getElementById(`agregar${id}`)
      boton.addEventListener('click', () => {
        agregarAlArrayCarrito(id)

      });
    }catch (error) {
     console.log(error);
    } 
  };
  

    //ejecuciones de funciones
    cargarPeliculasAlArray()
    traerDatos();
    //imprimirPelisEnTHML()

  //funciones
  /*const imprimirPelisEnTHML = () => {
  
    peliculas.forEach((peli => {
      let peliCard = document.createElement('div');
      let { id, nombre, con, año, img, precio, cantidad } = peli
      peliCard.className = ('card')
      peliCard.innerHTML = `
      <h3>${nombre} </br>(${año})</h3>
  <img id="img" src="${img}" class="card-img-top"></img>
  </br>
  <p># ${con}</br>
  Precio: $${precio}</p>
  <br/><button id="agregar${id}" class="boton-agregar">Agregar</button>`
  
      contenedorPeliculas.append(peliCard)
  
      //EL boton carrito
      const boton = document.getElementById(`agregar${id}`)
      boton.addEventListener('click', () => {
        agregarAlArrayCarrito(id)
  
      })
    }))
  
  }*/

  /*fetch("peliculas.json")
    .then(response => response.json())
    .then(peliculas => {
      peliculas.forEach(peli => {
        let peliCard = document.createElement('div');
        let { id, nombre, con, año, img, precio, cantidad } = peli
        peliCard.className = ('card')
        peliCard.innerHTML = `
        <h3>${nombre} </br>(${año})</h3>
      <img id="img" src="${img}" class="card-img-top"></img>
      </br>
      <p># ${con}</br>
      Precio: $${precio}</p>
      <br/><button id="agregar${id}" class="boton-agregar">Agregar</button>`
  
        contenedorPeliculas.append(peliCard);
  
        //EL boton carrito
        const boton = document.getElementById(`agregar${id}`)
   boton.addEventListener('click', () => {
    agregarAlArrayCarrito(id) }) 
  
      });
    })
  .catch (error => console.log(error));*/

  const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""

    carrito.forEach((peli) => {
      let { id, nombre, con, año, img, precio, cantidad } = peli
      const div = document.createElement('div')
      div.className = ('productoEnCarrito')
      div.innerHTML = `
    <h5 class="card-title pt-2 text-center text-primary">${nombre}</h5></br>
    <img id="img" src="${img}" class="card-img-top"></img>
    <p>Precio: $${precio} Cantidad: <span id="cantidad">${cantidad}</span></p>
    <button onclick = 'eliminarDelCarrito(${id})' id="botonEliminar">Eliminar</button>
    `

      contenedorCarrito.append(div)

      localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contadorCarrito.innerHTML = carrito.length
    precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)
  }

  //vaciar Carrito
  vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
  })

  const agregarAlArrayCarrito = (peliId) => {
    const existe = carrito.find(peli => peli.id === peliId)//antes carrito.some
    const item = peliculas.find((peli) => peli.id === peliId)//antes nombre item y peliculas.find
    existe ?
      existe.cantidad++
      /*actualizarCarrito()
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya has agregado esta película!',
            footer: 'Puedes verla las veces que quieras'
          })*/
      :
      carrito.push({ ...item })//item en vez de existe//spreadOperator {...item, cantidad++}una propied mas

    console.log(carrito)
    localStorage.setItem('peli', JSON.stringify(carrito))

    actualizarCarrito()
  }


  const eliminarDelCarrito = (peliId) => {
    const item = carrito.find((peli) => peli.id === peliId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
  }






  /*if (precioTotal === 0) {
    vaciarCarrito.style.display = "none"
  }*/


