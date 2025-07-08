"use client"

import { AppProvider } from "@/context/app-context"
import { MainLayout } from "@/components/layout/main-layout"
import { ChampionshipBattleSimulator } from "@/components/championship/championship-battle-simulator"

export default function ChampionshipBattlePage() {
  return (
    <AppProvider>
      <MainLayout>
        <ChampionshipBattleSimulator />
      </MainLayout>
    </AppProvider>
  )
}
