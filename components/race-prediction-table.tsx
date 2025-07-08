"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Prediction } from "@/context/app-context"

interface RacePredictionTableProps {
  predictions: Prediction[]
  isLoading: boolean
}

export function RacePredictionTable({ predictions, isLoading }: RacePredictionTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>🏁 Full Race Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
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
        <CardTitle>🏁 Full Race Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pos</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Predicted Time</TableHead>
              <TableHead>Quali Pos</TableHead>
              <TableHead>Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predictions.map((prediction) => (
              <TableRow key={prediction.driver.id}>
                <TableCell className="font-medium">{prediction.position}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: prediction.driver.color }} />
                    {prediction.driver.name}
                  </div>
                </TableCell>
                <TableCell>{prediction.driver.team}</TableCell>
                <TableCell className="font-mono">{prediction.predictedTime}</TableCell>
                <TableCell>{prediction.qualifyingPosition}</TableCell>
                <TableCell>
                  <Badge variant={prediction.confidence > 70 ? "default" : "secondary"}>
                    {Math.round(prediction.confidence)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
