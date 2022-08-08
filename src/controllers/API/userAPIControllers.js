const db = require("../../data/models");

let usersController = {
  getUsers: async (req, res) => {
    try {
      const { page, size } = req.query;
      const getPagination = (page, size) => {
        const limit = size ? +size : 2;
        const offset = page ? page * limit : 0;
        return { limit, offset };
      };

      const { limit, offset } = getPagination(page, size);
      const getPagingData = (data, page, limit) => {
        const { count, rows } = data;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(count / limit);
        return { count, rows, totalPages, currentPage };
      };

      let users = await db.User.findAndCountAll({
        limit,
        offset,
        attributes: [["idUser", "id"], ["fullname", "name"], "email"],
        distinct: "idUser",
        order: [["idUser", "ASC"]],
      });

      if (users === null) {
        res.status(204).send();
      } else {
        users = getPagingData(users, page, limit);
        users = JSON.parse(JSON.stringify(users, null, 2));
         
            if( page == undefined){
            users.next =  [process.env.URL_Server || process.env.URL_DEV] +`${process.env.PORT}/api/users?page=${2}`;
            } else if(page < users.totalPages){
            users.next =  [process.env.URL_Server || process.env.URL_DEV] +`${process.env.PORT}/api/users?page=${parseInt(page)+1}`;
            users.previus = [process.env.URL_Server || process.env.URL_DEV] +`${process.env.PORT}/api/users?page=${page-1}`;
            } else if(page== users.totalPages){
            users.previus = [process.env.URL_Server || process.env.URL_DEV] +`${process.env.PORT}/api/users?page=${page-1}`;
            } else{
            users.previus = [process.env.URL_Server || process.env.URL_DEV] +`${process.env.PORT}/api/users?page=${users.totalPages}`;
            } 

        for (let i = 0; i < users.rows.length; i++) {
          users.rows[i].detail =
            [process.env.URL_Server || process.env.URL_DEV] +
            `${process.env.PORT}/api/users/${users.rows[i].id}`;
        }
        res.status(200).send({
          data: {
            count: users.count,
            users: users.rows,
            totalPages: users.totalPages,
            currentPage: users.currentPage,
            nextPage: users.next,
            previusPage: users.previus,
          },
        });
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
          "userimage",
        ],
        raw: true,
      });

      if (user === null) {
        res.status(204).send();
      } else {
        user.image_url =
          [process.env.URL_Server || process.env.URL_DEV] +
          `${process.env.PORT}/users/image/${user.userimage}`;
        res.status(200).send({ data: user });
      }
    } catch (err) {
      res.status(500).send({ error: err.toString() });
    }
  },
};

module.exports = usersController;
