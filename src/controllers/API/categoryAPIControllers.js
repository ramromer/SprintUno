const db = require("../../data/models");

let categoryController = {
  getCategories: async (req, res) => {
    try {
      const { page, size } = req.query;
     
        const getPagination = (page, size) => {
          const limit = size ? +size : 10;
          const offset = page ? page * limit : 0;
          return { limit, offset };
        };
        
        const getPagingData = (data, page, limit) => {
          const { count, rows } = data;
          const currentPage = page ? +page : 0;
          const totalPages = Math.ceil(count / limit)== Infinity ? 1 : Math.ceil(count / limit);
          return { count, rows, totalPages, currentPage };
        };
        
        const { limit, offset } = getPagination(page, size);

      let queryObject = {
        limit,
        offset,
        attributes: [["idCategory", "id"], ["title", "name"], "description"],
        include: [
          {
            model: db.Category,
            as: "CategoryCategory",/////////////
            through: {
              attributes: [],
            },
          },
        ],
        distinct: "idCategory",
        order: [["idCategory", "ASC"]],
      }

      if(size==0){
        delete  queryObject.limit
        delete  queryObject.offset
        }

      let category = await db.Category.findAndCountAll(queryObject);

      if (category === null) {
        res.status(204).send();
      } else {
        
        category = getPagingData(category, page, limit);
        category = JSON.parse(JSON.stringify(category, null, 2));

          
          if (!(category.totalPages == 1 || page >= category.totalPages - 1)) {
            category.next =
              [process.env.URL_Server || process.env.URL_DEV] +
              `${process.env.PORT}/api/category?size=${limit}&page=${
                parseInt(page ? page : 0) + 1
              }`;
          }
        if (
          !(
            category.totalPages == 1 ||
            page >= category.totalPages ||
            page == undefined ||
            page == 0
          )
        ) {
          category.previus =
            [process.env.URL_Server || process.env.URL_DEV] +
            `${process.env.PORT}/api/category?size=${limit}&page=${page - 1}`;
        }
      


        for (let i = 0; i < category.rows.length; i++) {
          category.rows[i].detail =
            [process.env.URL_Server || process.env.URL_DEV] +
            `${process.env.PORT}/api/category/${category.rows[i].id}`;
        }
        res.status(200).send({
          data: {
            count: category.count,
            category: category.rows,
            totalPages: category.totalPages,
            currentPage: category.currentPage,
            nextPage: category.next,
            previusPage: category.previus,
          },
        });
      }
    } catch (err) {
      res.status(500).send({ error: err.toString() });
    }
  },
  getCategory: async (req, res) => {
    try {
      let Category = await db.Category.findOne({
        where: {
          idCategory: [req.params.id || ""],
        },
        attributes: [
          ["idCategory", "id"],
          ["title", "name"],
          "description",
          "stock",
          "price",
        ],
        include: [
          { association: "categoryImages", attributes: ["imageCategory"] },
          {
            association: "Category_Color",
            through: {
              attributes: [],
            },
          },
          {
            association: "Category_Size",
            through: {
              attributes: [],
            },
          },
          {
            association: "CategoryCategory",
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (Category === null) {
        res.status(204).send();
      } else {
        Category = JSON.parse(JSON.stringify(Category, null, 2));
        Category.images = [];
        for (let i = 0; i < Category.categoryImages.length; i++) {
          Category.images.push(
            [process.env.URL_Server || process.env.URL_DEV] +
              `${process.env.PORT}/category/image/${Category.categoryImages[i].imageCategory}`
          );
        }
        delete Category.categoryImages;
        res.status(200).send({ data: Category });
      }
    } catch (err) {
      res.status(500).send({ error: err.toString() });
    }
  },
};

module.exports = categoryController;
