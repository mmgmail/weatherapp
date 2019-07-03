const weather = (state = {}, action) => {
	switch (action.type) {
		case 'LOADING': {
			return {
				...state,
				isLoading: true
			}
		}
		case 'GET_WEATHER_TODAY_SUCCESS':
			return {
				...state,
				todayWeather: action.payload,
				isLoading: false
			}
		case 'GET_WEATHER_TODAY_FAILURE': {
			return {
				...state,
				error: action.payload,
				isLoading: false
			}
		}
		case 'RESET_PARAMS':
			return {
				...state,
				todayWeather: action.payload,
				isLoading: false
			}
		default:
			return state
	}
}
    
export default weather