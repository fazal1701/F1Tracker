"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dna, User, TrendingUp, Zap, Target } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { useAppContext } from "@/context/app-context"

interface DNAComparison {
  attribute: string
  driver1: number
  driver2: number
  difference: number
}

interface PerformanceMetric {
  category: string
  score: number
  description: string
  impact: "High" | "Medium" | "Low"
}

export function DriverDNAAnalyzer() {
  const { drivers: ctxDrivers } = useAppContext() ?? { drivers: [] }
  const drivers = ctxDrivers ?? []

  const [selectedDriver, setSelectedDriver] = useState(drivers[0]?.id ?? "")
  const [comparisonDriver, setComparisonDriver] = useState(drivers[1]?.id ?? "")
  const [analysisMode, setAnalysisMode] = useState<"single" | "comparison">("single")

  if (!drivers.length) {
    return <div className="text-center text-gray-500 py-10">Loading drivers…</div>
  }

  const currentDriver = drivers.find((d) => d.id === selectedDriver) || drivers[0]
  const compareDriver = drivers.find((d) => d.id === comparisonDriver) || drivers[1]

  // Enhanced DNA analysis with performance metrics
  const getPerformanceMetrics = (driver: typeof currentDriver): PerformanceMetric[] => {
    const dna = driver.dna
    return [
      {
        category: "Raw Speed",
        score: dna.pace,
        description: "Pure one-lap and race pace ability",
        impact: "High",
      },
      {
        category: "Racecraft",
        score: dna.racecraft,
        description: "Wheel-to-wheel combat and overtaking skill",
        impact: "High",
      },
      {
        category: "Consistency",
        score: dna.consistency,
        description: "Ability to deliver similar performance repeatedly",
        impact: "High",
      },
      {
        category: "Adaptability",
        score: dna.adaptability,
        description: "Adjusting to different cars, tracks, and conditions",
        impact: "Medium",
      },
      {
        category: "Pressure Response",
        score: dna.pressureResponse,
        description: "Performance under championship pressure",
        impact: "High",
      },
      {
        category: "Tire Management",
        score: dna.tireManagement,
        description: "Optimizing tire performance and degradation",
        impact: "Medium",
      },
      {
        category: "Wet Weather",
        score: dna.wetWeather,
        description: "Performance in rain and changing conditions",
        impact: "Medium",
      },
      {
        category: "Qualifying",
        score: dna.qualifying,
        description: "Saturday performance and grid position",
        impact: "High",
      },
      {
        category: "Race Starts",
        score: dna.raceStarts,
        description: "Launch and first lap performance",
        impact: "Medium",
      },
      {
        category: "Strategic Awareness",
        score: dna.strategicAwareness,
        description: "Understanding race strategy and timing",
        impact: "Medium",
      },
    ]
  }

  const getRadarData = (driver: typeof currentDriver) => {
    const dna = driver.dna
    return [
      { attribute: "Pace", value: dna.pace, fullMark: 100 },
      { attribute: "Racecraft", value: dna.racecraft, fullMark: 100 },
      { attribute: "Consistency", value: dna.consistency, fullMark: 100 },
      { attribute: "Adaptability", value: dna.adaptability, fullMark: 100 },
      { attribute: "Pressure", value: dna.pressureResponse, fullMark: 100 },
      { attribute: "Tire Mgmt", value: dna.tireManagement, fullMark: 100 },
      { attribute: "Wet Weather", value: dna.wetWeather, fullMark: 100 },
      { attribute: "Qualifying", value: dna.qualifying, fullMark: 100 },
    ]
  }

  const getComparisonData = (): DNAComparison[] => {
    const dna1 = currentDriver.dna
    const dna2 = compareDriver.dna

    return [
      { attribute: "Pace", driver1: dna1.pace, driver2: dna2.pace, difference: dna1.pace - dna2.pace },
      {
        attribute: "Racecraft",
        driver1: dna1.racecraft,
        driver2: dna2.racecraft,
        difference: dna1.racecraft - dna2.racecraft,
      },
      {
        attribute: "Consistency",
        driver1: dna1.consistency,
        driver2: dna2.consistency,
        difference: dna1.consistency - dna2.consistency,
      },
      {
        attribute: "Adaptability",
        driver1: dna1.adaptability,
        driver2: dna2.adaptability,
        difference: dna1.adaptability - dna2.adaptability,
      },
      {
        attribute: "Pressure Response",
        driver1: dna1.pressureResponse,
        driver2: dna2.pressureResponse,
        difference: dna1.pressureResponse - dna2.pressureResponse,
      },
      {
        attribute: "Tire Management",
        driver1: dna1.tireManagement,
        driver2: dna2.tireManagement,
        difference: dna1.tireManagement - dna2.tireManagement,
      },
      {
        attribute: "Wet Weather",
        driver1: dna1.wetWeather,
        driver2: dna2.wetWeather,
        difference: dna1.wetWeather - dna2.wetWeather,
      },
      {
        attribute: "Qualifying",
        driver1: dna1.qualifying,
        driver2: dna2.qualifying,
        difference: dna1.qualifying - dna2.qualifying,
      },
    ]
  }

  const getOverallRating = (driver: typeof currentDriver) => {
    const dna = driver.dna
    const weights = {
      pace: 0.2,
      racecraft: 0.18,
      consistency: 0.15,
      qualifying: 0.12,
      pressureResponse: 0.1,
      adaptability: 0.08,
      tireManagement: 0.07,
      wetWeather: 0.05,
      raceStarts: 0.03,
      strategicAwareness: 0.02,
    }

    return Math.round(
      dna.pace * weights.pace +
        dna.racecraft * weights.racecraft +
        dna.consistency * weights.consistency +
        dna.qualifying * weights.qualifying +
        dna.pressureResponse * weights.pressureResponse +
        dna.adaptability * weights.adaptability +
        dna.tireManagement * weights.tireManagement +
        dna.wetWeather * weights.wetWeather +
        dna.raceStarts * weights.raceStarts +
        dna.strategicAwareness * weights.strategicAwareness,
    )
  }

  const getStrengthsAndWeaknesses = (driver: typeof currentDriver) => {
    const metrics = getPerformanceMetrics(driver)
    const sorted = [...metrics].sort((a, b) => b.score - a.score)

    return {
      strengths: sorted.slice(0, 3),
      weaknesses: sorted.slice(-3).reverse(),
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    if (score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 90) return "bg-green-50"
    if (score >= 80) return "bg-blue-50"
    if (score >= 70) return "bg-yellow-50"
    if (score >= 60) return "bg-orange-50"
    return "bg-red-50"
  }

  const currentMetrics = getPerformanceMetrics(currentDriver)
  const currentAnalysis = getStrengthsAndWeaknesses(currentDriver)
  const overallRating = getOverallRating(currentDriver)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Driver DNA Analyzer</h1>
          <p className="text-gray-600">Comprehensive driver characteristic analysis and performance profiling</p>
        </div>
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <Dna className="h-3 w-3 mr-1" />
          Genetic Code
        </Badge>
      </div>

      {/* Driver Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Driver Selection & Analysis Mode</span>
          </CardTitle>
          <CardDescription>Choose drivers and analysis type for DNA profiling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Driver</label>
              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: driver.color }} />
                        <span>{driver.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Analysis Mode</label>
              <Select value={analysisMode} onValueChange={(value: "single" | "comparison") => setAnalysisMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Driver Analysis</SelectItem>
                  <SelectItem value="comparison">Driver Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {analysisMode === "comparison" && (
              <div>
                <label className="text-sm font-medium mb-2 block">Compare With</label>
                <Select value={comparisonDriver} onValueChange={setComparisonDriver}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers
                      .filter((d) => d.id !== selectedDriver)
                      .map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: driver.color }} />
                            <span>{driver.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Driver Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: currentDriver.color }} />
            <span>{currentDriver.name} - DNA Profile</span>
          </CardTitle>
          <CardDescription>
            {currentDriver.team} • {currentDriver.nationality} • {currentDriver.experience} years experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{overallRating}</div>
              <div className="text-sm text-blue-700">Overall Rating</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{currentDriver.age}</div>
              <div className="text-sm text-green-700">Age</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{currentDriver.experience}</div>
              <div className="text-sm text-purple-700">Years in F1</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">{currentDriver.number}</div>
              <div className="text-sm text-orange-700">Race Number</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(currentDriver.uniqueTraits || []).map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {trait}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {analysisMode === "single" ? (
        <Tabs defaultValue="radar" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="radar">DNA Radar</TabsTrigger>
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
            <TabsTrigger value="analysis">Strengths & Weaknesses</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="radar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>DNA Radar Chart</CardTitle>
                <CardDescription>
                  Visual representation of {currentDriver.name}'s driving characteristics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={getRadarData(currentDriver)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="attribute" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name={currentDriver.name}
                      dataKey="value"
                      stroke={currentDriver.color}
                      fill={currentDriver.color}
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{metric.category}</div>
                      <Badge
                        variant={
                          metric.impact === "High" ? "default" : metric.impact === "Medium" ? "secondary" : "outline"
                        }
                      >
                        {metric.impact} Impact
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>{metric.score}</div>
                      <Progress value={metric.score} className="flex-1" />
                    </div>
                    <div className="text-sm text-gray-600">{metric.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    <span>Key Strengths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentAnalysis.strengths.map((strength, index) => (
                      <div key={index} className={`p-3 rounded-lg ${getScoreBackground(strength.score)}`}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold">{strength.category}</div>
                          <div className={`font-bold ${getScoreColor(strength.score)}`}>{strength.score}/100</div>
                        </div>
                        <div className="text-sm text-gray-600">{strength.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-600">
                    <Target className="h-5 w-5" />
                    <span>Development Areas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentAnalysis.weaknesses.map((weakness, index) => (
                      <div key={index} className={`p-3 rounded-lg ${getScoreBackground(weakness.score)}`}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold">{weakness.category}</div>
                          <div className={`font-bold ${getScoreColor(weakness.score)}`}>{weakness.score}/100</div>
                        </div>
                        <div className="text-sm text-gray-600">{weakness.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>AI-Generated Insights</span>
                </CardTitle>
                <CardDescription>Advanced analysis of {currentDriver.name}'s driving profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-2">Championship Potential</div>
                    <div className="text-blue-800">
                      Based on DNA analysis, {currentDriver.name} shows{" "}
                      {overallRating >= 90 ? "exceptional" : overallRating >= 85 ? "strong" : "developing"} championship
                      potential. Key factors: {currentAnalysis.strengths[0].category.toLowerCase()} dominance and{" "}
                      {currentAnalysis.strengths[1].category.toLowerCase()} excellence.
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-900 mb-2">Optimal Race Conditions</div>
                    <div className="text-green-800">
                      {currentDriver.dna.wetWeather > 90
                        ? "Excels in wet weather conditions and variable grip scenarios."
                        : currentDriver.dna.qualifying > 90
                          ? "Performs best when starting from pole position or front row."
                          : currentDriver.dna.racecraft > 90
                            ? "Thrives in wheel-to-wheel combat and overtaking situations."
                            : "Shows consistent performance across various race conditions."}
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="font-semibold text-yellow-900 mb-2">Strategic Recommendations</div>
                    <div className="text-yellow-800">
                      Team should focus on {currentAnalysis.weaknesses[0].category.toLowerCase()} development and
                      leverage
                      {currentAnalysis.strengths[0].category.toLowerCase()} advantages in race strategy planning.
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-2">Career Trajectory</div>
                    <div className="text-purple-800">
                      At {currentDriver.age} years old with {currentDriver.experience} years of experience,
                      {currentDriver.age < 25
                        ? "entering prime development phase with significant upside potential."
                        : currentDriver.age < 30
                          ? "in peak performance window with championship-winning capability."
                          : currentDriver.age < 35
                            ? "leveraging experience and racecraft to maintain competitive edge."
                            : "utilizing veteran wisdom and strategic awareness to maximize performance."}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="comparison" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Head-to-Head</TabsTrigger>
            <TabsTrigger value="radar-compare">Radar Comparison</TabsTrigger>
            <TabsTrigger value="matchup">Matchup Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Driver DNA Comparison</CardTitle>
                <CardDescription>
                  {currentDriver.name} vs {compareDriver.name} - Detailed attribute breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getComparisonData().map((comparison, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold">{comparison.attribute}</div>
                        <Badge variant={Math.abs(comparison.difference) > 10 ? "default" : "secondary"}>
                          {Math.abs(comparison.difference) > 10 ? "Significant" : "Close"} Gap
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: currentDriver.color }}>
                            {comparison.driver1}
                          </div>
                          <div className="text-sm text-gray-600">{currentDriver.name}</div>
                        </div>

                        <div className="text-center">
                          <div
                            className={`text-lg font-bold ${comparison.difference > 0 ? "text-green-600" : comparison.difference < 0 ? "text-red-600" : "text-gray-600"}`}
                          >
                            {comparison.difference > 0 ? "+" : ""}
                            {comparison.difference}
                          </div>
                          <div className="text-xs text-gray-500">Difference</div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: compareDriver.color }}>
                            {comparison.driver2}
                          </div>
                          <div className="text-sm text-gray-600">{compareDriver.name}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="radar-compare" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Radar Comparison</CardTitle>
                <CardDescription>Visual overlay of both drivers' DNA profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={getRadarData(currentDriver)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="attribute" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name={currentDriver.name}
                      dataKey="value"
                      stroke={currentDriver.color}
                      fill={currentDriver.color}
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name={compareDriver.name}
                      dataKey="value"
                      data={getRadarData(compareDriver)}
                      stroke={compareDriver.color}
                      fill={compareDriver.color}
                      fillOpacity={0.2}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matchup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Matchup Analysis</CardTitle>
                <CardDescription>Predicted performance in different racing scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-900 mb-2">Qualifying Battle</div>
                      <div className="flex items-center justify-between">
                        <span>{currentDriver.name}</span>
                        <span className="font-bold">
                          {currentDriver.dna.qualifying > compareDriver.dna.qualifying ? "Advantage" : "Disadvantage"}
                        </span>
                      </div>
                      <div className="text-sm text-blue-800 mt-1">
                        {Math.abs(currentDriver.dna.qualifying - compareDriver.dna.qualifying)} point difference
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-900 mb-2">Race Pace</div>
                      <div className="flex items-center justify-between">
                        <span>{currentDriver.name}</span>
                        <span className="font-bold">
                          {currentDriver.dna.pace > compareDriver.dna.pace ? "Advantage" : "Disadvantage"}
                        </span>
                      </div>
                      <div className="text-sm text-green-800 mt-1">
                        {Math.abs(currentDriver.dna.pace - compareDriver.dna.pace)} point difference
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="font-semibold text-yellow-900 mb-2">Wet Weather</div>
                      <div className="flex items-center justify-between">
                        <span>{currentDriver.name}</span>
                        <span className="font-bold">
                          {currentDriver.dna.wetWeather > compareDriver.dna.wetWeather ? "Advantage" : "Disadvantage"}
                        </span>
                      </div>
                      <div className="text-sm text-yellow-800 mt-1">
                        {Math.abs(currentDriver.dna.wetWeather - compareDriver.dna.wetWeather)} point difference
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="font-semibold text-red-900 mb-2">Wheel-to-Wheel</div>
                      <div className="flex items-center justify-between">
                        <span>{currentDriver.name}</span>
                        <span className="font-bold">
                          {currentDriver.dna.racecraft > compareDriver.dna.racecraft ? "Advantage" : "Disadvantage"}
                        </span>
                      </div>
                      <div className="text-sm text-red-800 mt-1">
                        {Math.abs(currentDriver.dna.racecraft - compareDriver.dna.racecraft)} point difference
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-purple-900 mb-2">Under Pressure</div>
                      <div className="flex items-center justify-between">
                        <span>{currentDriver.name}</span>
                        <span className="font-bold">
                          {currentDriver.dna.pressureResponse > compareDriver.dna.pressureResponse
                            ? "Advantage"
                            : "Disadvantage"}
                        </span>
                      </div>
                      <div className="text-sm text-purple-800 mt-1">
                        {Math.abs(currentDriver.dna.pressureResponse - compareDriver.dna.pressureResponse)} point
                        difference
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="font-semibold text-orange-900 mb-2">Consistency</div>
                      <div className="flex items-center justify-between">
                        <span>{currentDriver.name}</span>
                        <span className="font-bold">
                          {currentDriver.dna.consistency > compareDriver.dna.consistency ? "Advantage" : "Disadvantage"}
                        </span>
                      </div>
                      <div className="text-sm text-orange-800 mt-1">
                        {Math.abs(currentDriver.dna.consistency - compareDriver.dna.consistency)} point difference
                      </div>
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
