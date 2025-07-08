"use client"

import { AppProvider } from "@/context/app-context"
import { MainLayout } from "@/components/layout/main-layout"
import { MonteCarloLab } from "@/components/monte-carlo/monte-carlo-lab"

export default function MonteCarloPage() {
  return (
    <AppProvider>
      <MainLayout>
        <MonteCarloLab />
      </MainLayout>
    </AppProvider>
  )
}
