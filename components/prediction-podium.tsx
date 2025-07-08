"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Trophy, Medal, Award } from "lucide-react"
import type { Prediction } from "@/context/app-context"

interface PredictionPodiumProps {
  predictions: Prediction[]
  isLoading: boolean
}

export function PredictionPodium({ predictions, isLoading }: PredictionPodiumProps) {
  const topThree = predictions.slice(0, 3)

  const getPodiumIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />
      default:
        return null
    }
  }

  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 1:
        return "h-32"
      case 2:
        return "h-24"
      case 3:
        return "h-20"
      default:
        return "h-16"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>🏆 Predicted Podium</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-end space-x-4">
            {[2, 1, 3].map((pos) => (
              <div key={pos} className="text-center">
                <Skeleton className={`w-24 ${getPodiumHeight(pos)} mb-2`} />
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🏆 Predicted Podium</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-end space-x-4">
          {/* Reorder for podium display: 2nd, 1st, 3rd */}
          {[1, 0, 2].map((index) => {
            const prediction = topThree[index]
            if (!prediction) return null

            const position = prediction.position
            return (
              <div key={prediction.driver.id} className="text-center">
                <div
                  className={`${getPodiumHeight(position)} w-24 rounded-t-lg flex flex-col justify-end items-center p-2 text-white font-bold`}
                  style={{ backgroundColor: prediction.driver.color }}
                >
                  <div className="mb-2">{getPodiumIcon(position)}</div>
                  <div className="text-2xl">{position}</div>
                </div>
                <div className="mt-2">
                  <div className="font-semibold text-sm">{prediction.driver.name}</div>
                  <div className="text-xs text-gray-500">{prediction.driver.team}</div>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {Math.round(prediction.confidence)}% confidence
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
