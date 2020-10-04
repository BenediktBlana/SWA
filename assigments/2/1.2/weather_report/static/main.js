
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/data')
request.setRequestHeader('Content-Type', 'application/json')
request.setRequestHeader('Accept', 'application/json')
request.send()
request.onload = () => {
    // JSON.parse(request.responseText)
    var data = JSON.parse(request.responseText)

    var filteredByTemperature = data.filter(a=>a.type == "temperature")
    var maxTemperature = getMax(filteredByTemperature, "value")
    var minTemperature = getMin(filteredByTemperature, "value")
    // console.log(maxTemperature)
    // console.log(minTemperature)

    var filteredByPrecipitation = data.filter(a=>a.precipitation_type)
    var totalPrecipitation = filteredByPrecipitation.map(a => a.value).reduce((b, a) => a + b);
    // console.log(totalPrecipitation)

    var filteredByWind = data.filter(a=>a.type == "wind speed")
    const averageWind = filteredByWind.map(a => a.value).reduce((b, a) => b + a) / filteredByWind.length
    // console.log(averageWind)
    
    var a = filteredByWind.reduce(function(c, d){
        if (!c[d.direction]) c[d.direction] = 0;
        c[d.direction]++;
        return c;
      }, {});

      console.log(a)

}









function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function getMin(arr, prop) {
    var min;
    for (var i=0 ; i<arr.length ; i++) {
        if (min == null || parseInt(arr[i][prop]) < parseInt(min[prop]))
            min = arr[i];
    }
    return min;
}
 