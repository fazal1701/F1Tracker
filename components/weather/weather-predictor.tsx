"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudRain, Sun, Wind, Thermometer, Droplets, Eye } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface WeatherForecast {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  precipitation: number
  visibility: number
  pressure: number
  condition: string
}

interface CircuitWeatherData {
  id: string
  name: string
  country: string
  currentConditions: {
    temperature: number
    humidity: number
    windSpeed: number
    precipitation: number
    visibility: number
    pressure: number
    condition: string
    uvIndex: number
  }
  hourlyForecast: WeatherForecast[]
  driverImpact: {
    driver: string
    wetWeatherBonus: number
    heatTolerance: number
    windResistance: number
    overallImpact: number
  }[]
  historicalData: {
    month: string
    avgTemp: number
    avgRain: number
    avgWind: number
  }[]
}

const mockWeatherData: CircuitWeatherData[] = [
  {
    id: "silverstone",
    name: "Silverstone Circuit",
    country: "United Kingdom",
    currentConditions: {
      temperature: 18,
      humidity: 78,
      windSpeed: 22,
      precipitation: 65,
      visibility: 8,
      pressure: 1012,
      condition: "Heavy Rain",
      uvIndex: 2,
    },
    hourlyForecast: [
      {
        time: "14:00",
        temperature: 18,
        humidity: 78,
        windSpeed: 22,
        precipitation: 65,
        visibility: 8,
        pressure: 1012,
        condition: "Heavy Rain",
      },
      {
        time: "15:00",
        temperature: 17,
        humidity: 82,
        windSpeed: 25,
        precipitation: 80,
        visibility: 6,
        pressure: 1010,
        condition: "Torrential Rain",
      },
      {
        time: "16:00",
        temperature: 16,
        humidity: 85,
        windSpeed: 28,
        precipitation: 75,
        visibility: 7,
        pressure: 1008,
        condition: "Heavy Rain",
      },
      {
        time: "17:00",
        temperature: 17,
        humidity: 80,
        windSpeed: 20,
        precipitation: 45,
        visibility: 10,
        pressure: 1011,
        condition: "Light Rain",
      },
      {
        time: "18:00",
        temperature: 18,
        humidity: 75,
        windSpeed: 15,
        precipitation: 20,
        visibility: 12,
        pressure: 1013,
        condition: "Cloudy",
      },
      {
        time: "19:00",
        temperature: 19,
        humidity: 70,
        windSpeed: 12,
        precipitation: 10,
        visibility: 15,
        pressure: 1015,
        condition: "Partly Cloudy",
      },
    ],
    driverImpact: [
      { driver: "Lewis Hamilton", wetWeatherBonus: 25, heatTolerance: 18, windResistance: 15, overallImpact: 22 },
      { driver: "Max Verstappen", wetWeatherBonus: 20, heatTolerance: 22, windResistance: 20, overallImpact: 18 },
      { driver: "Lando Norris", wetWeatherBonus: -8, heatTolerance: 15, windResistance: 12, overallImpact: -5 },
      { driver: "Charles Leclerc", wetWeatherBonus: 12, heatTolerance: 20, windResistance: 18, overallImpact: 8 },
      { driver: "George Russell", wetWeatherBonus: 15, heatTolerance: 16, windResistance: 14, overallImpact: 12 },
      { driver: "Fernando Alonso", wetWeatherBonus: 22, heatTolerance: 25, windResistance: 22, overallImpact: 20 },
    ],
    historicalData: [
      { month: "Jan", avgTemp: 7, avgRain: 68, avgWind: 18 },
      { month: "Feb", avgTemp: 8, avgRain: 52, avgWind: 17 },
      { month: "Mar", avgTemp: 11, avgRain: 47, avgWind: 16 },
      { month: "Apr", avgTemp: 14, avgRain: 45, avgWind: 15 },
      { month: "May", avgTemp: 18, avgRain: 50, avgWind: 14 },
      { month: "Jun", avgTemp: 21, avgRain: 45, avgWind: 13 },
      { month: "Jul", avgTemp: 23, avgRain: 55, avgWind: 12 },
      { month: "Aug", avgTemp: 22, avgRain: 62, avgWind: 13 },
      { month: "Sep", avgTemp: 19, avgRain: 58, avgWind: 15 },
      { month: "Oct", avgTemp: 15, avgRain: 65, avgWind: 16 },
      { month: "Nov", avgTemp: 10, avgRain: 70, avgWind: 17 },
      { month: "Dec", avgTemp: 8, avgRain: 72, avgWind: 18 },
    ],
  },
  {
    id: "monaco",
    name: "Circuit de Monaco",
    country: "Monaco",
    currentConditions: {
      temperature: 26,
      humidity: 45,
      windSpeed: 8,
      precipitation: 0,
      visibility: 20,
      pressure: 1018,
      condition: "Sunny",
      uvIndex: 8,
    },
    hourlyForecast: [
      {
        time: "14:00",
        temperature: 26,
        humidity: 45,
        windSpeed: 8,
        precipitation: 0,
        visibility: 20,
        pressure: 1018,
        condition: "Sunny",
      },
      {
        time: "15:00",
        temperature: 27,
        humidity: 42,
        windSpeed: 10,
        precipitation: 0,
        visibility: 20,
        pressure: 1017,
        condition: "Sunny",
      },
      {
        time: "16:00",
        temperature: 28,
        humidity: 40,
        windSpeed: 12,
        precipitation: 5,
        visibility: 18,
        pressure: 1016,
        condition: "Partly Cloudy",
      },
      {
        time: "17:00",
        temperature: 27,
        humidity: 43,
        windSpeed: 9,
        precipitation: 0,
        visibility: 20,
        pressure: 1017,
        condition: "Sunny",
      },
      {
        time: "18:00",
        temperature: 26,
        humidity: 46,
        windSpeed: 7,
        precipitation: 0,
        visibility: 20,
        pressure: 1018,
        condition: "Clear",
      },
      {
        time: "19:00",
        temperature: 25,
        humidity: 48,
        windSpeed: 6,
        precipitation: 0,
        visibility: 20,
        pressure: 1019,
        condition: "Clear",
      },
    ],
    driverImpact: [
      { driver: "Charles Leclerc", wetWeatherBonus: 8, heatTolerance: 25, windResistance: 20, overallImpact: 15 },
      { driver: "Max Verstappen", wetWeatherBonus: 12, heatTolerance: 22, windResistance: 18, overallImpact: 12 },
      { driver: "Lewis Hamilton", wetWeatherBonus: 15, heatTolerance: 20, windResistance: 16, overallImpact: 10 },
      { driver: "Lando Norris", wetWeatherBonus: -5, heatTolerance: 18, windResistance: 14, overallImpact: 5 },
      { driver: "George Russell", wetWeatherBonus: 10, heatTolerance: 19, windResistance: 15, overallImpact: 8 },
      { driver: "Fernando Alonso", wetWeatherBonus: 18, heatTolerance: 24, windResistance: 19, overallImpact: 18 },
    ],
    historicalData: [
      { month: "Jan", avgTemp: 13, avgRain: 83, avgWind: 12 },
      { month: "Feb", avgTemp: 13, avgRain: 76, avgWind: 13 },
      { month: "Mar", avgTemp: 15, avgRain: 71, avgWind: 14 },
      { month: "Apr", avgTemp: 17, avgRain: 62, avgWind: 13 },
      { month: "May", avgTemp: 21, avgRain: 45, avgWind: 11 },
      { month: "Jun", avgTemp: 24, avgRain: 34, avgWind: 10 },
      { month: "Jul", avgTemp: 27, avgRain: 16, avgWind: 9 },
      { month: "Aug", avgTemp: 27, avgRain: 31, avgWind: 9 },
      { month: "Sep", avgTemp: 24, avgRain: 54, avgWind: 11 },
      { month: "Oct", avgTemp: 20, avgRain: 108, avgWind: 12 },
      { month: "Nov", avgTemp: 16, avgRain: 104, avgWind: 13 },
      { month: "Dec", avgTemp: 14, avgRain: 89, avgWind: 12 },
    ],
  },
  {
    id: "singapore",
    name: "Marina Bay Street Circuit",
    country: "Singapore",
    currentConditions: {
      temperature: 32,
      humidity: 85,
      windSpeed: 15,
      precipitation: 40,
      visibility: 12,
      pressure: 1008,
      condition: "Thunderstorms",
      uvIndex: 6,
    },
    hourlyForecast: [
      {
        time: "20:00",
        temperature: 32,
        humidity: 85,
        windSpeed: 15,
        precipitation: 40,
        visibility: 12,
        pressure: 1008,
        condition: "Thunderstorms",
      },
      {
        time: "21:00",
        temperature: 31,
        humidity: 88,
        windSpeed: 18,
        precipitation: 60,
        visibility: 8,
        pressure: 1006,
        condition: "Heavy Rain",
      },
      {
        time: "22:00",
        temperature: 30,
        humidity: 90,
        windSpeed: 20,
        precipitation: 75,
        visibility: 6,
        pressure: 1005,
        condition: "Torrential Rain",
      },
      {
        time: "23:00",
        temperature: 29,
        humidity: 87,
        windSpeed: 16,
        precipitation: 45,
        visibility: 10,
        pressure: 1007,
        condition: "Light Rain",
      },
      {
        time: "00:00",
        temperature: 29,
        humidity: 82,
        windSpeed: 12,
        precipitation: 20,
        visibility: 15,
        pressure: 1009,
        condition: "Cloudy",
      },
      {
        time: "01:00",
        temperature: 28,
        humidity: 80,
        windSpeed: 10,
        precipitation: 10,
        visibility: 18,
        pressure: 1010,
        condition: "Partly Cloudy",
      },
    ],
    driverImpact: [
      { driver: "Lewis Hamilton", wetWeatherBonus: 28, heatTolerance: 15, windResistance: 18, overallImpact: 25 },
      { driver: "Fernando Alonso", wetWeatherBonus: 25, heatTolerance: 22, windResistance: 20, overallImpact: 24 },
      { driver: "Max Verstappen", wetWeatherBonus: 22, heatTolerance: 18, windResistance: 19, overallImpact: 20 },
      { driver: "Charles Leclerc", wetWeatherBonus: 15, heatTolerance: 16, windResistance: 17, overallImpact: 12 },
      { driver: "George Russell", wetWeatherBonus: 18, heatTolerance: 14, windResistance: 16, overallImpact: 15 },
      { driver: "Lando Norris", wetWeatherBonus: -12, heatTolerance: 12, windResistance: 13, overallImpact: -8 },
    ],
    historicalData: [
      { month: "Jan", avgTemp: 26, avgRain: 234, avgWind: 8 },
      { month: "Feb", avgTemp: 27, avgRain: 112, avgWind: 9 },
      { month: "Mar", avgTemp: 28, avgRain: 193, avgWind: 9 },
      { month: "Apr", avgTemp: 29, avgRain: 179, avgWind: 8 },
      { month: "May", avgTemp: 29, avgRain: 171, avgWind: 7 },
      { month: "Jun", avgTemp: 29, avgRain: 132, avgWind: 7 },
      { month: "Jul", avgTemp: 28, avgRain: 158, avgWind: 7 },
      { month: "Aug", avgTemp: 28, avgRain: 176, avgWind: 7 },
      { month: "Sep", avgTemp: 28, avgRain: 169, avgWind: 6 },
      { month: "Oct", avgTemp: 28, avgRain: 194, avgWind: 6 },
      { month: "Nov", avgTemp: 27, avgRain: 256, avgWind: 7 },
      { month: "Dec", avgTemp: 26, avgRain: 287, avgWind: 8 },
    ],
  },
]

