window.addEventListener("load", function () {
  if (document.URL.startsWith("http://localhost")) {
    url = `http://localhost:${procces.env.PORT}`;
  } else {
    url = procces.env.URL_DEPLOY;
  }

  let email = document.getElementById("email");
  let yaexiste = document.getElementById("yaexisteemail");
  let button = document.getElementById("submitBtn");
  function askRegister(checking) {
    fetch(`${url}/users/register/${checking}`);
    fetch(`/users/register/${checking}`) //ojo aca luego deberemos cambiar la ruta si hacemos deploy en heroku
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

  email.addEventListener("focusout", function () {
    askRegister(email.value);
  });
});
