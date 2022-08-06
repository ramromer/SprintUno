window.addEventListener("load", function () {

   window.addEventListener("submit", hit);
 

  function hit() {
   alert('hit');
  }

  let minusBtn = document.getElementById("minusBtn");
  let cantidad = document.getElementById("cantidad");
  let plusBtn = document.getElementById("plusBtn");



  minusBtn.addEventListener("click", minusBtnFunction);
  cantidad.addEventListener("mouseover", mouseLeavesCantidad);
  plusBtn.addEventListener("click", plusBtnFunction);

  function minusBtnFunction() {
    if (cantidad.value<= 1) {
      cantidad.value = 1;
    } else {
      cantidad.value -= 1;
    }
  }
  function plusBtnFunction() {

    if (parseInt(cantidad.value) >= parseInt(cantidad.max)) {
      cantidad.value = cantidad.max;
    } else {
      cantidad.value = parseInt(cantidad.value)+1;
    }
  }

  function mouseLeavesCantidad() {
    // const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // if (userLogin.value < 1) {

    // } else {
    //   emailAlert.style.display = "none";
    //   if (!userLogin.value.match(validRegex)) {
    //     emailValidAlert.style.display = "block";
    //   emailErrorFlag = true;
    //   } else {
    //     emailValidAlert.style.display = "none";
    //     emailErrorFlag = false;
    //   }
    // }
  }

  // function mouseLeavePass() {
  //   if (passworLogin.value.length < 1) {
  //     passAlert.style.display = "block";
  //     btnLogin.type = "button";
  //     passErrorFlag = true;
  //   } else {
  //     passErrorFlag = false;
  //     passAlert.style.display = "none";
  //   }
  // }
});
