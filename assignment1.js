//WeatherData
weatherData = (state) => ({

    //Event
    getTime() { return state.time },
    setTime(newTime) { state.time = newTime },

    getPlace() { return state.place },
    setPlace(newPlace) { state.place = newPlace },

    //DataType
    getType() { return state.type },
    setType(newType) { state.type = newType },

    getUnit() { return state.unit },
    setUnit(newUnit) { state.unit = newUnit },

    //WeatherData
    getValue() { return state.value },
    setValue(newValue) { state.value = newValue }
})

//WeatherPrediction
weatherPrediction = (state) => ({
    //Event
    getTime() { return state.time },
    setTime(newTime) { state.time = newTime },

    getPlace() { return state.place },
    setPlace(newPlace) { state.place = newPlace },

    //DataType
    getType() { return state.type },
    setType(newType) { state.type = newType },

    getUnit() { return state.unit },
    setUnit(newUnit) { state.unit = newUnit },

    //WeatherPrediction
    getFrom() { return state.from },
    setFrom(newFrom) { state.from = newFrom },
    getTo() { return state.to },
    setTo(newTo) { state.to = newTo }
})

//DateInterval
fromGetterSetter = (state) => ({
    getFrom() { return state.from },
    setFrom(newFrom) { state.to = newFrom }
})

toGetterSetter = (state) => ({
    getTo() { return state.from },
    setTo(newTo) { state.to = newTo }
})



//WeatherHistory
currentPlaceGetterSetter = (state) => ({
    getCurrentPlace() { return state.currentPlace },
    setCurrentPlace(newCurrentPlace) { state.currentPlace = newCurrentPlace },
    clearCurrentPlace() { state.currentPlace = "" }
})

currentPeriodGetterSetter = (state) => ({
    getCurrentPeriod() { return state.currentPeriod },
    setCurrentPeriod(newPeriod) { state.currentPeriod = newPeriod },
    clearCurrentPeriod() { state.currentPeriod = "" }
})

currentTypeGetterSetter = (state) => ({
    getCurrentType() { return state.currentType },
    setCurrentType(newcurrentType) { state.currentType = newcurrentType },
    clearCurentType() { state.currentType = "" }
})

dataManipulation = (state) => ({
    add(newdata) { state.data.push(newdata); },
    data() { return state.data }
})

dateIntervalContains = (state) => ({
    contains(d) { return d >= state.from && d <= state.to }
})


//UsConverter
UsConverter = (state) => ({
    convertToUSUnits() {
        state.data = state.data.map(function (weatherData) {
            if (weatherData.getUnit() === "INTERNATIONAL") {
                if (weatherData.getType().includes("Precipitation")) {
                    weatherData.convertToInches();
                    weatherData.setUnit("US");
                }
                if (weatherData.getType().includes("Wind")) {
                    weatherData.convertToMS();
                    weatherData.setUnit("US");

                }
                if (weatherData.getType().includes("Temperature")) {
                    weatherData.convertToF();
                    weatherData.setUnit("US");
                }
            }
            return weatherData;
        })
    }
})

//InternationalConverter
InternationalConverter = (state) => ({
    convertToInternationalUnits() {
        state.data = state.data.map((weatherData) => {
            if (weatherData.getUnit() == "US") {

                if (weatherData.getType().includes("Precipitation")) {
                    weatherData.convertToMM();
                    weatherData.setUnit("INTERNATIONAL");
                }
                if (weatherData.getType().includes("Wind")) {
                    weatherData.convertToMPH();
                    weatherData.setUnit("INTERNATIONAL");
                }
                if (weatherData.getType().includes("Temperature")) {
                    weatherData.convertToC();
                    weatherData.setUnit("INTERNATIONAL");
                }
            }
            return weatherData;
        }, {})
    }
})


//Wind
windDirectionsGetterSetter = (state) => ({
    getWindDirections() { return state.directions },
    setWindDirections(newDirections) { state.directions = newDirections },
    addWindDirection(newDirection) { state.directions.push(newDirection) },
    removeWindDirection(direction) {
        state.directions.filter(function (dir) {
            if (direction === dir) return false;
            return true;
        })
    }
})

windDirectionGetterSetter = (state) => ({
    direction() { return state.direction },
    setDirection(newDirection) { state.direction = newDirection }
})

