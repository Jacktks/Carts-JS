var xhttp = new XMLHttpRequest();
var dataProducts = [];
var products = document.querySelector(".shop-grid__columns");
var cart = JSON.parse(localStorage.getItem("cart")) || [];

xhttp.open("GET", "http://localhost:3007/products", true);
xhttp.send();

xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    dataProducts = JSON.parse(xhttp.responseText);
    console.log(dataProducts);
    showProduct(dataProducts);
  }
};

//Hàm update số lượng Carts
function updateCartNumbers() {
  var sumCartNumbers = 0;

  for (var i = 0; i < cart.length; i++) {
    sumCartNumbers += parseInt(cart[i].inCart);
  }

  document.querySelector(".header__cart--amount").innerHTML =
    sumCartNumbers + " Sản phẩm";
}

updateCartNumbers();

function addToCart(i) {
  var repeat = false;

  for (var j = 0; j < cart.length; j++) {
    if (cart[j].id == dataProducts[i].id) {
      repeat = true;
      cart[j].inCart += 1;
      break;
    }
  }

  if (repeat == false) {
    cart.push(dataProducts[i]);
  }

  localStorage.setItem("cart", JSON.stringify(cart) || []);
  alert("Add To Cart Successfully !!!");
  updateCartNumbers();
}
function showProduct(dataProducts) {
  for (var i = 0; i < dataProducts.length; i++) {
    if (products != null) {
      products.innerHTML += `<div class="product-grid__box">
                                <div class= "product-grid__img">
                                    <a href="">
                                        <img src="../assets/images/data/${dataProducts[i].image}" alt="">
                                    </a>
                                    <span class="product-grid__label"></span>
                                    <div class="product-grid__overlay"></div>
                                    <div class="product-grid__link">
                                        <button class="product-grid__link--add" onclick="addToCart(${i})">Add to cart</button>
                                    </div>
                                </div>
                                <div class="product-grid__content">
                                    <h3 class="product-grid__content--name">
                                        <a href="">${dataProducts[i].name}</a>
                                    </h3>
                                </div>
                                <div class="product-grid__evaluate">
                                    <i aria-hidden='true' class="fa fa-star"></i>
                                    <i aria-hidden='true' class="fa fa-star"></i>
                                    <i aria-hidden='true' class="fa fa-star"></i>
                                    <i aria-hidden='true' class="fa fa-star"></i>
                                    <i aria-hidden='true' class="fas fa-star-half-alt"></i>
                                </div>
                                <div class="product-grid__price">
                                    <span class="product-grid__price--sale">${dataProducts[i].nprice}</span>
                                    <span class="product-grid__price--old">${dataProducts[i].oprice}</span>
                                </div>
                            </div>`;
    }
  }
}
// var infoCartHeader = JSON.parse(localStorage.getItem("totalCartHeader"));
// var selectCartHeader = document.querySelector(".header__cart--amount");

// function infoQuantityCart() {
//   selectCartHeader.innerHTML = infoCartHeader + " Sản phẩm";
// }

// console.log(infoCartHeader);
// console.log(selectCartHeader);

// infoQuantityCart();
// Cách 2

// function addToCart(id) {
//     if (typeof(Storage) !== 'undefined') {
//         //Tìm key trong localStorage, số lượng key.length khác 0 => làm việc check kiểm tra xem thông tin dưới,
//         //nếu không khác 0 thì dĩ nhiên sẽ addNewProduct qty +1
//         var keys = Object.keys(localStorage),
//             i = keys.length;
//             console.log(i);
//             if (i !== 0) {
//                 // nếu không tìm thấy id trong object Localstorage thì addnew qty + 1 còn nếu có thì update qty +1
//                 if (!localStorage.hasOwnProperty(id)) {
//                     addNewProduct(id);
//                 } else{
//                     updateProduct(id);
//                 }
//             } else{
//                 addNewProduct(id);
//             }
//         numMiniCart();
//     }
// }
// function updateProduct(id) {
//     var getIdUpdate = JSON.parse(localStorage.getItem(id));
//     localStorage.setItem(id,JSON.stringify({ qty: getIdUpdate.qty + 1 }));
// }
// function addNewProduct(id) {
//     localStorage.setItem(id, JSON.stringify({ qty: 1 }));
// }
// //Mini cart on header
// function numMiniCart(){
//     //Select đến id .header__cart
//     var num = document.querySelector('.header__cart--amount'),
//         curentNum = 0,
//         //Tìm ra các id là các Object.key trong localstorage
//         keys = Object.keys(localStorage);
//         //Lọc qua các key để lấy value trong object có từng qty trong từng key rồi + lên
//         keys.forEach(function(index){
//             curentNum += JSON.parse(localStorage.getItem(index)).qty;
//         })

//     num.innerHTML = curentNum + " Sản phẩm";
// }
// numMiniCart();

//Show Cart
