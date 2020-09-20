//Multiple inheritance is not possible in javascrip
//thats why we use EventdataType class
class EventDataType {
    constructor(time, place, type, unit) {
        this.time = time
        this.place = place
        this.type = type
        this.unit = unit
    }
}

    EventDataType.prototype.getTime = function () {
    return this.time
}
    EventDataType.prototype.setTime = function (time) {
    this.time = time
}
    EventDataType.prototype.getPlace = function () {
    return this.place
}
    EventDataType.prototype.setPlace = function (place) {
    this.place = place
}
    EventDataType.prototype.getType = function () {
    return this.type
}
    EventDataType.prototype.setType = function (type ) {
    this.type = type
}
    EventDataType.prototype.getUnit = function () {
    return this.unit
}
    EventDataType.prototype.setUnit = function (unit) {
    this.unit = unit
}

class WeatherPrediction extends EventDataType {
    constructor(time, place, type, unit, to, from) {
        super(time, place, type, unit)
        this.to = to
        this.from = from
    }
}
    WeatherPrediction.prototype.getTo = function () {
    return this.to
}
    WeatherPrediction.prototype.setTo = function (to) {
    this.to = to
}
    WeatherPrediction.prototype.getFrom = function () {
    return this.from
}
    WeatherPrediction.prototype.setFrom = function ( from ) {
    this.from = from
}
    WeatherPrediction.prototype.matches = function (data) {
    return data.time === this.time &&
    data.place === this.place &&
    data.type === this.type &&
    data.unit === this.unit
}

class CloudCoveragePrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from, coverageAreaPrediction) {
        super(time, place, type, unit, to, from)
        this.coverageAreaPrediction = coverageAreaPrediction
    }
}
    CloudCoveragePrediction.prototype.getCoverageAreaPrediction = function () {
    return this.coverageAreaPrediction
}
    CloudCoveragePrediction.prototype.setCoverageAreaPrediction = function (area) {
    this.coverageAreaPrediction = area
}

class WindPrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from, directions) {
        super(time, place, type, unit, to, from)
        this.directions = directions
    }
}
    WindPrediction.prototype.convertToMS = function () {
    this.to = this.to / 0.44704
    this.from = this.from / 0.44704
}
    WindPrediction.prototype.convertToMPH = function () {
    this.to = this.to * 0.44704
    this.from = this.from * 0.44704
}

class PrecipitationPrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from, types) {
        super(time, place, type, unit, to, from)
        this.types = types
    }
}
    PrecipitationPrediction.prototype.matches = function (data) {
    return data.time === this.time &&
    data.place === this.place &&
    data.type === this.type &&
    data.unit === this.unit
}
    PrecipitationPrediction.prototype.convertToInches = function () {
    this.to = this.to / 25.4
    this.from = this.from / 25.4
}
    PrecipitationPrediction.prototype.convertToMM = function () {
    this.to = this.to * 25.4
    this.from = this.from * 25.4
}

class TemperaturePrediction extends WeatherPrediction {
    constructor(time, place, type, unit, to, from) {
        super(time, place, type, unit, to, from)
        this.temperaturePrediction = temperaturePrediction
    }
}
    TemperaturePrediction.prototype.convertToF = function () {
    this.to = this.to * 9 / 5 + 32
    this.from = this.from * 9 / 5 + 32
}
    TemperaturePrediction.prototype.convertToC = function () {
    this.to = (this.to - 32) * 5 / 9
    this.from = (this.from - 32) * 5 / 9
}



class WeatherForecast {
    constructor(data) {
        this.data = data
        this.place = ""
        this.type = ""
        this.interval = null
    }
}
    WeatherForecast.prototype.getCurrentPlace = function () {
    return this.data.place
}
    WeatherForecast.prototype.setCurrentPlace = function (place) {
    this.place = place
}
    WeatherForecast.prototype.clearCurrentPlace = function () {
    delete this.data.place
}
    WeatherForecast.prototype.getCurrentType = function () {
    return this.data.type
}
    WeatherForecast.prototype.setCurrentType = function (type ) {
    this.data.type = type
}
    WeatherForecast.prototype.clearCurrentType = function () {
    delete this.data.type
}
    WeatherForecast.prototype.getCurrentPeriod = function () {
    return this.interval
}
    WeatherForecast.prototype.setCurrentPeriod = function (curentPeriod) {
    this.interval = curentPeriod
}
    WeatherForecast.prototype.add = function (data) {
    this.data.push(data)
}
    WeatherForecast.prototype.data = function () {
    return this.data
}
    WeatherForecast.prototype.convertToInternationalUnits = function () {
    this.data = this.data.map(function (WeatherPrediction) {
    if (WeatherPrediction.getType().includes("PrecipitationPrediction")) {
    if (WeatherPrediction.getType().includes("US")) {
    WeatherPrediction.convertToMM()
    WeatherPrediction.setUnit("INT")
}
}
    if (WeatherPrediction.getType().includes("WindPrediction")) {
    if (WeatherPrediction.getType.includes("US")) {
    WeatherPrediction.convertToMPH()
    WeatherPrediction.setUnit("INT")
}
}
    if (WeatherPrediction.getType().includes("TemperaturePrediction")) {
    if (WeatherPrediction.getType().includes("US")) {
    WeatherPrediction.convertToC()
    WeatherPrediction.setUnit("INT")
}
}
    return WeatherPrediction
})
}
    WeatherForecast.prototype.convertToUSUnits = function () {
    this.data = this.data.map(function (WeatherPrediction) {
    if (WeatherPrediction.getType().includes("PrecipitationPrediction")) {
    if (WeatherPrediction.getType().includes("INT")) {
    WeatherPrediction.convertToInches()
    WeatherPrediction.setUnit("US")
}

}
    if (WeatherPrediction.getType().includes("WindPrediction")) {
    if (WeatherPrediction.getType.includes("INT")) {
    WeatherPrediction.convertToMS()
    WeatherPrediction.setUnit("US")
}
}
    if (WeatherPrediction.getType().includes("TemperaturePrediction")) {
    if (WeatherPrediction.getType().includes("INT")) {
    WeatherPrediction.convertToF()
    WeatherPrediction.setUnit("US")
}
}
    return WeatherPrediction
})
}

