"use client"

import { AppProvider } from "@/context/app-context"
import { MainLayout } from "@/components/layout/main-layout"
import { EraComparisonEngine } from "@/components/era-comparison/era-comparison-engine"

export default function EraComparison() {
  return (
    <AppProvider>
      <MainLayout>
        <EraComparisonEngine />
      </MainLayout>
    </AppProvider>
  )
}
