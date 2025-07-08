"use client"

import { useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SliderPanel } from "@/components/slider-panel"
import { PredictionPodium } from "@/components/prediction-podium"
import { TrackConditions } from "@/components/track-conditions"
import { FeatureImportanceGraph } from "@/components/feature-importance-graph"
import { RacePredictionTable } from "@/components/race-prediction-table"
import { TrackSelector } from "@/components/track-selector"
import { useAppContext } from "@/context/app-context"
import { generateMockPredictions } from "@/utils/mock-data"

export function RacePredictionDashboard() {
  const { sliders, predictions, setPredictions, selectedTrack, isLoading, setIsLoading } = useAppContext()

  useEffect(() => {
    // Simulate API call when sliders change
    setIsLoading(true)
    const timer = setTimeout(() => {
      const newPredictions = generateMockPredictions(sliders)
      setPredictions(newPredictions)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [sliders, setPredictions, setIsLoading])

  return (
    <div className="space-y-6">
      {/* Race Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">🏁 {selectedTrack} 2025</CardTitle>
              <CardDescription>Sprint Weekend | Live Predictions</CardDescription>
            </div>
            <TrackSelector />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Controls */}
        <div className="lg:col-span-1 space-y-6">
          <SliderPanel />
          <TrackConditions />
        </div>

        {/* Right Column - Predictions */}
        <div className="lg:col-span-2 space-y-6">
          <PredictionPodium predictions={predictions} isLoading={isLoading} />
          <FeatureImportanceGraph />
          <RacePredictionTable predictions={predictions} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
