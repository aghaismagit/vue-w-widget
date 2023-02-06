import axios from "axios";
import {onMounted, ref} from "vue";
import {prepareWeatherData} from "./createWeatherItemText";
import {INewWeather, IWeatherResponse, PreparedWeatherResponseType} from "@/api/interfaces";

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const MAIN_UNITS = "metric";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export function getWeather() {
  const myWeather = ref<INewWeather[]>([]);
  const isLoading = ref<boolean>(true);
  const locations = ref<string[]>([]);
  const reqIsNotValid = ref(false);

  const fetchWeather = async (cityName = "Moscow") => {

    try {
      isLoading.value = true;
      const {
        data: {
          weather, name, wind, main, sys, visibility,
        },
      } = await axios.get<IWeatherResponse>(
        `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=${MAIN_UNITS}`,
      );

      const weatherData:PreparedWeatherResponseType = {
        weather, name, wind, main, sys, visibility
      }

      prepareWeatherData(weatherData, myWeather);
      reqIsNotValid.value = false;
      isLoading.value = false;

      return name

    } catch (e) {
      reqIsNotValid.value = true;
      locations.value = locations.value.filter((i) => i !== cityName);
      localStorage.setItem("locations", JSON.stringify(locations.value));
      isLoading.value = false;
    }

  };

  const fetchOnMounted = async () => {
    if(localStorage.getItem("locations")){
      locations.value = JSON.parse(localStorage.getItem("locations") as string);
    }

    if (!locations.value.length) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude } = position.coords;
            const { longitude } = position.coords;

            try {
              isLoading.value = true;

              const {
                data: {
                  weather, name, wind, main, sys, visibility,
                },
              } = await axios.get<IWeatherResponse>(
                `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${MAIN_UNITS}`,
              );

              const weatherData:PreparedWeatherResponseType = {
                weather, name, wind, main, sys, visibility
              }


              prepareWeatherData(
                weatherData,
                myWeather
              );

              reqIsNotValid.value = false;
              locations.value.push(name);
              localStorage.setItem(
                "locations",
                JSON.stringify(locations.value),
              );
              isLoading.value = false;
            } catch (e) {
              reqIsNotValid.value = true;
            }
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              fetchWeather();
            }
          },
        );
      } else {
        await fetchWeather();
      }
    } else {
      locations.value.forEach((item) => fetchWeather(item));
    }
  };

  onMounted(fetchOnMounted);

  return {
    myWeather, isLoading, fetchWeather, locations, reqIsNotValid,
  };
}
