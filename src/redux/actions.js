import { Api } from 'AppApi';
const { getDataWeather } = Api;

const getWeatherToday = (lat, lon) => (dispatch) => {
	dispatch({ type: 'LOADING' })
	getDataWeather(lat, lon).then(res => {
		dispatch({ type: 'GET_WEATHER_TODAY_SUCCESS', payload: res });
	}).catch(function (error) {
		dispatch({ type: 'GET_WEATHER_TODAY_FAILURE', payload: error })
	})
}
export {
	getWeatherToday
}