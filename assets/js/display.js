'use strict'

// STAND-ALONE FUNCTIONS
const clearSearch = () => {
  const searchResultsDiv = document.querySelector('#searchResults');
  searchResultsDiv.innerHTML = '';
};

const openWhatsApp = () => {
  window.open('https://api.whatsapp.com/send?phone=5531996545514', '_blank');
};

const transactionIdentifyer = (ProductTransaction) => {
  if (ProductTransaction.selling && !ProductTransaction.renting) {
    return "A Venda";
  } else if (!ProductTransaction.selling && ProductTransaction.renting) {
    return "Para Locação";
  } else if (ProductTransaction.selling && ProductTransaction.renting) {
    return "Para Locação ou Venda";
  } else {
    return "Não disponível";
  }
};

const typeIdentifyer = (productType) => {
  return productType.house ? "Casa" : "Terreno";
};

const formatAsBrazilianReal = (number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number).replace(",00", "");
};


//DISPLAY ALL-PRODUCTS FUNCTIONS
const displayAllProducts = async () => {
  const allProductsList = document.querySelector('.allProductsList');

  try {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    };
    const data = await response.json();

    const cardConstructor = () => {

      const productList = data;

      productList.forEach((product) => {
        const cards = document.createElement('div');
        cards.classList.add('productCard');
        cards.classList.add('allProducts');
        cards.innerHTML = `
        <div class="card">
        <img src="${product.img[0]}" class="card-img-top" alt="Foto de ${product.title}">
        <div class="card-body d-block w-100">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.subtitle}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${transactionIdentifyer(product.transaction)}</li>
          <li class="list-group-item">${typeIdentifyer(product.type)}</li>
          <li class="list-group-item">${product.adress}</li>
          <li class="list-group-item">${formatAsBrazilianReal(product.price)}</li>
        </ul>
        <div class="card-body">
          <button id="${product.id}" type="button" class="btn btn-dark view-more">Ver Mais</button>
        </div>
      </div>
        `;
        allProductsList.appendChild(cards);
      });

    };

    cardConstructor();

        // SLIDESHOW

        const allProductsSlideshow = () => {

          const allProductsSlideshow = document.querySelector(".allProductsList");
          const slides = allProductsSlideshow.querySelectorAll(".allProducts");
    
          let currentImageIndex = 0;
    
          slides[currentImageIndex].classList.add("active");
    
          const allPrevButton = document.querySelector('.prev-btn-all');
          const allNextButton = document.querySelector('.next-btn-all');
    
          function showPreviousImage() {
            // Remove the active class from the current image
            slides[currentImageIndex].classList.remove("active");
          
            // Decrement the image index
            currentImageIndex--;
          
            // If the index is less than 0, wrap around to the last image
            if (currentImageIndex < 0) {
              currentImageIndex = slides.length - 1;
            }
          
            // Add the active class to the new image
            slides[currentImageIndex].classList.add("active");
          };
    
          function showNextImage() {
            // Remove the active class from the current image
            slides[currentImageIndex].classList.remove("active");
          
            // Increment the image index
            currentImageIndex++;
          
            // If the index is greater than or equal to the number of images, wrap around to the first image
            if (currentImageIndex >= slides.length) {
              currentImageIndex = 0;
            }
          
            // Add the active class to the new image
            slides[currentImageIndex].classList.add("active");
            
          };
    
          allPrevButton.addEventListener("click", showPreviousImage);
          allNextButton.addEventListener("click", showNextImage);
    
          setInterval(showNextImage, 5000);
    
        };
    
        allProductsSlideshow();

        

    // DISPLAY MORE FUNCTION
    const viewMoreButtons = document.querySelectorAll('.view-more');
    viewMoreButtons.forEach((button) => {

      button.addEventListener('click', function () {
        let clickedButtonId = this.id;
        let selectedProduct = data.filter(product => product.id == clickedButtonId)[0];
        console.log(selectedProduct.title);
        // let selectedProductUrl = `product.html?id=${selectedProduct.id}&title=${selectedProduct.title}&title=${selectedProduct.subtitle}&title=${selectedProduct.img}&transaction=${selectedProduct.transaction}&type=${selectedProduct.type}&title=${selectedProduct.featured}`;
        // window.location.href = selectedProductUrl;
      });
    });


  } catch (error) {
    console.error('Error:', error);
  }
};