export function WeatherPredictor() {
  const [selectedCircuit, setSelectedCircuit] = useState("silverstone")
  const [selectedTab, setSelectedTab] = useState("current")

  const currentData = mockWeatherData.find((d) => d.id === selectedCircuit) || mockWeatherData[0]

  const getConditionIcon = (condition: string) => {
    if (condition.includes("Rain") || condition.includes("Thunderstorms")) return <CloudRain className="h-4 w-4" />
    if (condition.includes("Sunny") || condition.includes("Clear")) return <Sun className="h-4 w-4" />
    if (condition.includes("Wind")) return <Wind className="h-4 w-4" />
    return <CloudRain className="h-4 w-4" />
  }

  const getConditionColor = (condition: string) => {
    if (condition.includes("Rain") || condition.includes("Thunderstorms")) return "text-blue-600"
    if (condition.includes("Sunny") || condition.includes("Clear")) return "text-yellow-600"
    if (condition.includes("Cloudy")) return "text-gray-600"
    return "text-blue-600"
  }

  const getImpactColor = (impact: number) => {
    if (impact > 15) return "text-green-600"
    if (impact > 0) return "text-blue-600"
    if (impact > -10) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weather & Conditions Predictor</h1>
          <p className="text-gray-600">Advanced weather impact modeling and race predictions</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <CloudRain className="h-3 w-3 mr-1" />
          Crystal Ball
        </Badge>
      </div>

      {/* Circuit Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Circuit Selection</CardTitle>
          <CardDescription>Choose a circuit to analyze weather conditions and driver impact</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCircuit} onValueChange={setSelectedCircuit}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockWeatherData.map((circuit) => (
                <SelectItem key={circuit.id} value={circuit.id}>
                  {circuit.name} - {circuit.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Conditions</TabsTrigger>
          <TabsTrigger value="forecast">Race Forecast</TabsTrigger>
          <TabsTrigger value="impact">Driver Impact</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getConditionIcon(currentData.currentConditions.condition)}
                <span>Current Weather at {currentData.name}</span>
              </CardTitle>
              <CardDescription className={getConditionColor(currentData.currentConditions.condition)}>
                {currentData.currentConditions.condition}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{currentData.currentConditions.temperature}°C</div>
                  <div className="text-sm text-gray-600">Temperature</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{currentData.currentConditions.humidity}%</div>
                  <div className="text-sm text-gray-600">Humidity</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Wind className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{currentData.currentConditions.windSpeed} km/h</div>
                  <div className="text-sm text-gray-600">Wind Speed</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Eye className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{currentData.currentConditions.visibility} km</div>
                  <div className="text-sm text-gray-600">Visibility</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="font-semibold text-yellow-900 mb-2">Rain Probability</div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {currentData.currentConditions.precipitation}%
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-900 mb-2">Pressure</div>
                  <div className="text-3xl font-bold text-purple-600">{currentData.currentConditions.pressure} hPa</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-900 mb-2">UV Index</div>
                  <div className="text-3xl font-bold text-orange-600">{currentData.currentConditions.uvIndex}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>6-Hour Race Forecast</CardTitle>
              <CardDescription>Detailed hourly weather predictions for race duration</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={currentData.hourlyForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="temp" orientation="left" />
                  <YAxis yAxisId="rain" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="temp"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ef4444"
                    name="Temperature (°C)"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="rain"
                    type="monotone"
                    dataKey="precipitation"
                    stroke="#3b82f6"
                    name="Rain Probability (%)"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="temp"
                    type="monotone"
                    dataKey="windSpeed"
                    stroke="#10b981"
                    name="Wind Speed (km/h)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-3">
                {currentData.hourlyForecast.map((forecast, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-mono text-sm">{forecast.time}</div>
                      <div className="flex items-center space-x-1">
                        {getConditionIcon(forecast.condition)}
                        <span className={`text-sm ${getConditionColor(forecast.condition)}`}>{forecast.condition}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>{forecast.temperature}°C</span>
                      <span>{forecast.precipitation}% rain</span>
                      <span>{forecast.windSpeed} km/h</span>
                      <span>{forecast.visibility} km vis</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Weather Performance Impact</CardTitle>
              <CardDescription>How current conditions affect each driver's expected performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentData.driverImpact.map((impact, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-lg">{impact.driver}</div>
                      <Badge className={`${getImpactColor(impact.overallImpact)} bg-opacity-10 border-current`}>
                        {impact.overallImpact > 0 ? "+" : ""}
                        {impact.overallImpact}% Overall Impact
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getImpactColor(impact.wetWeatherBonus)}`}>
                          {impact.wetWeatherBonus > 0 ? "+" : ""}
                          {impact.wetWeatherBonus}%
                        </div>
                        <div className="text-xs text-gray-600">Wet Weather</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getImpactColor(impact.heatTolerance)}`}>
                          {impact.heatTolerance > 0 ? "+" : ""}
                          {impact.heatTolerance}%
                        </div>
                        <div className="text-xs text-gray-600">Heat Tolerance</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getImpactColor(impact.windResistance)}`}>
                          {impact.windResistance > 0 ? "+" : ""}
                          {impact.windResistance}%
                        </div>
                        <div className="text-xs text-gray-600">Wind Resistance</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical Weather Patterns</CardTitle>
              <CardDescription>Average weather conditions throughout the year at {currentData.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentData.historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="temp" orientation="left" />
                  <YAxis yAxisId="rain" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="temp" dataKey="avgTemp" fill="#ef4444" name="Avg Temperature (°C)" />
                  <Bar yAxisId="rain" dataKey="avgRain" fill="#3b82f6" name="Avg Rainfall (mm)" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="font-semibold text-red-900 mb-2">Hottest Month</div>
                  <div className="text-2xl font-bold text-red-600">
                    {
                      currentData.historicalData.reduce((max, month) => (month.avgTemp > max.avgTemp ? month : max))
                        .month
                    }
                  </div>
                  <div className="text-sm text-red-700">
                    {Math.max(...currentData.historicalData.map((m) => m.avgTemp))}°C average
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-2">Wettest Month</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {
                      currentData.historicalData.reduce((max, month) => (month.avgRain > max.avgRain ? month : max))
                        .month
                    }
                  </div>
                  <div className="text-sm text-blue-700">
                    {Math.max(...currentData.historicalData.map((m) => m.avgRain))}mm average
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">Windiest Month</div>
                  <div className="text-2xl font-bold text-gray-600">
                    {
                      currentData.historicalData.reduce((max, month) => (month.avgWind > max.avgWind ? month : max))
                        .month
                    }
                  </div>
                  <div className="text-sm text-gray-700">
                    {Math.max(...currentData.historicalData.map((m) => m.avgWind))} km/h average
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
