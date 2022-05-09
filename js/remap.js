const xy = [36.79, 127];
const nobrand = "노브랜드 버거 홍대점";

const map = new L.map('map').setView(xy, 11);

var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

map.addLayer(layer);

cmdr("all");

function cmdr (station) {
    axios.get("https://reservoir.tsukimorifriends.xyz/api/j/"+station).then(r => {
        console.log(r.data);

        for (let index = 0; index < 18; index++) {
            var checkpoint = L.marker([r.data[index].lat, r.data[index].lon]);
            checkpoint.on("click", function() {
                // alert(r.data[index].resername+"저수지");
                
            }).bindPopup(r.data[index].resername+"저수지").openPopup().addTo(map);
        }
    });
}

var marker2 = L.marker([37.5544898, 126.9221304]);
marker2.on("click",function () {
    alert(nobrand);
}).addTo(map);