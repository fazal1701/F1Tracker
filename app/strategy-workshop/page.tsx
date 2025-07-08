"use client"

import { AppProvider } from "@/context/app-context"
import { MainLayout } from "@/components/layout/main-layout"
import { StrategyWorkshop } from "@/components/strategy/strategy-workshop"

export default function StrategyWorkshopPage() {
  return (
    <AppProvider>
      <MainLayout>
        <StrategyWorkshop />
      </MainLayout>
    </AppProvider>
  )
}
