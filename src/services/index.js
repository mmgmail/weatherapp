
const WEATHER_TODAY = 'https://api.openweathermap.org/data/2.5/weather?';
const PARAMS = '&units=metric&lang=us&'
const API_KEY = 'appid=063c51f5bd4cc4f176c67724ff4cd230';

export class Api {
  static async getDataWeather(lat, lon) {
    const response = await fetch(`${WEATHER_TODAY}lat=${lat}&lon=${lon}&${PARAMS}${API_KEY}`);
    if (!response.ok) {
      throw new Error(response.status)
    }
    return await response.json();
  }
}