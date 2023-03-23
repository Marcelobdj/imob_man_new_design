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
        const displayTypeInfo = () => {
          let info;
          if (product.type.house == true){
            info = `
              ${product.bedrooms} quartos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lamp-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002c-.15.03-.3.056-.45.081a32.731 32.731 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a32.753 32.753 0 0 1-4.645-.425c-.15-.025-.3-.05-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7Z"/><path d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.052.075l-.001.004-.004.01V14l.002.008a.147.147 0 0 0 .016.033.62.62 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.62.62 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411Z"/></svg> | 
              ${product.bathrooms} banheiros <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
              </svg> | 
              ${product.m2} m<sup>2</sup> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/></svg>
            `
          } else {
            info = `
              ${product.m2} m<sup>2</sup> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/></svg>
            `
          };
          return info;
        };
        cards.innerHTML = `
        <div class="card">
        <img src="${product.img[0]}" class="card-img-top" alt="Foto de ${product.title}">
        <div class="card-body d-block w-100">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.subtitle}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${transactionIdentifyer(product.transaction)}</li>
          <li class="list-group-item">${typeIdentifyer(product.type)} | ${displayTypeInfo()}</li>
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
        const products = data;
        let clickedButtonId = this.id;
        let selectedProduct = products.filter(product => product.id == clickedButtonId)[0];
        let newURL =  new URLSearchParams({
          id: selectedProduct.id,
          title: selectedProduct.title,
          subTitle: selectedProduct.subtitle,
          imgs: selectedProduct.img,
          transaction: transactionIdentifyer(selectedProduct.transaction),
          type: typeIdentifyer(selectedProduct.type),
          bedrooms: selectedProduct.bedrooms,
          bathrooms: selectedProduct.bathrooms,
          m2: selectedProduct.m2,
          price: formatAsBrazilianReal(selectedProduct.price),
          featured: selectedProduct.featured,
          adress: selectedProduct.adress
        });
        
          window.open(`product.html?${newURL}`);
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
        const displayTypeInfo = () => {
          let info;
          if (featProduct.type.house == true){
            info = `
              ${featProduct.bedrooms} quartos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lamp-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002c-.15.03-.3.056-.45.081a32.731 32.731 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a32.753 32.753 0 0 1-4.645-.425c-.15-.025-.3-.05-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7Z"/><path d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.052.075l-.001.004-.004.01V14l.002.008a.147.147 0 0 0 .016.033.62.62 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.62.62 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411Z"/></svg> | 
              ${featProduct.bathrooms} banheiros <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
              </svg> | 
              ${featProduct.m2} m<sup>2</sup> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/></svg>
            `
          } else {
            info = `
              ${featProduct.m2} m<sup>2</sup> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/></svg>
            `
          };
          return info;
        };
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
                <li class="list-group-item">${typeIdentifyer(featProduct.type)} | ${displayTypeInfo()}</li>
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
            const products = data;
            let clickedButtonId = this.id;
            let selectedProduct = products.filter(product => product.id == clickedButtonId)[0];
            let newURL =  new URLSearchParams({
              id: selectedProduct.id,
              title: selectedProduct.title,
              subTitle: selectedProduct.subtitle,
              imgs: selectedProduct.img,
              transaction: transactionIdentifyer(selectedProduct.transaction),
              type: typeIdentifyer(selectedProduct.type),
              bedrooms: selectedProduct.bedrooms,
              bathrooms: selectedProduct.bathrooms,
              m2: selectedProduct.m2,
              price: formatAsBrazilianReal(selectedProduct.price),
              featured: selectedProduct.featured,
              adress: selectedProduct.adress
            });
            
              window.open(`product.html?${newURL}`);
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





