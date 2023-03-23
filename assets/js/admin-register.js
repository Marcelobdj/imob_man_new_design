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
const displayURLthumb = () => {
  const input = document.querySelector('#imgInput');
  const thumbsContainer = document.querySelector('#imgThumbs');

  input.addEventListener('input', (e) => {
    if (e.data === ',') {
      const urls = input.value.split(',').map(url => url.trim()).filter(url => url !== '');
      const lastUrl = urls[urls.length - 1];

      if (lastUrl) {
        // Create thumbnail
        const thumb = document.createElement('img');
        thumb.src = lastUrl;
        thumb.classList.add('img-thumb');

        // Create delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
          const index = urls.indexOf(lastUrl);
          if (index > -1) {
            urls.splice(index, 1);
          };
          input.value = urls.join(', ');
          thumb.remove();
        };

        // Append elements to the container
        const div = document.createElement('div');
        div.classList.add('thumb-wrapper');
        div.appendChild(thumb);
        div.appendChild(deleteBtn);
        thumbsContainer.appendChild(div);
      };
    };
  });
};
window.addEventListener('load', displayURLthumb);

//POST FORM------------------------------------------------------
const form = document.querySelector('form');
const submitForm = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#titleInput').value;
  const subtitle = document.querySelector('#subtInput').value;
  const imgInput = document.querySelector('#imgInput');
  const img = imgInput.value.split(',').map(url => url.trim()).filter(url => url !== '');
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
