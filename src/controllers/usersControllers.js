//const {validationResult} = require('express-validator');

let usersController = {
    login: (req, res) => {
        //let errors = validationResult(req);
        res.render('./users/login.ejs')
    },

    register: (req,res) => {
        //let errors = validationResult(req); 
        // if (!errors.isEmpty()){
        //     return res.render('./users/register.ejs',{errors:errors.mapped()});
        // }else{
            res.render('./users/register.ejs');
        // }
    },
    
    notFound: (req, res) => {
        res.render('notFound')
    }
}

module.exports = usersController;