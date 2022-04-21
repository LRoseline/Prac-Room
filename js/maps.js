const xy = [37.55411, 126.92010];
const nobrand = "노브랜드 버거 홍대점";
const optionmap = {
    center: [37.55411, 126.92010],
    zoom: 18
}

const map = new L.map('map').setView(xy, 18);

var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

map.addLayer(layer);

var marker1 = L.marker(xy).addTo(map);
var marker2 = L.marker([37.5544898, 126.9221304]);
marker2.on("click",function () {
    alert(nobrand);
}).addTo(map);;