'use strict'

const urlParams = new URLSearchParams(window.location.search);

const productID = urlParams.get('id');
const productTitle = urlParams.get('title');
const productSubTitle = urlParams.get('subTitle');
const productImgs = urlParams.get('imgs');
const productTransaction = urlParams.get('transaction');
const productType = urlParams.get('type');
const productBedrooms = urlParams.get('bedrooms');
const productBathrooms = urlParams.get('bathrooms');
const productM2 = urlParams.get('m2');
const productPrice = urlParams.get('price');
const productFeatured = urlParams.get('featured');
const productAdress = urlParams.get('adress');

const imgLinks = productImgs.split(',');
const imgContainer = document.querySelector('.productImgs');

imgLinks.forEach(link => {
    const imgElement = document.createElement('img');
    imgElement.src = link;
    imgElement.classList.add('productImgURL')
    imgContainer.appendChild(imgElement);
});

const slideshow = () => {

    

}