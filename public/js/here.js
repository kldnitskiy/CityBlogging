//Центрирую карту по Берлину 
function moveMapToBerlin(map){
  map.setCenter({lat:52.5159, lng:13.3777});
  map.setZoom(14);
}

//Создаю карту
let platform = new H.service.Platform({
  apikey: 'bma4Z6hQfxMS3VTVEBrQMncMM7_s4y3JddJOkWu5OQ8'
});
let defaultLayers = platform.createDefaultLayers();
let map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:50, lng:5},
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());
let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
let ui = H.ui.UI.createDefault(map, defaultLayers, 'ru-RU');
let rendered = send_request('render_template','user_on_map');

//Центрирую при загрузке страницы
window.onload = function () {
  moveMapToBerlin(map);
}  

//Сырая команда, которая получает все посты из БД у Джавы
get_posts('get_posts');
