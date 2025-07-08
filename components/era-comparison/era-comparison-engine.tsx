"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DriverSearch } from "@/components/ui/driver-search"
import { useAppContext } from "@/context/app-context"
import { Clock, Users, Trophy, Target } from "lucide-react"
import type { Driver } from "@/types"

export function EraComparisonEngine() {
  const { eras } = useAppContext()
  const [selectedDrivers, setSelectedDrivers] = useState<Driver[]>([])
  const [selectedEra, setSelectedEra] = useState("")
  const [comparisonResult, setComparisonResult] = useState<any>(null)
  const [isComparing, setIsComparing] = useState(false)

  const handleDriverSelect = (driver: Driver) => {
    if (!selectedDrivers.find((d) => d.id === driver.id)) {
      setSelectedDrivers([...selectedDrivers, driver])
    }
  }

  const removeDriver = (driverId: string) => {
    setSelectedDrivers(selectedDrivers.filter((d) => d.id !== driverId))
  }

  const runComparison = async () => {
    if (selectedDrivers.length === 0 || !selectedEra) return

    setIsComparing(true)

    // Simulate API call
    setTimeout(() => {
      const era = eras.find((e) => e.id === selectedEra)

      const results = selectedDrivers.map((driver) => {
        // Fallbacks when DNA is partially/fully missing
        const dna = driver.dna ?? {
          pace: 80,
          racecraft: 80,
          consistency: 80,
          adaptability: 80,
        }

        // Calculate era adaptation scores
        const technologyGap = Math.abs(100 - (era?.technologyLevel ?? 50)) / 100
        const safetyGap = Math.abs(95 - (era?.safetyLevel ?? 50)) / 100

        const adaptabilityScore = Math.round(Math.max(60, dna.adaptability - technologyGap * 20))
        const predictedPerformance = Math.round(
          Math.max(70, (dna.pace + dna.racecraft + dna.consistency) / 3 - technologyGap * 15),
        )

        return {
          driver,
          adaptabilityScore,
          predictedPerformance,
          championshipProbability: Math.round(predictedPerformance * 0.8),
          adjustments: {
            technology: Number((-technologyGap * 10).toFixed(1)),
            safety: Number((safetyGap * 5).toFixed(1)),
            fitness: driver.age > 35 ? -2 : 1,
            racingEtiquette: era?.id === "turbo-era" ? -3 : 2,
          },
          strengths: driver.uniqueTraits?.slice?.(0, 3) ?? [],
          challenges: technologyGap > 0.3 ? ["Technology Adaptation", "Era Adjustment"] : ["Minor Adaptation"],
        }
      })

      setComparisonResult({
        era,
        drivers: results,
        summary: {
          bestAdapted: results.reduce((best, current) =>
            current.adaptabilityScore > best.adaptabilityScore ? current : best,
          ),
          mostLikely: results.reduce((best, current) =>
            current.championshipProbability > best.championshipProbability ? current : best,
          ),
        },
      })
      setIsComparing(false)
    }, 2000)
  }

  const getEraFromAge = (age: number): string => {
    if (age <= 35) return "2020s"
    if (age <= 45) return "2010s"
    if (age <= 60) return "2000s"
    if (age <= 70) return "1990s"
    if (age <= 80) return "1980s"
    return "1960s-70s"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Era Cross-Comparison Engine</h1>
          <p className="text-gray-600">Transport drivers across F1 history with AI-powered analysis</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Clock className="h-3 w-3 mr-1" />
          Time Machine
        </Badge>
      </div>

      {/* Driver Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Driver Selection</span>
          </CardTitle>
          <CardDescription>
            Search and select drivers from any era (1960s-2020s) - {selectedDrivers.length} selected
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DriverSearch
            onDriverSelect={handleDriverSelect}
            selectedDrivers={selectedDrivers.map((d) => d.id)}
            placeholder="Search from 50+ legendary drivers across all F1 eras..."
            maxResults={15}
          />

          {selectedDrivers.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Selected Drivers:</div>
              <div className="flex flex-wrap gap-2">
                {selectedDrivers.map((driver) => (
                  <Badge key={driver.id} variant="secondary" className="flex items-center space-x-2 px-3 py-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: driver.color }} />
                    <span>{driver.name}</span>
                    <Badge variant="outline" className="text-xs ml-1">
                      {getEraFromAge(driver.age)}
                    </Badge>
                    <button onClick={() => removeDriver(driver.id)} className="ml-1 text-gray-500 hover:text-red-500">
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Era Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Target Era Selection</span>
          </CardTitle>
          <CardDescription>Choose the historical era to transport your drivers to</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Target Era</label>
              <Select value={selectedEra} onValueChange={setSelectedEra}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose era for comparison" />
                </SelectTrigger>
                <SelectContent>
                  {eras.map((era) => (
                    <SelectItem key={era.id} value={era.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{era.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({era.period})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={runComparison}
                disabled={selectedDrivers.length === 0 || !selectedEra || isComparing}
                className="w-full"
              >
                {isComparing
                  ? "Analyzing..."
                  : `Compare ${selectedDrivers.length} Driver${selectedDrivers.length !== 1 ? "s" : ""}`}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {comparisonResult && (
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Era Comparison Summary</span>
              </CardTitle>
              <CardDescription>
                How your selected drivers would perform in {comparisonResult.era.name} ({comparisonResult.era.period})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-900 mb-2">Best Era Adaptation</div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: comparisonResult.summary.bestAdapted.driver.color }}
                    />
                    <span className="font-medium">{comparisonResult.summary.bestAdapted.driver.name}</span>
                    <Badge className="bg-green-600">{comparisonResult.summary.bestAdapted.adaptabilityScore}/100</Badge>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-2">Most Likely Champion</div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: comparisonResult.summary.mostLikely.driver.color }}
                    />
                    <span className="font-medium">{comparisonResult.summary.mostLikely.driver.name}</span>
                    <Badge className="bg-blue-600">
                      {comparisonResult.summary.mostLikely.championshipProbability}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {comparisonResult.drivers.map((result: any, index: number) => (
              <Card key={result.driver.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: result.driver.color }} />
                    <span>{result.driver.name}</span>
                    <Badge variant="outline">
                      {getEraFromAge(result.driver.age)} → {comparisonResult.era.name}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{result.adaptabilityScore}</div>
                        <div className="text-xs text-green-700">Adaptability</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{result.predictedPerformance}</div>
                        <div className="text-xs text-blue-700">Performance</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{result.championshipProbability}%</div>
                        <div className="text-xs text-yellow-700">Title Chance</div>
                      </div>
                    </div>

                    {/* Adjustments */}
                    <div>
                      <div className="text-sm font-medium mb-2">Performance Adjustments</div>
                      <div className="space-y-1">
                        {Object.entries(result.adjustments).map(([factor, adjustment]) => (
                          <div key={factor} className="flex items-center justify-between text-sm">
                            <span className="capitalize">{factor.replace(/([A-Z])/g, " $1")}</span>
                            <div
                              className={`font-medium ${
                                Number(adjustment) > 0
                                  ? "text-green-600"
                                  : Number(adjustment) < 0
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {Number(adjustment) > 0 ? "+" : ""}
                              {Number(adjustment).toFixed(1)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strengths & Challenges */}
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <div className="text-sm font-medium mb-1">Era Strengths</div>
                        <div className="flex flex-wrap gap-1">
                          {result.strengths.map((strength: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Adaptation Challenges</div>
                        <div className="flex flex-wrap gap-1">
                          {result.challenges.map((challenge: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {challenge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
