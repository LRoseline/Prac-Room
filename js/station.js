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
            
            var checkpoint = L.marker([dex.lat, dex.lon], {icon: iconT});

            checkpoint.addTo(map);
            
            checkpoint.on("click", function() {
                axios.post("https://reservoir.tsukimorifriends.xyz/api/voir/"+dex.no).then(t => {
                    Weather(dex.jurisdiction);
                    setTimeout(() => {
                        chartWater(t.data);
                    }, 1000);

                    map.flyTo([dex.lat+0.002, dex.lon], 16);
                    this.bindPopup ("<h6>"+dex.resername+"저수지</h6>"+
                                    "<b>전일정보</b> - "+datestring(t.data.daily[6].date)+"<br>저수율 : "+t.data.daily[6].rate+"%<br>저수지 수위 : "+t.data.daily[6].wlevel+"<br>"+
                                    "<br><b>금일정보</b> - "+datestring(t.data.daily[7].date)+"<br>저수율 : "+t.data.daily[7].rate+"%<br>저수지 수위 : "+t.data.daily[7].wlevel+"<br>"+
                                    '<canvas id="waterchat">Chat Loading...</canvas>'
                    , {
                        maxWidth: 400
                    }).openPopup();
                });
            });
        }
    });
}

function chartWater(dat) {
    const weatherchat = {
        labels: [
            daystring(dat.daily[0].date),
            daystring(dat.daily[1].date),
            daystring(dat.daily[2].date),
            daystring(dat.daily[3].date),
            daystring(dat.daily[4].date),
            daystring(dat.daily[5].date),
            daystring(dat.daily[6].date),
            daystring(dat.daily[7].date)
        ],
        datasets: [
                    {
                        label: "저수지 수위",
                        data: [
                            dat.daily[0].wlevel,
                            dat.daily[1].wlevel,
                            dat.daily[2].wlevel,
                            dat.daily[3].wlevel,
                            dat.daily[4].wlevel,
                            dat.daily[5].wlevel,
                            dat.daily[6].wlevel,
                            dat.daily[7].wlevel
                        ],
                        borderColor: "#ff7800",
                        backgroundColor: "#ff7800",
                    },
                    {
                        label: "저수율",
                        data: [
                            dat.daily[0].rate,
                            dat.daily[1].rate,
                            dat.daily[2].rate,
                            dat.daily[3].rate,
                            dat.daily[4].rate,
                            dat.daily[5].rate,
                            dat.daily[6].rate,
                            dat.daily[7].rate
                        ],
                        borderColor: "#0d6826",
                        backgroundColor: "#0d6826",
                    }
                ]};

    const chart = new Chart(document.querySelector("#waterchat"), {
        type: 'line',
        data: weatherchat,
        options: {
            responsive: true,
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

function daystring(dates) {
    const days = dates.substring(6,8);

    return days+"일";
}

function datestring(dates) {
    const year = dates.substring(0,4);
    const month = dates.substring(4,6);
    const days = dates.substring(6,8);

    return year+"."+month+"."+days;
}

function Weather(location) {
    const json = axios.post("https://reservoir.tsukimorifriends.xyz/api/vw/"+location);

    json.then(w => {
        document.querySelector(".weather").innerHTML = WeatherReturn(w.data.weather0)+" | "+w.data.temp0+"℃"+' <span class="weather-side-static"><i class="bi bi-caret-down-fill" style="font-size: 16px;"></i></span>';
        document.querySelector(".weather-side").innerHTML = "<b style='font-size: 24px;'>내일의 날씨</b><br>"+
                                                            "<span style='font-size: 42px;'>"+WeatherReturn(w.data.weather1)+" | </span><span style='font-size: 36px;'>"+w.data.temp1+"℃</span><br>"+
                                                            "<b style='font-size: 24px;'>미세먼지 정보</b><br>"+
                                                            "측정소 : "+w.data.duststation+"<br>"+
                                                            "미세먼지 : "+w.data.pm10v +" ("+ DustRate(w.data.pm10g)+")<br>"+
                                                            "초미세먼지 : "+w.data.pm25v +" ("+ DustRate(w.data.pm25g)+")<br>"
    });
}

function WeatherReturn (icon) {
    if (icon == "01d") {
        return '<i class="bi bi-brightness-high"></i>';
    }
    if (icon == "01n") {
        return '<i class="bi bi-moon"></i>';
    }
    if (icon == "02d" || icon == "04d") {
        return '<i class="bi bi-cloud-sun"></i>';
    }
    if (icon == "02n" || icon == "04n") {
        return '<i class="bi bi-cloud-moon"></i>';
    }
    if (icon == "03d" || icon == "03n") {
        return '<i class="bi bi-cloud"></i>';
    }
    if (icon == "09d" || icon == "09n") {
        return '<i class="bi bi-cloud-rain-heavy"></i>';
    }
    if (icon == "10d" || icon == "10n") {
        return '<i class="bi bi-cloud-rain"></i>';
    }
    if (icon == "11d" || icon == "11n") {
        return '<i class="bi bi-cloud-lightning-rain"></i>';
    }
    if (icon == "13d" || icon == "13n") {
        return '<i class="bi bi-snow3"></i>';
    }
    if (icon == "50d" || icon == "50n") {
        return '<i class="bi bi-cloud-fog"></i>';
    }
}

cmdr("all");
Weather("온천동");