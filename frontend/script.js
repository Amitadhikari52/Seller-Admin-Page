// Function to display products in the frontend
function displayProducts() {
  const productsList = document.getElementById('productsList');
  const totalValuePara = document.getElementById('totalValue');

  productsList.innerHTML = '';

  let totalValue = 0;

  productsData.forEach((product) => {
    totalValue += product.sellingPrice;

    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <p>Product Name: ${product.name}</p>
      <p>Selling Price: $${product.sellingPrice}</p>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;
    productsList.appendChild(productDiv);
  });

  // Update the total value paragraph
  totalValuePara.textContent = `Total Value of Products Worth: $${totalValue}`;
}

// Function to delete a product
function deleteProduct(productId) {
  // Make a DELETE request to the backend to delete the product
  fetch(`/sellers/product/${productId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error('Error deleting product: ', data.error);
      } else {
        // Remove the deleted product from the productsData array
        productsData = productsData.filter((product) => product.id !== productId);
        displayProducts();
        // Save the updated productsData array to web storage after deleting
        localStorage.setItem('productsData', JSON.stringify(productsData));
      }
    })
    .catch((error) => {
      console.error('Error deleting product: ', error);
    });
}

// Move the productsData declaration outside the window.onload function so that it becomes a global variable
let productsData = [];

window.onload = function () {
  const sellerForm = document.getElementById('sellerForm');
  const productNameInput = document.getElementById('productName');
  const sellingPriceInput = document.getElementById('sellingPrice');

  // Check if there is any product data in web storage when the page loads
  const storedProductsData = localStorage.getItem('productsData');
  if (storedProductsData) {
    productsData = JSON.parse(storedProductsData);
  }

  // Function to add a product
  function addProduct(event) {
    event.preventDefault();

    const productName = productNameInput.value;
    const sellingPrice = sellingPriceInput.value;

    // Validate inputs (you can add more validation as per your requirements)
    if (!productName.trim() || isNaN(sellingPrice) || sellingPrice <= 0) {
      alert('Please provide valid product name and selling price.');
      return;
    }

    // Make a POST request to the backend to add the product
    fetch('/sellers/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName,
        sellingPrice: Number(sellingPrice),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Error adding product: ', data.error);
        } else {
          // Add the new product to the productsData array
          productsData.push(data);
          displayProducts();
          // Save the updated productsData array to web storage after adding
          localStorage.setItem('productsData', JSON.stringify(productsData));
        }
      })
      .catch((error) => {
        console.error('Error adding product: ', error);
      });

    // Reset the form inputs
    productNameInput.value = '';
    sellingPriceInput.value = '';
  }

  // Attach event listeners
  sellerForm.addEventListener('submit', addProduct);

  // Display the initial products
  displayProducts();
};
