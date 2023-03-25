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

const productInfoContainer = document.querySelector('#product');
const productInfo = document.createElement('div');
productInfo.innerHTML=`
    <header class="major">
        <h2 id="title">${productTitle}</h2>
        <p id="subtitle">${productSubTitle}</p>
    </header>
    <ul class="list-group">
      <li class="list-group-item">${productTransaction}</li>
      <li class="list-group-item">${productType}</li>
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item">${productBedrooms} quartos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lamp-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002c-.15.03-.3.056-.45.081a32.731 32.731 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a32.753 32.753 0 0 1-4.645-.425c-.15-.025-.3-.05-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7Z"/><path d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.052.075l-.001.004-.004.01V14l.002.008a.147.147 0 0 0 .016.033.62.62 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.62.62 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411Z"/></svg></li>
        <li class="list-group-item">${productBathrooms} banheiros <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
        </svg></li>
        <li class="list-group-item">${productM2} m<sup>2</sup> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/></svg></li>
      </ul>
        <li class="list-group-item">${productAdress}</li>
        <li class="list-group-item">${productPrice}</li>
    </ul>
`;

productInfoContainer.appendChild(productInfo);

const slideshow = () => {

    const slides = imgContainer.querySelectorAll(".productImgURL");
    let currentImageIndex = 0;
    slides[currentImageIndex].classList.add("active");

    const prevButton = document.querySelector('.prev-btn-all');
    const nextButton = document.querySelector('.next-btn-all');

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

      prevButton.addEventListener("click", showPreviousImage);
      nextButton.addEventListener("click", showNextImage);

      setInterval(showNextImage, 5000);
};

slideshow();

openDoor.addEventListener('mouseleave', () => {
    closedDoor.style.display = 'block';
    openDoor.style.display = 'none';
  });