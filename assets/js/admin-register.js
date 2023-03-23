'use strict';

// DISPLAY ADDITIONAL INFO IN THE FORM {
const displayAdditionalForm = (event) => {
    const selectedOption = event.target.value;
    const houseForm = document.querySelector('.houseForm');
    const m2Form = document.querySelector('.m2Form');
    
    if (selectedOption === '1') {
      houseForm.style.display = 'flex';
      m2Form.style.display = 'flex';
    } else if (selectedOption === '2') {
      houseForm.style.display = 'none';
      m2Form.style.display = 'flex';
    } else {
      houseForm.style.display = 'none';
      m2Form.style.display = 'none';
    }
};

const propertyTypeSelect = document.querySelector('.form-select');

propertyTypeSelect.addEventListener('change', displayAdditionalForm);
// -------------------------------------}

// CREATE THUMB FOR EACH URL{

function displayURLthumb() {
  const input = document.getElementById('imgInput');
  const imgHelp = document.getElementById('imgHelp');

  let productURLs = [];

  input.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    const lastChar = inputValue.slice(-1);

    if (lastChar === ',') {
      const url = inputValue.slice(0, -1).trim();

      if (url.length > 0 && !url.endsWith(',')) {
        productURLs.push(url);
        input.value = '';

        const imgThumbs = document.getElementById('imgThumbs') || createImgThumbsDiv(imgHelp);

        const thumbnail = createThumbnail(url, productURLs);
        imgThumbs.appendChild(thumbnail);
      }
    }
  });
}

function createImgThumbsDiv(imgHelp) {
  const imgThumbs = document.createElement('div');
  imgThumbs.id = 'imgThumbs';
  imgHelp.parentNode.insertBefore(imgThumbs, imgHelp.nextSibling);
  return imgThumbs;
}

function createThumbnail(url, productURLs) {
  const thumbnailWrapper = document.createElement('div');
  thumbnailWrapper.classList.add('thumbnail-wrapper');

  const thumbnail = document.createElement('img');
  thumbnail.src = url;
  thumbnail.classList.add('img-thumb');
  thumbnailWrapper.appendChild(thumbnail);

  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    thumbnailWrapper.remove();
    const index = productURLs.indexOf(url);
    if (index > -1) {
      productURLs.splice(index, 1);
    }
  });
  thumbnailWrapper.appendChild(closeButton);

  return thumbnailWrapper;
}

// Call the function
displayURLthumb();



// -------------------------------------}
