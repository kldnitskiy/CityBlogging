//Серверная часть фронтенда
//Здесь реализовано API между бэкендом и фронтендом, а также
//я использую некоторые функции для отрисовки шаблонов и участков вёрстки

//Подключаю библиотеки
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const API = require('./api');
const fs = require('fs');
//Разделяю статические файлы от серверных
app.use(express.static(path.join(__dirname, 'public')));
//Настраиваю движок отрисовки и создаю сервер
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'public/views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'public/views'))
app.listen(3000)

//Рендерю основную страницу
function render_api_response(data){
}
app.get('/', (request, response) => {
    request.header('Content-Type', 'text/html')
    response.render('home')
    
})

//TCP connector с Java сервером

var net = require('net');
var client = new net.Socket();
var response = Array();
let data ='';

//API, работающий с Java по TCP (Использовали Hamachi)
app.get('/api', (request, response) => { 
    let page =  response;
    request.header('Content-Type', 'application/json')
    let api_request = request.query['request'];
    //get_posts
    if (api_request === 'get_posts') {
        tcp_connect(api_request, response)
    }
    
})

//Непосредственно TCP коннект
function tcp_connect(tcp_request, res){
    client.connect(9090, '25.95.193.154', function () {
    let json_object = {
  Username: 'Artjooom',
  Title: 'DSprankKi45llers Here!',
Text: 'DThese dudes so wernervous, pls help me!!',
        TimeStamp: 'DMEW22:33 21.03.2020',
        Lat: 55.3,
        Lng: 55.3

};
    json_object = JSON.stringify(json_object) + '$';
     //client.write(json_object, 'utf8')
    client.write('[get_posts]$', 'utf8')
    console.log('connected')
});
client.on('data', function (data) {
    Array.prototype.push.apply(response, data);
});
client.on('close', function () {
    let outcome = filter_tcp(response)
    console.log(outcome)
    res.json(outcome)
    
});
}

//API для фронта, чтобы отрисовывать шаблоны
app.get('/ajax', (request, response) => {    
    request.header('Content-Type', 'application/json')
    let api_request = request.query['request'];
    let api_request_params = request.query['params'];
    //RENDER TEMPLATE
    if (api_request === 'render_template') {
        fs.readFile('public/views/partials/' + api_request_params + '.hbs', 'utf8', function (err, contents) {
            response.json(contents)
        });
    }
})



//Фильтрую данные, полученные через TCP (Всякие ASCII нафик)
function filter_tcp(response) {
    response = response.map(String.fromCharCode);
    for (let i = 0; i < response.length; i++) {
        response[i] = response[i].slice(0, 1);
    }
    response = response.map(function (el) {
        return el.replace(/\0/g, '');
    });
    for (let i = 0; i <= response.length; i++) {
        if (response[i] !== undefined) {
            if((response[i-1]==='}' || response[i-2]==='}' ) && (response[i+1]==='{' || response[i+2]==='{' ) && i !== 0 && i !== response.length) {
                response[i] = ',';
            }
            data = data + response[i];
        }
    }
    return data.replace(/,,/g,'%20').replace(/[^\x20-\x7E]/g, '').replace(/'/g, '"');;
}