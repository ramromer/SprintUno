const sequelize = require("sequelize");
const db = require("../../data/models");

let categoryController = {
  getCategories: async (req, res) => {
    try {
      let queryObject = {
        /* No se puede paginar al usar un group by en este ORM, tendriamos que hacer un literal Query */
        group: ["idCategory"],
        attributes: [["idCategory", "id"], "category"],
        include: [
          {
            model: db.CategoryProduct,
            as: "Categories",
            attributes: [],
          },
        ],
      };

      let categories = await db.Category.findAndCountAll(queryObject);

      if (categories === null) {
        res.status(204).send();
      } else {
        categories = JSON.parse(JSON.stringify(categories, null, 2));

        for (let i = 0; i < categories.rows.length; i++) {
          categories.rows[i].products_in = categories.count[i].count;

          categories.rows[i].detail =
            [process.env.URL_Server || process.env.URL_DEV] +
            `${process.env.PORT}/api/categories/${categories.rows[i].id}`;
        }
        res.status(200).send({
          data: {
            categories: categories.rows,
          },
        });
      }
    } catch (err) {
      res.status(500).send({ error: err.toString() });
    }
  },
  getCategory: async (req, res) => {
    try {
      let category = await db.Category.findOne({
        where: {
          idCategory: [req.params.id || ""],
        },
        attributes: [["idCategory", "id"], "category"],
      });

      if (category === null) {
        res.status(204).send();
      } else {
        category = JSON.parse(JSON.stringify(category, null, 2));

        category.product_list =
        [process.env.URL_Server || process.env.URL_DEV] +
        `${process.env.PORT}/api/products?category=${category.id}`;

        res.status(200).send({ data: category });
      }
    } catch (err) {
      res.status(500).send({ error: err.toString() });
    }
  },
};

module.exports = categoryController;
