import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData, fetchDataForCity, postHistoricData, selectDates, fetchWeatherPrediction, fetchWeatherPredictionForCity } from './filterSlice'

export const Filter = () => {
    const dispatch = useDispatch()
    const city = useSelector(state => state.filter.city)
    const data = useSelector(state => state.filter.data)
    const status = useSelector(state => state.filter.status)
    const dateFrom = useSelector(state => state.filter.dateFrom)
    const dateTo = useSelector(state => state.filter.dateTo)
    const dates = useSelector(state => selectDates(state.filter.data))
    const form = useSelector(state => state.filter.form)
    const formStatus = useSelector(state => state.filter.formStatus)
    const places = useSelector(state => state.filter.cities)
    const predictions = useSelector(state => state.filter.predictions)

    const types = ['temperature', 'precipitation', 'wind speed', 'cloud coverage']

    useEffect(() => {
        if (places.length === 0) {
            dispatch(fetchData())
            dispatch(fetchWeatherPrediction())
        }
    }, [places, dispatch])


    const onChangeCity = async (city) => {
        try {
            await dispatch(fetchDataForCity(city));
            await dispatch(fetchWeatherPredictionForCity(city))
        } catch (err) {
            console.error('Failed to change the city: ', err)
        }
    }

    const onRefresh = async () => {
        try {
            await dispatch(fetchData());
        } catch (err) {
            console.error('Failed to change the city: ', err)
        }
    }


    const latestMeasurement = (rawData) => {
        let latestData = [];

        types.forEach(type => {
            let filteredTypes = rawData.filter(o => o['type'] === type);
            latestData.push(filteredTypes[filteredTypes.length - 1])
        });
        return (JSON.stringify(latestData))
    }

    const onChangeDateFrom = (date) => {
        dispatch({ type: 'filter/setDateFrom', payload: date })
    }

    const onChangeDateTo = (date) => {
        dispatch({ type: 'filter/setDateTo', payload: date })
    }


    const handleFormChange = (key, value) => {
        dispatch({ type: 'filter/handleFormChange', payload: [key, value] })
    }

    const onSubmitForm = async (form) => {
        try {
            await dispatch(postHistoricData(form));
        } catch (err) {
            console.error('Failed to change the city: ', err)
        } finally {
            await dispatch(fetchData());
        }
    }

    return (
        <div>
            <button type="button" onClick={() => onRefresh()}>REFRESH</button>
            <form>
                <label>
                    City: <p>{city}</p>
                    <select defaultValue={city} onChange={(e) => onChangeCity(e.target.value)}>
                        {places.map(by => <option key={by}>{by}</option>)}
                    </select>
                </label>
            </form>
            <p>{status ? status : 'no status'} </p>

            <div>
                <label>
                    <span>
                        dateFrom:
                        <select defaultValue={dateFrom} onChange={(e) => onChangeDateFrom(e.target.value)}>
                            {dates.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </span>
                </label>
            </div>

            <label>
                dateTo:
                <select defaultValue={dateTo} onChange={(e) => onChangeDateTo(e.target.value)}>
                    {dates.map(d => <option key={d}>{d}</option>)}
                </select>
            </label>

            <table>
                <tbody>
                    <tr>
                        <td>All data for the latest measurement of each kind</td>
                        <td>{latestMeasurement(data)}</td>
                    </tr>
                    <tr>
                        <td>All historical data</td>
                        <td>{JSON.stringify(data.filter(d => d.place === city))}</td>
                    </tr>
                    <tr>
                        <td>Predictions</td>
                        <td>{JSON.stringify(predictions)}</td>
                    </tr>
                </tbody>
            </table>
            <form>
                <h3>report historic data</h3>
                <label>place </label>
                <input type="text" onChange={(e) => handleFormChange('place', e.target.value)}></input>
                <br />
                <label>date (yyyy-dd-mm) </label>
                <input type="text" onChange={(e) => handleFormChange('time', e.target.value)}></input>
                <br />
                <label>type </label>
                <select onChange={(e) => handleFormChange('type', e.target.value)}>
                    {types.map(d => <option key={d}>{d}</option>)}
                </select>
                <br />
                <label>value </label><input type="number" onChange={(e) => handleFormChange('value', e.target.value)} ></input>
                <br />
                <label>unit </label><input type="text" onChange={(e) => handleFormChange('unit', e.target.value)}  ></input>
                <button type="button" onClick={() => onSubmitForm(form)}>SUBMIT</button>
                <h2>{formStatus}</h2>
            </form>
        </div>
    );
}