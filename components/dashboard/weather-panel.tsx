"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudRain, Wind, Thermometer, Droplets } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function WeatherPanel() {
  // Mock weather data
  const currentWeather = {
    temperature: 22,
    humidity: 65,
    windSpeed: 15,
    precipitationProbability: 35,
    trackTemperature: 28,
    condition: "Partly Cloudy",
  }

  const weatherForecast = [
    { time: "14:00", temp: 22, rain: 35, wind: 15 },
    { time: "15:00", temp: 23, rain: 45, wind: 18 },
    { time: "16:00", temp: 21, rain: 65, wind: 22 },
    { time: "17:00", temp: 20, rain: 80, wind: 25 },
    { time: "18:00", temp: 19, rain: 70, wind: 20 },
    { time: "19:00", temp: 18, rain: 45, wind: 15 },
  ]

  const driverWeatherImpact = [
    { driver: "Max Verstappen", rainBoost: 27, condition: "Rain Master" },
    { driver: "Lewis Hamilton", rainBoost: 20, condition: "Rain God" },
    { driver: "Lando Norris", rainBoost: -15, condition: "Struggles" },
    { driver: "Charles Leclerc", rainBoost: 8, condition: "Adaptable" },
    { driver: "Oscar Piastri", rainBoost: 5, condition: "Learning" },
    { driver: "George Russell", rainBoost: 12, condition: "Competent" },
  ]

  return (
    <div className="space-y-6">
      {/* Current Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm text-gray-500">Air Temp</div>
                <div className="text-xl font-bold">{currentWeather.temperature}°C</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-500">Track Temp</div>
                <div className="text-xl font-bold">{currentWeather.trackTemperature}°C</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-500">Humidity</div>
                <div className="text-xl font-bold">{currentWeather.humidity}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Wind Speed</div>
                <div className="text-xl font-bold">{currentWeather.windSpeed} km/h</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CloudRain className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Rain Chance</div>
                <div className="text-xl font-bold">{currentWeather.precipitationProbability}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Race Day Forecast</CardTitle>
            <CardDescription>Hourly weather predictions for race duration</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weatherForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="temp" orientation="left" />
                <YAxis yAxisId="rain" orientation="right" />
                <Tooltip />
                <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="#ef4444" name="Temperature (°C)" />
                <Line yAxisId="rain" type="monotone" dataKey="rain" stroke="#3b82f6" name="Rain Probability (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Driver Weather Impact */}
        <Card>
          <CardHeader>
            <CardTitle>Driver Weather Performance</CardTitle>
            <CardDescription>How current conditions affect each driver</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driverWeatherImpact.map((impact) => (
                <div key={impact.driver} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <div className="font-medium">{impact.driver}</div>
                    <div className="text-sm text-gray-500">{impact.condition}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`text-sm font-medium ${
                        impact.rainBoost > 0
                          ? "text-green-600"
                          : impact.rainBoost < 0
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {impact.rainBoost > 0 ? "+" : ""}
                      {impact.rainBoost}%
                    </div>
                    <Badge
                      variant={impact.rainBoost > 15 ? "default" : impact.rainBoost < -10 ? "destructive" : "secondary"}
                    >
                      {impact.rainBoost > 15 ? "Advantage" : impact.rainBoost < -10 ? "Disadvantage" : "Neutral"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Strategy Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Weather Impact</CardTitle>
          <CardDescription>How weather conditions affect race strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-900 mb-2">Tire Strategy</div>
              <div className="text-sm text-blue-800">
                35% rain probability suggests intermediate tire preparation required. Teams likely to start on medium
                compounds with quick-change strategy.
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="font-semibold text-yellow-900 mb-2">Pit Windows</div>
              <div className="text-sm text-yellow-800">
                Weather window between laps 15-25 optimal for pit stops. Rain expected after lap 30 may force early
                strategy calls.
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-900 mb-2">Safety Car Risk</div>
              <div className="text-sm text-green-800">
                73% correlation between rain and safety car deployment. Expect 2-3 safety car periods if precipitation
                occurs.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
