let usersController = {
    login: (req, res) => {
        res.render('login.ejs')
    },

    register: (req,res) => {
        res.render('register.ejs');
    },
    
    notFound: (req, res) => {
        res.render('notFound')
    }
}

module.exports = usersController;