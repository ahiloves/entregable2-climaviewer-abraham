import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherDetail from './assets/WeatherDetail';



function App() {
  const [weather, setWeather] = useState(null);

  const success = (pos) => {
    const {
      coords: { latitude, longitude },
    } = pos;

    // Corregir aquí: agregar comillas alrededor de la clave de la API
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=032c2feca99d5e3cf5fe19b380334735&lang=es&units=metric`)
      .then(({ data }) => {
        // Corregir aquí: usar setWeather para actualizar el estado
        setWeather(data);
      })
      .catch((err) => {
        // Corregir aquí: solo usar `err`
        console.error(err);
      });
  };

  useEffect(() => {
    // Corregir aquí: cambiar "naviagtor" a "navigator"
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    
    <main className="flex justify-center items-center h-screen ] bg-black text-white sm:flex sm:flex-cols-2  dark:text-white dark:bg-slate-500 ">
      {weather ? <WeatherDetail weather={weather} /> : <span>Cargando ... </span>}
    </main>
  );
}

export default App;