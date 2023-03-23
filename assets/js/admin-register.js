'use strict';

//DISPLAY ADDITIONAL INFO IN THE FORM----------------------------
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

//CREATE THUMB FOR EACH URL--------------------------------------
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

displayURLthumb();

//POST FORM------------------------------------------------------
const form = document.querySelector('form');

const submitForm = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#titleInput').value;
  const subtitle = document.querySelector('#subtInput').value;
  const img = document.querySelectorAll('.img-thumb').value;
  const sellCheck = document.querySelector('#sellCheck').checked;
  const rentCheck = document.querySelector('#rentCheck').checked;
  const typeSelect = document.querySelector('#typeInput');
  const houseSelected = typeSelect.value === '1';
  const landSelected = typeSelect.value === '2';
  const bedrooms = document.querySelector('#inputBedrooms').value;
  const bathrooms = document.querySelector('#inputBathrooms').value;
  const m2 = document.querySelector('#m2Input').value;
  const featured = document.querySelector('#featured').checked;
  const adress = document.querySelector('#addressInput').value;

  const data = {
    title,
    subtitle,
    img,
    transaction: {
      selling: sellCheck,
      renting: rentCheck
    },
    type: {
      house: houseSelected,
      land: landSelected
    },
    bedrooms,
    bathrooms,
    m2,
    featured,
    adress
  };

  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await response.json();
    alert('Produto cadastrado com sucesso!');
  } catch (error) {
    alert(error);
  }
};

form.addEventListener('submit', submitForm);
