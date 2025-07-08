"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useAppContext } from "@/context/app-context"

export function SliderPanel() {
  const { sliders, setSliders } = useAppContext()

  const updateSlider = (key: keyof typeof sliders, value: number) => {
    setSliders({ ...sliders, [key]: value })
  }

  const sliderConfigs = [
    {
      key: "cleanAirPace" as const,
      label: "Clean Air Race Pace",
      description: "Driver performance in clear track conditions",
      min: 0,
      max: 100,
      step: 1,
      icon: "🏎️",
    },
    {
      key: "qualifyingTime" as const,
      label: "Qualifying Performance",
      description: "Saturday qualifying session impact",
      min: 0,
      max: 100,
      step: 1,
      icon: "⏱️",
    },
    {
      key: "teamPerformance" as const,
      label: "Team Performance",
      description: "Overall team strategy and car setup",
      min: 0,
      max: 100,
      step: 1,
      icon: "🔧",
    },
    {
      key: "weatherImpact" as const,
      label: "Weather Impact",
      description: "How weather conditions affect the race",
      min: 0,
      max: 100,
      step: 1,
      icon: "🌧️",
    },
    {
      key: "trackTemperature" as const,
      label: "Track Temperature",
      description: "Track surface temperature in °C",
      min: 20,
      max: 60,
      step: 1,
      icon: "🌡️",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>🎚️ Race Parameters</CardTitle>
        <CardDescription>Adjust these parameters to see how they affect race predictions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sliderConfigs.map((config) => (
          <div key={config.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <span>{config.icon}</span>
                {config.label}
              </Label>
              <span className="text-sm text-gray-500">
                {sliders[config.key]}
                {config.key === "trackTemperature" ? "°C" : "%"}
              </span>
            </div>
            <Slider
              value={[sliders[config.key]]}
              onValueChange={(value) => updateSlider(config.key, value[0])}
              min={config.min}
              max={config.max}
              step={config.step}
              className="w-full"
            />
            <p className="text-xs text-gray-500">{config.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
