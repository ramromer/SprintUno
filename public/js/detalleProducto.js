window.addEventListener("load", function () {

  let cantidad = document.getElementById("cantidad");

  window.addEventListener("submit", hit);
 

  function hit() {
   
  }

  // let passworLogin = document.getElementById("passworLogin");
  // let btnLogin = document.getElementById("btnLogin");

  // let emailAlert = document.getElementById("emailAlert");
  // let emailValidAlert = document.getElementById("emailValidAlert");
  // let passAlert = document.getElementById("passAlert");

  // let emailErrorFlag = true;
  // let passErrorFlag = true;

  // userLogin.addEventListener("blur", mouseLeaveEmail);
  // passworLogin.addEventListener("blur", mouseLeavePass);
  // btnLogin.addEventListener("mouseover", beforeSave);
  // btnLogin.addEventListener("click", onSave);

  // function beforeSave() {
  //   if (!emailErrorFlag && !passErrorFlag) {
  //     btnLogin.type = "submit";
  //   } else {
  //     btnLogin.type = "button";
  //   }
  // }
  // function onSave() {
  //   if (emailErrorFlag) {
  //     emailAlert.style.display = "block";
  //   }
  //   if (passErrorFlag) {
  //     passAlert.style.display = "block";
  //   }
  // }

  // function mouseLeaveEmail() {
  //   const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //   if (userLogin.value < 1) {
  //     btnLogin.type = "button";
  //     emailAlert.style.display = "block";
  //     emailErrorFlag = true;
  //     emailValidAlert.style.display = "none";
  //   } else {
  //     emailAlert.style.display = "none";
  //     if (!userLogin.value.match(validRegex)) {
  //       emailValidAlert.style.display = "block";
  //     emailErrorFlag = true;
  //     } else {
  //       emailValidAlert.style.display = "none";
  //       emailErrorFlag = false;
  //     }
  //   }
  // }

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
