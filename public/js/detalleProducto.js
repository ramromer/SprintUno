
window.addEventListener("load", function () {

  let minusBtn = document.getElementById("minusBtn");
  let cantidad = document.getElementById("cantidad");
  let plusBtn = document.getElementById("plusBtn");
  let zeroAlert = document.getElementById("zeroAlert");
  let maxAlert = document.getElementById("maxAlert");

  minusBtn.addEventListener("click", minusBtnFunction);
  cantidad.addEventListener("change", cantidadChange);
  plusBtn.addEventListener("click", plusBtnFunction);

  cantidad.value = 1;

  function minusBtnFunction() {
    if (cantidad.value <= 1) {
      cantidad.value = 1;
      zeroAlert.style.display = "none";
    } else {
      if(parseInt(cantidad.value) > parseInt(cantidad.max) ){
        cantidad.value = cantidad.max;
        maxAlert.style.display = "none";
        return
        }
      cantidad.value -= 1;
      zeroAlert.style.display = "none";
    }
  }
  
  function plusBtnFunction() {

    if (parseInt(cantidad.value) >= parseInt(cantidad.max) ) {
      cantidad.value = cantidad.max;
      maxAlert.style.display = "none";
    } else {
      if(parseInt(cantidad.value) <= 0 ){
      cantidad.value = 1;
      zeroAlert.style.display = "none";
      return
      }
      cantidad.value = parseInt(cantidad.value) + 1;
      maxAlert.style.display = "none";
    }
  }

  function cantidadChange() {
    if ( isNaN(parseInt(cantidad.value))){
      cantidad.value = 1;
    }
    if (parseInt(cantidad.value) <= 0 ) {
      zeroAlert.style.display = "block"
    } else if ( parseInt(cantidad.value) > parseInt(cantidad.max)){
      maxAlert.style.display = "block";
    }
    else{
      zeroAlert.style.display = "none"
      maxAlert.style.display = "none";
    }
  }

});
