let usersController = {
    login: (req, res) => {
        res.render('./users/login.ejs')
    },

    register: (req,res) => {
        res.render('./users/register.ejs');
    },
    
    notFound: (req, res) => {
        res.render('notFound')
    },
//clase#25 hacia abajo /------------------------
    admin: (req, res) => {
            res.send('Hola admin: ' + req.query.user);
    }
//clase#25 hacia arriba /---------------------

}

module.exports = usersController;