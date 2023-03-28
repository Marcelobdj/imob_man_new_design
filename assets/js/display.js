'use strict';

// Helper functions
const formatAsBrazilianReal = (number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number).replace(",00", "");
};

const transactionIdentifyer = (product) => {
    if (product.transaction.selling && !product.transaction.renting) {
        return "A Venda";
    } else if (!product.transaction.selling && product.transaction.renting) {
        return "Para Locação";
    } else if (product.transaction.selling && product.transaction.renting) {
        return "Para Locação ou Venda";
    } else {
        return "Não disponível";
    }
};

const typeIdentifyer = (product) => {
    if (!product.type) {
        console.error("Invalid product type:", product);
        return "Desconhecido";
    }
    return product.type.house ? "Casa" : "Terreno";
};

const displayTypeInfo = (product) => {
    let info;
    if (product.type.house == true) {
        info = `
      <li class="list-group-item">${product.bedrooms} quartos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lamp-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002c-.15.03-.3.056-.45.081a32.731 32.731 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a32.753 32.753 0 0 1-4.645-.425c-.15-.025-.3-.05-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7Z"/><path d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.052.075l-.001.004-.004.01V14l.002.008a.147.147 0 0 0 .016.033.62.62 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.62.62 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411Z"/></svg></li>
      <li class="list-group-item">${product.bathrooms} banheiros <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
      </svg></li>
      <li class="list-group-item">${product.m2} m<sup>2</sup> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/></svg></li>
      `
    } else {
        info = `
      <li class="list-group-item">${product.m2} m<sup>2</sup> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/></svg></li>
      `
    };
    return info;
};

const findProductById = (products, id) => {
    return products.find((product) => product.id.toString() === id);
};

const createQueryString = (product) => {
    const params = new URLSearchParams();
    for (const key in product) {
        if (product.hasOwnProperty(key)) {
            params.append(key, JSON.stringify(product[key]));
        }
    }
    return params.toString();
};

const handleButtonClick = (event, products) => {
    let clickedButtonId = null;
    clickedButtonId = event.target.id;
    const product = findProductById(products, clickedButtonId);
    if (product) {
      const queryString = createQueryString(product);
      window.location.href = `product.html?${queryString}`;
    } else {
      console.error('Product not found:', clickedButtonId);
    }
};

const createProductCard = (product, products) => {
    const card = document.createElement('div');
    card.classList.add('productCard', 'allProducts');
    if (product.featured) {
        card.classList.add('featuredProducts')
    };
    card.innerHTML = `
      <div class="card">
        <img src="${product.img[0]}" class="card-img-top" alt="Foto de ${product.title}">
        <div class="card-body d-block w-100">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.subtitle}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${transactionIdentifyer(product)}</li>
          <li class="list-group-item">${typeIdentifyer(product)}</li>
          <ul class="list-group list-group-horizontal">${displayTypeInfo(product)}</ul>
          <li class="list-group-item">${product.adress}</li>
          <li class="list-group-item">${formatAsBrazilianReal(product.price)}</li>
        </ul>
        <div class="card-body">
          <button id="${product.id}" type="button" class="btn btn-dark view-more">Ver Mais</button>
        </div>
      </div>
    `;
    const button = card.querySelector('.view-more');
    button.addEventListener('click', (event) => handleButtonClick(event, products));
  
    return card;
};

const fetchProducts = async () => {
    const response = await fetch('http://localhost:3001/imob_man/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const displayProducts = (products) => {
    const allProductsList = document.querySelector('.allProductsList');
    products.forEach((product) => {
        const card = createProductCard(product, products);
        allProductsList.appendChild(card);
    });
};

const displayFeatured = (products) => {
    const featuredProductsList = document.querySelector('.featuredProductsList');
    products.forEach((product) => {
        const card = createProductCard(product, products);
        featuredProductsList.appendChild(card);
    });
};


// Slideshow functions
const showPreviousImage = (slides, currentImageIndex) => {
    slides[currentImageIndex].classList.remove("active");
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = slides.length - 1;
    }
    slides[currentImageIndex].classList.add("active");
    return currentImageIndex;
};

const showNextImage = (slides, currentImageIndex) => {
    slides[currentImageIndex].classList.remove("active");
    currentImageIndex++;
    if (currentImageIndex >= slides.length) {
        currentImageIndex = 0;
    }
    slides[currentImageIndex].classList.add("active");
    return currentImageIndex;
};

const initAllSlideshow = (allProductsList) => {
    const slides = allProductsList.querySelectorAll(".allProducts");
    let currentImageIndex = 0;
    slides[currentImageIndex].classList.add("active");

    const allPrevButton = document.querySelector('.prev-btn-all');
    const allNextButton = document.querySelector('.next-btn-all');

    allPrevButton.addEventListener("click", () => {
        currentImageIndex = showPreviousImage(slides, currentImageIndex);
    });
    allNextButton.addEventListener("click", () => {
        currentImageIndex = showNextImage(slides, currentImageIndex);
    });

    setInterval(() => {
        currentImageIndex = showNextImage(slides, currentImageIndex);
    }, 5000);
};

const initFeatSlideshow = (featuredProductsList) => {
    const slides = featuredProductsList.querySelectorAll(".featuredProducts");
    let currentImageIndex = 0;
    slides[currentImageIndex].classList.add("active");

    const featPrevButton = document.querySelector('.prev-btn-feat');
    const featNextButton = document.querySelector('.next-btn-feat');

    featPrevButton.addEventListener("click", () => {
        currentImageIndex = showPreviousImage(slides, currentImageIndex);
    });
    featNextButton.addEventListener("click", () => {
        currentImageIndex = showNextImage(slides, currentImageIndex);
    });

    setInterval(() => {
        currentImageIndex = showNextImage(slides, currentImageIndex);
    }, 5000);
};

const closedDoor = document.querySelector('.bi-door-closed');
const openDoor = document.querySelector('.bi-door-open');


// LOGIN
closedDoor.addEventListener('mouseenter', () => {
  closedDoor.style.display = 'none';
  openDoor.style.display = 'block';
});

openDoor.addEventListener('mouseleave', () => {
  closedDoor.style.display = 'block';
  openDoor.style.display = 'none';
});


// Main function
const displayAllProducts = async () => {
    try {
        const products = await fetchProducts();
        displayProducts(products);
        displayFeatured(products);
        const allProductsList = document.querySelector('.allProductsList');
        const featuredProductsList = document.querySelector('.featuredProductsList');
        initAllSlideshow(allProductsList);
        initFeatSlideshow(featuredProductsList);
    } catch (error) {
        console.error('Error:', error);
    }
};

displayAllProducts();