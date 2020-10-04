
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var response = '';
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/data')
request.setRequestHeader('Content-Type', 'application/json')
request.setRequestHeader('Accept', 'application/json')
request.send()
request.onload = () => {
    response = JSON.parse(request.responseText)
    console.log(getLatestMeasurementEachKind(response, 'Horsens'))

}

function getLatestMeasurementEachKind(response, place, type) {
    filteredByPlace = response.filter(obj => obj["place"] == place)
    var result = [];

    var lookup = {}
    filteredByPlace.forEach(element => {
        var type = element["type"]
        if (!(type in lookup)) {
            lookup[type] = 1;
            result.push(type);
        }

    });
}
