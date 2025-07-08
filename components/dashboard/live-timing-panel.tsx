"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "@/context/app-context"
import { Clock, Target } from "lucide-react"

export function LiveTimingPanel() {
  const { drivers } = useAppContext()

  // Mock live timing data
  const timingData = [
    {
      driver: drivers[0],
      position: 1,
      gap: "Leader",
      lastLap: "1:27.234",
      bestLap: "1:26.891",
      sector1: "23.456",
      sector2: "31.789",
      sector3: "31.989",
      tire: "Medium",
      stint: 12,
    },
    {
      driver: drivers[3],
      position: 2,
      gap: "+2.347",
      lastLap: "1:27.891",
      bestLap: "1:27.123",
      sector1: "23.789",
      sector2: "32.123",
      sector3: "31.979",
      tire: "Medium",
      stint: 11,
    },
    {
      driver: drivers[1],
      position: 3,
      gap: "+8.923",
      lastLap: "1:28.456",
      bestLap: "1:27.567",
      sector1: "24.123",
      sector2: "32.456",
      sector3: "31.877",
      tire: "Hard",
      stint: 18,
    },
    {
      driver: drivers[2],
      position: 4,
      gap: "+12.567",
      lastLap: "1:28.789",
      bestLap: "1:27.234",
      sector1: "23.567",
      sector2: "32.789",
      sector3: "32.433",
      tire: "Medium",
      stint: 9,
    },
    {
      driver: drivers[4],
      position: 5,
      gap: "+18.234",
      lastLap: "1:29.123",
      bestLap: "1:27.891",
      sector1: "24.234",
      sector2: "32.567",
      sector3: "32.322",
      tire: "Hard",
      stint: 15,
    },
    {
      driver: drivers[5],
      position: 6,
      gap: "+24.891",
      lastLap: "1:29.567",
      bestLap: "1:28.123",
      sector1: "24.567",
      sector2: "32.891",
      sector3: "32.109",
      tire: "Medium",
      stint: 8,
    },
  ]

  const getTireColor = (tire: string) => {
    switch (tire) {
      case "Soft":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-gray-600"
      case "Intermediate":
        return "bg-green-500"
      case "Wet":
        return "bg-blue-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Live Timing Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Live Timing</span>
          </CardTitle>
          <CardDescription>Real-time lap times and sector analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Pos</th>
                  <th className="text-left p-2">Driver</th>
                  <th className="text-left p-2">Gap</th>
                  <th className="text-left p-2">Last Lap</th>
                  <th className="text-left p-2">Best Lap</th>
                  <th className="text-left p-2">S1</th>
                  <th className="text-left p-2">S2</th>
                  <th className="text-left p-2">S3</th>
                  <th className="text-left p-2">Tire</th>
                  <th className="text-left p-2">Stint</th>
                </tr>
              </thead>
              <tbody>
                {timingData.map((data) => (
                  <tr key={data.driver.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-semibold">{data.position}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.driver.color }} />
                        <span className="font-medium">{data.driver.name}</span>
                      </div>
                    </td>
                    <td className="p-2 font-mono">{data.gap}</td>
                    <td className="p-2 font-mono">{data.lastLap}</td>
                    <td className="p-2 font-mono font-semibold">{data.bestLap}</td>
                    <td className="p-2 font-mono text-xs">{data.sector1}</td>
                    <td className="p-2 font-mono text-xs">{data.sector2}</td>
                    <td className="p-2 font-mono text-xs">{data.sector3}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-1">
                        <div className={`w-3 h-3 rounded-full ${getTireColor(data.tire)}`} />
                        <span className="text-xs">{data.tire}</span>
                      </div>
                    </td>
                    <td className="p-2 text-xs">{data.stint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Sector Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Target className="h-4 w-4 text-green-500" />
              <span>Sector 1</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Fastest</span>
                <div className="text-right">
                  <div className="font-mono font-semibold">23.456</div>
                  <div className="text-xs text-gray-500">Verstappen</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average</span>
                <div className="font-mono">23.789</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Target className="h-4 w-4 text-yellow-500" />
              <span>Sector 2</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Fastest</span>
                <div className="text-right">
                  <div className="font-mono font-semibold">31.789</div>
                  <div className="text-xs text-gray-500">Verstappen</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average</span>
                <div className="font-mono">32.234</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Target className="h-4 w-4 text-red-500" />
              <span>Sector 3</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Fastest</span>
                <div className="text-right">
                  <div className="font-mono font-semibold">31.877</div>
                  <div className="text-xs text-gray-500">Hamilton</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average</span>
                <div className="font-mono">32.123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
