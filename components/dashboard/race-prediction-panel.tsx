"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppContext } from "@/context/app-context"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"

export function RacePredictionPanel() {
  const { drivers } = useAppContext()

  // Mock race predictions
  const predictions = [
    { driver: drivers[0], position: 1, probability: 67.3, change: +5.2, expectedTime: "1:23:45.123" },
    { driver: drivers[3], position: 2, probability: 18.7, change: -2.1, expectedTime: "1:23:47.891" },
    { driver: drivers[1], position: 3, probability: 8.9, change: +1.3, expectedTime: "1:23:52.456" },
    { driver: drivers[2], position: 4, probability: 3.2, change: -0.8, expectedTime: "1:23:58.789" },
    { driver: drivers[4], position: 5, probability: 1.5, change: +0.2, expectedTime: "1:24:12.345" },
    { driver: drivers[5], position: 6, probability: 0.4, change: -0.1, expectedTime: "1:24:18.567" },
  ]

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-500" />
    if (change < 0) return <TrendingDown className="h-3 w-3 text-red-500" />
    return <Minus className="h-3 w-3 text-gray-400" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-500"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Podium Predictions */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Race Winner Predictions</CardTitle>
          <CardDescription>AI-powered probability analysis based on current conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <div key={prediction.driver.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: prediction.driver.color }}
                  >
                    {prediction.position}
                  </div>
                  {index < 3 && <Trophy className="h-4 w-4 text-yellow-500" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="font-semibold">{prediction.driver.name}</div>
                      <div className="text-sm text-gray-500">{prediction.driver.team}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{prediction.expectedTime}</div>
                      <div className={`text-xs flex items-center ${getChangeColor(prediction.change)}`}>
                        {getChangeIcon(prediction.change)}
                        <span className="ml-1">{Math.abs(prediction.change).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Progress value={prediction.probability} className="flex-1" />
                    <Badge variant="secondary" className="text-xs">
                      {prediction.probability.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Key Prediction Factors</CardTitle>
          <CardDescription>Most influential variables affecting race outcome</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Qualifying Position</span>
              <Badge>35% influence</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Team Performance</span>
              <Badge>28% influence</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Weather Conditions</span>
              <Badge>15% influence</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Track Temperature</span>
              <Badge>12% influence</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Driver Form</span>
              <Badge>10% influence</Badge>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-900 mb-1">AI Confidence Level</div>
            <div className="text-2xl font-bold text-blue-600">84.7%</div>
            <div className="text-xs text-blue-700">Based on 10,000 Monte Carlo simulations</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
