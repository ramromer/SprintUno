

window.addEventListener('load', function(){
    if(document.URL.startsWith('http://localhost')){
        url = 'http://localhost:3000';
    } else{
        url = 'https://#MODIFICARESTO.herokuapp.com'; // CAMBIAR AQUI
    }

    let email = document.getElementById("email");
    let yaexiste = document.getElementById("yaexisteemail");
    let button = document.getElementById("submitBtn");
    function askRegister(checking) {
        fetch(`${url}/users/register/${checking}`)//ojo aca luego deberemos cambiar la ruta si hacemos deploy en heroku
        fetch(`/users/register/${checking}`)//ojo aca luego deberemos cambiar la ruta si hacemos deploy en heroku
        .then((res)=>{return res.json()})
        .then((respuesta) => {
            // console.log(respuesta);
            respuesta==1? yaexiste.style.display = 'block':yaexiste.style.display = 'none';
            respuesta==1? button.disabled = true : button.disabled = false;
        })
        
    }

    email.addEventListener("focusout", function () {
        askRegister(email.value);
    });
});
