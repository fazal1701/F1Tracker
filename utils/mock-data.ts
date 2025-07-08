import { type SliderInput, mockDrivers } from "@/context/app-context"
import type { RacePrediction as Prediction } from "@/types"

export function generateMockPredictions(sliders: SliderInput): Prediction[] {
  // More realistic base performances reflecting current form
  const basePerformances = {
    NOR: 0.92, // Norris leading championship
    VER: 0.9, // Verstappen close second
    LEC: 0.87, // Leclerc strong but inconsistent
    PIA: 0.85, // Piastri rising star
    RUS: 0.82, // Russell consistent
    HAM: 0.8, // Hamilton adapting to Ferrari
    SAI: 0.75, // Sainz at Williams
    ALO: 0.73, // Alonso veteran craft
    PER: 0.7, // Perez struggling
    COL: 0.68, // Colapinto rookie
    BEA: 0.66, // Bearman rookie
    HUL: 0.65, // Hulkenberg consistent
    GAS: 0.63, // Gasly midfield
    OCO: 0.62, // Ocon midfield
    STR: 0.6, // Stroll steady
    TSU: 0.58, // Tsunoda inconsistent
    LAW: 0.57, // Lawson learning
    BOT: 0.55, // Bottas veteran
    ZHO: 0.53, // Zhou steady
    MAG: 0.52, // Magnussen experienced
  }

  const predictions = mockDrivers.map((driver, index) => {
    const basePerf = basePerformances[driver.id as keyof typeof basePerformances] || 0.5

    // Apply slider effects with more realistic impact
    let adjustedPerf = basePerf
    adjustedPerf += (sliders.cleanAirPace - 50) * 0.002
    adjustedPerf += (sliders.qualifyingTime - 50) * 0.003
    adjustedPerf += (sliders.teamPerformance - 50) * 0.002
    adjustedPerf -= (sliders.weatherImpact - 50) * 0.001
    adjustedPerf += (sliders.trackTemperature - 40) * 0.001

    // Add some randomness for race unpredictability
    adjustedPerf += (Math.random() - 0.5) * 0.08

    // Clamp between realistic bounds
    adjustedPerf = Math.max(0.3, Math.min(0.95, adjustedPerf))

    const confidence = Math.round(adjustedPerf * 100)
    const qualifyingPosition = index + 1 + Math.floor((Math.random() - 0.5) * 6)

    // Generate realistic race time based on performance
    const baseTime = 83 + (1 - adjustedPerf) * 3 // Better performance = faster time
    const minutes = Math.floor(baseTime)
    const seconds = Math.round((baseTime - minutes) * 60)
    const milliseconds = Math.floor(Math.random() * 1000)

    return {
      driver,
      predictedTime: `1:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`,
      position: 0, // Will be set after sorting
      confidence,
      probability: adjustedPerf,
      qualifyingPosition: Math.max(1, Math.min(20, qualifyingPosition)),
    }
  })

  // Sort by adjusted performance and assign positions
  predictions.sort((a, b) => b.confidence - a.confidence)
  predictions.forEach((pred, index) => {
    pred.position = index + 1
  })

  return predictions
}
