//DataType
function DataType(type, unit) {
    this.typeValue = type;
    this.unitValue = unit;
}

DataType.prototype = {
    type: function () {return this.typeValue},
    unit: function () {return this.unitValue},
    setType: function(type) {this.typeValue = type},
    setUnit: function (unit) {this.unitValue = unit},
};



//Event
function Event(time, place) {
    this.timeValue = new Date(time);
    this.placeValue = place;
}

Event.prototype = {
    time: function () {return this.timeValue},
    place: function () {return this.placeValue},
};



//DateInterval
class DateInterval {

    constructor(from, to) {
      this.dateFrom = new Date(from);
      this.dateTo = new Date(to);
    }

    from() {
      return this.dateFrom.toDateString();
    }

    to() {
      return this.dateTo.toDateString();
    }

    contains(d) {
      return this.dateFrom < d && this.dateTo > d;
    }
}



//WeatherData
function WeatherData(time, place, type, unit, value) {
    Event.call(this, time, place);
    DataType.call(this, type, unit);
    this.weatherDataValue = value;
}
  
WeatherData.prototype = Object.create(DataType.prototype);
Object.assign(WeatherData.prototype, Event.prototype);

WeatherData.prototype.value = function () {return this.weatherDataValue};

WeatherData.prototype.setValue = function (x) {this.weatherDataValue = x};


//Temperature
function Temperature(time, place, type, unit, value) {
    WeatherData.call(this, time, place, type, unit, value);
}
  
Temperature.prototype = Object.create(WeatherData.prototype);
  
Temperature.prototype.convertToF = function () {
    if (this.unit() == "International") {
        this.unit = "US";
        this.value = (this.value()  * 9 / 5) + 32 ;
    }
};
  
Temperature.prototype.convertToC = function () {
    if (this.unit() == "US") {
        this.unit = "International";
        this.value = (this.value() - 32) * 5 / 9;
    }
};

//Precipitation
function Precipitation(time, place, type, unit, value, precipitationType) {
    WeatherData.call(this, time, place, type, unit, value);
    this.precipitationTypeValue = precipitationType;
}
  
Precipitation.prototype = Object.create(WeatherData.prototype);
  
Precipitation.prototype.precipitationType = function () {
    return this.precipitationTypeValue;
};
  
Precipitation.prototype.convertToInches = function () {
    if (this.unit() == "International") {
        this.unitValue = "US";
        this.weatherDataValue = this.value() / 25.4;
    }
};
  
Precipitation.prototype.convertToMM = function () {
    if (this.unit() == "US") {
        this.weatherDataValue = this.value() * 25.4;
        this.unitValue = "International";
    }
};



//Wind
function Wind(time, place, type, unit, value, direction) {
    WeatherData.call(this, time, place, type, unit, value);
    this.directionValue = direction;
}
  
Wind.prototype = Object.create(WeatherData.prototype);
  
Wind.prototype.direction = function () {
    return this.directionValue;
};
  
Wind.prototype.convertToMPH = function () {
    if (this.unit() == "International") {
        this.unitValue = "US";
        this.weatherDataValue = this.value() / 0.44704;
    }
};
  
Wind.prototype.convertToMS = function () {
    if (this.unit() == "US") {
        this.unitValue = "International";
        this.weatherDataValue = this.value() * 0.44704;
    }
};



//CloudCoverage
function CloudCoverage(time, time, place, type, unit, value) {
    WeatherData.call(this, time, place, type, unit, value);
}

CloudCoverage.prototype = Object.create(WeatherData.prototype);



//WeatherHistory
class WeatherHistory {
    constructor(data) {
      this.weatherData = data;
    }
  
    forPlace (place) {
      return this.weatherData.filter (element => element.place() == place)      
    }
  
    forType (type) {
      return this.weatherData.filter (element => element.type() == type)      
    }
  
    forPeriod (period) {
      return this.weatherData.filter (element => period.contains(element.time()))    
    }
  
   
    convertToUSUnits() {
      return this.weatherData.map(element => {
        var tmp = Object.assign({}, element);
              if (element instanceof WindPrediction) {
                      tmp = element.convertToMPH();
              } else if (element instanceof PrecipitationPrediction) {
                      tmp = element.convertToInches();
              } else if (element instanceof TemperaturePrediction) {
                      tmp = element.convertToF();
              }
        return tmp;
    });
    }

    convertToInternationalUnits() {
      return this.weatherData.map(element => {
        var tmp = Object.assign({}, element);
              if (element instanceof WindPrediction || element instanceof Wind) {
                      tmp = element.convertToMS();
              } else if (element instanceof PrecipitationPrediction || element instanceof Precipitation) {
                      tmp = element.convertToMM();
              } else if (element instanceof TemperaturePrediction || element instanceof Temperature) {
                      tmp = element.convertToC();
              }
        return tmp;
    });
    }
  
