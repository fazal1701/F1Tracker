"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts"
import { Play, RotateCcw } from "lucide-react"

export function SimulationLab() {
  const [pitLap, setPitLap] = useState(25)
  const [rainProbability, setRainProbability] = useState(20)
  const [tyreDegradation, setTyreDegradation] = useState(60)
  const [safetyCarEnabled, setSafetyCarEnabled] = useState(false)
  const [safetyCarLap, setSafetyCarLap] = useState(15)
  const [aggressionLevel, setAggressionLevel] = useState("balanced")
  const [simulationResults, setSimulationResults] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)

  const runSimulation = async () => {
    setIsRunning(true)

    // Simulate API call
    setTimeout(() => {
      // Mock Monte Carlo results
      const mockResults = {
        raceTime: "1:23:45.123",
        positions: [
          { driver: "Verstappen", finalPosition: 1, probability: 0.65 },
          { driver: "Hamilton", finalPosition: 2, probability: 0.58 },
          { driver: "Leclerc", finalPosition: 3, probability: 0.45 },
        ],
        monteCarloData: Array.from({ length: 100 }, (_, i) => ({
          simulation: i + 1,
          verstappenTime: 83.2 + (Math.random() - 0.5) * 2,
          hamiltonTime: 83.8 + (Math.random() - 0.5) * 2,
          leclercTime: 84.1 + (Math.random() - 0.5) * 2,
        })),
      }

      setSimulationResults(mockResults)
      setIsRunning(false)
    }, 2000)
  }

  const resetSimulation = () => {
    setPitLap(25)
    setRainProbability(20)
    setTyreDegradation(60)
    setSafetyCarEnabled(false)
    setSafetyCarLap(15)
    setAggressionLevel("balanced")
    setSimulationResults(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Custom Race Simulation</CardTitle>
          <CardDescription>
            Run Monte Carlo simulations with custom parameters to explore different race scenarios
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simulation Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Simulation Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Pit Stop Lap: {pitLap}</Label>
              <Slider value={[pitLap]} onValueChange={(value) => setPitLap(value[0])} min={10} max={50} step={1} />
            </div>

            <div className="space-y-2">
              <Label>Rain Probability: {rainProbability}%</Label>
              <Slider
                value={[rainProbability]}
                onValueChange={(value) => setRainProbability(value[0])}
                min={0}
                max={100}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Tyre Degradation: {tyreDegradation}%</Label>
              <Slider
                value={[tyreDegradation]}
                onValueChange={(value) => setTyreDegradation(value[0])}
                min={20}
                max={100}
                step={5}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch checked={safetyCarEnabled} onCheckedChange={setSafetyCarEnabled} />
              <Label>Safety Car Deployment</Label>
            </div>

            {safetyCarEnabled && (
              <div className="space-y-2">
                <Label>Safety Car Lap: {safetyCarLap}</Label>
                <Slider
                  value={[safetyCarLap]}
                  onValueChange={(value) => setSafetyCarLap(value[0])}
                  min={5}
                  max={45}
                  step={1}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Aggression Level</Label>
              <Select value={aggressionLevel} onValueChange={setAggressionLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={runSimulation} disabled={isRunning} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run Simulation"}
              </Button>
              <Button variant="outline" onClick={resetSimulation}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent>
            {!simulationResults ? (
              <div className="text-center text-gray-500 py-8">
                Configure parameters and run simulation to see results
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Predicted Race Winner</h4>
                  <Badge className="text-lg px-3 py-1">Max Verstappen - {simulationResults.raceTime}</Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Top 3 Probabilities</h4>
                  <div className="space-y-2">
                    {simulationResults.positions.map((pos: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{pos.driver}</span>
                        <Badge variant="secondary">{Math.round(pos.probability * 100)}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monte Carlo Visualization */}
      {simulationResults && (
        <Card>
          <CardHeader>
            <CardTitle>Monte Carlo Distribution</CardTitle>
            <CardDescription>Race time distribution across 1,000 simulations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={simulationResults.monteCarloData.slice(0, 50)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="simulation" />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip />
                <Scatter name="Verstappen" dataKey="verstappenTime" fill="#0600EF" />
                <Scatter name="Hamilton" dataKey="hamiltonTime" fill="#DC143C" />
                <Scatter name="Leclerc" dataKey="leclercTime" fill="#DC143C" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
