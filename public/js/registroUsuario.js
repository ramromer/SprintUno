window.addEventListener("load", function () {
  if (document.URL.startsWith("http://localhost")) {
    url = `http://localhost:3000`;
  } else {
    url = ""; // cambiar al deploy
  }

  let email = document.getElementById("email");
  let yaexiste = document.getElementById("yaexisteemail");
  let button = document.getElementById("submitBtn");
  let eye = document.getElementById("eye");
  let eye2 = document.getElementById("eye2");

  let pwShown = 0;
  var pwShown1 = 0;

  eye.addEventListener("click", eyeFunc);
  eye2.addEventListener("click", eye2Func);
  email.addEventListener("blur", () => {
    askRegister(email.value);
  });

  function askRegister(checking) {
    fetch(`${url}/users/register/${checking}`)
      .then((res) => {
        return res.json();
      })
      .then((respuesta) => {
        if (respuesta == 1) {
          yaexiste.style.display = "block";
          button.disabled = true;
        } else {
          yaexiste.style.display = "none";
          button.disabled = false;
        }
      });
  }

  function show() {
    var p = document.getElementById("drowssap0");
    p.setAttribute("type", "text");
  }

  function hide() {
    var p = document.getElementById("drowssap0");
    p.setAttribute("type", "password");
  }

  function eyeFunc() {
    if (pwShown == 0) {
      pwShown = 1;
      document.getElementById("eye").classList.add("fa-eye-slash");
      document.getElementById("eye").classList.remove("fa-eye");
      show();
    } else {
      pwShown = 0;
      document.getElementById("eye").classList.add("fa-eye");
      document.getElementById("eye").classList.remove("fa-eye-slash");
      hide();
    }
  }

  // </script>
  // <script>
  function show1() {
    var p1 = document.getElementById("drowssap1");
    p1.setAttribute("type", "text");
  }

  function hide1() {
    var p1 = document.getElementById("drowssap1");
    p1.setAttribute("type", "password");
  }

  function eye2Func() {
    if (pwShown1 == 0) {
      pwShown1 = 1;
      document.getElementById("eye2").classList.add("fa-eye-slash");
      document.getElementById("eye2").classList.remove("fa-eye");
      show1();
    } else {
      pwShown1 = 0;
      document.getElementById("eye2").classList.add("fa-eye");
      document.getElementById("eye2").classList.remove("fa-eye-slash");
      hide1();
    }
  }
});
