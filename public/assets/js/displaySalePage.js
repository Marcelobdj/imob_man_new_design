'use strict'

const displaySaleProducts = async () => {
    const ProductsList = document.querySelector('.forSaleProductsList');

    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        };
        const data = await response.json();

        const cardConstructor = () => {

            const saleProductList = data;

            saleProductList.forEach((saleProduct) => {
                if (saleProduct.transaction === "Á Venda") {
                    const cards = document.createElement('div');
                    cards.classList.add('productCard');
                    cards.innerHTML = `
                    <div class="card">
                        <img src="${saleProduct.img}" class="card-img-top" alt="Foto de ${saleProduct.title}">
                        <div class="card-body d-block w-100">
                            <h5 class="card-title">${saleProduct.title}</h5>
                            <p class="card-text">${saleProduct.subtitle}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${saleProduct.transaction}</li>
                            <li class="list-group-item">${saleProduct.type}</li>
                            <li class="list-group-item">${saleProduct.adress}</li>
                        </ul>
                        <div class="card-body">
                        <button id="${saleProduct.id}" type="button" class="btn btn-dark view-more">Ver Mais</button>
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

window.addEventListener('load', displaySaleProducts);