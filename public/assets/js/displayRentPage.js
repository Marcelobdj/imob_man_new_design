'use strict'

const displayRentProducts = async () => {
    const ProductsList = document.querySelector('.forRentProductsList');

    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        };
        const data = await response.json();

        const cardConstructor = () => {

            const rentProductsList = data;

            rentProductsList.forEach((rentProduct) => {
                if (rentProduct.transaction === "Para Locação") {
                    const cards = document.createElement('div');
                    cards.classList.add('productCard');
                    cards.innerHTML = `
                    <div class="card">
                        <img src="${rentProduct.img}" class="card-img-top" alt="Foto de ${rentProduct.title}">
                        <div class="card-body d-block w-100">
                            <h5 class="card-title">${rentProduct.title}</h5>
                            <p class="card-text">${rentProduct.subtitle}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${rentProduct.transaction}</li>
                            <li class="list-group-item">${rentProduct.type}</li>
                            <li class="list-group-item">${rentProduct.adress}</li>
                        </ul>
                        <div class="card-body">
                        <button id="${rentProduct.id}" type="button" class="btn btn-dark view-more">Ver Mais</button>
                        </div>
                    </div>
                `;
                    ProductsList.appendChild(cards);
                };
            });

        };

        cardConstructor();



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

window.addEventListener('load', displayRentProducts);