import React, { useState } from 'react';
import { CircleLoader } from 'react-spinners';
import axios from 'axios';
import './App.css';
function Weather() {
	const [input, setInput] = useState('');
	const [weather, setWeather] = useState({
		loading: false,
		data: {},
		error: false,
	});
  const timestamp = weather.data.dt;
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleString();
	

	const search = async (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			setInput('');
			setWeather({ ...weather, loading: true });
			const url = 'https://api.openweathermap.org/data/2.5/weather';
			const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
			await axios.get(url, {
				params: {
					q: input,
         
					 units: 'metric',
					appid: api_key,
				},
			})
				.then((res) => {
					
					setWeather({ data: res.data, loading: false, error: false });
          
				
        })
				.catch((error) => {
          
					setWeather({ ...weather, data: {}, error: true });
					setInput('');
					
				});
		}
	};

	return (
		<div className="App">
			<h1 className="app-name">Weather Vista</h1>
			<div className="search-bar">
				<input
					type="text"
					className="city-search"
					placeholder="Enter City"
					name="query"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					onKeyPress={search}
				/>
			</div>
			{weather.loading && (
				<div className="loading-container">
					<CircleLoader  color='#5675a3'/>
				</div>
			)}
			{weather.error && (
        
				<div className="error-message">
					<span>City not found!</span>

				</div>
			)}
			{weather && weather.data && weather.data.main && (
				<div className="weather-card">

					<div className="city-name">
						<h2>{weather.data.name}, <span>{weather.data.sys.country}</span></h2>
					</div>
					
					<div className="icon-temp">
						<img
							src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
							alt={weather.data.weather[0].description}
						/>
						<span className="deg">{Math.round(weather.data.main.temp)}°C</span>
					</div>
					<div className="des-wind">
						<p>{weather.data.weather[0].description.toUpperCase()}</p>
						<p>Wind Speed: {weather.data.wind.speed} m/s</p>
           
					</div>
          <div className="date">
          <p>Date and Time: {formattedDate}</p>
					</div>
				</div>
			)}
		</div>
  
	);
}

export default Weather;