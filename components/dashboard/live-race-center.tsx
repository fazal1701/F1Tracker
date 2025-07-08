"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RacePredictionPanel } from "@/components/dashboard/race-prediction-panel"
import { LiveTimingPanel } from "@/components/dashboard/live-timing-panel"
import { WeatherPanel } from "@/components/dashboard/weather-panel"
import { ChampionshipImpactPanel } from "@/components/dashboard/championship-impact-panel"
import { Activity, Clock, Trophy, TrendingUp } from "lucide-react"

export function LiveRaceCenter() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Race Center</h1>
          <p className="text-gray-600">Real-time predictions and analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
          <Badge variant="outline">British Grand Prix 2025</Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-sm text-gray-500">Race Winner</div>
                <div className="font-semibold">Max Verstappen</div>
                <div className="text-xs text-gray-400">67.3% probability</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-500">Fastest Lap</div>
                <div className="font-semibold">1:27.097</div>
                <div className="text-xs text-gray-400">Lando Norris</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm text-gray-500">Championship Impact</div>
                <div className="font-semibold">High</div>
                <div className="text-xs text-gray-400">±25 points swing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm text-gray-500">Prediction Accuracy</div>
                <div className="font-semibold">84.7%</div>
                <div className="text-xs text-gray-400">Last 10 races</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Race Predictions</TabsTrigger>
          <TabsTrigger value="timing">Live Timing</TabsTrigger>
          <TabsTrigger value="weather">Weather Impact</TabsTrigger>
          <TabsTrigger value="championship">Championship</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions">
          <RacePredictionPanel />
        </TabsContent>

        <TabsContent value="timing">
          <LiveTimingPanel />
        </TabsContent>

        <TabsContent value="weather">
          <WeatherPanel />
        </TabsContent>

        <TabsContent value="championship">
          <ChampionshipImpactPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
