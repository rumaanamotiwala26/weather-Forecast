import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    // Using OpenWeatherMap API (you'll need to get a free API key)
    const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'City not found' },
          { status: 404 }
        );
      }
      throw new Error(`Weather API error: ${response.status}`);
    }

    const weatherData = await response.json();

    // Transform the data to a cleaner format
    const transformedData = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      visibility: weatherData.visibility / 1000, // Convert to km
      windSpeed: weatherData.wind.speed,
      windDirection: weatherData.wind.deg,
      description: weatherData.weather[0].description,
      main: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon,
      sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
