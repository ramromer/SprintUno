const express = require('express');
const app = express();

app.use(express.static('./public'));

app.listen(3000,()=> {
    console.log('Server working on port 3000');
})

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/views/home/home.html')
})

app.get('/detalle_producto', (req,res)=>{
    res.sendFile(__dirname + '/public/views/detalle_producto/detalle_producto.html')
})

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/public/views/login_registro/registro.html')
})

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/public/views/login_registro/login.html')
})