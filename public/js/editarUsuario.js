window.addEventListener("load", function () {
  if (document.URL.startsWith("http://localhost")) {
    url = `http://localhost:3010`;
  } else {
    url = ""; // cambiar al deploy
  }
  let pwShown = 0;
  let pwShown1 = 0;

  let button = document.getElementById("submitBtn");
  let eye1 = document.getElementById("eye");
  let eye2 = document.getElementById("eye2");
  let pass1 = document.getElementById("key");
  let pass2 = document.getElementById("keyAgain");

  let fullnameAlert = document.getElementById("fullnameAlert");
  let imagenes = document.getElementById("profilepic");
  let fullAddressAlert = document.getElementById("fullAddressAlert");
  let bDayAlert = document.getElementById("bDayAlert");
  let userAlert = document.getElementById("userAlert");
  let passAlert = document.getElementById("passAlert");
  let passAlert2 = document.getElementById("passAlert2");
  let fullName = document.getElementById("fullname");
  let fullAddress = document.getElementById("fulladdress");
  let bDay = document.getElementById("bday");
  let user = document.getElementById("user");

  fullName.addEventListener("focusout", fullNameFunction);
  fullAddress.addEventListener("focusout", fullAddressFunction);
  bDay.addEventListener("focusout", bDayFunction);
  user.addEventListener("focusout", userFunction);
  pass1.addEventListener("focusout", mouseLeavePass);
  eye1.addEventListener("click", eyeFunc);
  eye2.addEventListener("click", eye2Func);
  button.addEventListener("click", onSave);

  function fullNameFunction() {
    if (fullName.value.length < 5) {
      fullnameAlert.style.display = "block";
      return false;
    } else {
      fullnameAlert.style.display = "none";
      return true;
    }
  }

  function fullAddressFunction() {
    if (fullAddress.value.length < 5) {
      fullAddressAlert.style.display = "block";
      return false;
    } else {
      fullAddressAlert.style.display = "none";
      return true;
    }
  }

  function bDayFunction() {
    // First check for the pattern
    if (
      /^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/.test(bDay.value) ||
      !bDay.valueAsNumber
    ) {
      bDayAlert.style.display = "block";
      return false;
    }

    let parts = bDay.value.split("-");
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if (year < 1800 || year > 2022 || month == 0 || month > 12) {
      bDayAlert.style.display = "block";
      return false;
    }

    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }
    if (day <= 0 && day > monthLength[month - 1]) {
      bDayAlert.style.display = "block";
      return false;
    }

    bDayAlert.style.display = "none";
    return true;
  }

  function userFunction() {
    if (user.value.length < 5) {
      userAlert.style.display = "block";
      return false;
    } else {
      userAlert.style.display = "none";
      return true;
    }
  }

  function mouseLeavePass() {
    console.log(typeof pass1.value.length);
    console.log(pass1.value.length);
    if (pass1.value.length == 0) {
      passAlert2.style.display = "none";
      return true;
    }

    pass2.addEventListener("change", pass2Function);
    pass1.addEventListener("change", pass2Function);

    if (pass1.value.length < 8) {
      passAlert2.style.display = "block";
      return false;
    } else {
      passAlert2.style.display = "none";
      return true;
    }
  }

  function pass2Function() {
    if (pass2.value != pass1.value) {
      passAlert.style.display = "block";
      return false;
    } else {
      passAlert.style.display = "none";
      return true;
    }
  }

  function btnAlert() {
    button.classList.add("shakebtn");
    setTimeout(() => {
      button.classList.remove("shakebtn");
    }, 1000);
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
      onSelectImage(),
      mouseLeavePass(),
      pass2Function(),
      fullNameFunction(),
      fullAddressFunction(),
      userFunction(),
      bDayFunction(),
    ];
    let validation = true;

    functionsArray.forEach((element) => {
      validation = element && validation;
    });
    return validation;
  }

  function eyeFunc() {
    if (pwShown == 0) {
      pwShown = 1;
      eye1.classList.remove("fa-eye");
      eye1.classList.add("fa-eye-slash");
      pass1.setAttribute("type", "text");
    } else {
      pwShown = 0;
      eye1.classList.add("fa-eye");
      eye1.classList.remove("fa-eye-slash");
      pass1.setAttribute("type", "password");
    }
  }

  function eye2Func() {
    if (pwShown1 == 0) {
      pwShown1 = 1;
      eye2.classList.add("fa-eye-slash");
      eye2.classList.remove("fa-eye");
      pass2.setAttribute("type", "text");
    } else {
      pwShown1 = 0;
      eye2.classList.add("fa-eye");
      eye2.classList.remove("fa-eye-slash");
      pass2.setAttribute("type", "password");
    }
  }
});
