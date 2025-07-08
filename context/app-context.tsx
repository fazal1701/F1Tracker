"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Driver, Era, WeatherConditions, ChampionshipStanding } from "@/types"
import type { RacePrediction as Prediction } from "@/types"
import { mockDrivers, mockEras, mockChampionshipStandings } from "@/data/mock-data"

export interface SliderInput {
  cleanAirPace: number
  qualifyingTime: number
  teamPerformance: number
  weatherImpact: number
  trackTemperature: number
}

// Default slider settings (same numbers the UI expects)
export const defaultSliders: SliderInput = {
  cleanAirPace: 75,
  qualifyingTime: 80,
  teamPerformance: 70,
  weatherImpact: 30,
  trackTemperature: 45,
}

interface AppContextType {
  // Core Data
  drivers: Driver[]
  eras: Era[]
  championshipStandings: ChampionshipStanding[]

  // Current Selections
  selectedDrivers: string[]
  setSelectedDrivers: (drivers: string[]) => void
  selectedEra: string
  setSelectedEra: (era: string) => void
  selectedCircuit: string
  setSelectedCircuit: (circuit: string) => void

  // Weather & Conditions
  weatherConditions: WeatherConditions
  setWeatherConditions: (conditions: WeatherConditions) => void

  // Simulation State
  isSimulating: boolean
  setIsSimulating: (simulating: boolean) => void
  simulationResults: any
  setSimulationResults: (results: any) => void

  // Strategy Parameters
  strategyParams: StrategyParameters
  setStrategyParams: (params: StrategyParameters) => void

  predictions: Prediction[]
  setPredictions: (p: Prediction[]) => void

  sliders: SliderInput
  setSliders: (s: SliderInput) => void

  isLoading: boolean
  setIsLoading: (v: boolean) => void
}

interface StrategyParameters {
  tireStrategy: string
  fuelLoad: number
  aggressionLevel: number
  riskTolerance: number
  pitWindowPreference: string
}

const defaultStrategyParams: StrategyParameters = {
  tireStrategy: "two-stop",
  fuelLoad: 50,
  aggressionLevel: 50,
  riskTolerance: 50,
  pitWindowPreference: "optimal",
}

const defaultWeatherConditions: WeatherConditions = {
  temperature: 25,
  humidity: 60,
  windSpeed: 10,
  precipitationProbability: 20,
  trackTemperature: 35,
  condition: "partly-cloudy",
}

const AppContext = createContext<AppContextType | null>(null)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(["VER", "HAM"])
  const [selectedEra, setSelectedEra] = useState("hybrid-era")
  const [selectedCircuit, setSelectedCircuit] = useState("silverstone")
  const [weatherConditions, setWeatherConditions] = useState(defaultWeatherConditions)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationResults, setSimulationResults] = useState(null)
  const [strategyParams, setStrategyParams] = useState(defaultStrategyParams)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [sliders, setSliders] = useState<SliderInput>(defaultSliders)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        drivers: mockDrivers,
        eras: mockEras,
        championshipStandings: mockChampionshipStandings,
        selectedDrivers,
        setSelectedDrivers,
        selectedEra,
        setSelectedEra,
        selectedCircuit,
        setSelectedCircuit,
        weatherConditions,
        setWeatherConditions,
        isSimulating,
        setIsSimulating,
        simulationResults,
        setSimulationResults,
        strategyParams,
        setStrategyParams,
        predictions,
        setPredictions,
        sliders,
        setSliders,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { mockDrivers }
