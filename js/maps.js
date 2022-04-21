const xy = [37.55411, 126.92010];
const nobrand = "노브랜드 버거 홍대점";

var map = L.map('map').setView(xy, 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(xy).addTo(map)
    .bindPopup('<b>서교동</b>')
    .openPopup();

L.marker([37.5544898, 126.9221304]).addTo(map)
    .bindPopup(nobrand)
    .on('click', function (e) {
        alert(nobrand);
    });