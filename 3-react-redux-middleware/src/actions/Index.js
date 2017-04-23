import axios from 'axios';

const API_KEY = 'b7fdf861f483ae8f83f540b0b8b5a889';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';

//thunk way
export function fetchWeather(city){
  return (dispatch) => {
    // dispatch({type: FETCH_WEATHER});
      const url = `${ROOT_URL}&q=${city},us`;
      axios.get(url).then((resp)=>{
        return dispatch({type: FETCH_WEATHER, payload: resp});
      });
  }
}

//promise way
// export function fetchWeather(city){
//   const url = `${ROOT_URL}&q=${city},us`;
//   const request = axios.get(url);
//
//   return{
//     type: FETCH_WEATHER,
//     payload: request
//   }
// }
