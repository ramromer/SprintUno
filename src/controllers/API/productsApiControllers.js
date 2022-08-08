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
    getProduct: function(req,res){

    }
}
module.exports= productsApiController