let usersController = {
    login: (req, res) => {
        res.render('./users/login.ejs')
    },

    register: (req,res) => {
        res.render('./users/register.ejs');
    },
    
    notFound: (req, res) => {
        res.render('notFound')
    }
}

module.exports = usersController;