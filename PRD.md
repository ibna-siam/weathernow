# Product Requirements Document (PRD)

## Project Name

**WeatherNow - Modern Weather Forecast Application**

---

# 1. Product Overview

WeatherNow is a modern weather forecasting web application that allows users to search any city worldwide and get real-time weather information, hourly forecasts, and multi-day forecasts through a clean and responsive interface.

### Goal

Provide accurate, fast, and visually appealing weather information for users worldwide.

### Target Users

* Students
* Travelers
* Professionals
* Daily commuters
* General users

---

# 2. Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Icons
* Framer Motion
* React Query (TanStack Query)

## API

* OpenWeatherMap API

OR

* WeatherAPI.com

Recommended:
**WeatherAPI.com** (better free tier)

---

# 3. Features

## Core Features

### 1. Search Weather

Users can search:

* Dhaka
* London
* Tokyo
* New York
* Any city worldwide

Input:

```text
Search city...
```

Output:

* Temperature
* Weather Condition
* Humidity
* Wind Speed
* UV Index
* Pressure

---

### 2. Current Weather Card

Display:

```text
Dhaka, Bangladesh

31°C
Feels Like 35°C

☀️ Sunny

Humidity: 65%
Wind: 12 km/h
Pressure: 1012 mb
```

---

### 3. Hourly Forecast

Show next 24 hours.

Example:

```text
10 AM  30°C
11 AM  31°C
12 PM  32°C
1 PM   33°C
```

Horizontal Scroll Card Layout.

---

### 4. 7-Day Forecast

Display:

```text
Monday     31° / 26°
Tuesday    30° / 25°
Wednesday  29° / 24°
```

---

### 5. Weather Details Section

Cards for:

* Humidity
* Wind Speed
* UV Index
* Visibility
* Pressure
* Sunrise
* Sunset

---

### 6. Current Location Weather

Use Browser Geolocation API.

Button:

```text
📍 Use My Location
```

Automatically fetch:

```javascript
navigator.geolocation
```

---

### 7. Dynamic Weather Background

Weather changes background.

Sunny:

```text
Bright Sky Gradient
```

Rain:

```text
Rain Animation
```

Cloudy:

```text
Gray Theme
```

Night:

```text
Dark Theme
```

---

### 8. Weather Icons

Use dynamic weather icons.

Examples:

```text
☀️ Sunny
🌧️ Rain
☁️ Cloudy
🌩️ Thunderstorm
❄️ Snow
```

Libraries:

* React Icons
* Weather Icons

---

# 4. Advanced Features

## Air Quality Index (AQI)

Display:

```text
AQI: 42

Good Air Quality
```

Color indicators:

* Green
* Yellow
* Orange
* Red

---

## Weather Alerts

Show:

```text
Heavy Rain Warning
Storm Alert
Flood Alert
```

---

## Favorite Cities

Save cities:

```text
Dhaka
London
Tokyo
```

Store using:

```javascript
localStorage
```

---

## Recent Searches

Store latest 5 searches.

Example:

```text
Dhaka
Rajshahi
Khulna
```

---

# 5. UI Pages

## Home Page

Contains:

* Search Bar
* Current Weather
* Hourly Forecast
* Weekly Forecast

---

## Favorites Page

Route:

```text
/favorites
```

Contains saved cities.

---

## Settings Page

Route:

```text
/settings
```

Options:

* Celsius / Fahrenheit
* Dark Mode
* Light Mode

---

# 6. Folder Structure

```text
src/

├── assets/
├── components/
│
├── SearchBar/
├── WeatherCard/
├── ForecastCard/
├── HourlyForecast/
├── WeeklyForecast/
├── AQICard/
├── Loader/
│
├── pages/
│
├── Home/
├── Favorites/
├── Settings/
│
├── services/
│
├── weatherApi.js
│
├── hooks/
│
├── useWeather.js
│
├── useLocation.js
│
├── context/
│
├── WeatherContext.jsx
│
├── utils/
│
├── constants/
│
├── routes/
│
├── App.jsx
│
└── main.jsx
```

---

# 7. State Management

Use:

### React Context API

For:

* Current City
* Temperature Unit
* Theme

OR

### Redux Toolkit

For larger scalability.

Recommended:

```text
Redux Toolkit
```

---

# 8. API Endpoints

Current Weather:

```http
GET /current.json?q=Dhaka
```

Forecast:

```http
GET /forecast.json?q=Dhaka&days=7
```

AQI:

```http
GET /current.json?aqi=yes
```

---

# 9. Loading States

Skeleton Loader:

```text
Loading Weather...
```

Shimmer effect.

---

# 10. Error Handling

City Not Found:

```text
❌ City not found
```

Network Error:

```text
❌ Failed to fetch weather data
```

Location Permission Denied:

```text
❌ Please allow location access
```

---

# 11. Responsive Design

### Mobile

```text
320px+
```

### Tablet

```text
768px+
```

### Desktop

```text
1024px+
```

### Large Screen

```text
1440px+
```

---

# 12. Dark Mode

Theme Toggle:

```text
🌞 Light
🌙 Dark
```

Persist using:

```javascript
localStorage
```

---

# 13. Performance Requirements

* First Load < 2 sec
* API Response Cache
* Lazy Loading
* Optimized Images
* Code Splitting

---

# 14. Future Features (v2)

* Weather Map
* Radar View
* Weather News
* Voice Search
* AI Weather Assistant
* PWA Support
* Offline Mode
* Multi-language Support
* Weather Widgets
* Share Weather Card

---

# Portfolio-Level Deliverables

### Dashboard

* Modern Glassmorphism UI
* Animated Weather Background
* Search Autocomplete
* Real-Time Weather
* AQI
* Hourly Forecast
* Weekly Forecast
* Dark Mode
* Favorites
* Responsive Design

This feature set is strong enough for a portfolio project and reflects the kind of weather app commonly built by frontend developers using React.
