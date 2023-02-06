export interface ICoord {
    lon: number;
    lat: number;
  }

  export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface IMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }

  export interface IWind {
    speed: number;
    deg: number;
  }

  export interface IClouds {
    all: number;
  }

  export interface ISys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  }

  export interface IWeatherResponse {
    coord: ICoord;
    weather: IWeather[];
    base: string;
    main: IMain;
    visibility: number;
    wind: IWind;
    clouds: IClouds;
    dt: number;
    sys: ISys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export type PreparedWeatherResponseType = Pick<IWeatherResponse, 'weather' | 'name' | 'wind'| 'main' | 'sys' | 'visibility'>

export interface INewWeather {
  name: string
  temp: number,
  wind: string,
  humidity: string,
  feels: string,
  country: string,
  weather: IWeather | undefined,
  visibility: string,
  id: number
}

