function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest(),
        arr = "";

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText), url);
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

//fill hotel list
httpGetAsync("http://localhost:8765/api/hotels", function(arr) {
    var list = "";
    for (var i = 0; i < arr.length; i++) {
        list += '<li id="hotel_' + arr[i].id + '" onclick="showDetails(' + arr[i].id + ')">' + arr[i].name + '</li>';
    }
    document.getElementById("HList").innerHTML = list;
});

var showDetails = function(id) {
    httpGetAsync("http://localhost:8765/api/hotels/" + id, function(arr) {
        var details = '<div><img src="' + arr.imgUrl + '"/></div>';
        details += '<div class="data"><h4 class="name">' + arr.name + '</h4>';
        details += '<div class="rating rating_' + arr.rating + '"></div>';
        details += '<p class="price">£' + arr.price + '</p></div>';
        document.getElementById("HDetails").innerHTML = details;
    });
}
