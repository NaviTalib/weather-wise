
# 🌤️ WeatherWise

A modern, responsive, and visually stunning weather application built using **React** and **Tailwind CSS**. WeatherWise fetches real-time meteorological data and 3-day forecasts for any city worldwide using the **OpenWeatherMap API**.

![WeatherWise Preview](src/assets/screenshot1.png/800x400) <!-- Replace this link with a screenshot or demo GIF of your app -->

---

## ✨ Features

- 🌡️ **Real-Time Weather Data:** Instant updates on temperature, condition descriptions, humidity, wind speed, and atmospheric pressure.
- 🕒 **City Local Time:** Accurately calculates and displays the current local time of the searched location using timezone UTC offsets.
- 📅 **3-Day Forecast:** Dynamic midday temperature projections for upcoming days.
- 🎨 **Glassmorphism Design:** Modern semi-transparent, frosted-glass UI with glowing backdrop filters and a fully responsive layout across mobile, tablet, and desktop devices.
- 🛑 **Smart Input Handling:** Input validation prevents empty or whitespace-only search requests to optimize API usage.

---

## 🛠️ Tech Stack

- **Frontend:** [React.js](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **API:** [OpenWeatherMap API](https://openweathermap.org/api)
- **Build Tool:** [Vite](https://vitejs.dev/)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/Weather-Wise.git](https://github.com/your-username/Weather-Wise.git)
   cd Weather-Wise

```

2. **Install dependencies:**
```bash
npm install

```


3. **Set up Environment Variables:**
Create a `.env` file in the root directory of your project and add your OpenWeather API key:
```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here

```


> 💡 *Note: You can obtain a free API key by signing up at [OpenWeatherMap](https://openweathermap.org/api).*


4. **Run the development server:**
```bash
npm run dev

```


5. **Open in Browser:**
Navigate to `http://localhost:5173` to view the app in your browser.

---

## 📂 Project Structure

```text
Weather-Wise/
├── public/
│   └── weather-icon.png      # Custom Favicon
├── src/
│   ├── App.jsx               # Main Application Component
│   ├── main.jsx              # Application Entry Point
│   └── index.css             # Tailwind Directives & Global Styles
├── .env                      # API Key Configuration
├── index.html                # HTML Template
├── package.json              # Dependencies and Scripts
├── tailwind.config.js        # Tailwind Configuration
└── README.md                 # Project Documentation

```

---

## 💻 Usage

1. Enter the name of any city in the top-right search bar.
2. Press **Enter** or click the **Search** button.
3. View instant live weather parameters, city-specific local time, and upcoming daily projections.

---

## 👨‍💻 Author

Built with 💙 by **Navi Talib** as part of the **#100DaysOfCode** challenge.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

```

*(Be sure to swap in your actual GitHub username and LinkedIn handle in the badge links!)*

```
