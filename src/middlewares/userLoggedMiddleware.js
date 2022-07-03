const db = require('../data/models');

 async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    console.log("1 cookie logged", req.cookies.user)
    console.log("2 session logged", req.session.userLogged)
    let userLogged = false;

    if(req.cookies.user){
        userLogged = req.cookies.user;
    }
    else if(req.session.userLogged){
        userLogged = req.session.userLogged.user
    }
    
    // if(userLogged){
    //     db.User.findOne({
    //         where:{
    //         user: userLogged
    //       }
    //     }).then((user) => { 
    //         req.session.userLogged = user.user;
           
    //         if ( req.session.userLogged) {
    //             res.locals.isLogged = true;
    //             res.locals.userLogged = req.session.userLogged;
    //         }
    //         next();
    //     }).catch(err => {
    //         console.log("error userLoggedMiddleware: ", err);
    //         return res.redirect('/users/login');
    //     })
    // }
    try{
        if(userLogged){
            let user = await db.User.findOne({
                where:{
                    user: userLogged
                }
            });
             
            req.session.userLogged = user;
                
            if ( req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged.user;
            }
            // next();
        }
    }    
    catch(err){
        console.log("error userLoggedMiddleware: ", err);
        res.redirect('/users/login');
    }
    next();
}

module.exports = userLoggedMiddleware;