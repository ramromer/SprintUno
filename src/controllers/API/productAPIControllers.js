const db = require("../../data/models");

let productsController = {
  getProducts: async (req, res) => {
    try {
      let orderBy="ASC"
      
      let { page, size, order } = req.query;
        if(order!= undefined){
          order = order.toUpperCase();

          if(order != "ASC" && order != "DESC"){
            orderBy="ASC"
          }else{
            orderBy = order
          }
        }
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
        attributes: [["idProduct", "id"], ["title", "name"], "description"],
        include: [
          {
            model: db.Category,
            as: "productCategory",
            through: {
              attributes: [],
            },
          },
        ],
        distinct: "idProduct",
        order: [["idProduct", orderBy]],
      }

      if(size==0){
        delete  queryObject.limit
        delete  queryObject.offset
        }

      let products = await db.Product.findAndCountAll(queryObject);

      if (products === null) {
        res.status(204).send();
      } else {
        
        products = getPagingData(products, page, limit);
        products = JSON.parse(JSON.stringify(products, null, 2));

          
          if (!(products.totalPages == 1 || page >= products.totalPages - 1)) {
            products.next =
              [process.env.URL_Server || process.env.URL_DEV] +
              `${process.env.PORT}/api/products?size=${limit}&page=${
                parseInt(page ? page : 0) + 1
              }`;
          }
        if (
          !(
            products.totalPages == 1 ||
            page >= products.totalPages ||
            page == undefined ||
            page == 0
          )
        ) {
          products.previus =
            [process.env.URL_Server || process.env.URL_DEV] +
            `${process.env.PORT}/api/products?size=${limit}&page=${page - 1}`;
        }
      


        for (let i = 0; i < products.rows.length; i++) {
          products.rows[i].detail =
            [process.env.URL_Server || process.env.URL_DEV] +
            `${process.env.PORT}/api/products/${products.rows[i].id}`;
        }
        res.status(200).send({
          data:{           
            count: products.count,
            products: products.rows,
            totalPages: products.totalPages,
            currentPage: products.currentPage,
            nextPage: products.next,
            previusPage: products.previus,
          }
        });
      }
    } catch (err) {
      res.status(500).send({ error: err.toString() });
    }
  },
  getProduct: async (req, res) => {
    try {
      let product = await db.Product.findOne({
        where: {
          idProduct: [req.params.id || ""],
        },
        attributes: [
          ["idProduct", "id"],
          ["title", "name"],
          "description",
          "stock",
          "price",
        ],
        include: [
          { association: "productsImages", attributes: ["imageProduct"] },
          {
            association: "product_Color",
            through: {
              attributes: [],
            },
          },
          {
            association: "Product_Size",
            through: {
              attributes: [],
            },
          },
          {
            association: "productCategory",
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (product === null) {
        res.status(204).send();
      } else {
        product = JSON.parse(JSON.stringify(product, null, 2));
        product.images = [];
        for (let i = 0; i < product.productsImages.length; i++) {
          product.images.push(
            [process.env.URL_Server || process.env.URL_DEV] +
              `${process.env.PORT}/products/image/${product.productsImages[i].imageProduct}`
          );
        }
        delete product.productsImages;
        res.status(200).send({ data: product });
      }
    } catch (err) {
      res.status(500).send({ error: err.toString() });
    }
  },
};

module.exports = productsController;
