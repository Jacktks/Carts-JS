//Info-Customer Page

//Select DOM form
var form = document.getElementById("formCheckout");
var receiver = document.forms["inforForm"]["receiver"];
var email = document.forms["inforForm"]["email"];
var phone = document.forms["inforForm"]["phone"];
var address = document.forms["inforForm"]["address"];
var errReceiver = document.getElementById("err-receiver"),
  errAddress = document.getElementById("err-address"),
  errEmail = document.getElementById("err-email"),
  errPhone = document.getElementById("err-phone");

var submitInfo = document.querySelector(".btn__submitinfo");
var testInput = false;
console.log(submitInfo);

//Kiểm tra TestInput == false thì ẩn button Tiếp tục
if (testInput == false) {
  submitInfo.style.visibility = "hidden";
}

//Click submit kiểm tra thông tin nếu testInput trả về false => ẩn button tiếp tục, nếu true thì hiện item;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkInputs();
  if (testInput == false) {
    submitInfo.style.visibility = "hidden";
  } else {
    submitInfo.style.visibility = "visible";
  }
});

//Chuyển trang khi submit
submitInfo.addEventListener("click", function () {
  location.href = "../../payment.html";
});

//Hàm checkInput nhập vào các giá trị hay chưa hoặc có đúng k!

function checkInputs() {
  var information = {};
  var receiverValue = receiver.value.trim();
  var addressValue = address.value.trim();
  var emailValue = email.value.trim();
  var phoneValue = phone.value.trim();

  if (receiverValue === "") {
    setErrorForm(receiver, "Bạn chưa nhập họ tên khách hàng");
    testInput = false;
  } else {
    setSuccessForm(receiver, "");
    testInput = true;
  }

  if (addressValue === "") {
    setErrorForm(address, "Bạn chưa nhập địa chỉ");
    testInput = false;
  } else {
    setSuccessForm(address, "");
    testInput = true;
  }

  if (emailValue === "") {
    setErrorForm(email, "Bạn chưa nhập email");
    testInput = false;
  } else if (!isEmail(emailValue)) {
    setErrorForm(email, "Email chưa đúng định dạng");
    testInput = false;
  } else {
    setSuccessForm(email, "");
    testInput = true;
  }

  if (phoneValue === "") {
    setErrorForm(phone, "Bạn chưa nhập số điện thoại");
    testInput = false;
  } else if (!isPhone(phoneValue)) {
    setErrorForm(phone, "Bạn chưa nhập đúng định dạng số điện thoại");
    testInput = false;
  } else {
    setSuccessForm(phone, "");
    testInput = true;
  }

  console.log("testInput", testInput);
  if (
    receiverValue === "" ||
    addressValue === "" ||
    emailValue === "" ||
    phoneValue === "" ||
    testInput === false
  ) {
    return false;
  } else {
    information = {
      receiver: receiverValue,
      add: addressValue,
      email: emailValue,
      phone: phoneValue,
    };
    localStorage.setItem("information", JSON.stringify(information));
  }
}

//Hàm set class Error cho form Formgroup
function setErrorForm(input, message) {
  const formGroup = input.parentElement;
  var errMessage = formGroup.querySelector(".error-message");

  errMessage.innerHTML = message;
  formGroup.className = "form-group error";
}

//Hàm set class Success cho form
function setSuccessForm(input, message) {
  const formGroup = input.parentElement;
  var errMessage = formGroup.querySelector(".error-message");

  errMessage.innerHTML = message;
  formGroup.className = "form-group success";
}

//Hàm check ismail
function isEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

//Hàm check Số điện thoại

function isPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}
