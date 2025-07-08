"use client"

import { AppProvider } from "@/context/app-context"
import { MainLayout } from "@/components/layout/main-layout"
import { WhatIfGenerator } from "@/components/what-if/what-if-generator"

export default function WhatIfPage() {
  return (
    <AppProvider>
      <MainLayout>
        <WhatIfGenerator />
      </MainLayout>
    </AppProvider>
  )
}
