const db = require("../../data/models");
const sequelize = require("Sequelize");

let productsApiController = {
    getProducts: async (req,res)=>{
        try {
            let products = await db.Product.findAndCountAll({

                attributes: [
                    ["idProduct", "id"],
                    ["title", "name"],
                    "description"],
                raw: true,
            });
            if (products === null) {
                res.status(204).send()
            } else {
                for (let i = 0; i < products.rows.length; i++) {
                    products.rows[i].detail = [process.env.URL_Server || process.env.URL_DEV] + `${process.env.PORT}/api/products/${products.rows[i].id}`
                }
                res.status(200).send({ data: {count: products.count, products: products.rows} });
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
                    "descriptionLong",
                    "stock",
                    "price",
                ],
                raw: true,
            });

            if (product === null) {
                res.status(204).send()
            } else {
                product.image_url = [process.env.URL_Server || process.env.URL_DEV] + `${process.env.PORT}/product/image/${product.id}`
                res.status(200).send({ data: product });
            }
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    },
}
module.exports= productsApiController