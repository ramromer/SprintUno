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
  let pass1 = document.getElementById("drowssap0");
  let pass2 = document.getElementById("drowssap1");

  let fullnameAlert = document.getElementById("fullnameAlert");
  let fullAddressAlert = document.getElementById("fullAddressAlert");
  let bDayAlert = document.getElementById("bDayAlert");
  let userAlert = document.getElementById("userAlert");
  let passAlert = document.getElementById("passAlert");
  let passAlert2 = document.getElementById("passAlert2");
  let fullName = document.getElementById("fullname");
  let fullAddress = document.getElementById("fulladdress");
  let bDay = document.getElementById("bday");
  let user = document.getElementById("user");
  let fullNameFlag = false;
  let fullAddressFlag = false;
  let userFlag = false;
  let bDayFlag = false;

  fullName.addEventListener("focusout", fullNameFunction);
  fullAddress.addEventListener("focusout", fullAddressFunction);
  bDay.addEventListener("focusout", bDayFunction);
  user.addEventListener("focusout", userFunction);
  pass1.addEventListener("focusout", mouseLeavePass);
  eye1.addEventListener("click", eyeFunc);
  eye2.addEventListener("click", eye2Func);

  function fullNameFunction() {
    if (fullName.value.length < 5) {
      fullnameAlert.style.display = "block";
	  button.type = "button";
	  fullNameFlag = false;
    } else {
      fullnameAlert.style.display = "none";
	  button.type = "submit";
	  fullNameFlag = true;
    }
  }

  function fullAddressFunction() {
    if (fullAddress.value.length < 5) {
      fullAddressAlert.style.display = "block";
	  button.type = "button";
	  fullAddressFlag = false;
    } else {
      fullAddressAlert.style.display = "none";
	  button.type = "submit";
	  fullAddressFlag = true;
    }
  }

  function bDayFunction() {
    // First check for the pattern
    if (/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/.test(bDay.value)) {
		bDayAlert.style.display = "block";
		button.type = "button";
      return;
    }
	
    let parts = bDay.value.split("-");
    let day = parseInt(parts[2], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if (year < 1800 || year > 2022 || month == 0 || month > 12) {
		bDayAlert.style.display = "block";
		button.type = "button";
      return;
    }

    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }
    if (day <= 0 && day > monthLength[month - 1]) {
		bDayAlert.style.display = "block";
		button.type = "button";
      return;
    }

    bDayAlert.style.display = "none";
	button.type = "submit";
  }

  function userFunction() {
    if (user.value.length < 5) {
      userAlert.style.display = "block";
	  userFlag =false;
    } else {
      userAlert.style.display = "none";
	  userFlag =true;
    }
  }

  function pass2Function() {


    if (pass2.value != pass1.value) {
		passAlert.style.display = "block";
    } else {
		passAlert.style.display = "none";
    }
  }

  function beforeSave() {
    if (!emailErrorFlag && !passErrorFlag) {
      btnLogin.type = "submit";
    } else {
      btnLogin.type = "button";
    }
  }

  function onSave() {
    if (emailErrorFlag) {
      emailAlert.style.display = "block";
    }
    if (passErrorFlag) {
      passAlert.style.display = "block";
    }
  }


  function mouseLeavePass() {

	pass2.addEventListener("change", pass2Function);
    pass1.addEventListener("change", pass2Function);

    if (pass1.value.length < 8) {
		passAlert2.style.display = "block";
    //   button.type = "button";
    //   passErrorFlag = true;
    } else {
    //   passErrorFlag = false;
	passAlert2.style.display = "none";
    }
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
