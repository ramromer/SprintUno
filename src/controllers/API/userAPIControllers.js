const db = require("../../data/models");
const sequelize = require("Sequelize");

let usersController = {
    getUsers: async (req, res) => {
        try {
            let users = await db.User.findAndCountAll({

                attributes: [
                    ["idUser", "id"],
                    ["fullname", "name"],
                    "email"],
                raw: true,
            });

            if (users === null) {
                res.status(204).send()
            } else {
                for (let i = 0; i < users.rows.length; i++) {
                    users.rows[i].detail = [process.env.URL_Server || process.env.URL_DEV] + `${process.env.PORT}/api/users/${users.rows[i].id}`
                }
                res.status(200).send({ data: {count: users.count, users: users.rows} });
            }
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    },
    getUser: async (req, res) => {
        try {
            let user = await db.User.findOne({
                where: {
                    idUser: [req.params.id || ""],
                },
                attributes: [
                    ["idUser", "id"],
                    ["fullname", "name"],
                    "email",
                    "addres",
                    "birthday",
                    "user",
                    "userimage"
                ],
                raw: true,
            });

            if (user === null) {
                res.status(204).send()
            } else {
                user.image_url = [process.env.URL_Server || process.env.URL_DEV] + `${process.env.PORT}/users/image/${user.userimage}`
                res.status(200).send({ data: user });
            }
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    },

};

module.exports = usersController;
