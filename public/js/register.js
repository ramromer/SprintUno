const db = require('../../src/data/models');


window.addEventListener('load', function(){
    
    let email = document.getElementById("email");
    let yaexiste = document.getElementById("yaexisteemail");
    
    email.addEventListener("focusout", function () {
        esto(email.value);
    });
    // console.log('alguito');
    // Window.alert('hola');
});

esto = function (asd){
    return new Promise((resolve, reject) => {
        db.User.findOne({where:{email:asd}}).then(function(user){
          
          if(Boolean(user)) {
           // reject()
            console.log('aqui');
            yaexiste.style.display = 'block'
          }
          resolve(true)
        //   document.getElementById("yaexisteemail").style.setProperty("display","none");
            yaexiste.style.display = 'none'
            console.log('aqui')
        }).catch(err => {console.log(err); reject(new Error('Error en el servidor'))});
      });
}