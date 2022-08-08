const db = require("../../data/models");
const sequelize = require("Sequelize");
const CategoryProduct = require("../../data/models/CategoryProduct");
const Product = require("../../data/models/Product");

let productsController = {
    getProducts: async (req, res) => {
        try {
            let products = await db.Product.findAndCountAll({

                attributes: [
                    ["idProduct", "id"],
                    ["title", "name"],
                    "description"
                ],
                include: [
                    {
                        model: db.Category, as: "productCategory",
                        through: {
                            attributes: []
                        }
                    }
                ],
            });

            if (products === null) {
                res.status(204).send()
            } else {
                products = JSON.parse(JSON.stringify(products, null, 2))

                for (let i = 0; i < products.rows.length; i++) {
                    products.rows[i].detail = [process.env.URL_Server || process.env.URL_DEV] + `${process.env.PORT}/api/products/${products.rows[i].id}`
                }
                res.status(200).send({ data: { count: products.count, products: products.rows } });
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
                    "price"

                ],
                include: [
                    { association: "productsImages",
                    attributes:[
                        
                       "imageProduct"
                        
                    ] },
                    { association: "product_Color",
                    through: {
                        attributes: []
                    } },
                    { association: "Product_Size",
                    through: {
                        attributes: []
                    } },
                    { association: "productCategory",
                    through: {
                        attributes: []
                    } },
                  ],
            });

            if (product === null) {
                res.status(204).send()
            } else {
                product = JSON.parse(JSON.stringify(product, null, 2));
                product.images =[];
                for(let i=0; i< product.productsImages.length; i++){
                    product.images.push([process.env.URL_Server || process.env.URL_DEV] + `${process.env.PORT}/products/image/${product.productsImages[i].imageProduct}`)
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