//windConverter
windConverter = (state) => ({
    convertToMPH() {

        if (state.type.includes("Prediction")) {
            state.to = state.to * 0.44704
            state.from = state.from v
        }

        else state.value = state.value * 0.44704
    },
    convertToMS() {

        if (state.type.includes("Prediction")) {
            state.to = state.to / 0.44704
            state.from = state.from / 0.44704
        }

        else state.value = state.value / 0.44704
    }
})

//temperatureConverter
temperatureConverter = (state) => ({
    convertToF() {
        if (state.type.includes("Prediction")) {
            state.to = (state.to * 9 / 5) + 32
            state.from = (state.from * 9 / 5) + 32
        }
        else state.value = (state.value * 9 / 5) + 32
    },
    convertToC() {
        if (state.type.includes("Prediction")) {
            state.to = (state.to - 32) * 5 / 9
            state.from = (state.from - 32) * 5 / 9
        }
        else state.value = (state.value - 32) * 5 / 9
    }
})



//Precipation
precipitationTypeGetterSetter = (state) => ({
    getPrecipitationType() { return state.precipitationType },
    setPrecipitationType(newPt) { state.precipitationType = newPt }
})

precipitationTypesGetterSetter = (state) => ({
    getPrecipitationTypes() { return state.precipitationTypes },
    setPrecipitationTypes(newPts) { state.precipitationTypes = newPts },
    addPrecipitationType(newPt) { state.precipitationTypes.push(newPt) },
    removePrecipitationType(prtTy) {
        state.precipitationTypes.filter(function (type) {
            if (prtTy === type) return false;
            return true;
        })
    }
})

//precipitationConverter
precipitationConverter = (state) => ({
    convertToInches() {
        if (state.type.includes("Prediction")) {
            state.to = state.to / 25.4
            state.from = state.from / 25.4
        }
        else state.value = state.value / 25.4
    },
    convertToMM() {
        if (state.type.includes("Prediction")) {
            state.to = state.to * 25.4
            state.from = sstate.from * 25.4
        }
        else state.value = state.value * 25.4
    }
})

//Objects
DateInterval = function (from, to) {
    state = {
        from,
        to
    }
    return Object.assign({}, fromGetterSetter(state), toGetterSetter(state), dateIntervalContains(state))
}

Temperature = function (time, place, type, unit, value) {

    state = {
        time,
        place,
        unit,
        type,
        value
    }
    return Object.assign({}, weatherData(state), temperatureConverter(state))
}

Precipitation = function (time, place, type, unit, value, precipitationType) {
    state = {
        time,
        place,
        unit,
        type,
        value,
        precipitationType
    }
    return Object.assign({}, weatherData(state), precipitationTypeGetterSetter(state), precipitationConverter(state))
}

Wind = function (time, place, type, unit, value, direction) {
    state = {
        time,
        place,
        type,
        unit,
        value,
        direction
    }
    return Object.assign({}, weatherData(state), windDirectionGetterSetter(state), windConverter(state))
}

CloudCoverage = function (time, place, type, unit, value) {
    state = {
        time,
        place,
        type,
        unit,
        value
    }
    return Object.assign({}, weatherData(state), valueGetterSetter(state))
}

WeatherHistory = function (data, currentPeriod, currentPlace, currentType) {
    state = {
        data,
        currentPeriod,
        currentPlace,
        currentType
    }
    return Object.assign({}, dataManipulation(state), UsConverter(state), InternationalConverter(state), currentPlaceGetterSetter(state), currentPeriodGetterSetter(state), currentTypeGetterSetter(state))
}

TemperaturePrediction = function (time, place, type, unit, to, from) {
    state = {
        time,
        place,
        type,
        unit,
        to,
        from
    }


    return Object.assign({}, weatherPrediction(state), precipitationConverter(state), precipitationTypesGetterSetter(state))
}

PrecipitationPrediction = function (time, place, type, unit, precipitationTypes, to, from) {
    state = {
        time,
        place,
        type,
        precipitationTypes,
        unit,
        to,
        from
    }
    matches = function (data) {
        return data.getValue() >= state.from
            && data.getValue() <= state.to
            && data.getPlace() == state.place
            && data.getUnit() == state.unit
            && data.getTime() == state.time
            && state.precipitationTypes.includes(data.getPrecipitationType())
    };
    return Object.assign({}, weatherPrediction(state), precipitationConverter(state), precipitationTypesGetterSetter(state), { matches })
}

