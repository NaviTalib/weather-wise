import React, { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY // process.env.REACT_APP_OPENWEATHER_API_KEY for CRA

const getWeatherEmoji = (iconCode) => {
  if (!iconCode) return '🌡️'
  switch (iconCode) {
    case '01d': return '☀️'
    case '01n': return '🌙'
    case '02d':
    case '02n': return '⛅'
    case '03d':
    case '03n':
    case '04d':
    case '04n': return '☁️'
    case '09d':
    case '09n': return '🌧️'
    case '10d':
    case '10n': return '🌦️'
    case '11d':
    case '11n': return '🌩️'
    case '13d':
    case '13n': return '❄️'
    case '50d':
    case '50n': return '🌫️'
    default: return '🌡️'
  }
}

const App = () => {
  const [city, setCity] = useState('Noida')
  const [searchInput, setSearchInput] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true)
      setError('')

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      )
      if (!weatherRes.ok) throw new Error('City not found')
      const weatherJson = await weatherRes.json()

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      )
      const forecastJson = await forecastRes.json()

      const dailyForecast = forecastJson.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      ).slice(0, 3)

      setWeatherData(weatherJson)
      setForecastData(dailyForecast)
      setCity(weatherJson.name)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = () => {
    const trimmedCity = searchInput.trim()
    if (!trimmedCity) return // Guard against empty or whitespace inputs

    fetchWeather(trimmedCity)
    setSearchInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  // Calculate local time for searched city based on OpenWeather UTC timezone offset
  const getCityLocalTime = (timezoneOffset) => {
    const utcDate = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000)
    const cityDate = new Date(utcDate.getTime() + timezoneOffset * 1000)
    
    const dayName = cityDate.toLocaleDateString('en-US', { weekday: 'long' })
    const formattedTime = cityDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    return { dayName, formattedTime }
  }

  const getShortDayName = (dtTxt) => {
    const date = new Date(dtTxt)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white font-sans relative overflow-hidden flex flex-col items-center p-4 sm:p-8'>
      
      {/* Decorative Glow Spheres */}
      <div className='absolute -top-20 -left-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl pointer-events-none'></div>
      <div className='absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none'></div>

      <div className='w-full max-w-2xl z-10 space-y-6'>
        
        {/* Transparent Header */}
        <header className='flex flex-col sm:flex-row justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl gap-4'>
          <span className='text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent'>
            WeatherWise
          </span>
          <div className='flex items-center space-x-2 w-full sm:w-auto'>
            <input
              className='w-full sm:w-60 bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:bg-white/20 py-2 px-4 rounded-xl transition backdrop-blur-sm'
              type="text"
              placeholder="Search city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className='bg-cyan-500/80 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-xl backdrop-blur-md transition shadow-lg active:scale-95 shrink-0'
            >
              Search
            </button>
          </div>
        </header>

        {loading ? (
          <div className='bg-white/10 backdrop-blur-md border border-white/15 p-12 rounded-3xl text-center text-xl font-medium tracking-wide shadow-2xl'>
            Fetching forecast...
          </div>
        ) : error ? (
          <div className='bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-200 p-6 rounded-3xl text-center font-medium shadow-2xl'>
            {error}. Please check the city name and try again.
          </div>
        ) : weatherData ? (
          <main className='space-y-6'>

            {/* Main Transparent Weather Card */}
            <div className='bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden'>
              
              {/* City Name */}
              <div className='text-3xl sm:text-4xl font-bold tracking-tight'>
                {weatherData.name}, <span className='text-cyan-300'>{weatherData.sys.country}</span>
              </div>

              {/* Day & Local Time */}
              {(() => {
                const { dayName, formattedTime } = getCityLocalTime(weatherData.timezone)
                return (
                  <div className='flex items-center justify-center space-x-2 text-sm sm:text-base text-white/80 font-medium mt-1 bg-white/5 px-3 py-1 rounded-full border border-white/10'>
                    <span>{dayName}</span>
                    <span>•</span>
                    <span className='text-cyan-200 font-semibold'>{formattedTime}</span>
                  </div>
                )
              })()}

              {/* Temperature & Emoji */}
              <div className='my-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6'>
                <span className='text-7xl sm:text-8xl drop-shadow-lg filter'>
                  {getWeatherEmoji(weatherData.weather[0].icon)}
                </span>
                <span className='text-6xl sm:text-7xl font-black bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent'>
                  {Math.round(weatherData.main.temp)}°C
                </span>
              </div>

              <div className='text-lg sm:text-xl capitalize text-cyan-200 font-semibold tracking-wide bg-white/10 px-4 py-1.5 rounded-full border border-white/10 mb-6'>
                {weatherData.weather[0].description}
              </div>

              {/* Details Grid */}
              <div className='grid grid-cols-3 gap-3 sm:gap-4 w-full pt-4 border-t border-white/10'>
                <div className='bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl flex flex-col items-center backdrop-blur-sm'>
                  <span className='text-xl sm:text-2xl mb-1'>💧</span>
                  <span className='text-xs text-white/60 font-medium'>Humidity</span>
                  <span className='text-sm sm:text-base font-bold text-white mt-0.5'>{weatherData.main.humidity}%</span>
                </div>

                <div className='bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl flex flex-col items-center backdrop-blur-sm'>
                  <span className='text-xl sm:text-2xl mb-1'>💨</span>
                  <span className='text-xs text-white/60 font-medium'>Wind</span>
                  <span className='text-sm sm:text-base font-bold text-white mt-0.5'>{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
                </div>

                <div className='bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl flex flex-col items-center backdrop-blur-sm'>
                  <span className='text-xl sm:text-2xl mb-1'>⏲️</span>
                  <span className='text-xs text-white/60 font-medium'>Pressure</span>
                  <span className='text-sm sm:text-base font-bold text-white mt-0.5'>{weatherData.main.pressure} hPa</span>
                </div>
              </div>
            </div>

            {/* Upcoming Forecast */}
            {forecastData.length > 0 && (
              <div className='bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl space-y-4'>
                <div className='text-lg font-bold text-cyan-200 tracking-wide'>
                  Upcoming Forecast
                </div>
                <div className='grid grid-cols-3 gap-3 sm:gap-4'>
                  {forecastData.map((item, index) => (
                    <div
                      key={index}
                      className='bg-white/5 border border-white/10 hover:border-cyan-400/40 p-4 rounded-2xl flex flex-col items-center justify-between backdrop-blur-md transition-all duration-300 hover:scale-105'
                    >
                      <span className='text-xs sm:text-sm font-semibold text-white/80'>
                        {getShortDayName(item.dt_txt)}
                      </span>
                      <span className='text-3xl sm:text-4xl my-2 filter drop-shadow'>
                        {getWeatherEmoji(item.weather[0].icon)}
                      </span>
                      <span className='text-lg sm:text-xl font-bold text-white'>
                        {Math.round(item.main.temp)}°C
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        ) : null}
      </div>
    </div>
  )
}

export default App