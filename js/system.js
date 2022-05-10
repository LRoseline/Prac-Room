function popupFlow(target) {
    document.querySelector(target).style.display = "block";
    NavSet(0, "none")
}

function popupClose(target) {
    document.querySelector(target).style.display = "none";
}

function NavSet(widthy, hd) {
    document.querySelector("#sidemenu").style.width = widthy+"px";
    document.querySelector("#mapping").style.right = widthy+"px";
    document.querySelector(".asan-btn-menu").style.display = hd;
}

function spread(name) {
    var status = document.querySelector(name).style.display
    if (status != "block") {
        document.querySelector(name+"-static").innerHTML = "&and;";
        document.querySelector(name).style.display = "block";
    } else {
        document.querySelector(name+"-static").innerHTML = "&or;";
        document.querySelector(name).style.display = "none";
    }
}