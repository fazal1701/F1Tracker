"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Play, Calendar, MapPin, Users, Zap, AlertTriangle, Trophy } from "lucide-react"

interface Scenario {
  id: string
  title: string
  description: string
  category: "historical" | "hypothetical" | "chaos" | "championship"
  year: number
  track: string
  keyFactors: string[]
  icon: string
  difficulty: "Easy" | "Medium" | "Hard"
  impact: "Low" | "Medium" | "High"
}

const historicalScenarios: Scenario[] = [
  {
    id: "senna-rain-1988",
    title: "Senna's Rain Mastery - Monaco 1988",
    description: "Ayrton Senna's legendary wet weather performance, starting 13th and winning by over a minute",
    category: "historical",
    year: 1988,
    track: "Monaco",
    keyFactors: ["Heavy Rain", "Wet Weather Mastery", "Grid Position 13", "Dominant Performance"],
    icon: "🌧️",
    difficulty: "Hard",
    impact: "High",
  },
  {
    id: "schumacher-comeback-1994",
    title: "Schumacher's Championship Fight",
    description: "Michael Schumacher's controversial 1994 season finale at Adelaide",
    category: "historical",
    year: 1994,
    track: "Adelaide",
    keyFactors: ["Championship Decider", "Controversial Contact", "Title Fight", "Pressure"],
    icon: "🏆",
    difficulty: "Hard",
    impact: "High",
  },
  {
    id: "button-brawn-2009",
    title: "Button's Brawn GP Miracle",
    description: "Jenson Button's unexpected championship with the new Brawn GP team",
    category: "historical",
    year: 2009,
    track: "Australia",
    keyFactors: ["New Team", "Double Diffuser", "Underdog Story", "Perfect Start"],
    icon: "✨",
    difficulty: "Medium",
    impact: "High",
  },
  {
    id: "hamilton-brazil-2008",
    title: "Hamilton's Last Corner Drama",
    description: "Lewis Hamilton's first championship decided in the final corners of Brazil 2008",
    category: "historical",
    year: 2008,
    track: "Interlagos",
    keyFactors: ["Championship Decider", "Rain Drama", "Last Minute Overtake", "Rookie Champion"],
    icon: "🎭",
    difficulty: "Hard",
    impact: "High",
  },
]

const hypotheticalScenarios: Scenario[] = [
  {
    id: "verstappen-ferrari-2022",
    title: "What if Verstappen Joined Ferrari?",
    description: "Max Verstappen in Ferrari red instead of Red Bull blue for the 2022 season",
    category: "hypothetical",
    year: 2022,
    track: "Multiple",
    keyFactors: ["Team Switch", "Championship Impact", "Ferrari Strategy", "Red Bull Response"],
    icon: "🔄",
    difficulty: "Medium",
    impact: "High",
  },
  {
    id: "hamilton-early-retirement",
    title: "Hamilton Retires After 2021",
    description: "Lewis Hamilton decides to retire after the controversial 2021 Abu Dhabi finale",
    category: "hypothetical",
    year: 2022,
    track: "Multiple",
    keyFactors: ["Early Retirement", "Mercedes Rebuild", "Russell Leadership", "Championship Void"],
    icon: "👋",
    difficulty: "Easy",
    impact: "High",
  },
  {
    id: "budget-cap-removal",
    title: "No Budget Cap Era",
    description: "What if the budget cap was never introduced in 2021?",
    category: "hypothetical",
    year: 2021,
    track: "Multiple",
    keyFactors: ["Unlimited Spending", "Big Team Advantage", "Development War", "Competitive Balance"],
    icon: "💰",
    difficulty: "Medium",
    impact: "High",
  },
]

const chaosScenarios: Scenario[] = [
  {
    id: "multi-safety-car",
    title: "Chaos Race - 5 Safety Cars",
    description: "A completely unpredictable race with multiple safety car periods and strategy chaos",
    category: "chaos",
    year: 2024,
    track: "Singapore",
    keyFactors: ["Multiple Safety Cars", "Strategy Chaos", "Tire Gambles", "Grid Shuffle"],
    icon: "🚗",
    difficulty: "Hard",
    impact: "Medium",
  },
  {
    id: "monsoon-race",
    title: "Monsoon Mayhem",
    description: "Extreme weather conditions with torrential rain and multiple red flags",
    category: "chaos",
    year: 2024,
    track: "Spa-Francorchamps",
    keyFactors: ["Torrential Rain", "Multiple Red Flags", "Visibility Issues", "Wet Weather Masters"],
    icon: "⛈️",
    difficulty: "Hard",
    impact: "High",
  },
  {
    id: "mechanical-failures",
    title: "Reliability Nightmare",
    description: "Multiple top drivers suffer mechanical failures, opening opportunities for underdogs",
    category: "chaos",
    year: 2024,
    track: "Monza",
    keyFactors: ["Engine Failures", "Underdog Opportunities", "Points Swing", "Championship Impact"],
    icon: "⚙️",
    difficulty: "Medium",
    impact: "High",
  },
]

