"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { GitBranch, Users, Zap, History } from "lucide-react"

interface WhatIfScenario {
  id: string
  title: string
  description: string
  category: "driver-moves" | "regulation-changes" | "historical-events" | "team-changes"
  year: number
  originalOutcome: any
  variables: WhatIfVariable[]
  impact: "Low" | "Medium" | "High" | "Extreme"
}

interface WhatIfVariable {
  id: string
  name: string
  type: "boolean" | "slider" | "select"
  defaultValue: any
  options?: string[]
  min?: number
  max?: number
  description: string
}

interface ScenarioResult {
  modifiedOutcome: any
  rippleEffects: string[]
  championshipImpact: any
  careerChanges: any[]
  probabilityScore: number
  historicalPlausibility: number
}

const whatIfScenarios: WhatIfScenario[] = [
  {
    id: "senna-survives-1994",
    title: "What if Ayrton Senna survived Imola 1994?",
    description: "Explore how F1 history would change if Senna's fatal crash never happened",
    category: "historical-events",
    year: 1994,
    originalOutcome: {
      champion: "Michael Schumacher",
      sennaCareer: "Ended tragically at Imola",
      safetyChanges: "Immediate and dramatic",
      williamsImpact: "Lost their star driver",
    },
    variables: [
      {
        id: "senna-continues",
        name: "Senna continues racing",
        type: "boolean",
        defaultValue: true,
        description: "Senna recovers and continues his F1 career",
      },
      {
        id: "career-length",
        name: "Additional career years",
        type: "slider",
        defaultValue: 3,
        min: 1,
        max: 8,
        description: "How many more years Senna races",
      },
      {
        id: "team-choice",
        name: "Team after Williams",
        type: "select",
        defaultValue: "Williams",
        options: ["Williams", "Ferrari", "McLaren", "Benetton"],
        description: "Which team Senna drives for",
      },
    ],
    impact: "Extreme",
  },
  {
    id: "hamilton-ferrari-2021",
    title: "What if Hamilton joined Ferrari in 2021?",
    description: "Lewis Hamilton leaves Mercedes for Ferrari at the start of the hybrid era",
    category: "driver-moves",
    year: 2021,
    originalOutcome: {
      champion: "Max Verstappen",
      hamiltonTeam: "Mercedes",
      ferrariDriver: "Charles Leclerc",
      mercedesDriver: "George Russell",
    },
    variables: [
      {
        id: "hamilton-ferrari",
        name: "Hamilton to Ferrari",
        type: "boolean",
        defaultValue: true,
        description: "Hamilton signs with Ferrari",
      },
      {
        id: "leclerc-destination",
        name: "Leclerc's new team",
        type: "select",
        defaultValue: "Mercedes",
        options: ["Mercedes", "Red Bull", "McLaren", "Stays at Ferrari"],
        description: "Where Leclerc goes if Hamilton joins",
      },
      {
        id: "ferrari-improvement",
        name: "Ferrari car improvement",
        type: "slider",
        defaultValue: 15,
        min: 0,
        max: 30,
        description: "Percentage improvement in Ferrari performance",
      },
    ],
    impact: "High",
  },
  {
    id: "no-budget-cap",
    title: "What if there was no budget cap in F1?",
    description: "The 2021 budget cap regulations were never introduced",
    category: "regulation-changes",
    year: 2021,
    originalOutcome: {
      budgetCap: "$145M in 2021",
      competitiveBalance: "Improved",
      bigTeamAdvantage: "Reduced",
      developmentRace: "Limited",
    },
    variables: [
      {
        id: "unlimited-spending",
        name: "Unlimited team spending",
        type: "boolean",
        defaultValue: true,
        description: "Teams can spend unlimited amounts",
      },
      {
        id: "big-team-advantage",
        name: "Big team advantage increase",
        type: "slider",
        defaultValue: 25,
        min: 10,
        max: 50,
        description: "Percentage advantage for wealthy teams",
      },
      {
        id: "development-war",
        name: "Development war intensity",
        type: "slider",
        defaultValue: 80,
        min: 50,
        max: 100,
        description: "How intense the spending war becomes",
      },
    ],
    impact: "High",
  },
  {
    id: "verstappen-mercedes-2022",
    title: "What if Verstappen joined Mercedes in 2022?",
    description: "Max Verstappen leaves Red Bull for Mercedes after his first championship",
    category: "driver-moves",
    year: 2022,
    originalOutcome: {
      champion: "Max Verstappen (Red Bull)",
      mercedesDrivers: "Hamilton & Russell",
      redBullDriver: "Sergio Perez",
      dominance: "Red Bull era begins",
    },
    variables: [
      {
        id: "verstappen-mercedes",
        name: "Verstappen to Mercedes",
        type: "boolean",
        defaultValue: true,
        description: "Verstappen signs with Mercedes",
      },
      {
        id: "hamilton-stays",
        name: "Hamilton remains at Mercedes",
        type: "boolean",
        defaultValue: true,
        description: "Hamilton stays to partner Verstappen",
      },
      {
        id: "red-bull-replacement",
        name: "Red Bull's new driver",
        type: "select",
        defaultValue: "George Russell",
        options: ["George Russell", "Charles Leclerc", "Lando Norris", "Carlos Sainz"],
        description: "Who replaces Verstappen at Red Bull",
      },
    ],
    impact: "Extreme",
  },
  {
    id: "ground-effect-never-banned",
    title: "What if ground effect was never banned?",
    description: "Ground effect aerodynamics continued from the 1980s onwards",
    category: "regulation-changes",
    year: 1983,
    originalOutcome: {
      groundEffect: "Banned in 1983",
      safetyImpact: "Improved significantly",
      carDesign: "Evolved differently",
      lapTimes: "Slower but safer",
    },
    variables: [
      {
        id: "ground-effect-continues",
        name: "Ground effect continues",
        type: "boolean",
        defaultValue: true,
        description: "Ground effect never gets banned",
      },
      {
        id: "safety-development",
        name: "Safety development pace",
        type: "slider",
        defaultValue: 60,
        min: 30,
        max: 100,
        description: "How quickly safety improves",
      },
      {
        id: "speed-increase",
        name: "Lap time improvement",
        type: "slider",
        defaultValue: 20,
        min: 10,
        max: 40,
        description: "Percentage faster lap times",
      },
    ],
    impact: "Extreme",
  },
]

