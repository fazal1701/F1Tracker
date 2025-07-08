"use client"

import { AppProvider } from "@/context/app-context"
import { MainLayout } from "@/components/layout/main-layout"
import { WeatherPredictor } from "@/components/weather/weather-predictor"

export default function WeatherPredictorPage() {
  return (
    <AppProvider>
      <MainLayout>
        <WeatherPredictor />
      </MainLayout>
    </AppProvider>
  )
}
