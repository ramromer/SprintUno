window.addEventListener("load", function () {
  if (document.URL.startsWith("http://localhost")) {
    url = `http://localhost:3010`;
  } else {
    url = ""; // cambiar al deploy
  }

  let email = document.getElementById("email");
  let button = document.getElementById("submitBtn");
  let eye1 = document.getElementById("eye");
  let eye2 = document.getElementById("eye2");
  let pass1 = document.getElementById("drowssap0");
  let pass2 = document.getElementById("drowssap1");

  let pwShown = 0;
  
  var pwShown1 = 0;

  eye1.addEventListener("click", eyeFunc);
  eye2.addEventListener("click", eye2Func);


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
