// Mock API functions - in a real app, these would call your FastAPI backend

export interface SliderInput {
  cleanAirPace: number
  qualifyingTime: number
  teamPerformance: number
  weatherImpact: number
  trackTemperature: number
}

export interface SimulationParams {
  pitLap: number
  rainProbability: number
  tyreDegradation: number
  safetyCarEnabled: boolean
  safetyCarLap?: number
  aggressionLevel: string
}

export async function getPrediction(sliders: SliderInput) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock response
  return {
    predictions: [
      { driver: "Max Verstappen", position: 1, confidence: 0.85 },
      { driver: "Lewis Hamilton", position: 2, confidence: 0.72 },
      { driver: "Charles Leclerc", position: 3, confidence: 0.68 },
    ],
    featureImportance: [
      { feature: "Qualifying Position", importance: 0.35 },
      { feature: "Team Performance", importance: 0.28 },
      { feature: "Weather Impact", importance: 0.15 },
    ],
  }
}

export async function runSimulation(params: SimulationParams) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock Monte Carlo results
  return {
    winner: "Max Verstappen",
    raceTime: "1:23:45.123",
    monteCarloResults: Array.from({ length: 1000 }, () => ({
      verstappenTime: 83.2 + (Math.random() - 0.5) * 2,
      hamiltonTime: 83.8 + (Math.random() - 0.5) * 2,
      leclercTime: 84.1 + (Math.random() - 0.5) * 2,
    })),
  }
}

export async function getScenarioResult(scenarioId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock scenario-specific results
  const scenarios: Record<string, any> = {
    "senna-rain": {
      winner: "Ayrton Senna",
      podium: ["Ayrton Senna", "Alain Prost", "Thierry Boutsen"],
      insight: "Wet weather conditions favor Senna by 73%",
    },
    "baku-chaos": {
      winner: "Sergio Perez",
      podium: ["Sergio Perez", "Sebastian Vettel", "Pierre Gasly"],
      insight: "Tire failures create 40% field reduction",
    },
  }

  return scenarios[scenarioId] || scenarios["senna-rain"]
}
