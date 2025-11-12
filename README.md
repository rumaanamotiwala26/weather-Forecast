# Weather Forecasting App

A modern weather forecasting application built with Next.js, featuring user authentication, profile management, and a beautiful neon dark theme.

## Features

- 🔐 **User Authentication**: Secure login and signup with JWT tokens
- 👤 **Profile Management**: Update profile information and upload profile images
- 🔒 **Password Management**: Change passwords securely
- 🌤️ **Real-time Weather**: Current weather data for user's city
- 📊 **Weather Details**: Temperature, humidity, wind, pressure, and more
- 🌅 **Sun Times**: Sunrise and sunset information
- 🎨 **Neon Dark Theme**: Beautiful, modern UI with neon aesthetics
- 📱 **Responsive Design**: Works perfectly on all devices
- ☁️ **Cloud Storage**: Profile images stored on Cloudinary
- 🗄️ **MongoDB Integration**: Secure data storage

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with bcryptjs
- **Weather API**: OpenWeatherMap integration
- **File Storage**: Cloudinary
- **Styling**: TailwindCSS with custom neon theme

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for image storage
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=mongodb+srv://rumanamotiwala26_db_user:EXuJgcGr3pIJOGPg@rumana.xbo9e38.mongodb.net/WeatherForecastingApp

   # JWT Secret (change this in production)
   JWT_SECRET=your-super-secret-jwt-key-here

   # OpenWeatherMap API (get free key from openweathermap.org)
   OPENWEATHER_API_KEY=your-openweathermap-api-key

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables Setup

### MongoDB Setup
Your MongoDB connection is already configured. The database name is `WeatherForecastingApp`.

### OpenWeatherMap Setup
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key from the dashboard
3. Add it to your `.env.local` file as `OPENWEATHER_API_KEY`

### Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to your `.env.local` file

## Project Structure

```
weather-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── signup/route.ts
│   │   ├── profile/
│   │   │   ├── update/route.ts
│   │   │   └── change-password/route.ts
│   │   └── weather/route.ts
│   ├── dashboard/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── mongodb.ts
│   └── cloudinary.ts
├── models/
│   └── User.ts
├── types/
│   └── weather.ts
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login

### Profile Management
- `PUT /api/profile/update` - Update user profile and upload image
- `PUT /api/profile/change-password` - Change user password

### Weather
- `GET /api/weather?city={cityName}` - Get current weather data for a city

## Features Overview

### Authentication System
- Secure password hashing with bcryptjs
- JWT token-based authentication
- HTTP-only cookies for security
- Form validation and error handling

### Profile Management
- Update name and city information
- Upload and update profile images via Cloudinary
- Real-time profile updates
- Image optimization and transformation

### Password Management
- Current password verification
- New password validation
- Secure password updates
- Confirmation matching

### Weather Integration
- Real-time weather data from OpenWeatherMap
- Current temperature and weather conditions
- Detailed weather metrics (humidity, pressure, wind, visibility)
- Sunrise and sunset times
- Weather icons and descriptions
- Automatic weather updates when city is changed
- Refresh functionality for latest data

### UI/UX Features
- Neon dark theme with gradient effects
- Animated background elements
- Responsive design for all screen sizes
- Loading states and error handling
- Success/error message notifications

## Usage

1. **Sign Up**: Create a new account with name, email, password, and city
2. **Login**: Access your account with email and password
3. **Dashboard**: View your profile and current weather for your city
4. **Weather Data**: See temperature, humidity, wind speed, pressure, and more
5. **Edit Profile**: Update your name, city, and profile image (weather updates automatically)
6. **Change Password**: Securely update your password
7. **Refresh Weather**: Get the latest weather data with the refresh button
8. **Logout**: Sign out of your account

## Security Features

- Password hashing with salt rounds
- JWT token expiration (7 days)
- HTTP-only cookies
- Input validation and sanitization
- Protected API routes
- Secure file upload handling

## Customization

### Styling
The app uses a custom neon dark theme. You can modify colors and effects in:
- `app/globals.css` - Global styles and CSS variables
- Individual component files - Component-specific styling

### Database Schema
User model includes:
- Name, email, password (required)
- City (required)
- Profile image URL (optional)
- Created date

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your MongoDB URI is correct
   - Check if your IP is whitelisted in MongoDB Atlas

2. **Cloudinary Upload Error**
   - Verify your Cloudinary credentials
   - Check file size limits (default: 10MB)

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set in environment variables
   - Check token expiration settings

## Future Enhancements

- 5-day weather forecast
- Weather alerts and notifications
- Multiple city weather tracking
- Weather history and trends
- Email verification
- Password reset functionality
- Social media login
- Location-based weather data
- Weather widgets and charts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
# weather-Forecast
