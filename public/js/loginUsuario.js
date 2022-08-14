window.addEventListener("load", function () {
  let userLogin = document.getElementById("userLogin");
  let passworLogin = document.getElementById("passworLogin");
  let button = document.getElementById("btnLogin");

  let emailAlert = document.getElementById("emailAlert");
  let emailValidAlert = document.getElementById("emailValidAlert");
  let passAlert = document.getElementById("passAlert");

  userLogin.addEventListener("focusout", mouseLeaveEmail);
  passworLogin.addEventListener("focusout", mouseLeavePass);
  button.addEventListener("click", onSave);

  function btnAlert(){
    button.classList.add("shakebtn");
      setTimeout(() => {  button.classList.remove("shakebtn"); }, 1000);
  }
  
  function onSave() {
    if(evalFunction()){
      button.type = "submit";
      button.click()

    } else {
      button.type = "button";
      btnAlert();
    }
  }

  function evalFunction() {
    let functionsArray = [
      mouseLeavePass(), mouseLeaveEmail()
    ];
    let validation = true;

    functionsArray.forEach((element) => {
      validation = element && validation;
    });
    return validation;
  }

  function mouseLeaveEmail() {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (userLogin.value < 1) {
      button.type = "button";
      emailAlert.style.display = "block";
      emailValidAlert.style.display = "none";
      return false;
    } else {
      emailAlert.style.display = "none";
      if (!userLogin.value.match(validRegex)) {
        emailValidAlert.style.display = "block";
        return false;
      } else {
        emailValidAlert.style.display = "none";
        return true;
      }
    }
  }

  function mouseLeavePass() {
    if (passworLogin.value.length < 1) {
      passAlert.style.display = "block";
      return false;
    } else {
      passAlert.style.display = "none";
      return true;
    }
  }
});