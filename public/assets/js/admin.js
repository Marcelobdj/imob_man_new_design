'use strict';

const transactionIdentifier = (transaction) => {
  if (transaction.selling && !transaction.renting) {
    return "A Venda";
  } else if (!transaction.selling && transaction.renting) {
    return "Para Locação";
  } else if (transaction.selling && transaction.renting) {
    return "Para Locação ou Venda";
  } else {
    return "Não disponível";
  }
};

const typeIdentifier = (productType) => {
  return productType.house ? "Casa" : "Terreno";
};

const formatAsBrazilianReal = (number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number).replace(",00", "");
};

const createProductLine = (product) => {
  const line = document.createElement('li');
  line.classList.add('list-group-item');
  line.innerHTML = `
    <button type="button" class="btn btn-warning btn-sm edit-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg> Editar
    </button> 
    ${product.id} | ${product.title} | ${typeIdentifier(product.type)} | ${transactionIdentifier(product.transaction)} | ${formatAsBrazilianReal(product.price)}
  `;
  return line;
};

const displayDB = async () => {
  const productsList = document.querySelector('.productsList');

  try {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    };
    const data = await response.json();

    data.forEach((product) => {
      const line = createProductLine(product);
      productsList.appendChild(line);

      const editButton = line.querySelector('.edit-btn');
      editButton.addEventListener('click', () => {
        // Open the modal
        const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
        editProductModal.show();

        // Populate the modal form with the product data
        document.getElementById('titleInput').value = product.title;
        document.getElementById('subtInput').value = product.subtitle;
        document.getElementById('addressInput').value = product.adress;
        document.getElementById('sellCheck').checked = product.transaction.selling;
        document.getElementById('rentCheck').checked = product.transaction.renting;
        document.getElementById('typeInput').value = product.type;
        document.getElementById('inputBedrooms').value = product.bedrooms;
        document.getElementById('inputBathrooms').value = product.bathrooms;
        document.getElementById('m2Input').value = product.m2;
        document.getElementById('imgInput').value = product.img;
        document.getElementById('priceInput').value = product.price;
        document.getElementById('featured').value = product.featured;

        // Set up event listeners for Delete and Save Changes buttons
        const deleteProductBtn = document.getElementById('deleteProductBtn');
        deleteProductBtn.onclick = () => deleteProduct(product.id, editProductModal);

        const saveProductChangesBtn = document.getElementById('saveProductChangesBtn');
        saveProductChangesBtn.onclick = () => saveProductChanges(product.id, editProductModal);
      });

    });
  } catch (error) {
    console.error('Error:', error);
  };
};

const deleteProduct = async (productId, modal) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Refresh the products list and close the modal
    displayDB();
    modal.hide();
  } catch (error) {
    console.error('Error:', error);
  }
};

const saveProductChanges = async (productId, modal) => {
  // Get the updated product data from the form
  const updatedProduct = {
    title: document.getElementById('titleInput').value,
    subtitle: document.getElementById('subtInput').value,
    adress: document.getElementById('addressInput').value,
    transaction: {
      selling: document.getElementById('sellCheck').checked,
      renting: document.getElementById('rentCheck').checked
    },
    type: document.querySelector('#typeInput'),
    bedrooms: document.getElementById('inputBedrooms').value,
    bathrooms: document.getElementById('inputBathrooms').value,
    m2: document.getElementById('m2Input').value,
    img: document.getElementById('imgInput').value,
    price: document.getElementById('priceInput').value,
    featured: document.getElementById('featured').checked
  };

  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Refresh the products list and close the modal
    displayDB();
    modal.hide();
  } catch (error) {
    console.error('Error:', error);
  }
};



window.addEventListener('load', displayDB);