WindPrediction = function (time, place, type, unit, directions, to, from) {
    state = {
        time,
        place,
        type,
        directions,
        unit,
        to,
        from
    }
    matches = function (data) {
        return data.getValue() >= state.from
            && data.getValue() <= state.to
            && data.getPlace() === state.place
            && data.getUnit() === state.unit
            && data.getTime() === state.time
            && state.directions.includes(data.direction())
    };
    return Object.assign({}, weatherPrediction(state), windConverter(state), windDirectionsGetterSetter(state))
}

CloudCoveragePrediction = function (time, place, type, unit, to, from) {
    state = {
        time,
        place,
        type,
        unit,
        to,
        from
    }
    return Object.assign({}, weatherPrediction(state))
}

WeatherForecast = function (data, currentPeriod, currentPlace, currentType) {
    scope = {
        data,
        currentPeriod,
        currentPlace,
        currentType
    }
    return Object.assign({}, dataManipulation(state), currentPeriodGetterSetter(state), currentPlaceGetterSetter(state), currentTypeGetterSetter(state), InternationalConverter(state), UsConverter(state))
}


temp1 = Temperature("01", "London", "Temperature", "US", 50)
temp2 = Temperature("02", "London", "Temperature", "INTERNATIONAL", 25)
wind1 = Wind("18", "Manchester", "Wind", "US", "3")
weatherDatas = [temp1, temp2, wind1]
period1 = DateInterval("11/09/2001", "11/09/2020")
weatherHistory = WeatherHistory(weatherDatas, period1, "London", "Temperature")
wind2 = Wind("23", "Vejle", "Wind", "US", "2", "NV")
weatherHistory.add(wind2)
temp3 = Precipitation("01", "London", "Temperature", "130", 18, 25)
temp4 = PrecipitationPrediction("01", "London", "Temperature", "134", [18, 25, 54], 12, 320)




console.log("Temperature before convertion to International Units")
console.log("Value: " + temp1.getValue())
console.log("Place : " + temp1.getPlace())
console.log("Time: " + temp1.getTime())
console.log("Unit: " + temp1.getUnit())
console.log("Type: " + temp1.getType())
console.log("")
weatherHistory.convertToInternationalUnits()
console.log("Temperature after convertion to International Units")
console.log("Value: " + temp1.getValue())
console.log("Place : " + temp1.getPlace())
console.log("Time: " + temp1.getTime())
console.log("Unit: " + temp1.getUnit())
console.log("Type: " + temp1.getType())
console.log("")
console.log("Temperature before convertion to US units:")
console.log("Value: " + temp1.getValue())
console.log("Place : " + temp1.getPlace())
console.log("Time: " + temp1.getTime())
console.log("Unit: " + temp1.getUnit())
console.log("Type: " + temp1.getType())
console.log("")
weatherHistory.convertToUSUnits()
console.log("Temperature after convertion to US units:")
console.log("Value: " + temp1.getValue())
console.log("Place : " + temp1.getPlace())
console.log("Time: " + temp1.getTime())
console.log("Unit: " + temp1.getUnit())
console.log("Type: " + temp1.getType())
console.log("")
console.log("Temperature3 = Temprature4? " + temp4.matches(temp3))
console.log("")
console.log("")
console.log("")
console.log("")

console.log("Wind before convertion to International Units")
console.log("Value: " + wind1.getValue())
console.log("Place : " + wind1.getPlace())
console.log("Time: " + wind1.getTime())
console.log("Unit: " + wind1.getUnit())
console.log("Type: " + wind1.getType())
weatherHistory.convertToInternationalUnits()
console.log("")
console.log("Wind after convertion to International Units")
console.log("Value: " + wind1.getValue())
console.log("Place : " + wind1.getPlace())
console.log("Time: " + wind1.getTime())
console.log("Unit: " + wind1.getUnit())
console.log("Type: " + wind1.getType())
console.log("")
console.log("Wind before convertion to US units:")
console.log("Value: " + wind1.getValue())
console.log("Place : " + wind1.getPlace())
console.log("Time: " + wind1.getTime())
console.log("Unit: " + wind1.getUnit())
console.log("Type: " + wind1.getType())
console.log("")
weatherHistory.convertToUSUnits()
console.log("Wind after convertion to US units:")
console.log("Value: " + wind1.getValue())
console.log("Place : " + wind1.getPlace())
console.log("Time: " + wind1.getTime())
console.log("Unit: " + wind1.getUnit())
console.log("Type: " + wind1.getType())
console.log("")