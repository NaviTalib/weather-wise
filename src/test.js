import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensures .env is loaded correctly regardless of terminal folder location
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.VITE_OPENWEATHER_API_KEY; 
const baseUrl = process.env.VITE_OPENWEATHER_API_URL; // Fixed variable name match
const city = "Delhi"; 

if (!apiKey) {
  console.error("Error: VITE_OPENWEATHER_API_KEY is missing from .env file.");
  process.exit(1);
}

// Check if URL already has query separator or ends properly
const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`; 

fetch(url) 
  .then(response => { 
    if (!response.ok) { 
      throw new Error(`API Error ${response.status}: ${response.statusText}`); 
    } 
    return response.json(); 
  }) 
  .then(data => { 
    console.log(`Weather in: ${data.name}`); 
    console.log(`Temperature: ${data.main.temp} °C`); 
    console.log(`Condition: ${data.weather[0].description}`); 
  }) 
  .catch(error => { 
    console.error("Error fetching weather data:", error.message); 
  });