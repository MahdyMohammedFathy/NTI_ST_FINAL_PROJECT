// product-cart.js

// Sample product database to simulate items from homepage
const products = [
  {
    id: 1,
    name: "iPhone 16 Pro Series",
    price: 999,
    image: "/Images/iphone_16pro.png"
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 1299,
    image: "/Images/mbp14.jfif"
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    price: 429,
    image: "/Images/product_se.png"
  },
  {
    id: 4,
    name: "HAVIT HV-G92 Gamepad",
    price: 50,
    image: "/Images/gamepad.png"
  },
  {
    id: 5,
    name: "AK-900 Wired Keyboard",
    price: 60,
    image: "/Images/keyboard.png"
  },
  {
    id: 6,
    name: "IPS LCD Gaming Monitor",
    price: 150,
    image: "/Images/monitor.png"
  },
  {
    id: 7,
    name: "S-Series Comfort Chair",
    price: 120,
    image: "/Images/chair.png"
  },
  {
    id: 8,
    name: "Digital Smart Watch",
    price: 85,
    image: "/Images/product_se.png"
  },
  {
    id: 9,
    name: "Surround Gaming Headset",
    price: 90,
    image: "/Images/compare_airpods_max__b14s2x6q07rm_large_2x.png"
  },
  {
    id: 10,
    name: "The North Coat",
    price: 260,
    image: "/Images/north-coat.png"
  },
  {
    id: 11,
    name: "Gucci Duffel Bag",
    price: 180,
    image: "/Images/gucci-bag.png"
  },
  {
    id: 12,
    name: "RGB Liquid CPU Cooler",
    price: 120,
    image: "/Images/rgb-cooler.png"
  },
  {
    id: 13,
    name: "Small Bookshelf",
    price: 150,
    image: "/Images/bookshelf.png"
  },
  {
    id: 14,
    name: "Breed Dry Dog Food",
    price: 100,
    image: "/Images/dog-food.png"
  },
  {
    id: 15,
    name: "Canon EOS DSLR Camera",
    price: 360,
    image: "/Images/camera.png"
  },
  {
    id: 16,
    name: "ASUS FHD Gaming Laptop",
    price: 700,
    image: "/Images/laptop.png"
  },
  {
    id: 17,
    name: "Curology Product Set",
    price: 500,
    image: "/Images/curology.png"
  },
  {
    id: 18,
    name: "Kids Electric Car",
    price: 960,
    image: "/Images/kids-car.png"
  },
  {
    id: 19,
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    image: "/Images/cleats.png"
  },
  {
    id: 20,
    name: "GP11 Shooter USB Gamepad",
    price: 660,
    image: "/Images/Frame 608.png"
  },
  {
    id: 21,
    name: "Quilted Satin Jacket",
    price: 660,
    image: "/Images/jacket.png"
  },
  {
    id: 22,
    name: "PlayStation 5",
    price: 499,
    image: "/Images/ps5.png"
  },
  {
    id: 23,
    name: "Women’s Collections",
    price: 299,
    image: "/Images/woman.png"
  },
  {
    id: 24,
    name: "Speakers",
    price: 149,
    image: "/Images/speakers.png"
  },
  {
    id: 25,
    name: "Perfume - GUCCI INTENSE OUD",
    price: 120,
    image: "/Images/perfume.png"
  }
];


if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateHeaderCart();
}

function decreaseQuantity(productId) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateHeaderCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateHeaderCart();
}

function loadCartItems(containerId) {
  const cartContainer = document.getElementById(containerId);
  cartContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name} x${item.quantity}</span>
      </div>
      <span>$${item.price * item.quantity}</span>
    `;
    cartContainer.appendChild(itemEl);
    subtotal += item.price * item.quantity;
  });

  document.getElementById("subtotal").textContent = `$${subtotal}`;
  document.getElementById("total").textContent = `$${subtotal}`;
}

function updateHeaderCart() {
  const headerCart = document.getElementById("header-cart");
  const cartBadge = document.getElementById("cart-count");
  if (!headerCart || !cartBadge) return;
  headerCart.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  cart.forEach(item => {
    const el = document.createElement("div");
    el.classList.add("header-cart-item");
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-between";
    el.style.marginBottom = "10px";
    el.style.borderBottom = "1px solid #eee";
    el.style.paddingBottom = "8px";

    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"> 
      <div style="flex:1; margin-left:10px;">
        <div style="font-weight:500;">${item.name}</div>
        <div style="font-size: 12px; color: gray; display: flex; align-items: center; gap: 5px;">
          <button onclick="decreaseQuantity(${item.id})" style="padding:2px 6px; font-weight:bold; border-radius:4px; border:1px solid #ccc; background:#f0f0f0">−</button>
          ${item.quantity}
          <button onclick="addToCart(${item.id})" style="padding:2px 6px; font-weight:bold; border-radius:4px; border:1px solid #ccc; background:#f0f0f0">+</button>
        </div>
        <div style="font-size: 14px; font-weight: bold;">$${item.price * item.quantity}</div>
      </div>
      <button onclick="removeFromCart(${item.id})" style="background:#ff4d4d; color:white; border:none; padding:4px 7px; cursor:pointer; border-radius:4px">×</button>
    `;
    total += item.price * item.quantity;
    itemCount += item.quantity;
    headerCart.appendChild(el);
  });

  const totalEl = document.createElement("div");
  totalEl.style.marginTop = "10px";
  totalEl.style.textAlign = "right";
  totalEl.style.fontWeight = "bold";
  totalEl.innerHTML = `Total: $${total}`;
  headerCart.appendChild(totalEl);

  const checkoutBtn = document.createElement("a");
  checkoutBtn.href = "check_out.html";
  checkoutBtn.textContent = "Proceed to Checkout";
  checkoutBtn.style = `
    display:block;
    margin-top:10px;
    padding:8px 8px;
    background:#222;
    color:#fff;
    text-align:center;
    text-decoration:none;
    border-radius:5px;
    font-weight:500;
    transition: background 0.3s;
  `;
  checkoutBtn.onmouseover = () => checkoutBtn.style.background = "#444";
  checkoutBtn.onmouseout = () => checkoutBtn.style.background = "#222";

  headerCart.appendChild(checkoutBtn);
  cartBadge.textContent = itemCount;
}

function toggleCartDropdown() {
  const cartDropdown = document.getElementById("header-cart");
  if (cartDropdown) {
    cartDropdown.classList.toggle("visible");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-items")) {
    loadCartItems("cart-items");
  }
  updateHeaderCart();

  const cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", toggleCartDropdown);
  }
});