const championshipScenarios: Scenario[] = [
  {
    id: "title-decider-2024",
    title: "2024 Championship Finale",
    description: "Norris vs Verstappen title fight goes to the final race",
    category: "championship",
    year: 2024,
    track: "Abu Dhabi",
    keyFactors: ["Title Decider", "Equal Points", "Team Orders", "Pressure Cooker"],
    icon: "🏁",
    difficulty: "Hard",
    impact: "High",
  },
  {
    id: "triple-threat-2025",
    title: "Three-Way Title Fight",
    description: "Verstappen, Norris, and Leclerc separated by just 10 points with 3 races to go",
    category: "championship",
    year: 2025,
    track: "Multiple",
    keyFactors: ["Three Contenders", "Close Points", "Team Dynamics", "Pressure Management"],
    icon: "🎯",
    difficulty: "Hard",
    impact: "High",
  },
]

export function ScenarioPlayground() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [simulationResult, setSimulationResult] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [customParams, setCustomParams] = useState({
    rainProbability: 20,
    safetyCarChance: 30,
    mechanicalFailures: 15,
    strategyAggression: 50,
  })

  const runScenario = async (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setIsRunning(true)

    // Simulate API call with realistic delay
    setTimeout(() => {
      let mockResult

      switch (scenario.category) {
        case "historical":
          mockResult = generateHistoricalResult(scenario)
          break
        case "hypothetical":
          mockResult = generateHypotheticalResult(scenario)
          break
        case "chaos":
          mockResult = generateChaosResult(scenario)
          break
        case "championship":
          mockResult = generateChampionshipResult(scenario)
          break
        default:
          mockResult = generateDefaultResult(scenario)
      }

      setSimulationResult(mockResult)
      setIsRunning(false)
    }, 2000)
  }

  const generateHistoricalResult = (scenario: Scenario) => {
    const historicalResults = {
      "senna-rain-1988": {
        winner: "Ayrton Senna",
        podium: ["Ayrton Senna", "Alain Prost", "Thierry Boutsen"],
        margin: "1:23.456",
        keyMoment: "Senna's masterclass in wet conditions, gaining 6 positions in the first 10 laps",
        historicalAccuracy: 95,
        alternativeOutcome: "Without rain, Prost likely wins from pole position",
      },
      "schumacher-comeback-1994": {
        winner: "Michael Schumacher",
        podium: ["Michael Schumacher", "Nigel Mansell", "Gerhard Berger"],
        margin: "Championship by 1 point",
        keyMoment: "Controversial contact with Damon Hill secures Schumacher's first title",
        historicalAccuracy: 88,
        alternativeOutcome: "Clean racing could have given Hill the championship",
      },
    }

    return historicalResults[scenario.id as keyof typeof historicalResults] || generateDefaultResult(scenario)
  }

  const generateHypotheticalResult = (scenario: Scenario) => {
    return {
      winner: "Max Verstappen",
      podium: ["Max Verstappen", "Charles Leclerc", "Carlos Sainz"],
      keyInsight: "Verstappen in Ferrari would have created a 3-team championship fight",
      probabilityShift: "+45% Ferrari championship chances",
      rippleEffects: [
        "Red Bull forced to promote Gasly earlier",
        "Ferrari strategy improves with Verstappen input",
        "Mercedes faces stronger competition",
      ],
      championshipImpact: "Ferrari likely wins 2022 Constructors' Championship",
    }
  }

  const generateChaosResult = (scenario: Scenario) => {
    const chaosDrivers = ["George Russell", "Pierre Gasly", "Esteban Ocon", "Alex Albon", "Yuki Tsunoda"]
    const randomWinner = chaosDrivers[Math.floor(Math.random() * chaosDrivers.length)]

    return {
      winner: randomWinner,
      podium: [randomWinner, "Lando Norris", "Fernando Alonso"],
      chaosLevel: "Maximum",
      keyEvents: [
        "Safety Car on lap 12 - debris from contact",
        "Red flag on lap 28 - heavy rain",
        "Safety Car on lap 45 - mechanical failure",
        "Final safety car on lap 58 - late drama",
      ],
      surpriseElement: `${randomWinner} scores maiden victory in chaotic conditions`,
      championshipSwing: "±35 points between title contenders",
    }
  }

  const generateChampionshipResult = (scenario: Scenario) => {
    return {
      winner: "Lando Norris",
      podium: ["Lando Norris", "Oscar Piastri", "Max Verstappen"],
      championshipOutcome: "Norris wins first title by 7 points",
      finalStandings: [
        { driver: "Lando Norris", points: 387 },
        { driver: "Max Verstappen", points: 380 },
        { driver: "Charles Leclerc", points: 342 },
      ],
      keyMoment: "McLaren 1-2 finish secures both championships",
      emotionalImpact: "Britain celebrates first champion since Hamilton 2020",
    }
  }

  const generateDefaultResult = (scenario: Scenario) => {
    return {
      winner: "Max Verstappen",
      podium: ["Max Verstappen", "Lando Norris", "Charles Leclerc"],
      keyInsight: "Scenario creates unpredictable racing dynamics",
      impact: "Moderate championship implications",
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low":
        return "bg-blue-100 text-blue-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "High":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const ScenarioCard = ({ scenario }: { scenario: Scenario }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="text-3xl mb-2">{scenario.icon}</div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(scenario.difficulty)}>{scenario.difficulty}</Badge>
            <Badge className={getImpactColor(scenario.impact)}>{scenario.impact}</Badge>
          </div>
        </div>
        <CardTitle className="text-lg">{scenario.title}</CardTitle>
        <CardDescription>{scenario.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            {scenario.year}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {scenario.track}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              Key Factors:
            </div>
            <div className="flex flex-wrap gap-1">
              {scenario.keyFactors.map((factor, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            onClick={() => runScenario(scenario)}
            disabled={isRunning}
            className="w-full mt-4"
            variant={selectedScenario?.id === scenario.id ? "default" : "outline"}
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning && selectedScenario?.id === scenario.id ? "Simulating..." : "Run Scenario"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🎭 F1 Scenario Playground</CardTitle>
          <CardDescription>
            Explore historical moments, hypothetical situations, and chaotic race scenarios with AI-powered predictions
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="historical" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="historical" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Historical
          </TabsTrigger>
          <TabsTrigger value="hypothetical" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            What If
          </TabsTrigger>
          <TabsTrigger value="chaos" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Chaos
          </TabsTrigger>
          <TabsTrigger value="championship" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Title Fights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="historical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📚 Historical F1 Moments</CardTitle>
              <CardDescription>Relive and analyze legendary moments from F1 history</CardDescription>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {historicalScenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hypothetical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔮 Hypothetical Scenarios</CardTitle>
              <CardDescription>Explore alternative F1 timelines and driver moves</CardDescription>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hypotheticalScenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chaos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Chaos Scenarios</CardTitle>
              <CardDescription>Unpredictable races with multiple variables and surprise outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-sm">Rain Probability: {customParams.rainProbability}%</Label>
                  <Slider
                    value={[customParams.rainProbability]}
                    onValueChange={(value) => setCustomParams({ ...customParams, rainProbability: value[0] })}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm">Safety Car Chance: {customParams.safetyCarChance}%</Label>
                  <Slider
                    value={[customParams.safetyCarChance]}
                    onValueChange={(value) => setCustomParams({ ...customParams, safetyCarChance: value[0] })}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm">Mechanical Failures: {customParams.mechanicalFailures}%</Label>
                  <Slider
                    value={[customParams.mechanicalFailures]}
                    onValueChange={(value) => setCustomParams({ ...customParams, mechanicalFailures: value[0] })}
                    max={50}
                    step={5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm">Strategy Aggression: {customParams.strategyAggression}%</Label>
                  <Slider
                    value={[customParams.strategyAggression]}
                    onValueChange={(value) => setCustomParams({ ...customParams, strategyAggression: value[0] })}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chaosScenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="championship" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🏆 Championship Battles</CardTitle>
              <CardDescription>Simulate intense title fights and season finales</CardDescription>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {championshipScenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Results Display */}
      {simulationResult && selectedScenario && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Scenario Results: {selectedScenario.title}</CardTitle>
            <CardDescription>AI-powered analysis of the scenario outcome</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    Race Winner
                  </h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">🏆 {simulationResult.winner}</div>
                  {simulationResult.margin && (
                    <div className="text-sm text-gray-600">Winning margin: {simulationResult.margin}</div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Full Podium</h4>
                  <div className="space-y-2">
                    {simulationResult.podium?.map((driver: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <span>{driver}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Key Insights</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">
                      {simulationResult.keyInsight || simulationResult.keyMoment || "Scenario analysis complete"}
                    </p>
                  </div>
                </div>

                {simulationResult.rippleEffects && (
                  <div>
                    <h4 className="font-semibold mb-2">Ripple Effects</h4>
                    <ul className="space-y-1">
                      {simulationResult.rippleEffects.map((effect: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {simulationResult.keyEvents && (
                  <div>
                    <h4 className="font-semibold mb-2">Key Race Events</h4>
                    <div className="space-y-2">
                      {simulationResult.keyEvents.map((event: string, index: number) => (
                        <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                          {event}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {simulationResult.championshipImpact && (
                  <div>
                    <h4 className="font-semibold mb-2">Championship Impact</h4>
                    <Badge variant="secondary" className="text-sm">
                      {simulationResult.championshipImpact}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
