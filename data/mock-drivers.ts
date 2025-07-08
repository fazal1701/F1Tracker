export type DriverDNA = {
  pace: number
  racecraft: number
  consistency: number
  adaptability: number
  pressureResponse: number
  tireManagement: number
  wetWeather: number
  qualifying: number
  raceStarts: number
  strategicAwareness: number
}

export type Driver = {
  id: string
  name: string
  team: string
  nationality: string
  age: number
  number: number
  experience: number
  color: string
  uniqueTraits: string[]
  dna: DriverDNA
}

export const mockDrivers: Driver[] = [
  {
    id: "VER",
    name: "Max Verstappen",
    team: "Red Bull Racing",
    nationality: "NED",
    age: 27,
    number: 1,
    experience: 10,
    color: "#1E41FF",
    uniqueTraits: ["Aggressive", "High Corner Speed", "Late Braker"],
    dna: {
      pace: 97,
      racecraft: 94,
      consistency: 95,
      adaptability: 93,
      pressureResponse: 94,
      tireManagement: 86,
      wetWeather: 88,
      qualifying: 96,
      raceStarts: 91,
      strategicAwareness: 89,
    },
  },
  {
    id: "NOR",
    name: "Lando Norris",
    team: "McLaren",
    nationality: "GBR",
    age: 25,
    number: 4,
    experience: 6,
    color: "#FF8700",
    uniqueTraits: ["Smooth Style", "Tyre Whisperer", "Quick Learner"],
    dna: {
      pace: 90,
      racecraft: 87,
      consistency: 89,
      adaptability: 92,
      pressureResponse: 85,
      tireManagement: 91,
      wetWeather: 83,
      qualifying: 88,
      raceStarts: 86,
      strategicAwareness: 84,
    },
  },
]
