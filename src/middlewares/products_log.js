const fs = require('fs');
const path = require("path");

function loggerProducts (req,res,next){
    let listaBicisFile = fs.readFileSync(path.join(__dirname, "../data/data.json"));
      let listaBicis = JSON.parse(listaBicisFile);
      let ultimoElmnt = listaBicis[listaBicis.length - 1];
      let id = ultimoElmnt.id + 1;
    fs.appendFileSync('logProducts.txt','Se creo un producto. Id:' + id + ' Titulo:' + req.body.titulo);
    next();
}

module.exports = loggerProducts;