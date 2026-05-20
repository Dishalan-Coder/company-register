const loggedInCompany = JSON.parse(
  localStorage.getItem("loggedInCompany")
);

if (!loggedInCompany) {
  alert("Please login first");
  window.location.href = "login.html";
}

const welcomeText = document.getElementById("welcomeText");
const logoutBtn = document.getElementById("logoutBtn");

const productForm = document.getElementById("productForm");

const productName = document.getElementById("productName");
const productQuantity = document.getElementById("productQuantity");
const productPrice = document.getElementById("productPrice");

const productNameError = document.getElementById("productNameError");
const productQuantityError = document.getElementById("productQuantityError");
const productPriceError = document.getElementById("productPriceError");

const productList = document.getElementById("productList");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

welcomeText.textContent = `Welcome to ${loggedInCompany.companyName}`;

let allProducts =
  JSON.parse(localStorage.getItem("products")) || [];

let editProductId = null;

// Show only current logged-in company's products
function getCurrentCompanyProducts() {
  return allProducts.filter((product) => {
    return product.companyEmail === loggedInCompany.email;
  });
}

function displayProducts() {
  productList.innerHTML = "";

  const companyProducts = getCurrentCompanyProducts();

  if (companyProducts.length === 0) {
    productList.innerHTML = `
      <p class="text-gray-500 bg-white p-5 rounded-xl border border-gray-200">
        No products added yet.
      </p>
    `;
    return;
  }

  companyProducts.forEach((product) => {
    productList.innerHTML += `
      <div class="bg-white border border-gray-200 rounded-2xl shadow-md p-6">

        <h3 class="text-xl font-bold text-blue-700 mb-3">
          ${product.name}
        </h3>

        <p class="text-gray-700">
          <strong>Quantity:</strong> ${product.quantity}
        </p>

        <p class="text-gray-700">
          <strong>Price:</strong> Rs. ${product.price}
        </p>

        <p class="text-gray-700">
          <strong>Total Value:</strong> Rs. ${product.quantity * product.price}
        </p>

        <div class="flex gap-3 mt-5">
          <button
            onclick="editProduct('${product.id}')"
            class="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Edit
          </button>

          <button
            onclick="deleteProduct('${product.id}')"
            class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Delete
          </button>
        </div>

      </div>
    `;
  });
}

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  productNameError.textContent = "";
  productQuantityError.textContent = "";
  productPriceError.textContent = "";
  successMessage.textContent = "";

  let isValid = true;

  const nameValue = productName.value.trim();
  const quantityValue = productQuantity.value.trim();
  const priceValue = productPrice.value.trim();

  if (nameValue === "") {
    productNameError.textContent = "Product name is required";
    isValid = false;
  }

  if (quantityValue === "") {
    productQuantityError.textContent = "Product quantity is required";
    isValid = false;
  } else if (Number(quantityValue) <= 0) {
    productQuantityError.textContent = "Quantity must be greater than 0";
    isValid = false;
  }

  if (priceValue === "") {
    productPriceError.textContent = "Product price is required";
    isValid = false;
  } else if (Number(priceValue) <= 0) {
    productPriceError.textContent = "Price must be greater than 0";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  if (editProductId === null) {
    const newProduct = {
      id: Date.now().toString(),
      companyEmail: loggedInCompany.email,
      name: nameValue,
      quantity: Number(quantityValue),
      price: Number(priceValue)
    };

    allProducts.push(newProduct);

    successMessage.textContent = "Product added successfully!";
  } else {
    const productIndex = allProducts.findIndex((product) => {
      return product.id === editProductId;
    });

    allProducts[productIndex].name = nameValue;
    allProducts[productIndex].quantity = Number(quantityValue);
    allProducts[productIndex].price = Number(priceValue);

    editProductId = null;
    submitBtn.textContent = "Add Product";

    successMessage.textContent = "Product updated successfully!";
  }

  localStorage.setItem("products", JSON.stringify(allProducts));

  productForm.reset();
  displayProducts();
});

function editProduct(id) {
  const product = allProducts.find((item) => {
    return item.id === id;
  });

  productName.value = product.name;
  productQuantity.value = product.quantity;
  productPrice.value = product.price;

  editProductId = id;
  submitBtn.textContent = "Update Product";
}

function deleteProduct(id) {
  allProducts = allProducts.filter((product) => {
    return product.id !== id;
  });

  localStorage.setItem("products", JSON.stringify(allProducts));

  displayProducts();
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInCompany");
  window.location.href = "login.html";
});

displayProducts();