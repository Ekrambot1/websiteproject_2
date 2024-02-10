const btnCart = document.querySelector(".add-cart");
const history = document.querySelector(".menu-icon");
const cart = document.querySelector(".cart");
const cart1 = document.querySelector(".cart1");
const btnClose = document.querySelector("#cart-close");
const btnClose1 = document.querySelector("#cart1-close");

btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

btnClose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

//ordered page evant
history.addEventListener("click", () => {
  cart1.classList.add("cart-active");
});

btnClose1.addEventListener("click", () => {
  cart1.classList.remove("cart-active");
});

// Initialize Glider
const glider = new Glider(document.querySelector(".glider"), {
  slidesToShow: 1,
  slidesToScroll: 1,
  scrollLock: true,
  rewind: true,
  dots: "#resp-dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
  responsive: [
    {
      // screens greater than >= 775px
      breakpoint: 775,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        itemWidth: 150,
        duration: 0.25,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        itemWidth: 150,
        duration: 0.25,
      },
    },
  ],
});

let currentSlide = 0;

function scrollToNextSlide() {
  currentSlide = (currentSlide + 1) % glider.slides.length;
  glider.scrollTo(currentSlide * glider.slides[currentSlide].offsetWidth, 0, {
    duration: 500,
  }); // Adjust the duration value for smoothness
}

setInterval(scrollToNextSlide, 2000);

// subscribe button event
const subscribe = document.querySelector(".subscribe-icon");
const subscribeinput = document.querySelector(".subscribe-input");
subscribe.addEventListener("click", function () {
  if (subscribeinput.value == "") {
    var myModal = new bootstrap.Modal(document.getElementById("myModal3"));
    myModal.show();
  } else {
    var myModal = new bootstrap.Modal(document.getElementById("myModal2"));
    myModal.show();
    subscribeinput.value = "";
  }
});

//add to cart
document.addEventListener("DOMContentLoaded", loadFood);

function loadFood() {
  loadContent();
}

function loadContent() {
  //Remove Food Items  From Cart
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  //Product Item Change Event
  let qtyElements = document.querySelectorAll(".cart-quantity");
  qtyElements.forEach((input) => {
    input.addEventListener("change", changeQty);
  });

  //Product Cart

  let cartBtns = document.querySelectorAll(".add-to-cart");
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", addCart);
  });

  updateTotal();
}

//Remove Item
function removeItem() {
  if (confirm) {
    let parentElement = this.closest(".cart-title");
    let title = parentElement.querySelector(".cart-food-title").innerHTML;
    itemList = itemList.filter((el) => el.title != title);
    parentElement.remove();
    loadContent();
    var myModal = new bootstrap.Modal(document.getElementById("myModal1"));
    myModal.show();
  }
}

//Change Quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let itemList = [];

//Add Cart
function addCart() {
  let addToCartButton = this;
  let food = addToCartButton.closest(".card-slider");
  let title = food.querySelector(".card-title").innerHTML;
  let price = food.querySelector(".food-price").innerHTML;
  let imgSrc = food.querySelector(".card-img-top").getAttribute("src");

  //console.log(title,price,imgSrc);

  let newProduct = { title, price, imgSrc };

  //Check Product already Exist in Cart
  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product Already added in Cart");
    return;
  } else {
    itemList.push(newProduct);
    console.log(itemList);
  }
  var myModal = new bootstrap.Modal(document.getElementById("myModal"));
  myModal.show();

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement("div");
  element.setAttribute("class", "cart-title");
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();
  updateTotal();
}

function createCartProduct(title, price, imgSrc) {
  return `
    <div class="cart-box">
               <h1>YOUR CART</h1>
            <div class="cart-conten">
                <div class="cart-iamge">
                  <img src=${imgSrc} alt="" class="cart-img">
                </div>
                <div class="cart-items">
                  <p class="cart-food-title">${title}</p>
                  <p class="cart-remove">REMOVE</p>
                </div>
              </div>
              <hr>
              <div class="cart-total-list">
                <div>
                  <p>PRICE</p>
                  <P class="cart-price">${price}</P>
                </div>
                <div class="quantity">
                  <P>QUANTITY</P>
                  <input type="number" min="1" max="10" value=1 class="cart-quantity">
                </div>
                <div>
                  <p>total</p>
                  <p class="cart-amt">${price}</p>
                </div>
            </div>
    </div>
   `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-title");
  const totalValue = document.querySelector(".shop-subtotal");

  let total = 0;

  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let qty = product.querySelector(".cart-quantity").value;
    total += price * qty;
    product.querySelector(".cart-amt").innerText = "$" + price * qty;
  });

  totalValue.innerHTML = "$" + total;

  // Add Product Count in Cart Icon

  const cartCount = document.querySelector(".count");
  let count = itemList.length;
  cartCount.innerHTML = count;

  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}
const sign = document.getElementById("sign-up");
//signup btn event
sign.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "signup.html";
  }, 1000);
});

function user() {
  //print account username
  const userData = JSON.parse(localStorage.getItem("user"));
  const users = document.querySelector(".username");
  users.innerHTML = "welcome"+" "+userData.username;
}
// user();

// logout

let logout = document.querySelector(".logout ");
logout.addEventListener("click", function () {
  const isloggedin = false;
  if (!isloggedin) {
    localStorage.clear();
    var myModal = new bootstrap.Modal(document.getElementById("myModal4"));
    myModal.show();
  } else {
    var myModal = new bootstrap.Modal(document.getElementById("myModal6"));
    myModal.show();
    setTimeout(() => {
        window.location.href="signup.html";
    }, 0);

  }
});

// orderplace
let placeorder = document.querySelector(".place-order");
const cartContent = document.querySelector(".cart-content");
  
// Check if cart is empty


placeorder.addEventListener("click", function () {
  if (cartContent.innerHTML.trim() === "") {
    var myModal = new bootstrap.Modal(document.getElementById("myModal7"));
    myModal.show();
    return; // Exit function if cart is empty
  }
  function ValueInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
  }
  const keyToCheck = "user";
  if (ValueInLocalStorage(keyToCheck)) {
    var myModal = new bootstrap.Modal(document.getElementById("myModal5"));
    myModal.show();
    clearaddcart();
    setTimeout(() => {
      window.location.href = "review.html";
    }, 5000);
  } else {
    var myModal = new bootstrap.Modal(document.getElementById("myModal6"));
    myModal.show();
    setTimeout(() => {
      window.location.href = "signup.html";
    }, 2000);
  }
});
function clearaddcart() {
  document.querySelector(".cart-content").innerHTML = "";
  updateTotal();
}
