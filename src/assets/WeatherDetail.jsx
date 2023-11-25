import { IconMoonFilled, IconSun } from '@tabler/icons-react';
import React, { useState } from 'react';

const WeatherDetail = ({ weather }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const celsiusToFahrenheit = (tempCelsius) => {
    const tempF = ((tempCelsius * 9) / 5 + 32).toFixed(1);
    return tempF;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };

  const temperatureValue = isCelsius
    ? weather.main.temp.toFixed(1)
    : celsiusToFahrenheit(weather.main.temp);

  const getBackgroundImage = () => {
    const weatherType = weather.weather[0].main;
    const currentTime = new Date().getHours();
    const isDaytime = currentTime >= 6 && currentTime < 18;

    const weatherImages = {
      'Clear': 'clear-sky',
      'Clouds': 'few-clouds',
      'Cloudy': 'few-clouds',
      'Mist': 'mist',
      'Smoke': 'mist',
      'Haze': 'mist',
      'Dust': 'mist',
      'Fog': 'mist',
      'Sand': 'mist',
      'Dust': 'mist',
      'Ash': 'mist',
      'Squall': 'mist',
      'Tornado': 'mist',
      'Snow': 'snow',
      'Rain': 'rain',
      'Drizzle': 'shower-rain',
      'Thunderstorm': 'thunderstorm',
    };

    const imageName = weatherImages[weatherType] || 'default';
    const imageExtension = isDaytime ? 'day.gif' : 'night.gif';

    return `/${imageName}-${imageExtension}`;
  };

  const backgroundImage = getBackgroundImage();

  return (
    <div
      className={`min-h-screen flex flex-col gap-10 items-center justify-center ${
        isDarkMode ? 'dark:bg-black-200 dark:text-white' : ''
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <style>
        {`
          body {
            background-image: url('${backgroundImage}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>

      <button
        onClick={toggleDarkMode}
        className='border-1 rounded-xl p-1 hover:bg-slate-500 transition-colors'
      >
        {isDarkMode ? (
          <>
            <IconSun className='dark:hidden block' />
            <IconMoonFilled className='hidden dark:block' />
          </>
        ) : (
          <>
            <IconMoonFilled className='dark:hidden block' />
            <IconSun className='hidden dark:block' />
          </>
        )}
      </button>

      <article
        className={`text-center grid gap-4 bg-white/60 p-4 rounded-xl ${
          isDarkMode
            ? 'dark:bg-gray-800 dark:text-gray-300' // Fondo oscuro y texto claro
            : 'bg-white/60 text-black' // Fondo claro y texto oscuro
        }`}
      >
        <h3>
          {weather.name}, {weather.sys.country}
        </h3>

        <div className="text-black grid gap-4 text-center sm:grid-cols-2 sm:gap-5 sm:flex justify-center">
          <section className="bg-white/60 p-4 rounded-xl grid grid-cols-[1fr_1fr] items-center ">
            <h3 className="col-span-2">{weather.weather[0].description}</h3>
            <span className="text-3xl">
              {temperatureValue}°{isCelsius ? 'C' : 'F'}
            </span>
            <div>
              <img
                className="block mx-auto"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
            </div>
          </section>

          <section className="grid grid-cols-3 justify-items-center bg-white/60 p-2 rounded-xl sm:flex flex-col justify-center items-center sm:w-1/3 sm:h-full">
            <div className="flex gap-1 sm:gap-2">
              <div>
                <img src="/wind.svg" alt="icono de viento" />
              </div>
              <span> {weather.wind.speed}m/s</span>
            </div>

            <div className="flex gap-1 sm:gap-9">
              <div>
                <img src="/humidity.svg " alt="icono de la humedad" />
              </div>
              <span> {weather.main.humidity}%</span>
            </div>

            <div className="flex gap-1">
              <div>
                <img src="/pressure.svg" alt="icono de la presion" />
              </div>
              <span> {weather.main.pressure}hPa</span>
            </div>
          </section>
        </div>

        <button
          onClick={toggleTemperatureUnit}
          className="bg-white text-blue-500 py-1 px-2 rounded-md border border-blue-500 hover:text-blue-500 transition-all w-32 mx-auto mt-6 hover:bg-sky-200"
        >
          Cambiar a °{isCelsius ? 'F' : 'C'}
        </button>
      </article>
    </div>
  );
};

export default WeatherDetail;