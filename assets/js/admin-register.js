'use strict';

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

  