    including(data) {
      return new WeatherHistory(this.weatherData.concat(data));
    }
  
    lowestValue() {
      let arrayTmp = this.weatherData.map(item => ({value: item.value(), type: item.type()}));
      if (!arrayTmp.every((val, i, arr) => val.type === arr[0].type)) {
        return undefined;
      }
      else {
        return arrayTmp.reduce((a, b) => (a.value > b.value ? b.value : a.value));
      }
    }
  
    data() {
      return this.weatherData;
    }
}




//WeatherPrediction
function WeatherPrediction(time, place, type, unit, to, from) {
    Event.call(this, time, place);
    DataType.call(this, type, unit);
    this.numberTo = to;
    this.numberFrom = from;
}

WeatherPrediction.prototype = Object.create(DataType.prototype);
Object.assign(WeatherPrediction.prototype, Event.prototype);

WeatherPrediction.prototype.match = function (data) {
    if (data.value() <= this.numberTo && data.value() >= this.numberFrom) {
      return true;
    } else {
      return false;
    }
};

WeatherPrediction.prototype.to = function () {return this.numberTo};

WeatherPrediction.prototype.setTo = function (x) {this.numberTo = x};

WeatherPrediction.prototype.from = function () {return this.numberFrom};

WeatherPrediction.prototype.setFrom = function (x) {this.numberFrom = x};



//TemperaturePrediction
function TemperaturePrediction(time, place, type, unit, to, from) {
    WeatherPrediction.call(this, time, place, type, unit, to, from);
}

TemperaturePrediction.prototype = Object.create(WeatherPrediction.prototype);

TemperaturePrediction.prototype.matches = function (data) {
    return this.match(data);
}

TemperaturePrediction.prototype.convertToF = function () {
    if (this.unit() == "International") {
        return new Temperature (this.time(), this.place(), this.type(), "US", ((this.value() * 9 / 5) + 32 ))
    }
    else {
        return new TemperaturePrediction (this.time(), this.place(), this.type(), this.unit(), this.from(), this.to());
    }
};

TemperaturePrediction.prototype.convertToC = function () {
    if (this.unit() == "US") {
        return new TemperaturePrediction (this.time(), this.place(), this.type(), "International", ((this.from() - 32) * 5 / 9) , ((this.to() - 32) * 5 / 9));
    }
    else {
        return new TemperaturePrediction (this.time(), this.place(), this.type(), this.unit(), this.from(), this.to());
    }
};


//PrecipitationPrediction class
function PrecipitationPrediction(time, place, type, unit, to, from, types) {
    WeatherPrediction.call(this, time, place, type, unit, to, from);
    this.typesValue = types;
}

PrecipitationPrediction.prototype = Object.create(WeatherPrediction.prototype);

PrecipitationPrediction.prototype.types = function () {return this.types};

PrecipitationPrediction.prototype.matches = function (data) {
    if (data instanceof Precipitation) {
        if (this.typesValue.indexOf(data.precipitationType()) > -1 && this.match(data) && String(weatherData.time()) == String(this.time()) && data.place() == this.place() && data.type() == this.type() && data.unit() == this.unit()) {
            return true;
        } else {
            return false;
        } 
    } else {
        return false;
    }
};
PrecipitationPrediction.prototype.convertToInches = function () {
    if (this.unit() == "International") {
        return new PrecipitationPrediction(this.time(), this.place(), this.type(), "US", (this.to() / 25.4), (this.from() / 25.4), this.types());
    }
    else {
        return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(), this.types());
    }
};

PrecipitationPrediction.prototype.convertToMM = function () {
    if (this.unit() == "US") {
        return new PrecipitationPrediction(this.time(), this.place(), this.type(), "International", (this.to() * 25.4), (this.from() * 25.4), this.types());
    }
    else {
        return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(), this.types());
    }
};



//WindPrediction
function WindPrediction(time, place, type, unit, numberTo, numberFrom, directions) {
    WeatherPrediction.call(this, time, place, type, unit, numberTo, numberFrom);
    this.directionsValue = directions;
}
  
WindPrediction.prototype = Object.create(WeatherPrediction.prototype);
  
WindPrediction.prototype.directions = function () {return this.directionsValue};

