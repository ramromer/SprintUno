//clase#25
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname , '../logs/userLogs.txt');
const log = fs.readFileSync(logPath, 'utf-8');

function userLogs(req, res, next){
    fs.appendFileSync(logPath, 'El usuario ingresó a la ruta: ' + req.url + '\n');
    next();
}

module.exports = userLogs;