//Cách 1: Hàm update số lượng Carts
function updateCartNumbers() {
  var sumCartNumbers = 0;

  for (var i = 0; i < cart.length; i++) {
    sumCartNumbers += parseInt(cart[i].inCart);
  }

  document.querySelector(".header__cart--amount").innerHTML =
    sumCartNumbers + " Sản phẩm";
}

//Show cart
var sumPrice = 0;

var classCart = document.querySelector(".cart__product");
var btnDelete = document.querySelector(".btn__delete");
var btnCheckout = document.querySelector(".btn__checkout");
var cartTablepay = document.querySelector(".table-pay");

//Hàm updateCArt, if có giá trị cart trong local thì hiển thị ra thông tin và các button không thì hiển thị empty và button tiếp tục mua!!!
function updateCart() {
  if (cart.length == 0) {
    if (classCart != null) {
      classCart.innerHTML += `<tr>
                                    <td colspan="6">
                                        <p class="cart__empty"> the Cart Is Empty, Please Click Button!!!</p>
                                    </td>
                                </tr>`;
      btnDelete.remove();
      btnCheckout.remove();
      cartTablepay.remove();
    }
  } else {
    for (var i = 0; i < cart.length; i++) {
      if (classCart != null) {
        classCart.innerHTML += `<tr>
                                        <td class="cart__product--img">
                                            <a href="#">
                                                <img src="../assets/images/data/${
          cart[i].image
          }" alt="image">
                                            </a>
                                        </td>
                                        <td class="cart__product--name">
                                            <a href="#">
                                                ${cart[i].name}
                                            </a>
                                        </td>
                                        <td class="cart__product--price" data-title='đơn giá'>
                                            <span href="#" class="unit-amount">
                                                ${cart[i].nprice
            .toString()
            .replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            )}<sup>đ</sup>
                                            </span>
                                        </td>
                                        <td class="cart__product--quantity" data-title='số lượng'>
                                            <input type="number" value=${
          cart[i].inCart
          } 
                                              id=${
          cart[i].id
          } class="cart__product--num" 
                                            onchange="onchangeQuantity(${
          cart[i].id
          })">
                                        </td>
                                        <td class="cart__product--total" data-title='thành tiền'>
                                            <span href="#" class="subtotal-amount">
                                                ${(
            cart[i].nprice *
            cart[i].inCart
          )
            .toString()
            .replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            )}<sup>đ</sup>
                                            </span>
                                        </td>
                                        <td class="cart__product--remove" data-title='xóa'>
                                            <a class="remove-item">
                                                <i class="fa fa fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>`;
        sumPrice += cart[i].nprice * cart[i].inCart;
      }
    }
  }
}
updateCart();

//Remove Item: Select class remove-item, vòng for lọc qua các class, rồi thực hiện

var removeItem = document.getElementsByClassName("remove-item");
for (let i = 0; i < removeItem.length; i++) {
  removeItem[i].onclick = function () {
    if (window.confirm("You sure want delete item??")) {
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    }
  };
}

//Select button DeleteAll
var removeAll = document.querySelector(".btn__delete");

//Check nếu có DOM btn__delete thì mới thực hiện hàm addEven
if (removeAll != null) {
  removeAll.addEventListener("click", removeAllCart);
}
//Hàm RemoveAllCart

function removeAllCart() {
  if (window.confirm("Bạn có chắc chắn muốn xóa hết sản phẩm?")) {
    localStorage.setItem("cart", JSON.stringify([]));
    // console.log(localStorage.getItem("totalsCheckout"));
    location.reload();
  }
}

var VAT = sumPrice / 10;
var totalPay = sumPrice + VAT;

//Hafm update table total pay
function updateTablepay() {
  if (cartTablepay != null) {
    cartTablepay.innerHTML += `
                <tbody>
                    <tr class="table-pay__totals">
                        <td>tổng tiền (Chưa thuế)<td>
                          <span>${sumPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </span><sup> đ</sup>
                    </tr>
                    <tr class="table-pay__vat">
                        <td>thuế (vat 10%)<td>
                          <span>${VAT.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        )}</span><sup> đ</sup>
                    </tr>
                    <tr class="cart__pay--background table-pay__checkout">
                        <td>Tổng phải thanh toán<td>
                          <span>${totalPay
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </span><sup> đ</sup>
                    </tr>
                </tbody>
            `;
  }
}
updateTablepay();

var totalsPayment = document.querySelector(".table-pay__totals span");
var totalsVat = document.querySelector(".table-pay__vat span");
var totalsCheckout = document.querySelector(".table-pay__checkout span");

function onchangeQuantity(id) {
  var valueInput = document.querySelectorAll(
    ".cart__product--quantity .cart__product--num"
  );
  console.log(valueInput);
  var valueTotal = document.querySelectorAll(".subtotal-amount");
  var updateTotals = 0;
  var updateVat = 0;
  var updateTotalsCheckout = 0;

  for (var i = 0; i < valueInput.length; i++) {
    if (valueInput[i].value >= 1) {
      console.log(valueInput[i].value);
      valueTotal[i].innerHTML = (parseInt(valueInput[i].value) * cart[i].nprice)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      valueInput[i].value = 1;
      valueTotal[i].innerHTML = cart[i].nprice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    updateTotals += parseInt(valueInput[i].value) * cart[i].nprice;
    updateVat = updateTotals / 10;
    updateTotalsCheckout = updateTotals + updateVat;

    totalsPayment.innerHTML = updateTotals
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    totalsVat.innerHTML = updateVat
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    totalsCheckout.innerHTML = updateTotalsCheckout
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    cart[i].inCart = parseInt(valueInput[i].value);
    updateCartNumbers();

    var infoTotalPayment = {
      valueTotals: updateTotals,
      valueVat: updateVat,
      valueTotalsCheckout: updateTotalsCheckout,
    };
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("infoTotalPayment", JSON.stringify(infoTotalPayment));
  }
}
onchangeQuantity();
