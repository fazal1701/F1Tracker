"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RacePredictionDashboard } from "@/components/race-prediction-dashboard"
import { SimulationLab } from "@/components/simulation-lab"
import { ScenarioPlayground } from "@/components/scenario-playground"
import { HowItWorks } from "@/components/how-it-works"
import { AppProvider } from "@/context/app-context"
import { MainLayout } from "@/components/layout/main-layout"
import { LiveRaceCenter } from "@/components/dashboard/live-race-center"

export default function Home() {
  return (
    <AppProvider>
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
          <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">🏎️ F1 AI Race Predictor</h1>
              <p className="text-lg text-gray-600">Interactive machine learning predictions for Formula 1 races</p>
            </header>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="dashboard">Race Dashboard</TabsTrigger>
                <TabsTrigger value="simulation">Simulation Lab</TabsTrigger>
                <TabsTrigger value="scenarios">Scenario Playground</TabsTrigger>
                <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <RacePredictionDashboard />
              </TabsContent>

              <TabsContent value="simulation">
                <SimulationLab />
              </TabsContent>

              <TabsContent value="scenarios">
                <ScenarioPlayground />
              </TabsContent>

              <TabsContent value="how-it-works">
                <HowItWorks />
              </TabsContent>
            </Tabs>
            <LiveRaceCenter />
          </div>
        </div>
      </MainLayout>
    </AppProvider>
  )
}
