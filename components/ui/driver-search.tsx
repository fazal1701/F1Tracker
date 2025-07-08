"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, User, Flag } from "lucide-react"
import { searchDrivers } from "@/data/historical-drivers"
import type { Driver } from "@/types"

interface DriverSearchProps {
  onDriverSelect: (driver: Driver) => void
  selectedDrivers?: string[]
  placeholder?: string
  maxResults?: number
}

export function DriverSearch({
  onDriverSelect,
  selectedDrivers = [],
  placeholder = "Search drivers by name, team, nationality, or traits...",
  maxResults = 10,
}: DriverSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Driver[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchDrivers(query).slice(0, maxResults)
      setResults(searchResults)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, maxResults])

  const handleDriverSelect = (driver: Driver) => {
    onDriverSelect(driver)
    setQuery("")
    setIsOpen(false)
  }

  const getEraFromAge = (age: number): string => {
    if (age <= 35) return "2020s"
    if (age <= 45) return "2010s"
    if (age <= 60) return "2000s"
    if (age <= 70) return "1990s"
    if (age <= 80) return "1980s"
    return "1960s-70s"
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
          onFocus={() => query && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {results.map((driver) => (
              <div
                key={driver.id}
                onClick={() => handleDriverSelect(driver)}
                className={`p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                  selectedDrivers.includes(driver.id) ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: driver.color }} />
                    <div>
                      <div className="font-semibold text-sm">{driver.name}</div>
                      <div className="text-xs text-gray-500 flex items-center space-x-2">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {driver.team}
                        </span>
                        <span className="flex items-center">
                          <Flag className="h-3 w-3 mr-1" />
                          {driver.nationality}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {getEraFromAge(driver.age)}
                    </Badge>
                    {selectedDrivers.includes(driver.id) && <Badge className="text-xs bg-blue-600">Selected</Badge>}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {driver.uniqueTraits.slice(0, 3).map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>

                {driver.dna ? (
                  <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium">{driver.dna?.pace ?? "—"}</div>
                      <div className="text-gray-500">Pace</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{driver.dna?.racecraft ?? "—"}</div>
                      <div className="text-gray-500">Craft</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{driver.dna?.consistency ?? "—"}</div>
                      <div className="text-gray-500">Consistency</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{driver.dna?.wetWeather ?? "—"}</div>
                      <div className="text-gray-500">Wet</div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-gray-500">No DNA stats available</div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
