"use client"

import { AppProvider } from "@/context/app-context"
import { DriverDNAAnalyzer } from "@/components/driver-dna/driver-dna-analyzer"

export default function DriverDNAPage() {
  return (
    <AppProvider>
      <div className="container mx-auto max-w-5xl py-10">
        <DriverDNAAnalyzer />
      </div>
    </AppProvider>
  )
}