WindPrediction.prototype.matches = function (data) {
    if (data instanceof Wind) {
        if (this.directionsValue.indexOf(data.direction()) > -1 && this.match(data) && data.place() == this.place() && data.type() == this.type() && data.unit() == this.unit() && String(data.time()) == String(this.time())) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
  
WindPrediction.prototype.convertToMPH = function () {
    if (this.unit() == "International") {
        return new WindPrediction(this.time(), this.place(), this.type(), "US", (this.to() * 0.44704) , (this.from() * 0.44704) , this.directions());
    }
    else {
        return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(), this.directions());
    }
};
  
WindPrediction.prototype.convertToMS = function () {
    if (this.unit() == "US") {
        return new WindPrediction(this.time(), this.place(), this.type(), "International", (this.to() / 0.44704) , (this.from() / 0.44704) , this.directions());
    }
    else {
        return new PrecipitationPrediction(this.time(), this.place(), this.type(), this.unit(), this.to(), this.from(), this.directions());
    }
};



//CloudCoveragePrediciton
function CloudCoveragePrediction(time, place, type, unit, to, from) {
    WeatherPrediction.call(this, time, place, type, unit, to, from);
}



//WeatherForecast
class WeatherForecast {
    constructor(data) {
      this.weatherPredictionData = data;
    }
   
    forPlace (place) {
      return this.weatherPredictionData.filter (element => element.place() == place);
    }
  
    forType (type) {
      return this.weatherPredictionData.filter (element => element.type() == type);
    }
  
    forPeriod (period) {
      return this.weatherPredictionData.filter (element => period.contains(element.time()));
    }
  
    convertToUSUnits() {
      return this.weatherPredictionData.map(element => {
        var tmp = Object.assign({}, element);
              if (element instanceof WindPrediction) {
                      tmp = element.convertToMPH();
              } else if (element instanceof PrecipitationPrediction) {
                      tmp = element.convertToInches();
              } else if (element instanceof TemperaturePrediction) {
                      tmp = element.convertToF();
              }             
        return tmp;
    });
    }
  
  
    convertToInternationalUnits() {
      return this.weatherPredictionData.map(element => {
        var tmp = Object.assign({}, element);
              if (element instanceof WindPrediction) {
                      tmp = element.convertToMS();
              } else if (element instanceof PrecipitationPrediction) {
                      tmp = element.convertToMM();
              } else if (element instanceof TemperaturePrediction) {
                      tmp = element.convertToC();
              }
        return tmp;
    });
    }
   
    averageFromValue() {
       let valuesArr = this.weatherPredictionData.map(item => item.from());
       return valuesArr.reduce((a, b) => (a + b)) / valuesArr.length;
    }
  
    averageToValue() {
      let valuesArr = this.weatherPredictionData.map(item => item.to());
      return valuesArr.reduce((a, b) => (a + b)) / valuesArr.length;
   }
  
    including(data) {
      return new WeatherForecast(this.weatherPredictionData.concat(data));
    }
    
    data() {
      return this.weatherPredictionData;
    }
}




//Test
let weatherData = [
    new Temperature("2020-01-01", "London", "Temperature", "US", 50),
    new Temperature("2020-01-02", "Manchester", "Temperature2", "International", 25),
    new Precipitation("2020-01-03", "Liverpool", "Precipitation", "US", 10, "t1"),
    new Precipitation("2020-01-04", "Stoke", "Precipitation2", "International", 20, "t2"),
    new Wind("2020-01-05", "Leichester", "Wind", "US", 9, "North"),
    new Wind("2020-01-06", "Westham", "Wind2", "International", 22, "West"),
];
  
let weatherPrediction = [
    new TemperaturePrediction("2020-01-01", "London", "Prediction0", "International", 60, 10),
    new TemperaturePrediction("2020-01-02", "Manchester", "Prediction", "US", 50, 20),
    new PrecipitationPrediction("2020-01-03", "Liverpool", "Prediction2", "US", 20, 40, ["Precipitation", "Precipitation2"]),
    new PrecipitationPrediction("2020-01-04", "Stoke", "Prediction3", "International", 453, 42, ["Precipitation3", "Precipitation4"]),
    new WindPrediction("2020-01-05", "Leichester", "Prediction4", "International", 46, 548, ["South", "West"]),
    new WindPrediction("2020-01-06", "Westham", "typPrediction3e5", "US", 15, 54, ["West", "East"]),
];
  
let weatherHistory = new WeatherHistory(weatherData);
let weatherForecast = new WeatherForecast(weatherPrediction);

console.log("before convertion to International Units")
console.log(weatherForecast)
console.log("after convertion to International Units")
console.log (weatherForecast.convertToInternationalUnits());


console.log("")
console.log ("Lowest value: ", weatherHistory.lowestValue());
console.log ("Including: ", weatherHistory.including(weatherData));
console.log("")
console.log("")
console.log("")
console.log("1. Match forecast with history: " + weatherForecast.data()[0].matches(weatherHistory.data()[0]));
console.log("2. Match forecast with history: " + weatherForecast.data()[1].matches(weatherHistory.data()[2]));
console.log("")
console.log("")
console.log("")
console.log("before convertion to International Units")
console.log(weatherHistory.data()[0].unit() + " " + weatherHistory.data()[0].value());
weatherHistory.convertToInternationalUnits();
console.log("after convertion to International Units")
console.log(weatherHistory.data()[0].unit + " " + weatherHistory.data()[0].value);