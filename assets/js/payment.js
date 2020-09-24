//Payment
var showInfoCustomer = document.querySelector(".payment__info-customer");
var showInfoProduct = document.querySelector(".payment__product");
console.log(showInfoCustomer);

var inforCustomer = JSON.parse(localStorage.getItem("information"));
console.log(inforCustomer);

function showInfoCus() {
  if (showInfoCustomer != null) {
    showInfoCustomer.innerHTML += `<div class="payment__info">
                        <div class="payment__info--name">
                            <p>Người nhận: 
                                <span>${inforCustomer.receiver}</span>
                            </p>
                        </div>
                        <div class="payment__info--name">
                            <p>Địa chỉ: 
                                <span>${inforCustomer.add}</span>
                            </p>
                        </div>
                        <div class="payment__info--name">
                            <p>Email: 
                                <span>${inforCustomer.email}</span>
                            </p>
                        </div>
                        <div class="payment__info--name">
                            <p>Số điện thoại: 
                                <span>${inforCustomer.phone}</span>
                            </p>
                        </div>
                    </div>`;
  }
}
showInfoCus();

var selectTableCart = document.querySelector(".table-payment");
// console.log(selectTableCart);
// var totals = 0;
// var VatTotals = 0;
// var totalsPayment = 0;

function showProductPayment(data) {
  return data.map(function (item) {
    if (showInfoProduct != null) {
      return (showInfoProduct.innerHTML += `<tr>
                                                <td class="cart__product--img">
                                                    <a href="#">
                                                        <img src="../assets/images/data/${
                                                          item.image
                                                        }" alt="image">
                                                    </a>
                                                </td>
                                                <td class="cart__product--name">
                                                    <a href="#">
                                                        ${item.name}
                                                    </a>
                                                </td>
                                                <td class="cart__product--price" data-title='đơn giá'>
                                                    <span href="#" class="unit-amount">
                                                        ${item.nprice
                                                          .toString()
                                                          .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            "."
                                                          )}<sup>đ</sup>
                                                    </span>
                                                </td>
                                                <td class="cart__product--quantity" data-title='số lượng'>
                                                    <span href="#" class="">
                                                        ${item.inCart}
                                                    </span>
                                                </td>
                                                <td class="cart__product--total" data-title='thành tiền'>
                                                    <span href="#" class="subtotal-amount">
                                                        ${(
                                                          item.nprice *
                                                          item.inCart
                                                        )
                                                          .toString()
                                                          .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            "."
                                                          )}<sup>đ</sup>
                                                    </span>
                                                </td>
                                            </tr>
            
        `);
    }
  });
}
showProductPayment(cart);

var selectTotalInfo = JSON.parse(localStorage.getItem("infoTotalPayment"));

if (selectTableCart != null) {
  selectTableCart.innerHTML += `
            <tbody>
                    <tr>
                        <td>tổng tiền (Chưa thuế)<td>
                        ${selectTotalInfo.valueTotals
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup> đ</sup>
                    </tr>
                    <tr>
                        <td>thuế (vat 10%)<td>
                        ${selectTotalInfo.valueVat
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup> đ</sup>
                    </tr>
                    <tr class="cart__pay--background">
                        <td>Tổng phải thanh toán<td>
                        ${selectTotalInfo.valueTotalsCheckout
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup> đ</sup>
                    </tr>
                </tbody>
        `;
}

var selectBtnCheckout = document.querySelector(".btn__checkoutalls");
console.log(selectBtnCheckout);
if (selectBtnCheckout != null) {
  selectBtnCheckout.addEventListener("click", clearItemandLoadPage);
}

function clearItemandLoadPage() {
  if (window.confirm("You sure checkout!!!")) {
    localStorage.clear();
    location.href = "../../index.html";
  }
}
