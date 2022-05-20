//clase#25
const listaUsuariosAdmin = ["Ada", "Greta", "Vim", "Tim"];

function checkAdmin(req, res, next){
    let user = req.query.user;
    let ok = false;
    console.log(ok);

    for (let i=0;i<listaUsuariosAdmin.length;i++){
        if(listaUsuariosAdmin[i]==user){
            ok = true;
        }
    }

        if (ok) {
            next();
        } else {
            res.send('No tienes los privilegios para ingresar');
        }
    
}

module.exports = checkAdmin;

//clase#25