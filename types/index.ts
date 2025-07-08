export interface Driver {
  id: string
  name: string
  team: string
  number: number
  nationality: string
  age: number
  experience: number
  color: string
  dna: DriverDNA
}

export interface DriverDNA {
  pace: number
  racecraft: number
  consistency: number
  adaptability: number
  pressureResponse: number
  tireManagement: number
  wetWeather: number
  qualifying: number
  raceStarts: number
  strategicAwareness: number
  uniqueTraits: string[]
}

export interface Era {
  id: string
  name: string
  period: string
  characteristics: string[]
  technologyLevel: number
  safetyLevel: number
  competitiveness: number
  regulations: string[]
}

export interface Circuit {
  id: string
  name: string
  country: string
  length: number
  corners: number
  drsZones: number
  characteristics: string[]
  weatherProbability: {
    rain: number
    wind: number
    temperature: { min: number; max: number }
  }
}

export interface WeatherConditions {
  temperature: number
  humidity: number
  windSpeed: number
  precipitationProbability: number
  trackTemperature: number
  condition: string
}

export interface ChampionshipStanding {
  position: number
  driver: Driver
  points: number
  wins: number
  podiums: number
  poles: number
  fastestLaps: number
}

export interface RacePrediction {
  driver: Driver
  position: number
  probability: number
  expectedTime: string
  confidence: number
}

export interface MonteCarloResult {
  iterations: number
  winProbabilities: { [driverId: string]: number }
  podiumProbabilities: { [driverId: string]: number }
  averagePositions: { [driverId: string]: number }
  riskAssessment: { [driverId: string]: number }
}

export interface StrategyOutcome {
  strategy: string
  probability: number
  expectedPosition: number
  riskLevel: number
  conditions: string[]
}

export interface WhatIfScenario {
  id: string
  title: string
  description: string
  year: number
  race: string
  originalOutcome: any
  modifiedParameters: any
  predictedOutcome: any
  impact: string
}
