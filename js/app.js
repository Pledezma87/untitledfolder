 const shopContent = document.getElementById("shopContent");
 const verCarrito = document.getElementById("verCarrito");
 const modalContainer = document.getElementById("modal-container");
 const cantidadCarrito = document.getElementById("cantidadCarrito");
 const navbarToggle = document.querySelector('.navbar-toggle');
 const navbarMenu = document.querySelector('.navbar-menu');
 const navbarSearch = document.querySelector('.navbar-search input');
 const navbarItems = document.querySelectorAll('.navbar-menu ul li');

 navbarSearch.addEventListener('input', () => {
  const searchTerm = navbarSearch.value.toLowerCase();
  
  navbarItems.forEach(item => {
    const product = item.textContent.toLowerCase();

    if (product.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});
 
 navbarToggle.addEventListener('click', () => {
   navbarMenu.classList.toggle('show');
 });

//  fetch('/js/carrito.json')
//   .then(response => response.json())
//   .then(data => {
//     const searchTerm = navbarSearch.value.toLowerCase();

//     const filteredProducts = data.products.filter(product => {
//       return product.nombre.toLowerCase().includes(searchTerm);
//     });

//     if (filteredProducts.length > 0) {
//       // Si se encontraron productos, mostrar solo el primero en la pantalla
//       const product = filteredProducts[0];

//       // Aquí puedes mostrar el producto en la pantalla, por ejemplo:
//       const productElement = document.createElement('div');
//       productElement.textContent = product.name;
//       // Agregar el elemento a un contenedor en el HTML
//     } else {
//       // Si no se encontraron productos, mostrar un mensaje al usuario
//       // o simplemente no hacer nada
//     }
//   })
//   .catch(error => console.error(error));

let ncarrito =[];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProduct = async () => {
  const response = await fetch("carrito.json"); 
  const productos= await response.json();
  console.log(carrito);

  productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
           <img src="${product.img}">
           <h3>${product.nombre}</h3>
           <p class="price">${product.precio}$</p> 
           `;
  
    shopContent.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
  
    content.append(comprar);
  
    comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
   
    if (repeat) {
      carrito.map((prod) => {
        if(prod.id === product.id) {
           prod.cantidad++;
        }
      });
    } else { 
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio, 
        cantidad: product.cantidad,
      });
      carritoCounter();
      saveLocal();
    }
  
    savelocal();
    pintarCarrito();
    });
  });


};
getProduct();
carritoCounter();


const savelocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

verCarrito.addEventListener("click", () => {
  modalContainer.innerHTML = "";  
  modalContainer.style.display ="flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header"
  modalHeader.innerHTML = ` 
    <h1 class= "modal-header-title">Carrito.</h1>
  `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";
  pintarCarrito();  
  modalbutton.addEventListener("click", () => {
    modalContainer.style.display ="none";

  });
  
  modalHeader.append(modalbutton);


});

//set item
const saveLocal = () => {
  localStorage.setItem("ncarrito", JSON.stringify(carrito));
};

//get item

   