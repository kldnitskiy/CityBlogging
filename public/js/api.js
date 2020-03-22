//Отправляю запрос на получение шаблона
function send_request(request, params){
$.get("/ajax", { request: request, params: params })

.done(function(data) {
  let bubble = new H.ui.InfoBubble({ lng: 13.4, lat: 52.51 }, {content: data });
    ui.addBubble(bubble);

});
}
//Получаю посты и привожу их в JSON формат
function get_posts(request){
$.get("/api", { request: 'get_posts'})

.done(function(data) {
  data = data.split('%20');
    //data[0] = JSON.parse(data[0]);
    for (let i = 0; i < data.length; i++){
        data[i] = JSON.parse(data[i]);
    }

});
}