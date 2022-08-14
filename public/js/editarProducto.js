window.addEventListener("load", function () {
  let precioEP = document.getElementById("precioEP");
  let cantidadEP = document.getElementById("cantidadEP");
  let descripcionEP = document.getElementById("descripcionEP");
  let imagenes = document.getElementById("imagenes");
  let tamanioS = document.getElementById("tamanioS");
  let tamanioM = document.getElementById("tamanioM");
  let tamanioL = document.getElementById("tamanioL");

  let colorWhite = document.getElementById("colorWhite");
  let colorRed = document.getElementById("colorRed");
  let colorBlack = document.getElementById("colorBlack");

  let imageAlert = document.getElementById("imageAlert");
  let priceAlert = document.getElementById("priceAlert");
  let colorAlert = document.getElementById("colorAlert");
  let sizeAlert = document.getElementById("sizeAlert");
  let quantityAlert = document.getElementById("quantityAlert");
  let descriptionAlert = document.getElementById("descriptionAlert");
  let button = document.getElementById("btnEP");

  button.addEventListener("click", onSave);
  precioEP.addEventListener("focusout", mouseLeavePrice);
  cantidadEP.addEventListener("focusout", mouseLeaveQuantity);
  descripcionEP.addEventListener("focusout", mouseLeaveDescription);

  function onSave() {
    if (evalFunction()) {
      button.type = "submit";
      button.click();
    } else {
      button.type = "button";
      btnAlert();
    }
  }
  function evalFunction() {
    let functionsArray = [
      mouseLeavePrice(),
      onSelectImage(),
      mouseLeaveQuantity(),
      mouseLeaveDescription(),
      oneColor(),
      oneSize(),
    ];
    let validation = true;

    functionsArray.forEach((element) => {
      validation = element && validation;
    });
    return validation;
  }

  function btnAlert() {
    button.classList.add("shakebtn");
    setTimeout(() => {
      button.classList.remove("shakebtn");
    }, 1000);
  }

  function oneColor() {
    if (colorWhite.checked || colorRed.checked || colorBlack.checked) {
      colorAlert.style.display = "none";
      // console.log("true color");
      return true;
    } else {
      // console.log("false color");
      colorAlert.style.display = "block";
      return false;
    }
  }

  function oneSize() {
    if (tamanioS.checked || tamanioM.checked || tamanioL.checked) {
      sizeAlert.style.display = "none";
      return true;
    } else {
      sizeAlert.style.display = "block";
      return false;
    }
  }

  function onSelectImage() {
    if (imagenes.value.length < 1) {
      imageAlert.style.display = "none";
      return true; // not image upload mandatory in edit product
    }
    let imageName = imagenes.value;
    let imageFormat = imageName.split(".");
    let format = imageFormat[imageFormat.length - 1];
    format = format.toLowerCase();
    let acceptedFormats = ["jpg", "jpeg", "png", "webp"];
    let formatValid = false;
    acceptedFormats.forEach((formatInArray) => {
      if (format == formatInArray) {
        formatValid = true;
      }
    });
    if (formatValid) {
      imageAlert.style.display = "none";
      return true;
    } else {
      imageAlert.style.display = "block";
      return false;
    }
  }

  function mouseLeavePrice() {
    if (precioEP.value < 1) {
      priceAlert.style.display = "block";

      return false;
    } else {
      priceAlert.style.display = "none";
      return true;
    }
  }

  function mouseLeaveDescription() {
    if (descripcionEP.value.length < 20) {
      descriptionAlert.style.display = "block";
      return false;
    } else {
      descriptionAlert.style.display = "none";
      return true;
    }
  }

  function mouseLeaveQuantity() {
    if (cantidadEP.value < 1) {
      quantityAlert.style.display = "block";
      return false;
    } else {
      quantityAlert.style.display = "none";
      return true;
    }
  }
});
