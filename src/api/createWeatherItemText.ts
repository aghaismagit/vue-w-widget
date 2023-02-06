import {INewWeather, PreparedWeatherResponseType} from "@/api/interfaces";

export const prepareWeatherData = (weatherData: PreparedWeatherResponseType,
  myWeather: { value: INewWeather[] },
): { value: INewWeather[] } => {

  const newWeather = {
    name: weatherData.name,
    temp: Math.round(weatherData.main.temp),
    wind: `Wind speed: ${weatherData.wind.speed}м/с`,
    humidity: `Relative humidity: ${weatherData.main.humidity}%`,
    feels: `Feels like: ${Math.round(weatherData.main.feels_like)}`,
    country: weatherData.sys.country,
    weather: weatherData.weather.pop(),
    visibility: `Visibility: ${weatherData.visibility}м`,
    id: Date.now()
  };

  myWeather.value.push(newWeather);
  return myWeather;
}
