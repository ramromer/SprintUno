window.addEventListener("load", function () {
  let precioEP = document.getElementById("precioEP");
  let cantidadEP = document.getElementById("cantidadEP");
  let descripcionEP = document.getElementById("descripcionEP");

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
  let descriptionAlert = document.getElementById("descriptionAlert");

  let btnGuardar = document.getElementById("btnEP");
  
  btnGuardar.addEventListener("mouseover", beforeSave);
  btnGuardar.addEventListener("click", onSave);
  precioEP.addEventListener("blur", mouseLeavePrice)
  cantidadEP.addEventListener("blur", mouseLeaveQuantity)
  descripcionEP.addEventListener("blur", mouseLeaveDescription)


  function beforeSave() {
    if (
      (colorWhite.checked || colorRed.checked || colorBlack.checked)&&
      (tamanioS.checked || tamanioM.checked || tamanioL.checked) &&
      precioEP.value > 0 && 
      cantidadEP.value > 0 &&
      descripcionEP.value.length > 19
      ) {
        console.log("sunmit")
      btnGuardar.type = "submit";
    }else{
      btnGuardar.type = "button";

    }
  }

  function onSave() {
    if (!tamanioS.checked && !tamanioM.checked && !tamanioL.checked) {
      sizeAlert.style.display = "block";
    }else{
      sizeAlert.style.display = "none";
    }
    if (!colorWhite.checked && !colorRed.checked && !colorBlack.checked) {
      colorAlert.style.display = "block";
    }else{
      colorAlert.style.display = "none";
    }
    if (precioEP.value < 1) {
      
    }
    if (cantidadEP.value < 1) {
      quantityAlert.style.display = "block";
    }
    if (descripcionEP.value.length < 20) {
      descriptionAlert.style.display = "block";
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

  function mouseLeaveDescription(){
    if (descripcionEP.value.length < 20) {
        descriptionAlert.style.display = "block";
        btnGuardar.type = "button";
      }
      else{
        descriptionAlert.style.display = "none";
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
