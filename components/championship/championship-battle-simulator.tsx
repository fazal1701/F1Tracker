"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Trophy, Play, TrendingUp, Target } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useAppContext } from "@/context/app-context"
import type { Driver } from "@/types"

interface ChampionshipScenario {
  id: string
  name: string
  description: string
  remainingRaces: number
  currentLeader: string
  pointsGap: number
  contenders: string[]
}

interface RaceResult {
  race: string
  round: number
  winner: string
  podium: string[]
  pointsAwarded: { [driverId: string]: number }
  championshipStandings: { [driverId: string]: number }
}

interface SeasonProjection {
  driver: string
  currentPoints: number
  projectedPoints: number
  titleProbability: number
  averageFinish: number
  winsNeeded: number
  mustFinishAhead: string[]
}

const championshipScenarios: ChampionshipScenario[] = [
  {
    id: "2024-finale",
    name: "2024 Championship Finale",
    description: "Norris leads Verstappen by 7 points with 3 races remaining",
    remainingRaces: 3,
    currentLeader: "NOR",
    pointsGap: 7,
    contenders: ["NOR", "VER", "LEC"],
  },
  {
    id: "2025-midseason",
    name: "2025 Mid-Season Battle",
    description: "Three-way fight between Verstappen, Norris, and Leclerc",
    remainingRaces: 12,
    currentLeader: "VER",
    pointsGap: 15,
    contenders: ["VER", "NOR", "LEC", "RUS"],
  },
  {
    id: "comeback-story",
    name: "The Great Comeback",
    description: "Hamilton trails by 50 points with 8 races to go",
    remainingRaces: 8,
    currentLeader: "VER",
    pointsGap: 50,
    contenders: ["VER", "HAM", "NOR"],
  },
]

const mockRemainingRaces = [
  { name: "Las Vegas GP", difficulty: "Medium", weather: "Clear", norrisAdvantage: 5 },
  { name: "Qatar GP", difficulty: "High", weather: "Hot", norrisAdvantage: -3 },
  { name: "Abu Dhabi GP", difficulty: "Medium", weather: "Clear", norrisAdvantage: 2 },
]

