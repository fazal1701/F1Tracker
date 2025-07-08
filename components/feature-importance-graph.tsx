"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function FeatureImportanceGraph() {
  // Mock feature importance data
  const data = [
    { feature: "Qualifying Position", importance: 0.35 },
    { feature: "Team Performance", importance: 0.28 },
    { feature: "Weather Impact", importance: 0.15 },
    { feature: "Track Temperature", importance: 0.12 },
    { feature: "Clean Air Pace", importance: 0.1 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Feature Importance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="feature" angle={-45} textAnchor="end" height={80} fontSize={12} />
            <YAxis />
            <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, "Importance"]} />
            <Bar dataKey="importance" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
