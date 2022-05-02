const express = require('express');
const app = express();
const path = require('path');
const rutas = require('./routers/main');
const raiz = path.resolve(__dirname + '/public');

app.use(express.static(raiz));


app.listen(3000,()=> {
    console.log('Server working on port 3000');
})

app.use('/', rutas);

// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + '/public/views/home/home.html')
// })

// app.get('/detalle_producto', (req,res)=>{
//     res.sendFile(__dirname + '/public/views/detalle_producto/detalle_producto.html')
// })

// app.get('/register', (req,res)=>{
//     res.sendFile(__dirname + '/public/views/login_registro/registro.html')
// })

// app.get('/login', (req,res)=>{
//     res.sendFile(__dirname + '/public/views/login_registro/login.html')
// })
// app.get('/carrito', (req,res)=>{
//     res.sendFile(__dirname + '/public/views/carrito/carrito.html')
// })