export function ChampionshipBattleSimulator() {
  const { drivers, championshipStandings } = useAppContext()
  const driverMap = React.useMemo<Record<string, Driver>>(
    () =>
      drivers.reduce(
        (acc, d) => {
          acc[d.id] = d
          return acc
        },
        {} as Record<string, Driver>,
      ),
    [drivers],
  )
  const [selectedScenario, setSelectedScenario] = useState<string>("2024-finale")
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationResults, setSimulationResults] = useState<any>(null)
  const [selectedView, setSelectedView] = useState<"overview" | "detailed">("overview")

  const currentScenario = championshipScenarios.find((s) => s.id === selectedScenario) || championshipScenarios[0]

  const runChampionshipSimulation = async () => {
    setIsSimulating(true)
    setSimulationResults(null)

    setTimeout(() => {
      // Generate mock race results
      const raceResults: RaceResult[] = []
      const currentStandings = {
        NOR: 331,
        VER: 324,
        LEC: 291,
        RUS: 223,
        HAM: 198,
      }

      // Simulate remaining races
      mockRemainingRaces.forEach((race, index) => {
        const raceResult: RaceResult = {
          race: race.name,
          round: 22 + index,
          winner: Math.random() > 0.6 ? "NOR" : Math.random() > 0.5 ? "VER" : "LEC",
          podium: ["NOR", "VER", "LEC"],
          pointsAwarded: {
            NOR: Math.random() > 0.3 ? 25 : Math.random() > 0.5 ? 18 : 15,
            VER: Math.random() > 0.4 ? 18 : Math.random() > 0.5 ? 25 : 12,
            LEC: Math.random() > 0.5 ? 15 : Math.random() > 0.3 ? 12 : 10,
            RUS: Math.random() > 0.6 ? 12 : 8,
            HAM: Math.random() > 0.7 ? 10 : 6,
          },
          championshipStandings: { ...currentStandings },
        }

        // Update standings
        Object.keys(raceResult.pointsAwarded).forEach((driver) => {
          currentStandings[driver as keyof typeof currentStandings] += raceResult.pointsAwarded[driver]
        })
        raceResult.championshipStandings = { ...currentStandings }

        raceResults.push(raceResult)
      })

      // Generate season projections
      const projections: SeasonProjection[] = [
        {
          driver: "Lando Norris",
          currentPoints: 331,
          projectedPoints: currentStandings["NOR"],
          titleProbability: 67.3,
          averageFinish: 1.8,
          winsNeeded: 1,
          mustFinishAhead: ["Max Verstappen"],
        },
        {
          driver: "Max Verstappen",
          currentPoints: 324,
          projectedPoints: currentStandings["VER"],
          titleProbability: 31.2,
          averageFinish: 2.1,
          winsNeeded: 2,
          mustFinishAhead: ["Lando Norris", "Charles Leclerc"],
        },
        {
          driver: "Charles Leclerc",
          currentPoints: 291,
          projectedPoints: currentStandings["LEC"],
          titleProbability: 1.5,
          averageFinish: 3.2,
          winsNeeded: 3,
          mustFinishAhead: ["Lando Norris", "Max Verstappen"],
        },
      ]

      // Championship scenarios
      const scenarios = [
        {
          scenario: "Norris Wins All Remaining",
          probability: 15.2,
          finalGap: 43,
          description: "Norris dominates final races",
        },
        {
          scenario: "Verstappen Comeback",
          probability: 31.2,
          finalGap: -12,
          description: "Verstappen wins 2 of 3 races",
        },
        {
          scenario: "Down to Abu Dhabi",
          probability: 45.8,
          finalGap: 5,
          description: "Championship decided in final race",
        },
        {
          scenario: "Leclerc Miracle",
          probability: 7.8,
          finalGap: 8,
          description: "Leclerc wins all races, others struggle",
        },
      ]

      setSimulationResults({
        raceResults,
        projections,
        scenarios,
        finalChampion: projections[0].driver,
        finalMargin: Math.abs(projections[0].projectedPoints - projections[1].projectedPoints),
        keyMoments: [
          "Las Vegas: Norris extends lead with P2 finish",
          "Qatar: Verstappen closes gap with victory",
          "Abu Dhabi: Championship decided by 12 points",
        ],
      })

      setIsSimulating(false)
    }, 3000)
  }

  const getStandingsData = () => {
    if (!simulationResults) return []

    return simulationResults.raceResults.map((result: RaceResult) => ({
      race: result.race,
      Norris: result.championshipStandings["NOR"],
      Verstappen: result.championshipStandings["VER"],
      Leclerc: result.championshipStandings["LEC"],
      Russell: result.championshipStandings["RUS"],
      Hamilton: result.championshipStandings["HAM"],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Championship Battle Simulator</h1>
          <p className="text-gray-600">Dynamic championship modeling and title fight predictions</p>
        </div>
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Trophy className="h-3 w-3 mr-1" />
          Title Fight
        </Badge>
      </div>

      {/* Scenario Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Championship Scenario</CardTitle>
          <CardDescription>Choose a championship battle scenario to simulate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {championshipScenarios.map((scenario) => (
                    <SelectItem key={scenario.id} value={scenario.id}>
                      {scenario.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 text-sm text-gray-600">{currentScenario.description}</div>
            </div>
            <div className="flex items-end">
              <Button onClick={runChampionshipSimulation} disabled={isSimulating} className="w-full">
                <Play className="h-4 w-4 mr-2" />
                {isSimulating ? "Simulating..." : "Simulate Championship"}
              </Button>
            </div>
          </div>

          {isSimulating && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Simulating {currentScenario.remainingRaces} races...</span>
                <span>Analyzing title scenarios</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Championship Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Championship Standings</CardTitle>
          <CardDescription>Live standings and points gaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {championshipStandings.slice(0, 5).map((standing) => {
              const driver =
                // if full object present, use it; otherwise look it up
                (standing as any).driver ?? driverMap[(standing as any).driverId as string]

              if (!driver) return null // skip if still missing

              return (
                <div key={driver.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: driver.color }}
                    >
                      {standing.position}
                    </div>
                    {standing.position <= 3 && <Trophy className="h-4 w-4 text-yellow-500" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="font-semibold">{driver.name}</div>
                        <div className="text-sm text-gray-500">{driver.team}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{standing.points}</div>
                        <div className="text-xs text-gray-500">
                          {standing.position === 1 ? "Leader" : `-${championshipStandings[0].points - standing.points}`}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-medium">{standing.wins}</div>
                        <div className="text-gray-500">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{standing.podiums}</div>
                        <div className="text-gray-500">Podiums</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{standing.poles}</div>
                        <div className="text-gray-500">Poles</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{standing.fastestLaps}</div>
                        <div className="text-gray-500">FL</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {simulationResults && (
        <Tabs defaultValue="projections" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projections">Title Projections</TabsTrigger>
            <TabsTrigger value="scenarios">Race Scenarios</TabsTrigger>
            <TabsTrigger value="progression">Points Progression</TabsTrigger>
            <TabsTrigger value="analysis">Strategic Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="projections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Championship Projections</span>
                </CardTitle>
                <CardDescription>Predicted final standings and title probabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {simulationResults.projections.map((projection: SeasonProjection, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-lg">{projection.driver}</div>
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {projection.titleProbability}% Title Chance
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{projection.projectedPoints}</div>
                          <div className="text-xs text-gray-600">Projected Points</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{projection.averageFinish}</div>
                          <div className="text-xs text-gray-600">Avg Finish Needed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{projection.winsNeeded}</div>
                          <div className="text-xs text-gray-600">Wins Needed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {projection.projectedPoints - projection.currentPoints}
                          </div>
                          <div className="text-xs text-gray-600">Points to Gain</div>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="text-sm font-medium mb-1">Title Probability</div>
                        <Progress value={projection.titleProbability} className="h-2" />
                      </div>

                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Must finish ahead of:</span>{" "}
                        {projection.mustFinishAhead.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Championship Scenarios</CardTitle>
                <CardDescription>Different ways the championship could unfold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {simulationResults.scenarios.map((scenario: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{scenario.scenario}</div>
                        <Badge variant="outline">{scenario.probability}%</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{scenario.description}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Final Margin:</span>
                        <span className={`font-bold ${scenario.finalGap > 0 ? "text-green-600" : "text-red-600"}`}>
                          {Math.abs(scenario.finalGap)} points
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progression" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Championship Points Progression</CardTitle>
                <CardDescription>How the title fight evolves race by race</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={getStandingsData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="race" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Norris" stroke="#FF8700" strokeWidth={3} name="Lando Norris" />
                    <Line type="monotone" dataKey="Verstappen" stroke="#0600EF" strokeWidth={3} name="Max Verstappen" />
                    <Line type="monotone" dataKey="Leclerc" stroke="#DC143C" strokeWidth={2} name="Charles Leclerc" />
                    <Line type="monotone" dataKey="Russell" stroke="#00D2BE" strokeWidth={2} name="George Russell" />
                    <Line
                      type="monotone"
                      dataKey="Hamilton"
                      stroke="#00D2BE"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Lewis Hamilton"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span>Strategic Championship Analysis</span>
                </CardTitle>
                <CardDescription>Key insights and strategic recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-2">Championship Prediction</div>
                    <div className="text-blue-800">
                      <strong>{simulationResults.finalChampion}</strong> wins the championship by{" "}
                      <strong>{simulationResults.finalMargin} points</strong>. The title fight remains competitive until
                      the final races, with multiple scenarios still possible.
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-900 mb-2">Key Championship Moments</div>
                    <div className="space-y-1">
                      {simulationResults.keyMoments.map((moment: string, index: number) => (
                        <div key={index} className="text-green-800 text-sm flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          {moment}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="font-semibold text-yellow-900 mb-2">Strategic Factors</div>
                    <div className="text-yellow-800 space-y-1 text-sm">
                      <p>
                        • <strong>Consistency vs Risk:</strong> Norris needs steady points, Verstappen must take risks
                      </p>
                      <p>
                        • <strong>Team Orders:</strong> McLaren and Red Bull strategies will be crucial
                      </p>
                      <p>
                        • <strong>Circuit Characteristics:</strong> Track-specific advantages could decide races
                      </p>
                      <p>
                        • <strong>Weather Impact:</strong> Rain could shuffle the championship order
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="font-semibold text-red-900 mb-2">Risk Assessment</div>
                    <div className="text-red-800 space-y-1 text-sm">
                      <p>
                        • <strong>Mechanical Failures:</strong> Could instantly change championship dynamics
                      </p>
                      <p>
                        • <strong>Racing Incidents:</strong> Contact between title contenders is high risk
                      </p>
                      <p>
                        • <strong>Penalty Points:</strong> Race bans could eliminate championship chances
                      </p>
                      <p>
                        • <strong>Team Reliability:</strong> Car performance consistency is critical
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