export function WhatIfGenerator() {
  const [selectedScenario, setSelectedScenario] = useState<string>("hamilton-ferrari-2021")
  const [variables, setVariables] = useState<{ [key: string]: any }>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<ScenarioResult | null>(null)

  const currentScenario = whatIfScenarios.find(s => s.id === selectedScenario) || whatIfScenarios[0]

  // Initialize variables with default values
  useState(() => {
    const defaultVars: { [key: string]: any } = {}
    currentScenario.variables.forEach(variable => {
      defaultVars[variable.id] = variable.defaultValue
    })
    setVariables(defaultVars)
  })

  const updateVariable = (variableId: string, value: any) => {
    setVariables(prev => ({ ...prev, [variableId]: value }))
  }

  const generateScenario = async () => {
    setIsGenerating(true)
    setResults(null)

    setTimeout(() => {
      // Generate scenario-specific results
      let mockResult: ScenarioResult

      switch (selectedScenario) {
        case "hamilton-ferrari-2021":
          mockResult = {
            modifiedOutcome: {
              champion: "Lewis Hamilton (Ferrari)",
              championships: "Hamilton wins 2021, 2022",
              ferrariRevival: "Ferrari returns to dominance",
              mercedesStruggle: "Mercedes loses competitive edge"
            },
            rippleEffects: [
              "Ferrari becomes the team to beat from 2021",
              "Mercedes struggles without Hamilton's feedback",
              "Leclerc moves to Mercedes, creates new rivalry",
              "Red Bull still competitive but not dominant",
              "McLaren benefits from increased competition"
            ],
            championshipImpact: {
              "2021": "Hamilton wins by 45 points",
              "2022": "Hamilton vs Verstappen epic battle",
              "2023": "Three-way fight: Hamilton, Verstappen, Leclerc",
              "2024": "Ferrari-Mercedes-Red Bull triple threat"
            },
            careerChanges: [
              {
                driver: "Lewis Hamilton",
                change: "Wins 9th and 10th championships with Ferrari",
                impact: "Becomes undisputed GOAT"
              },
              {
                driver: "Charles Leclerc",
                change: "Moves to Mercedes, wins 2023 championship",
                impact: "Establishes himself as Hamilton's successor"
              },
              {
                driver: "Max Verstappen",
                change: "Wins 2024-2026 championships",
                impact: "Still becomes generational talent"
              }
            ],
            probabilityScore: 73,
            historicalPlausibility: 85
          }
          break

        case "senna-survives-1994":
          mockResult = {
            modifiedOutcome: {
              champion: "Ayrton Senna (Williams)",
              sennaCareer: "Continues until 1999",
              totalTitles: "5 championships",
              safetyImpact: "Gradual improvements instead of dramatic changes"
            },
            rippleEffects: [
              "Senna wins 1994 and 1995 championships",
              "Schumacher's dominance delayed until 1996",
              "Williams remains competitive longer",
              "Safety improvements happen more gradually",
              "Senna vs Schumacher rivalry defines the 90s"
            ],
            championshipImpact: {
              "1994": "Senna wins 4th title",
              "1995": "Senna wins 5th title",
              "1996-1999": "Senna-Schumacher epic battles",
              "Legacy": "Senna retires as 5-time champion"
            },
            careerChanges: [
              {
                driver: "Ayrton Senna",
                change: "Wins 2 more championships, retires in 1999",
                impact: "Cements legacy as greatest of all time"
              },
              {
                driver: "Michael Schumacher",
                change: "Delayed dominance, wins 5 titles instead of 7",
                impact: "Still legendary but not record holder"
              },
              {
                driver: "Damon Hill",
                change: "Never wins championship, remains Senna's wingman",
                impact: "Different career trajectory"
              }
            ],
            probabilityScore: 45,
            historicalPlausibility: 60
          }
          break

        default:
          mockResult = {
            modifiedOutcome: {
              summary: "Significant changes to F1 landscape",
              impact: "Reshapes competitive balance"
            },
            rippleEffects: [
              "Major shift in team dynamics",
              "Different championship outcomes",
              "Altered driver career paths"
            ],
            championshipImpact: {
              "Overall": "Competitive balance significantly altered"
            },
            careerChanges: [],
            probabilityScore: 65,
            historicalPlausibility: 70
          }
      }

      setResults(mockResult)
      setIsGenerating(false)
    }, 2500)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "High": return "bg-orange-100 text-orange-800"
      case "Extreme": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "driver-moves": return <Users className="h-4 w-4" />
      case "regulation-changes": return <Zap className="h-4 w-4" />
      case "historical-events": return <History className="h-4 w-4" />
      case "team-changes": return <GitBranch className="h-4 w-4" />
      default: return <GitBranch className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historical What-If Generator</h1>
          <p className="text-gray-600">Explore alternative F1 history scenarios with AI-powered analysis</p>
        </div>
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
          <GitBranch className="h-3 w-3 mr-1" />
          Butterfly Effect
        </Badge>
      </div>

      {/* Scenario Selection */}
      <Card>
        <CardHeader>
          <CardTitle>What-If Scenario Selection</CardTitle>
          <CardDescription>Choose a historical moment to reimagine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whatIfScenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedScenario === scenario.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(scenario.category)}
                    <Badge variant="outline" className="text-xs">
                      {scenario.year}
                    </Badge>
                  </div>
                  <Badge className={getImpactColor(scenario.impact)}>
                    {scenario.impact}
                  </Badge>
                </div>
                <div className="font-semibold text-sm mb-1">{scenario.title}</div>
                <div className="text-xs text-gray-600">{scenario.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Variable Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Variables</CardTitle>
          <CardDescription>Customize the parameters of your what-if scenario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentScenario.variables.map((variable) => (
              <div key={variable.id} className="space-y-2">
                <Label className="text-sm font-medium">{variable.name}</Label>
                <div className="text-xs text-gray-600 mb-2">{variable.description}</div>
                
                {variable.type === "boolean" && (
                  <input
                    type="checkbox"
                    checked={!!variables[variable.id]}
                    onChange={e => updateVariable(variable.id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                )}
                {variable.type === "slider" && (
                  <input
                    type="range"
                    min={variable.min}
                    max={variable.max}
                    value={variables[variable.id]}
                    onChange={e => updateVariable(variable.id, Number(e.target.value))}
                    className="w-full"
                  />
                )}
                {variable.type === "select" && (
                  <select
                    value={variables[variable.id]}
                    onChange={e => updateVariable(variable.id, e.target.value)}
                    className="form-select w-full"
                  >
                    {variable.options?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex justify-end">
        <button
          onClick={generateScenario}
          disabled={isGenerating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Generate What-If"}
        </button>
      </div>

      {/* Results */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Scenario Results</CardTitle>
            <CardDescription>AI-generated alternate history and ripple effects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Modified Outcome</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(results.modifiedOutcome, null, 2)}</pre>
              </div>
              <div>
                <h3 className="font-semibold">Ripple Effects</h3>
                <ul className="list-disc ml-6 text-sm">
                  {results.rippleEffects.map((effect, idx) => (
                    <li key={idx}>{effect}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Championship Impact</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(results.championshipImpact, null, 2)}</pre>
              </div>
              <div>
                <h3 className="font-semibold">Career Changes</h3>
                <ul className="list-disc ml-6 text-sm">
                  {results.careerChanges.map((change, idx) => (
                    <li key={idx}>{change.driver}: {change.change} ({change.impact})</li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-4">
                <div>
                  <span className="font-semibold">Probability Score:</span> {results.probabilityScore}%
                </div>
                <div>
                  <span className="font-semibold">Historical Plausibility:</span> {results.historicalPlausibility}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default WhatIfGenerator;
