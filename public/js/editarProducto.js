window.addEventListener("load", function () {
  let precioEP = document.getElementById("precioEP");
  let cantidadEP = document.getElementById("cantidadEP");

  let tamanioS = document.getElementById("tamanioS");
  let tamanioM = document.getElementById("tamanioM");
  let tamanioL = document.getElementById("tamanioL");

  let colorWhite = document.getElementById("colorWhite");
  let colorRed = document.getElementById("colorRed");
  let colorBlack = document.getElementById("colorBlack");

  let priceAlert = document.getElementById("priceAlert");
  let colorAlert = document.getElementById("colorAlert");
  let sizeAlert = document.getElementById("sizeAlert");
  let quantityAlert = document.getElementById("quantityAlert");

  let btnGuardar = document.getElementById("btnEP");
  
  btnGuardar.addEventListener("mouseover", beforeSave);
  btnGuardar.addEventListener("click", onSave);
  precioEP.addEventListener("blur", mouseLeavePrice)
  cantidadEP.addEventListener("blur", mouseLeaveQuantity)

  let sizeValidate =
    !tamanioS.checked && 
    !tamanioM.checked && 
    !tamanioL.checked;

  let colorValidate =
    !colorWhite.checked && 
    !colorRed.checked && 
    !colorBlack.checked;

  function beforeSave() {

    if (
      !sizeValidate && 
      !colorValidate &&
      precioEP.value > 0 && 
      cantidadEP.value > 0 
      ) {
      btnGuardar.type = "submit";
    }
  }

  function onSave() {
    if (sizeValidate) {
      sizeAlert.style.display = "block";
      btnGuardar.type = "button";
    }
    if (colorValidate) {
      colorAlert.style.display = "block";
      btnGuardar.type = "button";
    }
    if (precioEP.value < 1) {
      priceAlert.style.display = "block";
      btnGuardar.type = "button";
    }
    if (cantidadEP.value < 1) {
      quantityAlert.style.display = "block";
      btnGuardar.type = "button";
    }

  }

  function mouseLeavePrice(){
    if (precioEP.value < 1) {
        priceAlert.style.display = "block";
        btnGuardar.type = "button";
      }
      else{
        priceAlert.style.display = "none";
      }
  }

  function mouseLeaveQuantity(){
    if (cantidadEP.value < 1) {
      quantityAlert.style.display = "block";
      btnGuardar.type = "button";
      }
      else{
        quantityAlert.style.display = "none";
      }
  }
});
