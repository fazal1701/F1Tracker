"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppContext } from "@/context/app-context"
import { Trophy } from "lucide-react"

export function ChampionshipImpactPanel() {
  const { championshipStandings } = useAppContext()

  // Mock championship scenarios
  const raceScenarios = [
    {
      scenario: "Norris Wins",
      norrisPoints: 273,
      verstappenPoints: 241,
      gap: 32,
      probability: 18.7,
    },
    {
      scenario: "Verstappen Wins",
      norrisPoints: 248,
      verstappenPoints: 266,
      gap: -18,
      probability: 67.3,
    },
    {
      scenario: "Russell Wins",
      norrisPoints: 248,
      verstappenPoints: 241,
      gap: 7,
      probability: 8.9,
    },
  ]

  const titleProbabilities = [
    { driver: "Lando Norris", probability: 52.3, change: -15.0 },
    { driver: "Max Verstappen", probability: 46.8, change: +14.2 },
    { driver: "George Russell", probability: 0.9, change: +0.8 },
  ]

  const remainingRaces = [
    { race: "British GP", impact: "High", points: 25 },
    { race: "Hungarian GP", impact: "Medium", points: 25 },
    { race: "Belgian GP", impact: "Medium", points: 25 },
    { race: "Dutch GP", impact: "High", points: 25 },
    { race: "Italian GP", impact: "High", points: 25 },
    { race: "Singapore GP", impact: "Medium", points: 25 },
    { race: "Japanese GP", impact: "Medium", points: 25 },
    { race: "Qatar GP", impact: "Low", points: 25 },
    { race: "Las Vegas GP", impact: "Medium", points: 25 },
    { race: "Abu Dhabi GP", impact: "High", points: 25 },
  ]

  return (
    <div className="space-y-6">
      {/* Current Championship */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Championship Standings</span>
          </CardTitle>
          <CardDescription>Current points and title fight analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {championshipStandings.slice(0, 6).map((standing, index) => (
              <div key={standing.driver.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: standing.driver.color }}
                  >
                    {standing.position}
                  </div>
                  {index < 3 && <Trophy className="h-4 w-4 text-yellow-500" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="font-semibold">{standing.driver.name}</div>
                      <div className="text-sm text-gray-500">{standing.driver.team}</div>
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
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Race Impact Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle>Race Impact Scenarios</CardTitle>
            <CardDescription>How different race outcomes affect the championship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {raceScenarios.map((scenario, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold">{scenario.scenario}</div>
                    <Badge variant="outline">{scenario.probability}% chance</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Norris</span>
                      <span className="font-mono">{scenario.norrisPoints} pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Verstappen</span>
                      <span className="font-mono">{scenario.verstappenPoints} pts</span>
                    </div>
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-sm">Gap</span>
                      <span className={`font-mono ${scenario.gap > 0 ? "text-green-600" : "text-red-600"}`}>
                        {scenario.gap > 0 ? "+" : ""}
                        {scenario.gap} pts
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Title Probabilities */}
        <Card>
          <CardHeader>
            <CardTitle>Championship Probabilities</CardTitle>
            <CardDescription>Updated title chances after this race</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {titleProbabilities.map((prob) => (
                <div key={prob.driver} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{prob.driver}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{prob.probability}%</span>
                      <Badge variant={prob.change > 0 ? "default" : "destructive"} className="text-xs">
                        {prob.change > 0 ? "+" : ""}
                        {prob.change.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={prob.probability} className="h-2" />
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-900 mb-1">Key Championship Factors</div>
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• 10 races remaining (250 points available)</li>
                <li>• Current gap: 7 points</li>
                <li>• Verstappen has championship experience advantage</li>
                <li>• Norris needs consistency to maintain lead</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Remaining Races */}
      <Card>
        <CardHeader>
          <CardTitle>Remaining Championship Battles</CardTitle>
          <CardDescription>Impact assessment for remaining races</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {remainingRaces.map((race, index) => (
              <div key={index} className="p-3 border rounded-lg text-center">
                <div className="font-semibold text-sm mb-1">{race.race}</div>
                <Badge
                  variant={race.impact === "High" ? "default" : race.impact === "Medium" ? "secondary" : "outline"}
                  className="text-xs mb-2"
                >
                  {race.impact} Impact
                </Badge>
                <div className="text-xs text-gray-500">{race.points} pts</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
