// Mock API functions for future backend integration

export interface PredictionRequest {
  drivers: string[]
  circuit: string
  weather: any
  sessionType: "practice" | "qualifying" | "race"
}

export interface PredictionResponse {
  predictions: any[]
  confidence: number
  factors: any[]
  timestamp: string
}

export interface SimulationRequest {
  parameters: any
  iterations: number
  scenario: string
}

export interface SimulationResponse {
  results: any
  statistics: any
  confidence: number
}

// Mock API delay simulation
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class MockF1API {
  static async getPredictions(request: PredictionRequest): Promise<PredictionResponse> {
    await delay(800) // Simulate API latency

    return {
      predictions: [
        { driver: "Max Verstappen", position: 1, probability: 0.673 },
        { driver: "Lando Norris", position: 2, probability: 0.187 },
        { driver: "Lewis Hamilton", position: 3, probability: 0.089 },
      ],
      confidence: 0.847,
      factors: [
        { name: "Qualifying Position", importance: 0.35 },
        { name: "Team Performance", importance: 0.28 },
        { name: "Weather Impact", importance: 0.15 },
      ],
      timestamp: new Date().toISOString(),
    }
  }

  static async runSimulation(request: SimulationRequest): Promise<SimulationResponse> {
    await delay(2000) // Simulate longer processing time

    return {
      results: {
        winProbabilities: {
          VER: 0.673,
          NOR: 0.187,
          HAM: 0.089,
        },
        averagePositions: {
          VER: 1.2,
          NOR: 2.8,
          HAM: 3.4,
        },
      },
      statistics: {
        iterations: request.iterations,
        convergence: 0.95,
        variance: 0.12,
      },
      confidence: 0.847,
    }
  }

  static async getDriverDNA(driverId: string) {
    await delay(300)

    // Return mock DNA data based on driver
    return {
      pace: Math.floor(Math.random() * 20) + 80,
      racecraft: Math.floor(Math.random() * 20) + 80,
      consistency: Math.floor(Math.random() * 20) + 80,
      // ... other attributes
    }
  }

  static async getWeatherForecast(circuit: string) {
    await delay(500)

    return {
      current: {
        temperature: 22,
        humidity: 65,
        windSpeed: 15,
        precipitationProbability: 35,
      },
      forecast: [
        { time: "14:00", temp: 22, rain: 35 },
        { time: "15:00", temp: 23, rain: 45 },
        { time: "16:00", temp: 21, rain: 65 },
      ],
    }
  }

  static async getChampionshipScenarios() {
    await delay(600)

    return {
      currentStandings: [
        { driver: "Lando Norris", points: 248, position: 1 },
        { driver: "Max Verstappen", points: 241, position: 2 },
      ],
      titleProbabilities: {
        "Lando Norris": 0.523,
        "Max Verstappen": 0.468,
      },
      scenarios: [
        {
          outcome: "Norris Wins",
          probability: 0.187,
          pointsGap: 32,
        },
      ],
    }
  }

  static async getHistoricalComparison(era1: string, era2: string) {
    await delay(700)

    return {
      comparison: {
        technologyGap: 0.23,
        safetyDifference: 0.65,
        competitivenessIndex: 0.15,
      },
      driverTransplants: [
        {
          driver: "Max Verstappen",
          era: "1988",
          predictedPerformance: 0.89,
          adaptabilityScore: 0.94,
        },
      ],
    }
  }
}
