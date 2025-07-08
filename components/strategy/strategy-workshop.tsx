"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings } from "lucide-react"

export function StrategyWorkshop() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personal Strategy Workshop</h1>
          <p className="text-gray-600">Test your strategic decision-making skills</p>
        </div>
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          <Settings className="h-3 w-3 mr-1" />
          Team Principal Mode
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Workshop Interface</CardTitle>
          <CardDescription>Build and test your own race strategies against AI optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">Strategy Workshop component will be implemented here</div>
        </CardContent>
      </Card>
    </div>
  )
}
