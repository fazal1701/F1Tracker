"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Sun, Wind, Thermometer } from "lucide-react"

export function TrackConditions() {
  // Mock weather data - in real app this would come from API
  const conditions = {
    temperature: 28,
    humidity: 45,
    windSpeed: 12,
    condition: "Partly Cloudy",
    trackTemp: 42,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5" />
          Track Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <div>
              <div className="text-sm font-medium">Air Temp</div>
              <div className="text-lg font-bold">{conditions.temperature}°C</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <div>
              <div className="text-sm font-medium">Track Temp</div>
              <div className="text-lg font-bold">{conditions.trackTemp}°C</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm font-medium">Humidity</div>
              <div className="text-lg font-bold">{conditions.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium">Wind</div>
              <div className="text-lg font-bold">{conditions.windSpeed} km/h</div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Badge variant="outline" className="w-full justify-center">
            {conditions.condition}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