class WeatherHistory {
    constructor(data) {
        this.data = data
        this.interval = null
        this.place = ""
        this.type = ""
    }
}

class WeatherData extends EventDataType {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit)
        this.value = value
    }
}

class CloudCoverage extends WeatherData {
    constructor(time, place, type, unit, value, coverageArea) {
        super(time, place, type, unit, value)
        this.coverageArea = coverageArea
    }
}
    CloudCoverage.prototype.getCoverageArea = function () {
    return this.coverageArea
}
    CloudCoverage.prototype.setCoverageArea = function (area) {
    this.coverageArea = area
}

class Wind extends WeatherData {
    constructor(time, place, type, unit, value, direction) {
        super(time, place, type, unit, value)
        this.direction = direction
    }
}

    Wind.prototype.convertToMPH = function () {
    this.value = this.value * 0.44704
}
    Wind.prototype.convertToMS = function () {
    this.value = this.value / 0.44704
}

class Precipitation extends WeatherData {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit, value)
    }
}

    Precipitation.prototype.convertToInches = function () {
    this.value = this.value / 25.4
}
    Precipitation.prototype.convertToMM = function () {
    this.value = this.value * 25.4
}

class Temperature extends WeatherData {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit, value)
    }
}

    Temperature.prototype.convertToF = function () {
    this.value = this.value * 9 / 5 + 32
}

    Temperature.prototype.convertToC = function () {
    this.value = (this.value - 32) * 5 / 9
}



WeatherData.prototype.getValue = function () {
    return this.value
}
WeatherData.prototype.setValue = function (value) {
    this.value = value
}





WeatherHistory.prototype.getCurrentPlace = function () {
    return this.place
}
WeatherHistory.prototype.setCurrentPlace = function (place) {
    this.place = place
}
WeatherHistory.prototype.clearCurrentPlace = function () {
    delete this.place
}
WeatherHistory.prototype.getCurrentType = function () {
    return this.type
}
WeatherHistory.prototype.setCurrentType = function (type) {
    this.type = type
}
WeatherHistory.prototype.clearCurrentType = function () {
    delete this.type
}
WeatherHistory.prototype.getCurrentPeriod = function () {
    return this.interval
}
WeatherHistory.prototype.setCurrentPeriod = function (curentPeriod) {
    this.interval = curentPeriod
}
WeatherHistory.prototype.add = function (data) {
    this.data.push(data)
}
WeatherHistory.prototype.data = function () {
    return this.data
}
WeatherHistory.prototype.convertToInternationalUnits = function () {
    this.data = this.data.map(function (WeatherData) {
        if (WeatherData.getType().includes("Precipitation")) {
            if (WeatherData.getType().includes("US")) {
                WeatherData.convertToMM()
                WeatherData.setUnit("INT")
            }

        }
        if (WeatherData.getType().includes("Wind")) {
            if (WeatherData.getType.includes("US")) {
                WeatherData.convertToMPH()
                WeatherData.setUnit("INT")
            }
        }
        if (WeatherData.getType().includes("Temperature")) {
            if (WeatherData.getType().includes("US")) {
                WeatherData.convertToC()
                WeatherData.setUnit("INT")
            }
        }
        return WeatherData;
    })
}
WeatherHistory.prototype.convertToUSUnits = function () {
    this.data = this.data.map(function (WeatherData) {
        if (WeatherData.getType().includes("Precipitation")) {
            if (WeatherData.getType().includes("INT")) {
                WeatherData.convertToInches()
                WeatherData.setUnit("US")
            }

        }
        if (WeatherData.getType().includes("Wind")) {
            if (WeatherData.getType.includes("INT")) {
                WeatherData.convertToMS()
                WeatherData.setUnit("US")
            }
        }
        if (WeatherData.getType().includes("Temperature")) {
            if (WeatherData.getType().includes("INT")) {
                WeatherData.convertToF()
                WeatherData.setUnit("US")
            }
        }
        return WeatherData;
    })
}

class DateInterval {
    constructor(from, to) {
        this.from = from
        this.to = to
    }
}

    DateInterval.prototype.getFrom = function () {
    return this.from
}
    DateInterval.prototype.setFrom = function ( from ) {
    this.from = from
}
    DateInterval.prototype.getTo = function () {
    return this.to
}
    DateInterval.prototype.setTo = function () {
    this.to = to
}
    DateInterval.prototype.contains = function (date) {
    return date>= from && date <= this.to
}