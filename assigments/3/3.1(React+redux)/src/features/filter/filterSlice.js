import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const _initialFormState = { 
    'place': '',
     'time': '', 
     'type': '', 
     'value': 0, 
     'unit': '' }

const _initialState = {
    city: '',
    cities: [],
    dateFrom: '',
    dateTo: '',
    data: [],
    status: 'initial',
    error: '',
    formStatus: '',
    form: _initialFormState,
    predictions: []
}

export const fetchData = createAsyncThunk('filter/fetchData', async () => {
    const response = await client.get(`http://localhost:8080/data`);
    return {'response' : response }
})

export const fetchDataForCity = createAsyncThunk('filter/fetchDataForCity', async (city) => {
    const response = await client.get(`http://localhost:8080/data/${city}`);
    return { 'city': city, 'response': response }
})

export const postHistoricData = createAsyncThunk('filter/postHistoricData', async (formData) => {
    console.log(JSON.stringify(formData))
    const response = await client.post(`http://localhost:8080/data`, formData);
    return response
})

export const fetchWeatherPrediction = createAsyncThunk('filter/fetchWeatherPrediction', async () => {
    const response = await client.get(`http://localhost:8080/forecast`);
    return {  'response': response }
})

export const fetchWeatherPredictionForCity = createAsyncThunk('filter/fetchWeatherPredictionForCity', async (city) => {
    const response = await client.get(`http://localhost:8080/forecast/${city}`);
    return { 'city': city,'response': response }
})

export const filterSlice = createSlice({
    name: 'filter',
    initialState: _initialState,
    reducers: {
        setDateFrom(state, action) {
            state.dateFrom = action.payload
            state.data = state.data.filter((e) => e.time >= state.dateFrom);
        },
        setDateTo(state, action) {
            state.dateTo = action.payload
            state.data = state.data.filter((e) => e.time >= state.dateTo);
        },
        handleFormValueChange(state, action){
            state.form['value'] = action.payload
        },
        handleFormChange(state, action) {
            state.form[action.payload[0]] = action.payload[1]
        }
    },
    extraReducers: {
        [fetchDataForCity.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchDataForCity.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.city = action.payload.city
            state.data = action.payload.response
        },
        [fetchDataForCity.rejected]: (state, action) => {
            state.status = 'failed'
            console.log('failed')
            state.error = action.error.message
        },
        [postHistoricData.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.formStatus = 'data added'
            state.form = _initialFormState
        },
        [postHistoricData.rejected]: (state, action) => {
            console.log(action.error.message)
        },
        [fetchData.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.cities = selectPlaces(action.payload.response)
            state.data = action.payload.response
        },
        [fetchWeatherPrediction.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.predictions = action.payload.response
        },
        [fetchWeatherPredictionForCity.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.city = action.payload.city
            state.predictions = action.payload.response
        },

    }
})

export const { setCity, setDateFrom, setDateTo, handleFormChange, handleFormValueChange } = filterSlice.actions;

export default filterSlice.reducer;

export const selectDates = (rawData) => {
    var dates = [];
    rawData.forEach((e) => {
        if (!dates.includes(e.time)) {
            dates.push(e.time);
        }
    });
    return dates
}


export const selectPlaces = (rawData) => {
    var places = [];
    rawData.forEach((e) => {
        if (!places.includes(e.place)) {
            places.push(e.place);
        }
    });
    return places
}

export const selectTypes = (rawData) => {
    var types = [];
    rawData.forEach((e) => {
        if (!types.includes(e.types)) {
            types.push(e.types);
        }
    });
    return types
}