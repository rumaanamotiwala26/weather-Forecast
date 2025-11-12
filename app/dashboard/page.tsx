'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WeatherData, WeatherState } from '../../types/weather';

interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  profileImage?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Fetch weather data for user's city
      fetchWeatherData(parsedUser.city);
    } else {
      router.push('/login');
    }

    // Check for success messages from profile/password pages
    const successMessage = localStorage.getItem('dashboardMessage');
    if (successMessage) {
      setMessage(successMessage);
      localStorage.removeItem('dashboardMessage');
      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    }
  }, [router]);

  const fetchWeatherData = async (city: string) => {
    setWeather(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();
      
      if (response.ok) {
        setWeather({ data, loading: false, error: null });
      } else {
        setWeather({ data: null, loading: false, error: data.error || 'Failed to fetch weather data' });
      }
    } catch (error) {
      setWeather({ data: null, loading: false, error: 'Network error. Please try again.' });
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };


  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Weather Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400">{message}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-500/30">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-gray-400">{user.city}</p>
              </div>

              {/* Profile Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard/profile')}
                  className="w-full py-2 px-4 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all duration-300"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => router.push('/dashboard/password')}
                  className="w-full py-2 px-4 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all duration-300"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weather Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Current Weather</h2>
                <button
                  onClick={() => fetchWeatherData(user.city)}
                  className="px-4 py-2 bg-pink-500/20 border border-pink-500/30 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-all duration-300 text-sm"
                  disabled={weather.loading}
                >
                  {weather.loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {weather.loading && (
                <div className="text-center py-12">
                  <div className="animate-spin text-4xl mb-4">🌀</div>
                  <p className="text-gray-400">Loading weather data...</p>
                </div>
              )}

              {weather.error && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">❌</div>
                  <p className="text-red-400 mb-2">{weather.error}</p>
                  <p className="text-gray-500 text-sm">Please check your city name or try again later.</p>
                </div>
              )}

              {weather.data && (
                <div className="space-y-6">
                  {/* Main Weather Info */}
                  <div className="text-center">
                    <div className="text-6xl mb-2">{getWeatherIcon(weather.data.icon)}</div>
                    <h3 className="text-3xl font-bold text-white mb-1">{weather.data.temperature}°C</h3>
                    <p className="text-lg text-gray-300 capitalize">{weather.data.description}</p>
                    <p className="text-gray-400">{weather.data.city}, {weather.data.country}</p>
                    <p className="text-sm text-gray-500 mt-2">Feels like {weather.data.feelsLike}°C</p>
                  </div>

                  {/* Weather Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">💧</div>
                      <p className="text-sm text-gray-400">Humidity</p>
                      <p className="text-lg font-semibold text-white">{weather.data.humidity}%</p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🌬️</div>
                      <p className="text-sm text-gray-400">Wind</p>
                      <p className="text-lg font-semibold text-white">{weather.data.windSpeed} m/s</p>
                      <p className="text-xs text-gray-500">{getWindDirection(weather.data.windDirection)}</p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <p className="text-sm text-gray-400">Pressure</p>
                      <p className="text-lg font-semibold text-white">{weather.data.pressure} hPa</p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">👁️</div>
                      <p className="text-sm text-gray-400">Visibility</p>
                      <p className="text-lg font-semibold text-white">{weather.data.visibility} km</p>
                    </div>
                  </div>

                  {/* Sun Times */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🌅</div>
                      <p className="text-sm text-gray-300">Sunrise</p>
                      <p className="text-lg font-semibold text-white">{weather.data.sunrise}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🌇</div>
                      <p className="text-sm text-gray-300">Sunset</p>
                      <p className="text-lg font-semibold text-white">{weather.data.sunset}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Last updated: {new Date(weather.data.timestamp).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
