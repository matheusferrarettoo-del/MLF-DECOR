const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

let products = [];

async function loadProducts() {
  const res = await fetch("products.json");
  products = await res.json();
  renderProducts(products);
  populateCategories();
}

function renderProducts(list) {
  grid.innerHTML = "";
  list.forEach(product => {
    grid.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">R$ ${product.price}</p>
        <a class="btn" href="${product.shopeeLink}" target="_blank">
          Comprar na Shopee
        </a>
      </div>
    `;
  });
}

function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (category === "all" || p.category === category)
  );

  renderProducts(filtered);
}

loadProducts();
