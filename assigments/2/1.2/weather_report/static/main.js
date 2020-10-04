
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/data')
request.setRequestHeader('Content-Type', 'application/json')
request.setRequestHeader('Accept', 'application/json')
request.send()
request.onload = () => {
console.log(request.responseText)
}

 