//DISPLAY FEAT-PRODUCTS FUNCTIONS
const displayFeatProducts = async () => {
  const featuredProductsList = document.querySelector('.featuredProductsList');

  try {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    };
    const data = await response.json();

    const cardConstructor = () => {

      const featProductList = data;

      featProductList.forEach((featProduct) => {
        if (featProduct.featured === true){
          const cards = document.createElement('div');
          cards.classList.add('productCard');
          cards.classList.add('featured');
          cards.innerHTML = `
            <div class="card">
              <img src="${featProduct.img[0]}" class="card-img-top" alt="Foto de ${featProduct.title}">
              <div class="card-body d-block w-100">
                <h5 class="card-title">${featProduct.title}</h5>
                <p class="card-text">${featProduct.subtitle}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">${transactionIdentifyer(featProduct.transaction)}</li>
                <li class="list-group-item">${typeIdentifyer(featProduct.type)}</li>
                <li class="list-group-item">${featProduct.adress}</li>
                <li class="list-group-item">${formatAsBrazilianReal(featProduct.price)}</li>
              </ul>
              <div class="card-body">
                <button id="${featProduct.id}" type="button" class="btn btn-dark view-more">Ver Mais</button>
              </div>
            </div>
          `;
          featuredProductsList.appendChild(cards);
        };
      });

    };

    cardConstructor();

    // SLIDESHOW

    const featuredSlideshow = () => {

      const featSlideshow = document.querySelector(".featuredProductsList");
      const slides = featSlideshow.querySelectorAll(".featured");

      let currentImageIndex = 0;

      slides[currentImageIndex].classList.add("active");

      const featPrevButton = document.querySelector('.prev-btn-feat');
      const featNextButton = document.querySelector('.next-btn-feat');

      function showPreviousImage() {
        // Remove the active class from the current image
        slides[currentImageIndex].classList.remove("active");
      
        // Decrement the image index
        currentImageIndex--;
      
        // If the index is less than 0, wrap around to the last image
        if (currentImageIndex < 0) {
          currentImageIndex = slides.length - 1;
        }
      
        // Add the active class to the new image
        slides[currentImageIndex].classList.add("active");
      };

      function showNextImage() {
        // Remove the active class from the current image
        slides[currentImageIndex].classList.remove("active");
      
        // Increment the image index
        currentImageIndex++;
      
        // If the index is greater than or equal to the number of images, wrap around to the first image
        if (currentImageIndex >= slides.length) {
          currentImageIndex = 0;
        }
      
        // Add the active class to the new image
        slides[currentImageIndex].classList.add("active");
        
      };

      featPrevButton.addEventListener("click", showPreviousImage);
      featNextButton.addEventListener("click", showNextImage);

      setInterval(showNextImage, 5000);

    };

    featuredSlideshow();

        

    // DISPLAY MORE FUNCTION
    const viewMoreButtons = document.querySelectorAll('.view-more');
    viewMoreButtons.forEach((button) => {

      button.addEventListener('click', function () {
        let clickedButtonId = this.id;
        let selectedProduct = data.filter(product => product.id == clickedButtonId)[0];
        console.log(selectedProduct.title);
        // let selectedProductUrl = `product.html?id=${selectedProduct.id}&title=${selectedProduct.title}&title=${selectedProduct.subtitle}&title=${selectedProduct.img}&transaction=${selectedProduct.transaction}&type=${selectedProduct.type}&title=${selectedProduct.featured}`;
        // window.location.href = selectedProductUrl;
      });
    });


  } catch (error) {
    console.error('Error:', error);
  }
};


//SEARCH PRODUCTS FUNCTIONS
const displaySearch = async (event) => {
  event.preventDefault();

  const transaction = document.querySelector('#transaction').selectedOptions[0].textContent;
  const type = document.querySelector('#type').selectedOptions[0].textContent;
  const searchResultsDiv = document.querySelector('#searchResults');

  try {
    const response = await fetch('http://localhost:3000/products');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const products = data;
    const filteredProducts = products.filter(product => product.type === type && product.transaction === transaction);

    clearSearch();

    if (filteredProducts.length > 0) {
      const msg = document.createElement('h1');
      msg.innerHTML = `${filteredProducts.length} resultados encontrados para ${type} ${transaction}`;
      searchResultsDiv.appendChild(msg);

      const foundCards = document.createElement('div');
      foundCards.setAttribute('id', 'foundCards');

      filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        card.innerHTML = `
          <img src="${product.img}" class="card-img-top" alt="Foto de ${product.title}">
          <div class="card-body d-block w-100">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.subtitle}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${product.transaction}</li>
            <li class="list-group-item">${product.type}</li>
            <li class="list-group-item">${product.adress}</li>
          </ul>
          <div class="card-body">
            <a href="www.imoveismanduri.com/index/products/${product.title.toLowerCase().replace(' ', '-')}" class="card-link">Ver mais</a>
          </div>
        `;

        foundCards.appendChild(card);
      });

      searchResultsDiv.appendChild(foundCards);
    } else {
      const msg = document.createElement('h1');
      msg.innerHTML = `Desculpe, não encontramos nenhum resultado para ${type} ${transaction}`;
      searchResultsDiv.appendChild(msg);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


//EVENTS FUNCTIONS
const searchForm = document.querySelector('form');
const clearButton = document.querySelector('#clearButton');
const vemDeZap = document.querySelector('#zapzap');

window.addEventListener('load', displayAllProducts);
window.addEventListener('load', displayFeatProducts);
searchForm.addEventListener('submit', displaySearch);
clearButton.addEventListener('click', clearSearch);
// vemDeZap.addEventListener('click', openWhatsApp);




