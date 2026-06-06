// PRODUCTS

const products = [

{
id:1,
name:"Wireless Headphones",
category:"Electronics",
price:1499,
rating:4.8,
badge:"Best Seller",
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
},

{
id:2,
name:"Smart Watch",
category:"Electronics",
price:2499,
rating:4.7,
badge:"Trending",
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
},

{
id:3,
name:"Bluetooth Speaker",
category:"Electronics",
price:1299,
rating:4.6,
badge:"New",
image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500"
},

{
id:4,
name:"Running Shoes",
category:"Fashion",
price:1999,
rating:4.9,
badge:"Best Seller",
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
},

{
id:5,
name:"Backpack",
category:"Fashion",
price:899,
rating:4.5,
badge:"Trending",
image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
},

{
id:6,
name:"Table Lamp",
category:"Home",
price:699,
rating:4.3,
badge:"New",
image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500"
},

{
id:7,
name:"Coffee Maker",
category:"Home",
price:2799,
rating:4.7,
badge:"Best Seller",
image:"https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500"
},

{
id:8,
name:"Office Chair",
category:"Home",
price:3999,
rating:4.8,
badge:"Trending",
image:"https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=500"
},

{
id:9,
name:"Gaming Mouse",
category:"Accessories",
price:999,
rating:4.6,
badge:"New",
image:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
},

{
id:10,
name:"Power Bank",
category:"Electronics",
price:1199,
rating:4.5,
badge:"Trending",
image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500"
},

{
id:11,
name:"Sunglasses",
category:"Accessories",
price:799,
rating:4.2,
badge:"Best Seller",
image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
},

{
id:12,
name:"Laptop Bag",
category:"Accessories",
price:1099,
rating:4.4,
badge:"Trending",
image:"https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500"
}

];

// LOCAL STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let discount = 0;

// ELEMENTS

const productContainer = document.getElementById("productContainer");
const cartItems = document.getElementById("cartItems");
const wishlistContainer = document.getElementById("wishlistContainer");

// DISPLAY PRODUCTS

function displayProducts(productList){

productContainer.innerHTML="";

productList.forEach(product=>{

productContainer.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<div class="product-info">

<span class="badge">${product.badge}</span>

<h3>${product.name}</h3>

<p>${product.category}</p>

<p class="rating">⭐ ${product.rating}</p>

<p class="price">₹${product.price}</p>

<div class="product-buttons">

<button
class="cart-btn"
onclick="addToCart(${product.id})">
Add Cart
</button>

<button
class="wishlist-btn"
onclick="addToWishlist(${product.id})">
❤️
</button>

</div>

</div>

</div>

`;

});

}

// ADD TO CART

function addToCart(id){

const product = products.find(p=>p.id===id);

const existing = cart.find(item=>item.id===id);

if(existing){

existing.quantity++;

}else{

cart.push({...product,quantity:1});

}

saveCart();

showToast("Item Added To Cart");

}

// WISHLIST

function addToWishlist(id){

const product = products.find(p=>p.id===id);

if(!wishlist.some(item=>item.id===id)){

wishlist.push(product);

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

renderWishlist();

showToast("Added To Wishlist");

}

}

function renderWishlist(){

if(wishlist.length===0){

wishlistContainer.innerHTML=
"No items in wishlist";

return;

}

wishlistContainer.innerHTML="";

wishlist.forEach(item=>{

wishlistContainer.innerHTML += `

<p>
❤️ ${item.name}
</p>

`;

});

}

// SAVE CART

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

renderCart();

}

// CART RENDER

function renderCart(){

if(cart.length===0){

cartItems.innerHTML="Cart is Empty";

document.getElementById("cartCount").innerText=0;

document.getElementById("itemCount").innerText=0;

document.getElementById("subtotal").innerText=0;

document.getElementById("total").innerText=0;

return;

}

cartItems.innerHTML="";

let subtotal=0;
let count=0;

cart.forEach(item=>{

subtotal += item.price * item.quantity;

count += item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<h4>${item.name}</h4>

<p>₹${item.price}</p>

</div>

<div class="quantity-controls">

<button onclick="decrease(${item.id})">
-
</button>

<span>
${item.quantity}
</span>

<button onclick="increase(${item.id})">
+
</button>

<button
class="remove-btn"
onclick="removeItem(${item.id})">
Remove
</button>

</div>

</div>

`;

});

let total=subtotal-discount;

document.getElementById("cartCount").innerText=count;
document.getElementById("itemCount").innerText=count;
document.getElementById("subtotal").innerText=subtotal;
document.getElementById("discount").innerText=discount;
document.getElementById("total").innerText=total;

}

// QUANTITY

function increase(id){

let item=cart.find(i=>i.id===id);

item.quantity++;

saveCart();

}

function decrease(id){

let item=cart.find(i=>i.id===id);

if(item.quantity>1){

item.quantity--;

}else{

cart=cart.filter(i=>i.id!==id);

}

saveCart();

}

function removeItem(id){

cart=cart.filter(item=>item.id!==id);

saveCart();

showToast("Item Removed");

}

// FILTERS

document
.getElementById("searchInput")
.addEventListener("input",filterProducts);

document
.getElementById("categoryFilter")
.addEventListener("change",filterProducts);

document
.getElementById("priceFilter")
.addEventListener("change",filterProducts);

document
.getElementById("sortFilter")
.addEventListener("change",filterProducts);

function filterProducts(){

let filtered=[...products];

const search=
document.getElementById("searchInput")
.value.toLowerCase();

const category=
document.getElementById("categoryFilter")
.value;

const price=
document.getElementById("priceFilter")
.value;

const sort=
document.getElementById("sortFilter")
.value;

filtered=filtered.filter(product=>
product.name.toLowerCase()
.includes(search)
);

if(category!=="all"){

filtered=filtered.filter(
p=>p.category===category
);

}

if(price!=="all"){

filtered=filtered.filter(
p=>p.price<=Number(price)
);

}

if(sort==="low"){

filtered.sort((a,b)=>
a.price-b.price
);

}

if(sort==="high"){

filtered.sort((a,b)=>
b.price-a.price
);

}

if(sort==="rating"){

filtered.sort((a,b)=>
b.rating-a.rating
);

}

if(sort==="name"){

filtered.sort((a,b)=>
a.name.localeCompare(b.name)
);

}

displayProducts(filtered);

}

// COUPON

document
.getElementById("applyCoupon")
.addEventListener("click",()=>{

const code=
document.getElementById("couponInput")
.value;

if(code==="SAVE10"){

discount=500;

showToast("Coupon Applied");

renderCart();

}else{

showToast("Invalid Coupon");

}

});

// CHECKOUT

document
.getElementById("checkoutForm")
.addEventListener("submit",(e)=>{

e.preventDefault();

if(cart.length===0){

showToast("Cart is Empty");

return;

}

showToast("Order Placed Successfully");

cart=[];

discount=0;

localStorage.removeItem("cart");

renderCart();

document
.getElementById("checkoutForm")
.reset();

});

// TOAST

function showToast(message){

const toast=
document.getElementById("toast");

toast.innerText=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

// INITIAL LOAD

displayProducts(products);

renderCart();

renderWishlist();