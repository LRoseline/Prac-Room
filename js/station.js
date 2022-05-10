function selected(sta) {
    $(".leaflet-marker-icon").remove();
    $(".leaflet-popup").remove();
    $(".leaflet-marker-shadow").remove();
    cmdr(sta);
}

function cmdr (station) {
    axios.post("https://reservoir.tsukimorifriends.xyz/api/j/"+station).then(r => {
        for (let index = 0; index < 18; index++) {

            const dex = r.data[index];

            var iconT = L.icon({
                iconUrl: '/icons/droplet-half.png',
                shadowUrl: '/icons/droplet-fill.png',
                iconSize: [32, 32],
                shadowSize: [40, 40]
            });
            
            var layerGroup = L.layerGroup().addTo(map);
            
            var checkpoint = L.marker([dex.lat, dex.lon], {icon: iconT});

            checkpoint.addTo(map);
            
            checkpoint.on("click", function() {
                axios.post("https://reservoir.tsukimorifriends.xyz/api/voir/"+dex.no).then(t => {
                    map.flyTo([dex.lat, dex.lon], 16);
                    this.bindPopup ("<h6>"+dex.resername+"저수지</h6>"+
                                    "<b>금일정보</b> - "+datestring(t.data.tdate)+"<br>저수율 : "+t.data.trate+"%<br>저수지 수위 : "+t.data.twlevel+"<br>"+
                                    "<br><b>전일정보</b> - "+datestring(t.data.ydate)+"<br>저수율 : "+t.data.yrate+"%<br>저수지 수위 : "+t.data.ywlevel)
                    .openPopup();
                });
            });
        }
    });
}

function datestring(dates) {
    const year = dates.substring(0,4);
    const month = dates.substring(4,6);
    const days = dates.substring(6,8);

    return year+"."+month+"."+days;
}

cmdr("all");